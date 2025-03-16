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

            let itemText = document.createElement("span");
            itemText.textContent = `${item.name} - ${item.price.toLocaleString()} IDR x${item.quantity}`;

            let minusBtn = document.createElement("button");
            minusBtn.textContent = "➖";
            minusBtn.classList.add("minus-item");
            minusBtn.dataset.index = index;

            let plusBtn = document.createElement("button");
            plusBtn.textContent = "➕";
            plusBtn.classList.add("plus-item");
            plusBtn.dataset.index = index;

            li.appendChild(itemText);
            li.appendChild(minusBtn);
            li.appendChild(plusBtn);
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

    // Function to increase quantity
    function increaseQuantity(event) {
        const index = event.target.dataset.index;
        cart[index].quantity += 1;
        updateCart();
    }

    // Function to decrease quantity (removes item if it reaches zero)
    function decreaseQuantity(event) {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }
        updateCart();
    }

    // Function to close cart
    function closeCart() {
        cartSidebar.classList.remove("open");
    }

    // Function to close cart when clicking outside
    function handleOutsideClick(event) {
        if (!cartSidebar.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
            closeCart();
        }
    }

    // Function to open cart when clicking inside
    function handleInsideClick(event) {
        if (cartSidebar.contains(event.target)) {
            cartSidebar.classList.add("open");
            event.stopPropagation(); // Prevent closing when clicking inside
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
    cartItemsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("plus-item")) {
            increaseQuantity(event);
        } else if (event.target.classList.contains("minus-item")) {
            decreaseQuantity(event);
        }
    });
    closeCartBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        closeCart();
    });
    placeOrderButton.addEventListener("click", placeOrder);
    document.addEventListener("click", handleOutsideClick);
    cartSidebar.addEventListener("click", handleInsideClick);
});
