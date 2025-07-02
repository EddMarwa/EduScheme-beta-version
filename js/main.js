// Navigation
function switchPanel(panelId) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.remove("active");
  });
  document.getElementById(panelId).classList.add("active");
}

// Theme Toggle
document.getElementById("theme-select").addEventListener("change", (e) => {
  const theme = e.target.value;
  if (theme === "system") {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.body.setAttribute('data-theme', theme);
  }
});

// Populate Year
const yearDropdown = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
  let option = document.createElement("option");
  option.value = currentYear - i;
  option.text = currentYear - i;
  yearDropdown.appendChild(option);
}

// Handle Level to Class/Form
document.getElementById("school-level").addEventListener("change", function () {
  const container = document.getElementById("level-container");
  container.innerHTML = "";
  let select = document.createElement("select");
  select.id = "class-or-form";

  if (this.value === "primary") {
    for (let i = 1; i <= 8; i++) {
      let opt = document.createElement("option");
      opt.value = `Class ${i}`;
      opt.text = `Class ${i}`;
      select.appendChild(opt);
    }
  } else if (this.value === "secondary") {
    ["Form 1", "Form 2", "Form 3", "Form 4"].forEach((f) => {
      let opt = document.createElement("option");
      opt.value = f;
      opt.text = f;
      select.appendChild(opt);
    });
  }

  container.appendChild(select);
});

// Dummy submit handler
document.getElementById("scheme-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Scheme saved!");
});
