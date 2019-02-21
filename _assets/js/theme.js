function isCSSVariablesSupported() {
    return window.CSS && window.CSS.supports('color', 'var(--fake-color');
}

function changeTheme(e) {
    const isDark = e.target.checked ? true : false;

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

function toggleDarkTheme(dark) {
    const themeToggle = document.getElementById('theme');

    if (dark) {
        themeToggle.checked = true;
        document.documentElement.classList.add('js-t-dark');
    } else {
        themeToggle.checked = false;
        document.documentElement.classList.remove('js-t-dark');
    }

    try {
        sessionStorage.setItem('t-dark', dark);
    } catch(e) {
        // do nothing.
    }
}

function initThemeSelector() {
    const themeSelector = document.querySelector('.theme-selector');
    const themeToggle = document.getElementById('theme');
    const mqPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkTheme()) {
        toggleDarkTheme(true);
    }

    themeToggle.addEventListener('click', changeTheme);

    mqPrefersDarkTheme.addListener((mq) => {
        toggleDarkTheme(mq.matches);
    });

    // show the theme selector.
    themeSelector.classList.remove('hidden');
}

function init() {
    if (isCSSVariablesSupported()) {
        initThemeSelector();
    }
}

init();
