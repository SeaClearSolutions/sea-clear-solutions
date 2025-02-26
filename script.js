import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Open sidebar when item is added
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        className="fixed top-4 right-4 bg-[#237778] text-[#fffee1] p-2 rounded-full shadow-lg"
        onClick={toggleCart}
      >
        <FaShoppingCart size={24} />
      </button>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-[#fffee1] shadow-lg p-4 transform transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-2 right-2 bg-[#237778] text-[#fffee1] p-2 rounded"
          onClick={toggleCart}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{item.name} - {item.price} IDR</span>
            <button
              className="bg-[#237778] text-[#fffee1] p-1 rounded"
              onClick={() => removeFromCart(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Shop Items */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Shop</h1>
        <div>
          <button
            className="bg-[#237778] text-[#fffee1] p-2 rounded"
            onClick={() => addToCart({ name: "Sea Clear - 100ml", price: 268500 })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
