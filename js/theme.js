// Light/dark theme toggle, shared by every page.
// Light is the default. The visitor's choice is remembered in the browser.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null; // storage can be unavailable (e.g. private mode)
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {
      // ignore: the theme still works for this visit
    }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var button = document.getElementById("theme-toggle");
    if (button) {
      button.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
  }

  // Apply right away (before the page paints) to avoid a flash of the wrong theme.
  apply(saved() === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    apply(root.getAttribute("data-theme"));
    if (button) {
      button.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        save(next);
      });
    }
  });
})();
