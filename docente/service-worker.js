const CACHE_NAME = "marcaqr-docente-v3";

const archivos = [
  "./",
  "./index.html",
  "./manifest.json",
  "../icono-marcaqr-192.png",
  "../icono-marcaqr-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(archivos);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copia = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, copia);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
