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

// Export Scheme to Excel
// This function collects the form data and exports it to an Excel file.
function exportSchemeToExcel() {
  const schoolName = document.getElementById("school-name").value;
  const level = document.getElementById("school-level").value;
  const classOrForm = document.getElementById("class-or-form")?.value || '';
  const year = document.getElementById("year").value;
  const term = document.getElementById("term").value;
  const subject = document.getElementById("subject").value;

  const data = [
    ["School Name", "Level", "Class/Form", "Year", "Term", "Subject"],
    [schoolName, level, classOrForm, year, term, subject]
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Scheme of Work");

  XLSX.writeFile(workbook, `${schoolName || "scheme"}_${subject}_term${term}.xlsx`);
}
