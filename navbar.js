window.addEventListener("scroll", function() {
    let logo = document.querySelector(".nav-logo");

    if (window.scrollY > 50) {
        logo.style.opacity = "0";  // Hide the logo when scrolling
        logo.style.pointerEvents = "none";  // Prevent interaction
    } else {
        logo.style.opacity = "1";  // Show the logo at the top
        logo.style.pointerEvents = "auto";
    }
});
