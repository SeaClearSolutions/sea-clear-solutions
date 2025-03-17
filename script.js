document.addEventListener("DOMContentLoaded", function () {
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");
    const checkoutForm = document.getElementById("checkout-form");
    const orderDetailsInput = document.getElementById("order-details");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
            controlsDiv.style.gap = "8px";

            let minusSpan = document.createElement("span");
            minusSpan.textContent = "−";
            minusSpan.classList.add("minus-item");
            minusSpan.dataset.index = index;
            minusSpan.style.color = "#237778";
            minusSpan.style.fontSize = "22px";
            minusSpan.style.cursor = "pointer";

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `x${item.quantity}`;
            quantitySpan.style.minWidth = "25px";
            quantitySpan.style.textAlign = "center";
            quantitySpan.style.fontSize = "18px";

            let plusSpan = document.createElement("span");
            plusSpan.textContent = "+";
            plusSpan.classList.add("plus-item");
            plusSpan.dataset.index = index;
            plusSpan.style.color = "#237778";
            plusSpan.style.fontSize = "22px";
            plusSpan.style.cursor = "pointer";

            controlsDiv.appendChild(minusSpan);
            controlsDiv.appendChild(quantitySpan);
            controlsDiv.appendChild(plusSpan);

            li.appendChild(itemText);
            li.appendChild(controlsDiv);
            cartItemsList.appendChild(li);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
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
        event.stopPropagation();
        const index = event.target.dataset.index;
        cart[index].quantity += 1;
        updateCart();
    }

    // Function to decrease quantity (removes item if it reaches zero)
    function decreaseQuantity(event) {
        event.stopPropagation();
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }

    // Function to close cart
    function closeCart() {
        cartSidebar.classList.remove("open");
    }

    // Function to toggle cart when clicking inside it
    function toggleCart(event) {
        event.stopPropagation(); // Prevents the cart from closing
        cartSidebar.classList.add("open");
    }

    // Function to close cart when clicking outside
    function handleOutsideClick(event) {
        if (!cartSidebar.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
            closeCart();
        }
    }

    // Function to handle checkout page
    function updateCheckoutPage() {
        const cartSummaryList = document.getElementById("cart-summary-list");
        const cartTotalElement = document.getElementById("cart-total");

        let orderDetailsText = ""; // Initialize order details text

        if (!cartSummaryList) return; // Stop if not on checkout page

        if (cart.length === 0) {
            cartSummaryList.innerHTML = "<p>Your cart is empty.</p>";
            orderDetailsInput.value = "No items in cart.";
        } else {
            let total = 0;
            cartSummaryList.innerHTML = ""; 

            cart.forEach((item) => {
                let li = document.createElement("li");
                li.textContent = `${item.name} - ${item.quantity} x ${item.price.toLocaleString()} IDR`;
                cartSummaryList.appendChild(li);

                orderDetailsText += `${item.name} - ${item.quantity} x ${item.price} IDR\n`;
                total += item.price * item.quantity;
            });

            cartTotalElement.textContent = `Total: ${total.toLocaleString()} IDR`;
            orderDetailsText += `Total: ${total.toLocaleString()} IDR`;
            orderDetailsInput.value = orderDetailsText;
        }
    }

    // Prevent empty orders from being submitted
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (event) {
            if (cart.length === 0) {
                alert("Your cart is empty. Please add items before placing an order.");
                event.preventDefault();
                return;
            }
            localStorage.removeItem("cart"); // Clear cart after order
        });
        updateCheckoutPage();
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

    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", function (event) {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                event.preventDefault();
            } else {
                window.location.href = "checkout.html";
            }
        });
    }

    document.addEventListener("click", handleOutsideClick);
    cartSidebar.addEventListener("click", toggleCart);

    // Initialize cart on page load
    updateCart();
});
