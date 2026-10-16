document.addEventListener("DOMContentLoaded", function () {
  console.log("Powerful Christian App loaded.");

  // Smooth scrolling for nav links
  const links = document.querySelectorAll("nav a[href^='#']");
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Service worker registration (PWA support)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function () {
          console.log("Service Worker registered successfully");
        })
        .catch(function (error) {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
});
