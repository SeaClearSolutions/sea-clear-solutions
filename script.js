document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartButton = document.getElementById("cart-button");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartItemsContainer = document.getElementById("cart-items");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                ${item.name} - ${item.price} IDR
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    function toggleCart(open) {
        if (open) {
            cartSidebar.classList.add("open");
        } else {
            cartSidebar.classList.remove("open");
        }
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.dataset.name;
            let price = this.dataset.price;
            cart.push({ name, price });
            updateCartDisplay();
            toggleCart(true); // Open cart when item is added
        });
    });

    cartButton.addEventListener("click", function () {
        cartSidebar.classList.toggle("open");
    });

    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });
});
