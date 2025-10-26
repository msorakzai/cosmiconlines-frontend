"use client";

import ProductForm from "../ProductForm";
import ProductList from "../ProductList";
import { useContext } from "react";
import { SellerContext } from "@/context/SellerContext";

export default function Products() {
  const { sellerId } = useContext(SellerContext); // ✅ Dynamic storeId from context

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-blue-700">📦 Manage Products</h1>
      <p className="text-sm text-gray-600">Add new products and manage your listings.</p>

      {/* ✅ Product creation form */}
      <ProductForm storeId={sellerId} />

      {/* ✅ Product listing */}
      <ProductList storeId={sellerId} />
    </div>
  );
}
