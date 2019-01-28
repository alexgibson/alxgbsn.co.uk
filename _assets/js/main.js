function registerServiceWorker() {

    if (!navigator.serviceWorker) {
        return;
    }

    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker: registered'); // eslint-disable-line no-console
    }).catch(err => {
        console.log('Service Worker: registration failed ', err); // eslint-disable-line no-console
    });
}

function isCSSVariablesSupported() {
    return window.CSS && window.CSS.supports('color', 'var(--fake-color');
}

function changeTheme(e) {
    const id = e.target.value;
    const isDark = id === 't-dark' ? true : false;

    if (isDark) {
        document.documentElement.classList.add('js-t-dark');
    } else {
        document.documentElement.classList.remove('js-t-dark');
    }

    try {
        sessionStorage.setItem('t-dark', isDark);
    } catch(e) {
        // do nothing.
    }
}

function prefersDarkTheme() {
    try {
        const currentPref = sessionStorage.getItem('t-dark');

        if (currentPref === 'true' || (currentPref !== 'false' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }
}

function initThemeSelector() {
    const themeSelector = document.querySelector('.theme-selector');
    const themeToggle = themeSelector.querySelectorAll('.theme-form input[type="radio"]');

    if (prefersDarkTheme()) {
        document.getElementById('t-dark').checked = true;
        document.documentElement.classList.add('js-t-dark');
    }

    themeToggle.forEach((toggle) => {
        toggle.addEventListener('click', changeTheme);
    });

    // show the theme selector.
    themeSelector.classList.remove('hidden');
}

if (isCSSVariablesSupported()) {
    initThemeSelector();
}

registerServiceWorker();
