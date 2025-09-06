/**release 0.4.1*/
const CACHE_NAME = "xrYLg7P7v";
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
						.map((key) => {
							console.log(`Clear old cache: ${key}`);
							return caches.delete(key);
						})
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
						if (networkResponse.ok) {
							cache.put(request, networkResponse.clone());
						}
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

	if (action === "cache-url" && url) {
		addToCacheIfNotExists(url);
	}

	if (action === "clear-all-caches") {
		clearAllCaches();
	}

	if (action === "reset-unread") {
		unreadCount = 0;

		if ("clearAppBadge" in navigator) {
			navigator.clearAppBadge().catch((err) => {
				console.error("Failed to clear badge", err);
			});
		}
	}
});

self.addEventListener("push", function (event) {
	const data = event.data.json();
	const { title, body, icon } = data.notification;

	unreadCount += 1;

	if ("setAppBadge" in navigator) {
		navigator.setAppBadge(unreadCount).catch((err) => {
			console.error("Failed to set badge", err);
		});
	}

	event.waitUntil(
		self.registration.showNotification(title, {
			body,
			icon,
		})
	);
});
