"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/buyer/ProductCard";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products"); // ✅ Corrected endpoint
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("✅ Products fetched:", data.products);
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        setProducts([]); // ✅ Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-orange-400">
          🛍️ Explore Our Products
        </h1>

        {loading ? (
          <p className="text-center text-sm text-gray-400">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-gray-400">No products available.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
