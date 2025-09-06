/**release 0.4.1*/
const DB_NAME = "sw-unread-db";
const DB_STORE = "unreadStore";
const CACHE_NAME = "x1DVynfkG";
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

let unreadCount = 0;

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
	const tx = db.transaction(DB_STORE, "readwrite");
	tx.objectStore(DB_STORE).put(count, "unreadCount");
	return tx.complete;
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

self.addEventListener("message", (event) => {
	const { action, url } = event.data || {};

	if (action === "cache-url" && url) addToCacheIfNotExists(url);

	if (action === "clear-all-caches") clearAllCaches();

	if (action === "reset-unread") {
		unreadCount = 0;
		setUnreadCount(unreadCount);

		if ("clearAppBadge" in navigator) {
			navigator.clearAppBadge().catch(console.error);
		}
	}
});

self.addEventListener("push", async (event) => {
	const data = event.data.json();
	const { title, body, icon } = data.notification;

	unreadCount = await getUnreadCount();
	unreadCount += 1;
	await setUnreadCount(unreadCount);

	if ("setAppBadge" in navigator) {
		navigator.setAppBadge(unreadCount).catch(console.error);
	}

	event.waitUntil(self.registration.showNotification(title, { body, icon }));
});
