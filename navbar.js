window.addEventListener("scroll", function() {
    let navbar = document.querySelector(".navbar");
    let logo = document.querySelector(".nav-logo"); // Make sure this matches your logo class in HTML

    if (window.scrollY > 50) { 
        navbar.classList.add("scrolled");
        logo.style.opacity = "0";  // Hide the logo when scrolling
        logo.style.pointerEvents = "none";  // Prevent interaction
    } else {
        navbar.classList.remove("scrolled");
        logo.style.opacity = "1";  // Show the logo at the top
        logo.style.pointerEvents = "auto";
    }
});
