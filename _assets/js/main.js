(function() {
    'use strict';

    function registerServiceWorker() {

        if (!navigator.serviceWorker) {
            return;
        }

        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker: registered');
            }).catch(err => {
                console.log('Service Worker: registration failed ', err);
            });
    }

    registerServiceWorker();

})();
