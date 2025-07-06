document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile nav menu when hamburger is clicked
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
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
