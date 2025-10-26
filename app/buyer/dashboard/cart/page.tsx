'use client';

import { useState, useMemo } from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuyerCartPage() {
  const router = useRouter();

  // 🧩 Temporary demo data (replace with API later)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Noise Cancelling Headphones',
      price: 1999,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2016/11/29/12/54/headphones-1868612_1280.jpg',
    },
    {
      id: 2,
      name: 'Smartwatch Series 7',
      price: 3499,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/smart-watch-2003991_1280.jpg',
    },
  ]);

  // 🧮 Calculate subtotal
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // ➕ Increase qty
  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ➖ Decrease qty
  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 🗑 Remove item
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🚀 Proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/buyer/dashboard/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">Your cart is empty.</p>
          <p className="text-sm mt-2">Add items to your cart to proceed with checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧾 Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md border"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-indigo-600 font-medium">Rs {item.price.toLocaleString()}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-2 border rounded hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-2 border rounded hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-2">
                  <p className="font-semibold text-gray-700">
                    Rs {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💳 Summary */}
          <div className="bg-white rounded-xl border shadow-sm p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
