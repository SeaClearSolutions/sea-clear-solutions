import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  { id: 1, name: "Sea Clear - 500ml", price: 250000, description: "Perfect for dive shops and avid divers.", image: "seaclear.png" },
  { id: 2, name: "Sea Clear - 250ml", price: 180000, description: "Great for frequent divers who need a reliable solution.", image: "seaclear.png" },
  { id: 3, name: "Sea Clear - 100ml", price: 120000, description: "A compact size for personal use.", image: "seaclear.png" },
  { id: 4, name: "Sea Clear - 60ml", price: 161000, description: "Fits right into your dive bag! Ideal for regular but light use.", image: "seaclear.png" },
  { id: 5, name: "Sea Clear - 20ml", price: 53500, description: "Small but mighty! The perfect travel-size defog solution.", image: "seaclear.png" },
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#34b2ae] p-4 text-[#fffee1] fixed h-full right-0">
        <button
          className="w-full bg-[#237778] text-[#fffee1] p-2 rounded-md flex items-center justify-center"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart className="mr-2" /> Open Cart
        </button>
        {isCartOpen && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between my-2">
                    {item.name} x{item.quantity}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="font-bold mt-4">Total: IDR {totalAmount.toLocaleString()}</p>
            <button className="w-full bg-[#237778] text-[#fffee1] p-2 rounded-md mt-2">
              Place Order
            </button>
          </div>
        )}
      </div>

      {/* Main Shop Section */}
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold text-[#237778]">Shop</h1>
        <p className="text-[#237778]">Choose the perfect size for your adventures! Each bottle of <strong>Sea Clear</strong> is biodegradable and made with natural ingredients to keep your mask fog-free.</p>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg text-center bg-[#fffee1]">
              <img src={product.image} alt={product.name} className="mx-auto w-20 h-20" />
              <h2 className="text-lg font-bold text-[#237778]">{product.name}</h2>
              <p className="text-[#237778]">{product.description}</p>
              <p className="text-[#237778] font-bold">IDR {product.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-[#237778] text-[#fffee1] px-4 py-2 rounded-md mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
