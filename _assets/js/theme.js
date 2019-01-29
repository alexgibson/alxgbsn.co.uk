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

function toggleDarkTheme(dark) {

    if (dark) {
        document.getElementById('t-dark').checked = true;
        document.documentElement.classList.add('js-t-dark');
    } else {
        document.getElementById('t-light').checked = true;
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
    const themeToggle = themeSelector.querySelectorAll('.theme-form input[type="radio"]');
    const mqPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkTheme()) {
        toggleDarkTheme(true);
    }

    themeToggle.forEach((toggle) => {
        toggle.addEventListener('click', changeTheme);
    });

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
