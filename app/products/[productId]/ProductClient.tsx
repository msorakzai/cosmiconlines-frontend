"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import AddToCart from "@/components/buyer/AddToCart";
import ProductTabs from "@/components/buyer/ProductTabs";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";

export default function ProductClient({ productId }: { productId: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
  if (!productId) return;
  const found = products.find((p) => p.id === productId);
  setProduct(found || null);
}, [productId]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-300">
        <p className="text-lg">⚠️ Product not found.</p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-14 px-6 text-white"
    >
      {/* 🔸 Product Overview */}
      {/* ... (your full layout remains unchanged) */}
      {/* 🔹 Product Tabs */}
      {/* 🔸 Related Products */}
    </motion.div>
  );
}
