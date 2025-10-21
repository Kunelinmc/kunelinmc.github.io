/**release 0.4.9*/
const DB_NAME = "sw-unread-db";
const DB_STORE = "unreadStore";
const CACHE_NAME = "xKsPi4jT8";
const PRECACHE_URLS = [
	"/",
	"/index.html",
	"/style.css",
	"/script.js",
	"/manifest.json",
	"/assets/icon.png",
	"/assets/avatar.png",
	"/assets/draft1.png",
	"/assets/draft2.png",
	"/assets/default-banner.png",
];

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(DB_STORE)) {
				db.createObjectStore(DB_STORE);
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function setUnreadCount(count) {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(DB_STORE, "readwrite");
		const store = tx.objectStore(DB_STORE);
		const request = store.put(count, "unreadCount");

		request.onsuccess = () => resolve(count);
		request.onerror = () => reject(request.error);
	});
}

async function getUnreadCount() {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(DB_STORE, "readonly");
		const request = tx.objectStore(DB_STORE).get("unreadCount");
		request.onsuccess = () => resolve(request.result || 0);
		request.onerror = () => reject(request.error);
	});
}

getUnreadCount().then((count) => {
	unreadCount = count;
	if ("setAppBadge" in navigator) {
		navigator.setAppBadge(unreadCount).catch(console.error);
	}
});

async function openCache() {
	return await caches.open(CACHE_NAME);
}

async function addToCacheIfNotExists(url) {
	const cache = await openCache();
	const cached = await cache.match(url);
	if (!cached) {
		const response = await fetch(url);
		if (response.ok) {
			await cache.put(url, response.clone());
			console.log(`Cached:${url}`);
		} else {
			console.warn(`Failed to get:${url}`);
		}
	} else {
		console.log(`Cache already exists:${url}`);
	}
}

async function clearAllCaches() {
	const keys = await caches.keys();
	await Promise.all(keys.map((key) => caches.delete(key)));
	console.log("All caches cleared");
}

self.addEventListener("install", (event) => {
	self.skipWaiting();
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== CACHE_NAME)
						.map((key) => caches.delete(key))
				)
			)
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	if (request.method !== "GET" || !request.url.startsWith("http")) return;

	const url = new URL(request.url);

	// Determine whether it is the root directory
	if (url.pathname === "/") {
		event.respondWith(
			openCache().then((cache) => {
				// Uniformly construct a cache key without search
				const cacheKey = new Request(url.origin + "/", {
					method: request.method,
					headers: request.headers,
				});

				return cache.match(cacheKey).then((cachedResponse) => {
					if (cachedResponse) return cachedResponse;

					return fetch(request)
						.then((networkResponse) => {
							if (networkResponse.ok) {
								cache.put(cacheKey, networkResponse.clone());
							}
							return networkResponse;
						})
						.catch(
							() =>
								new Response("Offline status: Unable to obtain root page", {
									status: 503,
								})
						);
				});
			})
		);
		return;
	}

	event.respondWith(
		openCache().then((cache) =>
			cache.match(request).then((cachedResponse) => {
				if (cachedResponse) return cachedResponse;

				return fetch(request)
					.then((networkResponse) => {
						if (networkResponse.ok) cache.put(request, networkResponse.clone());
						return networkResponse;
					})
					.catch(
						() =>
							new Response("Offline status: Unable to obtain resources", {
								status: 503,
							})
					);
			})
		)
	);
});

self.addEventListener("message", async (event) => {
	const { action, url } = event.data || {};

	if (action === "cache-url" && url) addToCacheIfNotExists(url);

	if (action === "clear-all-caches") clearAllCaches();

	if (action === "reset-unread") {
		await setUnreadCount(0);

		if ("clearAppBadge" in navigator) {
			navigator.clearAppBadge().catch(console.error);
		}
	}
});

self.addEventListener("push", (event) => {
	event.waitUntil(
		(async () => {
			const data = event.data.json();
			const { title, body, icon } = data.notification;
			let count = await getUnreadCount();
			count += 1;
			await setUnreadCount(count);

			if ("setAppBadge" in navigator) {
				navigator.setAppBadge(count).catch(console.error);
			}

			await self.registration.showNotification(title, { body, icon });
		})()
	);
});
