/**release 0.4.1*/
const DB_NAME = "sw-unread-db";
const DB_STORE = "unreadStore";
const CACHE_NAME = "xNUlfvwS5";
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

// ---------------- IndexedDB ----------------
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

function setUnreadCount(count) {
	return new Promise(async (resolve, reject) => {
		const db = await openDB();
		const tx = db.transaction(DB_STORE, "readwrite");
		tx.objectStore(DB_STORE).put(count, "unreadCount");
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

function getUnreadCount() {
	return new Promise(async (resolve, reject) => {
		const db = await openDB();
		const tx = db.transaction(DB_STORE, "readonly");
		const request = tx.objectStore(DB_STORE).get("unreadCount");
		request.onsuccess = () => resolve(request.result || 0);
		request.onerror = () => reject(request.error);
	});
}

function setNotificationsEnabled(enabled) {
	return new Promise(async (resolve, reject) => {
		const db = await openDB();
		const tx = db.transaction(DB_STORE, "readwrite");
		tx.objectStore(DB_STORE).put(enabled, "notificationsEnabled");
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

function getNotificationsEnabled() {
	return new Promise(async (resolve, reject) => {
		const db = await openDB();
		const tx = db.transaction(DB_STORE, "readonly");
		const request = tx.objectStore(DB_STORE).get("notificationsEnabled");
		request.onsuccess = () => resolve(request.result ?? true);
		request.onerror = () => reject(request.error);
	});
}

// ---------------- Cache ----------------
async function openCache() {
	return caches.open(CACHE_NAME);
}

async function addToCacheIfNotExists(url) {
	const cache = await openCache();
	const cached = await cache.match(url);
	if (!cached) {
		try {
			const response = await fetch(url);
			if (response.ok) {
				await cache.put(url, response.clone());
				console.log(`Cached: ${url}`);
			} else {
				console.warn(`Failed to fetch: ${url}`);
			}
		} catch (err) {
			console.warn(`Fetch error: ${url}`, err);
		}
	} else {
		console.log(`Cache already exists: ${url}`);
	}
}

async function clearAllCaches() {
	const keys = await caches.keys();
	await Promise.all(keys.map((key) => caches.delete(key)));
	console.log("All caches cleared");
}

// ---------------- Notifications ----------------
async function toggleNotifications(enable) {
	const permission = await Notification.requestPermission();
	const notificationsEnabled = permission === "granted" && enable;
	await setNotificationsEnabled(notificationsEnabled);

	const clients = await self.clients.matchAll();
	clients.forEach((client) =>
		client.postMessage({
			action: "notification-status",
			enabled: notificationsEnabled,
		})
	);
	return notificationsEnabled;
}

// ---------------- Badge ----------------
async function updateAppBadge() {
	const clients = await self.clients.matchAll();
	clients.forEach((client) =>
		client.postMessage({
			action: "update-badge",
			unreadCount,
		})
	);
}

// ---------------- Service Worker Events ----------------
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
					keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
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
					.catch(() =>
						new Response("Offline status: Unable to obtain resources", {
							status: 503,
						})
					);
			})
		)
	);
});

self.addEventListener("message", async (event) => {
	const { action, url, enableNotifications } = event.data || {};

	if (action === "cache-url" && url) addToCacheIfNotExists(url);

	if (action === "clear-all-caches") clearAllCaches();

	if (action === "reset-unread") {
		unreadCount = 0;
		await setUnreadCount(unreadCount);
		updateAppBadge();
	}

	if (action === "toggle-notifications") await toggleNotifications(enableNotifications);

	if (action === "get-notification-status") {
		const enabled = await getNotificationsEnabled();
		const clients = await self.clients.matchAll();
		clients.forEach((client) =>
			client.postMessage({
				action: "notification-status",
				enabled,
			})
		);
	}
});

// ---------------- Push ----------------
self.addEventListener("push", async (event) => {
	const notificationsEnabled = await getNotificationsEnabled();
	if (!notificationsEnabled || Notification.permission !== "granted") return;

	const data = event.data?.json?.() || {};
	const { title = "New Notification", body = "", icon } = data.notification || {};

	unreadCount = await getUnreadCount();
	unreadCount += 1;
	await setUnreadCount(unreadCount);

	updateAppBadge();

	event.waitUntil(
		self.registration.showNotification(title, { body, icon })
	);
});
