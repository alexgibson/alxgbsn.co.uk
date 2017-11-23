const version = '1.0.0';

function updateStaticCache() {
    return caches.open(`static-${version}`)
        .then(cache => Promise.all(
                [
                '/css/styles.css',
                '/js/main.js',
                '/images/avatar-180.png',
                '/offline/'
            ].map(url => {
                // Cache-bust using a random query string.
                return fetch(`${url}?${Math.random()}`).then(response => {
                    // Fail on 404, 500 etc.
                    if (!response.ok) {
                        throw Error(`Service Worker: failed to add to cache: ${url}`);
                    }
                    return cache.put(url, response);
                })
            })
        )
    );
}

function clearOldCache() {
    return caches.keys().then(keys => {
        // Remove caches whose name is no longer valid.
        return Promise.all(keys
            .filter(key => key.indexOf(version) === -1)
            .map(key => {
                console.log(`Service Worker: removing cache ${key}`);
                return caches.delete(key);
            })
        );
    });
}

self.addEventListener('install', event =>  {
    event.waitUntil(updateStaticCache().then(() => {
        console.log(`Service Worker: cache updated to version: ${version}`);
    }));
});

self.addEventListener('activate', event => {
    event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', event => {
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
            fetch(request).catch(() => caches.match('/offline/'))
        );
        return;
    }

    // For non-HTML requests, look in the cache first else fall back to the network.
    event.respondWith(
        caches.match(request)
            .then(response => {
                if (response) {
                    console.log('Serving cached: ', event.request.url);
                    return response;
                }
                console.log('Fetching: ', event.request.url);
                return fetch(request)
            })
    );
});
