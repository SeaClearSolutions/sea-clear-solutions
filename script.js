document.addEventListener("click", function (event) {
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartContainer = document.querySelector(".cart-container");

    // If clicked inside the cart, don't close it
    if (cartContainer.contains(event.target)) {
        return;
    }

    // If clicked outside the cart, close it
    if (!cartSidebar.contains(event.target)) {
        cartSidebar.classList.remove("active");
    }
});
