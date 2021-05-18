// sw.js - Service Worker
// Code from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          './',
          './index.html',
          './style.css',
          './scripts/script.js',
          './scripts/router.js',
          './components/entry-page.js',
          './components/journal-entry.js',
        ]);
      })
    );
  });

self.addEventListener('fetch', (event) => {
event.respondWith(
    caches.match(event.request).then((resp) => {
    return resp || fetch(event.request).then((response) => {
        return caches.open('v1').then((cache) => {
        cache.put(event.request, response.clone());
        return response;
        });
    });
    })
);
});

self.addEventListener('activate', (event) => {
var cacheKeeplist = ['v2'];

event.waitUntil(
    caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
        return caches.delete(key);
        }
    }));
    })
);
});