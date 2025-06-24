// eduscheme/js/main.js

document.getElementById("theme-select").addEventListener("change", (e) => {
  const theme = e.target.value;
  document.body.setAttribute("data-theme", theme);
  // Future: Apply CSS themes here
});
