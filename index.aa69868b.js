if (window.navigator && navigator.serviceWorker) navigator.serviceWorker.getRegistrations().then((registrations)=>{
    for (let registration of registrations)registration.unregister();
});

//# sourceMappingURL=index.aa69868b.js.map
