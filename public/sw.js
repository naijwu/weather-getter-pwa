// Create cache (cache is the browser's storage)
const CACHE_NAME = 'version-1';
const cacheAssets = [
    'index.html',
    'offline.html', // an offline version of page
];

const self = this;

// 1. installation
self.addEventListener('install', (e) => {
    // (arrow function activated after event is called)
    e.waitUntil( // (wait until caches opens - 'caches.open')
        caches.open(CACHE_NAME)
          .then((cache) => {
              console.log('Service Worker: Opened cache');
              return cache.addAll(cacheAssets);
          })
    )
})

// 2. listen for requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request) // respond to requests w/ a request
          .then(() => {
              return fetch(e.request)
                .catch(() => caches.match('offline.html')) // if there is no response then return a cached page
          })
    )
})

// 3. activate service worker
self.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName); // delete all caches that are not in cache whitelist
                }
            })
        ))
    )
})