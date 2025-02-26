document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartButton = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} - ${item.price} IDR</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            cart.push({ name: productName, price: productPrice });
            updateCart();
            cartSidebar.classList.add("open"); // Open the cart sidebar when item is added
        });
    });

    cartButton.addEventListener("click", function () {
        cartSidebar.classList.toggle("open");
    });

    closeCartButton.addEventListener("click", function () {
        cartSidebar.classList.remove("open");
    });
});
