window.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".navbar");
    let logo = document.querySelector(".nav-logo");
    let menuToggle = document.getElementById("menu-toggle");
    let navbarLinks = document.querySelector(".navbar-links");

    // Scroll behavior for navbar
    window.addEventListener("scroll", function () {
        console.log("Scrolling...", window.scrollY); // Debugging

        if (window.scrollY > 50) { 
            navbar.classList.add("scrolled");
            logo.style.opacity = "0";  // Hide the logo when scrolling
            logo.style.pointerEvents = "none";  // Prevent interaction
        } else {
            navbar.classList.remove("scrolled");
            logo.style.opacity = "1";  // Show the logo at the top
        }
    });

    // Mobile menu toggle
    if (menuToggle && navbarLinks) {
        menuToggle.addEventListener("click", function () {
            navbarLinks.classList.toggle("active");
        });
    }
});
