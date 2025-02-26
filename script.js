let cart = [];

function addToCart(productName, price) {
    // Check if product is already in the cart
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(listItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderDetails = cart.map(item => `${item.name} x${item.quantity}`).join("\n");
    let emailBody = `Order details:\n${orderDetails}\n\nTotal: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
    
    window.location.href = `mailto:your-email@example.com?subject=Sea Clear Order&body=${encodeURIComponent(emailBody)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("place-order").addEventListener("click", placeOrder);
});
