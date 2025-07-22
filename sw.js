/**release 0.1.5*/
const CACHE_NAME = "xy5ScVwZ3";
const PRECACHE_URLS = [
	"/",
	"/index.html",
	"/style.css",
	"/script.js",
	"/manifest.json",
	"/assets/icon.png",
	"/assets/logo.png",
];

// --- 工具函数 ---
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
			console.log(`已緩存：${url}`);
		} else {
			console.warn(`獲取失敗：${url}`);
		}
	} else {
		console.log(`已存在緩存：${url}`);
	}
}

async function clearAllCaches() {
	const keys = await caches.keys();
	await Promise.all(keys.map((key) => caches.delete(key)));
	console.log("所有緩存已清除");
}

// --- 安裝：預緩存靜態資源 ---
self.addEventListener("install", (event) => {
	self.skipWaiting();
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
	);
});

// --- 激活：清除舊版本緩存 ---
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== CACHE_NAME) // 删除非当前版本的缓存
						.map((key) => {
							console.log(`清除舊緩存：${key}`);
							return caches.delete(key);
						})
				)
			)
			.then(() => self.clients.claim())
	);
});

// --- 抓取：自動緩存 & 返回緩存或網路 ---
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
					.catch(() => new Response("離線狀態：無法取得資源", { status: 503 }));
			})
		)
	);
});

// --- 接收來自頁面的消息：添加或清除資源 ---
self.addEventListener("message", (event) => {
	const { action, url } = event.data || {};

	if (action === "cache-url" && url) {
		addToCacheIfNotExists(url);
	}

	if (action === "clear-all-caches") {
		clearAllCaches();
	}
});
