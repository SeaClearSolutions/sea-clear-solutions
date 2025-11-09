document.addEventListener("DOMContentLoaded", function () {
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");
    const checkoutForm = document.getElementById("checkout-form");
    const orderDetailsInput = document.getElementById("order-details");
    const clearCartButton = document.getElementById("clear-cart"); // ✅ Add this line

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderDetailsText = "";
    let isWholesale = localStorage.getItem("isWholesale") === "true";

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
            let displayedPrice = isWholesale ? getWholesalePrice(item.name, item.price) : item.price;
            itemText.textContent = `${item.name} - ${displayedPrice.toLocaleString()} IDR`;


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

            total += displayedPrice * item.quantity;
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
            orderDetailsInput.value = orderDetailsText;
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
    
    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            if (confirm("Are you sure you want to clear the cart?")) {
                cart = [];
                localStorage.removeItem("cart");
                updateCart();
                updateCheckoutPage(); // Update checkout if on that page
            }
        });
    }

    function getWholesalePrice(name, originalPrice) {
    if (name.includes("30ml")) return 55000;
    if (name.includes("60ml")) return 85000;
    if (name.includes("100ml")) return 115000;
    if (name.includes("250ml")) return 235000;
    if (name.includes("500ml")) return 300000;
    if (name.includes("1L")) return 600000;
    if (name.includes("5L")) return 2500000;
    return originalPrice;
}
    
  function updateShopPrices() {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    const name = btn.dataset.name;
    // Note: btn.dataset.price may already be changed by shop.html, but parseInt to be safe
    const originalPrice = parseInt(btn.dataset.price) || parseInt(btn.dataset.originalPrice) || 0;
    const newPrice = isWholesale ? getWholesalePrice(name, originalPrice) : originalPrice;
    // Update button dataset so addToCart reads correct price
    btn.dataset.price = newPrice;

    // Update visible price element in the product card
    const priceDisplay = btn.closest(".product")?.querySelector(".product-price");
    if (priceDisplay) {
      priceDisplay.textContent = `${newPrice.toLocaleString()} IDR`;
      // keep the data attribute in sync for other code that may read it
      priceDisplay.dataset.currentPrice = newPrice;
    }
  });
}
    
    document.addEventListener("click", handleOutsideClick);
    cartSidebar.addEventListener("click", toggleCart);

    // When shop's discount button is clicked, refresh wholesale state and UI.
    // (Shop page already validates codes and sets localStorage.isWholesale.)
    const applyDiscountBtn = document.getElementById("apply-discount-btn");
    if (applyDiscountBtn) {
      applyDiscountBtn.addEventListener("click", function () {
        // small timeout to allow shop.html handler to run first
        setTimeout(() => {
          isWholesale = localStorage.getItem("isWholesale") === "true";
          updateShopPrices();
          updateCart();
        }, 10);
      });
    }

    // Initialize cart on page load
    updateCart();
   
    if (isWholesale) {
    updateShopPrices();
    }

});
