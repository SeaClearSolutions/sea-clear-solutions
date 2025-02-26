document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartButton = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    let cart = [];

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.price.toLocaleString()} IDR <button class="remove-item" data-index="${index}">×</button>`;
            cartItemsList.appendChild(li);
            total += item.price;
        });
        
        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            cart.push({ name, price });
            updateCart();
            cartSidebar.classList.add("open"); // Auto-open cart when item is added
        });
    });

    cartItemsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    cartButton.addEventListener("click", function () {
        cartSidebar.classList.toggle("open");
    });

    closeCartButton.addEventListener("click", function () {
        cartSidebar.classList.remove("open");
    });
});
