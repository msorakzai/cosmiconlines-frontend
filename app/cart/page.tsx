"use client";

import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-300">
        <p className="text-lg">🛒 Your Cart is empty</p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 text-white grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-6">
        {items.map((item) => (
          <motion.div
            key={item.productId}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-5 bg-white/10 border border-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-md"
          >
            {/* Image */}
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Img</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold">{item.productName}</h3>
              <p className="text-orange-400 font-bold">
                Rs {item.price.toLocaleString()}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                  }
                  className="bg-white/20 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="bg-white/20 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-400 hover:text-red-300 transition"
            >
              <Trash2 size={22} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-lg backdrop-blur-md">
        <h2 className="text-xl font-bold text-orange-400 mb-4">Order Summary</h2>
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>Rs {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>Rs 150</span>
        </div>
        <div className="flex justify-between text-gray-300 font-bold text-lg">
          <span>Total</span>
          <span>Rs {(total + 150).toLocaleString()}</span>
        </div>

        {/* ✅ Proceed to Checkout */}
        <button
          onClick={() => router.push("/checkout")}
          className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={clearCart}
          className="mt-2 text-orange-400 underline hover:text-orange-300"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
