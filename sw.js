---
---


const version = '{{site.time | date: '%Y%m%d%H%M%S'}}';
const cacheName = `static::${version}`;

function updateStaticCache() {
    return caches.open(cacheName)
        .then(function(cache) {
            return Promise.all(
                [
                    '{{ assets['styles.scss'].digest_path }}',
                    '{{ assets['main.js'].digest_path }}',
                    '{{ assets['avatar-180.png'].digest_path }}',
                    '/offline/'
                ].map(function(url) {
                    // Cache-bust using a random query string.
                    return fetch(`${url}?${Math.random()}`).then(function(response) {
                        // Fail on 404, 500 etc.
                        if (!response.ok) {
                            throw Error(`Service Worker: failed to add to cache: ${url}`);
                        }
                        return cache.put(url, response);
                    })
                })
            )
        }
    );
}

function clearOldCache() {
    return caches.keys().then(function(keys) {
        // Remove caches whose name is no longer valid.
        return Promise.all(keys
            .filter(function(key) {
                return key !== cacheName;
            })
            .map(function(key) {
                console.log(`Service Worker: removing cache ${key}`);
                return caches.delete(key);
            })
        );
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(updateStaticCache().then(function() {
        console.log(`Service Worker: cache updated to version: ${cacheName}`);
    }));
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', function(event) {
    let request = event.request;
    let url = new URL(request.url);

    // Only deal with requests from the same domain.
    if (url.origin !== location.origin) {
        return;
    }

    // Always fetch non-GET requests from the network.
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // For HTML requests, try the network first else fall back to the offline page.
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        event.respondWith(
            fetch(request).catch(function() {
                return caches.match('/offline/');
            })
        );
        return;
    }

    // For non-HTML requests, look in the cache first else fall back to the network.
    event.respondWith(
        caches.match(request)
            .then(function(response) {
                if (response) {
                    console.log('Serving cached: ', event.request.url);
                    return response;
                }
                console.log('Fetching: ', event.request.url);
                return fetch(request)
            })
    );
});
