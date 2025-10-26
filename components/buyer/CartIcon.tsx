"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="relative no-underline">
      <svg
        className="w-6 h-6 text-gray-800 hover:text-yellow-500 transition"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
