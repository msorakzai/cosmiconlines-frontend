"use client";

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

export default function ProductList({ storeId }: { storeId: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();

      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
          ? data.products
          : [];

      const filtered = productList.filter((p: any) => p.storeId === storeId);
      setProducts(filtered);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [storeId]);

  return (
    <div className="space-y-8">
      <ProductForm storeId={storeId} onProductAdded={fetchProducts} />

      {loading ? (
        <div className="text-gray-500">🔄 Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">❌ No products found for this store.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-lg font-semibold text-blue-700">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500 mt-2">Price: Rs {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
