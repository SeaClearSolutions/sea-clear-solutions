document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile nav menu when hamburger is clicked
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents closing immediately
    mobileNav.classList.toggle("show");
  });

  // Close mobile nav when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      mobileNav.classList.contains("show") &&
      !mobileNav.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      mobileNav.classList.remove("show");
    }
  });

  // Add .scrolled class on scroll to navbar and mobileNav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      if (mobileNav) mobileNav.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
      if (mobileNav) mobileNav.classList.remove("scrolled");
    }
  });
});
