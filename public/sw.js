const CACHE_NAME = 'counter-cache-v1';
const toCache = [
  '/',
  '/_next/static/*',   
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', event =>
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(toCache))
  )
);

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
    )
  );
});
