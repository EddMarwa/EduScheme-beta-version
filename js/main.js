// main.js

// Handle panel switching
const tabs = document.querySelectorAll(".sidebar nav li");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.panel).classList.add("active");
  });
});

// Handle theme switching
const themeSelect = document.getElementById("theme-select");

function applyTheme(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.body.setAttribute("data-theme", theme);
  }
}

themeSelect.addEventListener("change", (e) => {
  applyTheme(e.target.value);
});

// Initial theme setup
window.addEventListener("DOMContentLoaded", () => {
  applyTheme(themeSelect.value);
});
