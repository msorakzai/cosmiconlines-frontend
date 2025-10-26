"use client";

import { useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";

interface AddToCartProps {
  productId: number;
  productName: string;
  price: number;
  imageUrl?: string;
  sellerId: string;
  sellerName: string;
  className?: string;
}

export default function AddToCart({
  productId,
  productName,
  price,
  imageUrl,
  sellerId,
  sellerName,
  className,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (!productId || !productName || !price || !sellerId || !sellerName) return;

    const item: CartItem = { productId, productName, price, quantity, imageUrl, sellerId, sellerName };
    addToCart(item);
    setQuantity(1);
  };

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <button
        onClick={handleAdd}
        className="flex-1 h-9 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 rounded-lg font-semibold text-sm text-center hover:opacity-90 transition-all flex items-center justify-center"
      >
        Add to Cart
      </button>

      <div className="ml-2 flex items-center gap-2 bg-white/10 px-2 rounded-md h-9">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="bg-transparent text-white px-2 rounded-md h-7 flex items-center justify-center"
        >
          -
        </button>
        <span className="min-w-[1.25rem] text-center text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="bg-transparent text-white px-2 rounded-md h-7 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
