document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");
    const cartContainer = document.querySelector(".cart");
    const cartButton = document.getElementById("cart-button");

    // Open and Close Cart
    cartButton.addEventListener("click", function () {
        cartContainer.classList.toggle("open");
    });

    // Function to update the cart display
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ${item.price.toLocaleString()} IDR
                <button class="remove-item" data-index="${index}">✖</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            cart.push({ name, price });
            updateCart();
        });
    });

    // Place order (sends order via email)
    placeOrderButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        let orderDetails = cart.map(item => `${item.name} - ${item.price.toLocaleString()} IDR`).join("\n");
        let totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        let emailBody = `Order Details:\n\n${orderDetails}\n\nTotal: ${totalAmount.toLocaleString()} IDR`;

        window.location.href = `mailto:your-email@example.com?subject=Sea Clear Order&body=${encodeURIComponent(emailBody)}`;
    });
});
