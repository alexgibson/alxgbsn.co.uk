function registerServiceWorker(){navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js").then(()=>{console.log("Service Worker: registered")})["catch"](e=>{console.log("Service Worker: registration failed ",e)})}function updateRadioInput(e){e&&(document.getElementById(e).checked=!0)}function initThemeSelector(){const e=document.querySelector(".theme-selector"),t=e.querySelectorAll('.theme-form input[type="radio"]'),r="t-light",o="t-dark";updateRadioInput(window.matchMedia("(prefers-color-scheme: dark)").matches?o:r),t.forEach(e=>{e.addEventListener("click",e=>{const t=e.target.value;t===o?(document.documentElement.classList.remove(r),document.documentElement.classList.add(o)):(document.documentElement.classList.remove(o),document.documentElement.classList.add(r)),updateRadioInput(t)})}),e.classList.remove("hidden")}initThemeSelector(),registerServiceWorker();