(function() {
    'use strict';

    function registerServiceWorker() {

        if (!navigator.serviceWorker) {
            return;
        }

        navigator.serviceWorker.register('/sw.js')
            .then(() => {
                console.log('Service Worker: registered'); // eslint-disable-line no-console
            }).catch(err => {
                console.log('Service Worker: registration failed ', err); // eslint-disable-line no-console
            });
    }

    registerServiceWorker();

})();
