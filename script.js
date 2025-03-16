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
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.marginBottom = "5px";

            let itemText = document.createElement("span");
            itemText.textContent = `${item.name} - ${item.price.toLocaleString()} IDR`;

            let controlsDiv = document.createElement("div");
            controlsDiv.style.display = "flex";
            controlsDiv.style.alignItems = "center";
            controlsDiv.style.gap = "5px"; // Adjust spacing for smaller buttons

            let minusBtn = document.createElement("button");
            minusBtn.textContent = "➖";
            minusBtn.classList.add("cart-button", "minus-item");
            minusBtn.dataset.index = index;

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `x${item.quantity}`;
            quantitySpan.style.minWidth = "20px";
            quantitySpan.style.textAlign = "center";

            let plusBtn = document.createElement("button");
            plusBtn.textContent = "➕";
            plusBtn.classList.add("cart-button", "plus-item");
            plusBtn.dataset.index = index;

            controlsDiv.appendChild(minusBtn);
            controlsDiv.appendChild(quantitySpan);
            controlsDiv.appendChild(plusBtn);

            li.appendChild(itemText);
            li.appendChild(controlsDiv);
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

    // Function to update item quantity
    function updateItemQuantity(event) {
        const button = event.target;
        const index = button.dataset.index;

        if (button.classList.contains("plus-item")) {
            cart[index].quantity += 1;
        } else if (button.classList.contains("minus-item")) {
            cart[index].quantity -= 1;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        }

        updateCart();
    }

    // Function to close cart
    function closeCart() {
        cartSidebar.classList.remove("open");
    }

    // Function to toggle cart when clicking inside
    function toggleCart(event) {
        if (!cartSidebar.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
            closeCart();
        } else {
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
    cartItemsList.addEventListener("click", updateItemQuantity);
    closeCartBtn.addEventListener("click", closeCart);
    placeOrderButton.addEventListener("click", placeOrder);
    document.addEventListener("click", toggleCart);
});
