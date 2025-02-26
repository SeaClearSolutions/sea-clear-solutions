import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Open the sidebar when an item is added
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="relative min-h-screen bg-[#fffee1]">
      {/* Navigation Bar */}
      <nav className="bg-[#2dafa1] p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="border px-4 py-2 rounded-lg text-[#fffee1]">Shop</button>
          <button className="border px-4 py-2 rounded-lg text-[#fffee1]">About Us</button>
        </div>
        <button
          className="text-[#fffee1] p-2"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart size={24} />
        </button>
      </nav>

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#78e4e6] shadow-lg transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            className="mb-4 bg-[#2dafa1] text-white p-2 rounded"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <span>{item.name} - {item.price} IDR</span>
                <button
                  className="bg-[#2dafa1] text-white p-1 rounded"
                  onClick={() => removeFromCart(index)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Shop Section */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#237778]">Shop</h1>
        <div className="mt-4">
          <button
            className="bg-[#2dafa1] text-white px-4 py-2 rounded"
            onClick={() => addToCart({ name: "Sea Clear - 100ml", price: 268500 })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
