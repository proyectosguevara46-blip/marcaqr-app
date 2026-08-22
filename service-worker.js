const CACHE_NAME = "marcaqr-v1";

const archivos = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icono-marcaqr.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
