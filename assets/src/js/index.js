// Select the theme toggle buttons
const themeToggles = document.querySelectorAll("#themeToggle, #mobileThemeToggle");
// Define the available theme options
const themeOptions = ["auto", "light", "dark"];
let currentThemeIndex = 0; // Track current theme index for cycling

// Apply the selected theme
function applyTheme(theme) {
    themeToggles.forEach((toggle) => {
        const icon = toggle.querySelector("i");
        const label = toggle.querySelector("span");

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
    });
}

// Load the saved theme from localStorage
function loadTheme() {
    const saved = localStorage.getItem("theme-mode") || "auto";
    currentThemeIndex = themeOptions.indexOf(saved);
    applyTheme(saved);
}

// Set up click event to cycle through themes
themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        currentThemeIndex = (currentThemeIndex + 1) % themeOptions.length;
        const newTheme = themeOptions[currentThemeIndex];
        applyTheme(newTheme);
        localStorage.setItem("theme-mode", newTheme); // Save choice
    });
});

// Automatically update theme if system preference changes (only in auto mode)
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
prefersDark.addEventListener("change", () => {
    if (localStorage.getItem("theme-mode") === "auto") {
        applyTheme("auto");
    }
});

// Apply theme on initial load
loadTheme();

// ================= Scrollspy ==================

// Get all sections and navigation links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Highlight the nav link corresponding to the current scroll position
function onScroll() {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 110; // Offset for fixed header
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

// Set scrollspy behavior on scroll and page load
window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

// ============= Hamburger Menu for Mobile ==============

// Get hamburger button and mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle the mobile menu visibility on hamburger click
hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", mobileMenu.classList.contains("active"));
    hamburger.querySelector("i").className = mobileMenu.classList.contains("active")
        ? "bi bi-x"
        : "bi bi-list";
});

// Close mobile menu when clicking a nav link or theme toggle
document
    .querySelectorAll(".navbar-nav-2 .nav-link, .navbar-nav-2 .mobile-mode-toggle")
    .forEach((item) => {
        item.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.querySelector("i").className = "bi bi-list";
        });
    });

// Close mobile menu when clicking outside of it
document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.querySelector("i").className = "bi bi-list";
    }
});

// ========== Placeholder Navigation Functions ==========

// Navigate to login page
function Login_Item() {
    window.location.href = "assets/bin/login.html";
}

// Navigate to signup page
function Signs_() {
    window.location.href = "assets/bin/signup.html";
}
