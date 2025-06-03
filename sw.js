/**release 2.5.5*/
const CACHE_NAME = "xv9vTzhBP",
	CACHE_FILES = [
		"/",
		"/index.html",
		"/style.css",
		"/script.js",
		"/manifest.json",
		"/assets/icon.png",
		"/assets/logo.png",
	];
self.addEventListener("install", (t) => {
	self.skipWaiting(),
		t.waitUntil(caches.open(CACHE_NAME).then((t) => t.addAll(CACHE_FILES)));
}),
	self.addEventListener("activate", (t) => {
		t.waitUntil(
			caches
				.keys()
				.then((t) =>
					Promise.all(
						t.map((t) => {
							if (t !== CACHE_NAME)
								return console.log(`舊緩存已清除：${t}`), caches.delete(t);
						})
					)
				)
				.then(() => {
					self.clients.claim();
				})
		);
	}),
	self.addEventListener("fetch", (t) => {
		"GET" === t.request.method &&
			new URL(t.request.url).protocol.startsWith("http") &&
			t.respondWith(
				caches.open(CACHE_NAME).then((e) =>
					e.match(t.request).then((n) => {
						let s = fetch(t.request)
							.then((n) => (n.ok && e.put(t.request, n.clone()), n))
							.catch(() => n);
						return n || s;
					})
				)
			);
	});
