const CACHE_NAME = "christian-app-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./book.html",
    "./icon.png",
    "./manifest.json"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    );
});