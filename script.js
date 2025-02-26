document.addEventListener("DOMContentLoaded", () => {
    const cart = document.getElementById("cart");
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCartButton = document.getElementById("closeCart");
    const cartItemsContainer = document.getElementById("cartItems");

    let cartItems = [];

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span>${item.name} - ${item.price} IDR</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                updateCartUI();
            });
        });
    }

    function openCart() {
        cartSidebar.classList.add("open"); // Show sidebar
    }

    function closeCart() {
        cartSidebar.classList.remove("open"); // Hide sidebar
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productElement = e.target.closest(".product");
            const productName = productElement.querySelector(".product-name").innerText;
            const productPrice = productElement.querySelector(".product-price").innerText;

            cartItems.push({ name: productName, price: productPrice });
            updateCartUI();
            openCart(); // Automatically open sidebar
        });
    });

    cart.addEventListener("click", openCart);
    closeCartButton.addEventListener("click", closeCart);
});
