const CACHE_NAME = "bandhutrackr-v1";
const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const isDev = self.location.hostname === "localhost";

const staticAssets = ["/", "/index.html", "/icon.webp"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  if (isDev) console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        if (isDev) console.log("Caching static assets");
        return cache.addAll(staticAssets);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        if (isDev) console.error("Failed to cache static assets:", error);
      })
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  if (isDev) console.log("Service Worker activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              if (isDev) console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network first strategy for HTML documents
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => response || caches.match("/index.html"));
        })
    );
    return;
  }

  // Cache first strategy for static assets
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          // Only cache successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, responseToCache));

          return response;
        });
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        throw error;
      })
  );
});
