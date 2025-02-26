document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartButton = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");
    
    let cart = [];

    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name} - IDR ${item.price.toLocaleString()}</span>
                <button class="remove-item" data-index="${index}">X</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = `Total: IDR ${total.toLocaleString()}`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            cart.push({ name, price });
            updateCartDisplay();
        });
    });

    cartItemsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    cartButton.addEventListener("click", function () {
        cartSidebar.style.right = "0";
    });

    closeCartButton.addEventListener("click", function () {
        cartSidebar.style.right = "-300px";
    });

    placeOrderButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        
        const orderDetails = cart.map(item => `${item.name} - IDR ${item.price.toLocaleString()}`).join("\n");
        window.location.href = `mailto:your@email.com?subject=Sea Clear Order&body=${encodeURIComponent(orderDetails)}`;
    });
});
