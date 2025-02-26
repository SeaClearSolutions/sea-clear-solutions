document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart");
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

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                updateCartUI();
            });
        });
    }

    function openCart() {
        console.log("Opening cart..."); // Debugging
        cartSidebar.classList.add("open"); // Show sidebar
    }

    function closeCart() {
        console.log("Closing cart..."); // Debugging
        cartSidebar.classList.remove("open"); // Hide sidebar
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            console.log("Adding to cart..."); // Debugging

            const productElement = e.target.closest(".product");
            if (!productElement) {
                console.error("Product element not found!");
                return;
            }

            const productName = productElement.querySelector(".product-name")?.innerText;
            const productPrice = productElement.querySelector(".product-price")?.innerText;

            if (!productName || !productPrice) {
                console.error("Product name or price not found!");
                return;
            }

            cartItems.push({ name: productName, price: productPrice });
            updateCartUI();
            openCart();
        });
    });

    if (cartButton) {
        cartButton.addEventListener("click", openCart);
    } else {
        console.error("Cart button not found!");
    }

    if (closeCartButton) {
        closeCartButton.addEventListener("click", closeCart);
    } else {
        console.error("Close cart button not found!");
    }
});
