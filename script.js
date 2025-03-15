document.addEventListener("DOMContentLoaded", function () {
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");

    let cart = [];

    // Function to update cart UI
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price.toLocaleString()} IDR x${item.quantity}`;
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-item");
            removeBtn.dataset.index = index;
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;
    }

    // Function to add item to cart
    function addToCart(event) {
        const button = event.target;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
        cartSidebar.classList.add("open");
    }

    // Function to remove item from cart
    function removeFromCart(event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    }

    // Function to close cart when clicking outside
    function closeCart(event) {
        if (!cartSidebar.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
            cartSidebar.classList.remove("open");
        }
    }

    // Function to handle explicit cart closing (using X button)
    function closeCartButton() {
        cartSidebar.classList.remove("open");
    }

    // Function to open cart when clicking inside
    function openCart(event) {
        if (cartSidebar.contains(event.target)) {
            cartSidebar.classList.add("open");
        }
    }

    // Function to place order (send email)
    function placeOrder() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderDetails = cart.map(item => `${item.name} x${item.quantity}`).join("\n");
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        let mailtoLink = `mailto:your@email.com?subject=Order%20Request&body=${encodeURIComponent(`Order Details:\n${orderDetails}\n\nTotal: ${total.toLocaleString()} IDR`)}`;
        window.location.href = mailtoLink;
    }

    // Event listeners
    addToCartButtons.forEach(button => button.addEventListener("click", addToCart));
    cartItemsList.addEventListener("click", removeFromCart);
    closeCartBtn.addEventListener("click", closeCartButton); // Close when clicking the X button
    placeOrderButton.addEventListener("click", placeOrder);
    document.addEventListener("click", closeCart); // Close when clicking outside the cart
    cartSidebar.addEventListener("click", openCart); // Keep open when clicking inside
});
