// ========== Panel Navigation ==========
function switchPanel(panelId) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.remove("active");
  });
  document.getElementById(panelId).classList.add("active");
}

// ========== Theme Toggle ==========
const themeSelect = document.getElementById("theme-select");
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

function applyTheme(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.body.setAttribute("data-theme", theme);
  }
}

// ========== Populate Year Dropdown ==========
const yearDropdown = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
  const option = document.createElement("option");
  option.value = currentYear - i;
  option.textContent = currentYear - i;
  yearDropdown.appendChild(option);
}

// ========== Handle School Level Selection ==========
document.getElementById("school-level").addEventListener("change", function () {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  const selectedLevel = this.value;

  const select = document.createElement("select");
  select.classList.add("form-select");

  if (selectedLevel === "primary") {
    select.id = "class";
    for (let i = 1; i <= 8; i++) {
      const option = document.createElement("option");
      option.value = `Class ${i}`;
      option.textContent = `Class ${i}`;
      select.appendChild(option);
    }
  } else if (selectedLevel === "secondary") {
    select.id = "form";
    ["Form 1", "Form 2", "Form 3", "Form 4"].forEach((f) => {
      const option = document.createElement("option");
      option.value = f;
      option.textContent = f;
      select.appendChild(option);
    });
  }
  levelContainer.appendChild(select);
});

// ========== Form Handlers ==========
document.getElementById("scheme-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Scheme saved!");
});

document.getElementById("lesson-plan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Lesson plan saved!");
});

document.getElementById("settings-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Settings updated successfully.");
});

function handleLogout() {
  alert("Logged out. Redirect to login or clear session here.");
  // window.location.href = "login.html";
}