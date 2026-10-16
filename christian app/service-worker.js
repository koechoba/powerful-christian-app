const CACHE_NAME = "christian-life-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/widget-card.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// Fetch / offline support
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Windows Widget installed
self.addEventListener("widgetinstall", event => {
  console.log("Christian Life widget installed:", event.widgetDefinition?.tag);
});

// Windows Widget resumed
self.addEventListener("widgetresume", event => {
  console.log("Christian Life widget resumed:", event.widgetDefinition?.tag);
});

// Windows Widget clicked
self.addEventListener("widgetclick", event => {
  console.log("Christian Life widget clicked:", event.widgetDefinition?.tag);
});