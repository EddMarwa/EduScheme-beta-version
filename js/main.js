// main.js

// Panel switching
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

// Theme toggling
const themeSelect = document.getElementById("theme-select");
function applyTheme(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.body.setAttribute("data-theme", theme);
  }
}
themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
window.addEventListener("DOMContentLoaded", () => {
  applyTheme(themeSelect.value);
  populateYears();
});

// Populate Academic Year dropdown
function populateYears() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 10; i--) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    yearSelect.appendChild(opt);
  }
}

// Conditional class/form fields based on school level
const schoolLevel = document.getElementById("school-level");
const levelOptions = document.getElementById("level-options");

schoolLevel.addEventListener("change", function () {
  levelOptions.innerHTML = "";
  levelOptions.style.display = "block";

  let label = document.createElement("label");
  let select = document.createElement("select");
  select.name = "levelClass";
  select.required = true;

  if (this.value === "primary") {
    label.textContent = "Select Class";
    select.id = "primary-class";
    for (let i = 1; i <= 8; i++) {
      let opt = document.createElement("option");
      opt.value = `class${i}`;
      opt.textContent = `Class ${i}`;
      select.appendChild(opt);
    }
  } else if (this.value === "secondary") {
    label.textContent = "Select Form";
    select.id = "secondary-form";
    for (let i = 1; i <= 4; i++) {
      let opt = document.createElement("option");
      opt.value = `form${i}`;
      opt.textContent = `Form ${i}`;
      select.appendChild(opt);
    }
  } else {
    levelOptions.style.display = "none";
    return;
  }

  levelOptions.appendChild(label);
  levelOptions.appendChild(select);
});

// Handle Create Scheme form submit
const schemeForm = document.getElementById("scheme-form");
schemeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Scheme saved! (Further processing can be added here)");
});
