document.addEventListener("DOMContentLoaded", () => {
    const openCartButton = document.getElementById("open-cart");
    const closeCartButton = document.getElementById("close-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    let cartItems = [];

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            total += item.price;

            const itemElement = document.createElement("li");
            itemElement.innerHTML = `
                ${item.name} - ${item.price.toLocaleString()} IDR
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceElement.textContent = `Total: ${total.toLocaleString()} IDR`;

        // Add event listeners for remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                updateCartUI();
            });
        });
    }

    function openCart() {
        cartSidebar.classList.add("open"); // Show sidebar
    }

    function closeCart() {
        cartSidebar.classList.remove("open"); // Hide sidebar
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-name");
            const productPrice = parseInt(e.target.getAttribute("data-price"));

            if (!productName || isNaN(productPrice)) {
                console.error("Error: Pr
