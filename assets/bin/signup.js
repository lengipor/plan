const themeToggle = document.getElementById("themeToggle");
const themeOptions = ["auto", "light", "dark"];
let currentThemeIndex = 0;

function applyTheme(theme) {
    const icon = themeToggle.querySelector("i");
    const label = themeToggle.querySelector("span");

    if (theme === "auto") {
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour < 6;
        document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light");
        icon.className = "bi bi-circle-half";
        label.textContent = "ស្វ័យប្រវត្តិ";
    } else if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        icon.className = "bi bi-moon-stars";
        label.textContent = "ពេលយប់";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        icon.className = "bi bi-sun-fill";
        label.textContent = "ពេលថ្ងៃ";
    }
}

function loadTheme() {
    const saved = localStorage.getItem("theme-mode") || "auto";
    currentThemeIndex = themeOptions.indexOf(saved);
    applyTheme(saved);
}

themeToggle.addEventListener("click", () => {
    currentThemeIndex = (currentThemeIndex + 1) % themeOptions.length;
    const newTheme = themeOptions[currentThemeIndex];
    applyTheme(newTheme);
    localStorage.setItem("theme-mode", newTheme);
});

// React to system preference changes
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
prefersDark.addEventListener("change", () => {
    if (localStorage.getItem("theme-mode") === "auto") {
        applyTheme("auto");
    }
});

loadTheme();