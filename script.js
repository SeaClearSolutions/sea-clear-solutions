document.addEventListener("DOMContentLoaded", function () {
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");

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

    // Function to close cart when clicking outside
    function handleOutsideClick(event) {
        if (!cartSidebar.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
            closeCart();
        }
    }

    // Function to open cart when clicking inside it
    function openCart(event) {
        event.stopPropagation(); // Prevents closing when clicking inside
        cartSidebar.classList.add("open");
    }

    // Function to place order
    function placeOrder(event) {
        event.preventDefault(); // Prevent default form submission

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Save cart in localStorage for checkout page
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to checkout page
        window.location.href = "checkout.html";
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
        placeOrderButton.addEventListener("click", placeOrder);
    }

    document.addEventListener("click", handleOutsideClick);

    // Allow clicking inside the cart to open it
    cartSidebar.addEventListener("click", openCart);

    // Initialize cart on page load
    updateCart();
});
