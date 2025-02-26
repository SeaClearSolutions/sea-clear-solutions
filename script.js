<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea Clear - Shop</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <nav class="navbar">
        <button class="nav-button">About Us</button>
        <button class="nav-button">Shop</button>
        <button class="nav-button">Contact Us</button>
    </nav>
    
    <div class="cart-sidebar">
        <button class="cart-toggle" onclick="toggleCart()">
            <img src="cart-icon.png" alt="Cart">
        </button>
        <div class="cart-content">
            <h2>Shopping Cart</h2>
            <ul id="cart-items"></ul>
            <button onclick="placeOrder()">Place Order</button>
        </div>
    </div>
    
    <main>
        <section class="shop">
            <h1>Shop</h1>
            <p>Choose the perfect size for your adventures! Each bottle of <strong>Sea Clear</strong> is reef-friendly, biodegradable, and made with natural ingredients to keep your mask fog-free.</p>
            <div class="products">
                <div class="product">
                    <img src="product-100ml.png" alt="Sea Clear 100ml">
                    <p>Sea Clear - 100ml</p>
                    <p>268,500 IDR</p>
                    <button onclick="addToCart('Sea Clear - 100ml', 268500)">Add to Cart</button>
                </div>
                <div class="product">
                    <img src="product-50ml.png" alt="Sea Clear 50ml">
                    <p>Sea Clear - 50ml</p>
                    <p>182,500 IDR</p>
                    <button onclick="addToCart('Sea Clear - 50ml', 182500)">Add to Cart</button>
                </div>
                <div class="product">
                    <img src="product-27ml.png" alt="Sea Clear 27ml">
                    <p>Sea Clear - 27ml</p>
                    <p>72,500 IDR</p>
                    <button onclick="addToCart('Sea Clear - 27ml', 72500)">Add to Cart</button>
                </div>
            </div>
        </section>
    </main>
</body>
</html>
