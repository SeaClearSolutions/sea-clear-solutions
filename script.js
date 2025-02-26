import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Open sidebar when adding item
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex">
      {/* Sidebar Cart */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-[#78e4e6] p-4 transition-transform transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button onClick={() => setIsCartOpen(false)} className="text-white">✖</button>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span>{item}</span>
            <button onClick={() => removeFromCart(index)} className="bg-red-500 text-white px-2 py-1 rounded">✖</button>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed top-4 right-4 bg-[#34b2ae] p-2 rounded-full text-white"
      >
        <ShoppingCart size={24} />
      </button>

      {/* Shop Section */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Shop</h1>
        <button onClick={() => addToCart("Sea Clear - 100ml - 268,500 IDR")} className="mt-2 p-2 bg-[#34b2ae] text-white rounded">Add Sea Clear 100ml</button>
      </div>
    </div>
  );
};

export default Shop;
