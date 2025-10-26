"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/buyer/AddToCart";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  rating?: number;
  sellerName?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col bg-white/10 backdrop-blur-xl border border-white/10 
                 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 
                 transition-all duration-300"
    >
      {/* 🔸 Product Badge */}
      {product.badge && (
        <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 
                         text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse z-10">
          {product.badge}
        </span>
      )}

      {/* 🖼️ Product Image */}
  <div className="relative w-full h-44 cursor-pointer group">
        <Image
          src={product.imageUrl || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 📄 Product Info */}
  <div className="p-3 flex flex-col flex-grow text-white">
        <h3 className="text-lg font-semibold mb-1 hover:text-orange-400 transition-colors cursor-pointer">
          {product.name}
        </h3>

        <p className="text-sm text-gray-400 mb-2">{product.category}</p>

        {/* ⭐ Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.round(product.rating ?? 0) ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
            <span className="ml-1 text-gray-300 text-xs">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* 🛒 Price + Seller */}
        <div className="text-lg font-bold text-orange-400 mb-1">
          Rs {product.price.toLocaleString()}
        </div>

        {product.sellerName && (
          <p className="text-xs text-gray-400 mb-4">
            👤 Seller: <span className="text-gray-200">{product.sellerName}</span>
          </p>
        )}

        {/* 🔘 Buttons */}
        <div className="mt-auto flex flex-col justify-start items-stretch gap-2 w-full">
          <Link
            href={`/products/${product.id}`}
            className="w-full text-sm bg-gradient-to-r from-orange-500 to-pink-500 
                       text-white px-3 py-1.5 rounded-lg font-semibold text-center 
                       hover:opacity-90 transition-all"
          >
            View Details
          </Link>

          <div className="w-full">
           <AddToCart
  productId={product.id}
  productName={product.name}
  price={product.price}
  sellerId={(product as any).sellerId || "unknown_seller"}
  sellerName={(product as any).sellerName || "Unknown Seller"}
  className="w-full"
/>


          </div>
        </div>
      </div>
    </motion.div>
  );
}
