/**
 * service-worker.js — Rongmon's World offline support
 * Cache-first strategy: serve from cache, update in background.
 */

const CACHE = 'rongmon-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './games/rongmon-data.js',
  './games/rongmon-audio.js',
  './games/jungle-rescue.html',
  './games/flood-mission.html',
  './games/bihu-cookoff.html',
  './games/animal-detective.html',
  './games/map-warrior.html',
  './games/tea-garden.html',
  './games/number-adventure.html',
  './dashboard/parent-dashboard.html',
  './dashboard/trophy-room.html',
];

// Install: pre-cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback to network
self.addEventListener('fetch', e => {
  // Only handle same-origin requests
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
