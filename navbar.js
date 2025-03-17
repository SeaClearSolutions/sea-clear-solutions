window.addEventListener("DOMContentLoaded", function() {
    let nav = document.querySelector("nav");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav.classList.add("scrolling"); // Add class when scrolling down
        } else {
            nav.classList.remove("scrolling"); // Remove class when at the top
        }
    });
});
