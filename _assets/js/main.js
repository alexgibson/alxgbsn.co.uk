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

function updateRadioInput(id) {
    if (id) {
        document.getElementById(id).checked = true;
    }
}

function initThemeSelector() {
    const themeSelector = document.querySelector('.theme-selector');
    const themeToggle = themeSelector.querySelectorAll('.theme-form input[type="radio"]');
    const prefersDarkColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeLightId = 't-light';
    const themeDarkId = 't-dark';

    if (prefersDarkColorScheme) {
        updateRadioInput(themeDarkId);
    } else {
        updateRadioInput(themeLightId);
    }

    themeToggle.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            const id = e.target.value;

            if (id === themeDarkId) {
                document.documentElement.classList.remove(themeLightId);
                document.documentElement.classList.add(themeDarkId);
            } else {
                document.documentElement.classList.remove(themeDarkId);
                document.documentElement.classList.add(themeLightId);
            }

            updateRadioInput(id);
        });
    });

    themeSelector.classList.remove('hidden');
}

initThemeSelector();
registerServiceWorker();
