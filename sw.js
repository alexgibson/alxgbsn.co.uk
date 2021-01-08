const version = '20210108132616';
const cacheName = `static::${version}`;


function updateStaticCache() {
    return caches.open(cacheName).then(cache => {
        return cache.addAll([
            
            '/assets/styles-b020b9a8f36b2ad2ac9fc0251b6c30724d4853bf8bda326059ac8dec0bbf3cfb.css',
            '/assets/theme-77026091a174da81bd4e08d59206f16043046cb6f5d13d856dfc667c7d57987b.js',
            '/assets/main-e720254e216df6f38df9183d48fc5096b498cf7aa00bfdf57bf8aa71c31a7980.js',
            '/assets/avatar-180-b1f192dbbe4ceec9c13c327fb0908af5ddbf621002116885f0cc2e8d8b6787c8.jpg',
            '/assets/moon-534f836c46e20dbb5fe8c00cd108cad912550c41e63a3fa3ec1b7e0ff6d8603b.svg',
            '/assets/moon-dark-1648cc3096172f7578f4ec30271cd1258b127bca184b437affa00b029aa8bbb7.svg',
            '/offline/'
            
        ]);
    });
}



function clearOldCache() {
    return caches.keys().then(keys => {
        // Remove caches whose name is no longer valid.
        return Promise.all(keys
            .filter(key => {
                return key !== cacheName;
            })
            .map(key => {
                console.log(`Service Worker: removing cache ${key}`);
                return caches.delete(key);
            })
        );
    });
}

self.addEventListener('install', event => {
    event.waitUntil(updateStaticCache().then(() => {
        console.log(`Service Worker: cache updated to version: ${cacheName}`);
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

