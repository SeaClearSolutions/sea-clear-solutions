document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartSidebar = document.getElementById("cart-sidebar");
    const openCartBtn = document.getElementById("open-cart");
    const closeCartBtn = document.getElementById("close-cart");

    // Open cart when clicking the sidebar
    cartSidebar.addEventListener("click", () => {
        cartSidebar.classList.add("open");
    });

    // Open cart button functionality
    openCartBtn.addEventListener("click", () => {
        cartSidebar.classList.add("open");
    });

    // Close cart button functionality (prevent reopening when clicking close)
    closeCartBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents sidebar from reopening when clicking close
        cartSidebar.classList.remove("open");
    });

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.quantity} x ${item.price.toLocaleString()} IDR `;

            // Remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-from-cart");
            removeBtn.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cartItems.splice(index, 1);
                }
                updateCart();
            });

            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.dataset.name;
            const price = parseInt(event.target.dataset.price, 10);

            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            updateCart();
            cartSidebar.classList.add("open"); // Open cart when item is added
        });
    });

    document.getElementById("place-order").addEventListener("click", () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderText = "New Order:\n\n";
        cartItems.forEach(item => {
            orderText += `${item.name} - ${item.quantity} x ${item.price.toLocaleString()} IDR\n`;
        });

        orderText += `\nTotal: ${totalPriceElement.textContent.replace("Total: ", "")}`;

        window.location.href = `mailto:your@email.com?subject=Order&body=${encodeURIComponent(orderText)}`;
    });
});
