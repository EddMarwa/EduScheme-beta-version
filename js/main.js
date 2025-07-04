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

// Demo: Populate dashboard values
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("eduscheme_user"));
  if (user?.name) document.getElementById("user-greeting").innerText = user.name;

  const demoBalance = localStorage.getItem("wallet_balance") || "254.00";
  document.getElementById("dash-balance").innerText = demoBalance;

  document.getElementById("schemes-count").innerText = "5";
  document.getElementById("recent-scheme").innerText = "Form 2 - Biology (Term 2)";
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
// Preview Scheme
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scheme-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop form reload

    const schoolName = document.getElementById("school-name").value;
    const level = document.getElementById("school-level").value;
    const classOrForm = document.getElementById("class-or-form")?.value || '';
    const year = document.getElementById("year").value;
    const term = document.getElementById("term").value;
    const subject = document.getElementById("subject").value;

    const previewHTML = `
      <p><strong>School:</strong> ${schoolName}</p>
      <p><strong>Level:</strong> ${level}</p>
      <p><strong>Class/Form:</strong> ${classOrForm}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Term:</strong> ${term}</p>
      <p><strong>Subject:</strong> ${subject}</p>
    `;

    document.getElementById("preview-content").innerHTML = previewHTML;
  });
});
// EduScheme - Auto Save Form Data
// This script automatically saves form data to localStorage and restores it on page load.
// LocalStorage Key
const FORM_STORAGE_KEY = "eduscheme_draft";

// Save inputs automatically on change
function autoSaveForm() {
  const formData = {
    schoolName: document.getElementById("school-name").value,
    level: document.getElementById("school-level").value,
    classOrForm: document.getElementById("class-or-form")?.value || '',
    year: document.getElementById("year").value,
    term: document.getElementById("term").value,
    subject: document.getElementById("subject").value
  };

  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

// Load and fill form on page load
function restoreFormData() {
  const saved = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
  if (!saved) return;

  document.getElementById("school-name").value = saved.schoolName || "";
  document.getElementById("school-level").value = saved.level || "";

  // Trigger the form selector to populate class/form
  if (saved.level) {
    document.getElementById("school-level").dispatchEvent(new Event("change"));
    setTimeout(() => {
      const select = document.getElementById("class-or-form");
      if (select) select.value = saved.classOrForm;
    }, 100); // wait for form options to load
  }

  document.getElementById("year").value = saved.year || "";
  document.getElementById("term").value = saved.term || "";
  document.getElementById("subject").value = saved.subject || "";
}

// Listen to all inputs for autosave
function initAutoSaveListeners() {
  const inputs = [
    "school-name",
    "school-level",
    "year",
    "term",
    "subject"
  ];

  inputs.forEach(id => {
    document.getElementById(id).addEventListener("change", autoSaveForm);
  });

  document.addEventListener("change", () => {
    const select = document.getElementById("class-or-form");
    if (select) {
      select.addEventListener("change", autoSaveForm);
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  restoreFormData();
  initAutoSaveListeners();
});
// Reset Scheme Form
// This function clears the form and localStorage, prompting the user for confirmation.
function resetSchemeForm() {
  if (confirm("Are you sure you want to clear the saved form data?")) {
    localStorage.removeItem("eduscheme_draft");
    document.getElementById("scheme-form").reset();
    document.getElementById("preview-content").innerHTML = "";
    document.getElementById("level-container").innerHTML = "";
    alert("✅ Form reset successfully.");
  }
}
// Reset the form and preview
document.getElementById("scheme-form").addEventListener("reset", function () { 
  document.getElementById("preview-content").innerHTML = "";
  document.getElementById("level-container").innerHTML = "";
  localStorage.removeItem("eduscheme_draft"); // Clear saved data
  alert("✅ Form reset successfully.");
});
// LESSON PLAN FORM: preview and export
document.getElementById("lesson-plan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("lp-subject").value;
  const topic = document.getElementById("lp-topic").value;
  const objectives = document.getElementById("lp-objectives").value;
  const activities = document.getElementById("lp-activities").value;

  const preview = `
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Topic:</strong> ${topic}</p>
    <p><strong>Objectives:</strong><br>${objectives.replace(/\n/g, "<br>")}</p>
    <p><strong>Activities:</strong><br>${activities.replace(/\n/g, "<br>")}</p>
  `;
  document.getElementById("lp-preview-content").innerHTML = preview;
});

// Export Lesson Plan to Excel
function exportLessonPlanToExcel() {
  const subject = document.getElementById("lp-subject").value;
  const topic = document.getElementById("lp-topic").value;
  const objectives = document.getElementById("lp-objectives").value;
  const activities = document.getElementById("lp-activities").value;

  const data = [
    ["Subject", "Topic", "Objectives", "Activities"],
    [subject, topic, objectives, activities]
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Lesson Plan");

  XLSX.writeFile(wb, `${subject}_Lesson_Plan.xlsx`);
}


// AI TOOL FORM: preview and mock response
document.getElementById("ai-tool-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("tool-type").value;
  const subject = document.getElementById("tool-subject").value;
  const topic = document.getElementById("tool-topic").value;

  let mockResponse = "";

  switch (type) {
    case "notes":
      mockResponse = `<h4>Generated Notes</h4><p><strong>Topic:</strong> ${topic}<br>Here are structured notes on ${topic} in ${subject}...</p>`;
      break;
    case "slides":
      mockResponse = `<h4>Generated Slides Outline</h4><ul><li>Slide 1: Introduction to ${topic}</li><li>Slide 2: Key Concepts</li><li>Slide 3: Summary</li></ul>`;
      break;
    case "exams":
      mockResponse = `<h4>Sample Exam Questions</h4><ol><li>Define ${topic}.</li><li>Explain its importance in ${subject}.</li></ol>`;
      break;
    case "summary":
      mockResponse = `<h4>Topic Summary</h4><p><strong>${topic}</strong> is a fundamental concept in ${subject} that covers...</p>`;
      break;
    default:
      mockResponse = `<p>No tool selected.</p>`;
  }

  document.getElementById("ai-preview-content").innerHTML = mockResponse;
});

document.getElementById("settings-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("setting-name").value;
  const email = document.getElementById("setting-email").value;
  const role = document.getElementById("setting-role").value;
  const password = document.getElementById("setting-password").value;

  // Save user data locally (for now)
  const profile = { name, email, role };
  localStorage.setItem("eduscheme_user", JSON.stringify(profile));

  alert("✅ Profile updated successfully.");
});

// Load saved user data into the form
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("eduscheme_user"));
  if (saved) {
    document.getElementById("setting-name").value = saved.name || "";
    document.getElementById("setting-email").value = saved.email || "";
    document.getElementById("setting-role").value = saved.role || "Teacher";
  }
});

// Log out user
function logoutUser() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("eduscheme_user");
    window.location.reload();
  }
}



