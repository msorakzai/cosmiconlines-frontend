"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/home/SearchBar";
import ProductGrid from "@/components/buyer/ProductGrid";
import { Product, API } from "@/lib/api";

// Temporary search function using API
async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data } = await API.get("/products/search", { params: { q: query } });
    return data;
  } catch (err) {
    console.warn("Search API failed", err);
    return [];
  }
}

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q") || ""; // ✅ null-safe

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl mb-5 text-gray-800">Search Products</h1>

      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
      />

      {loading && (
        <p className="text-center mt-8 text-gray-500">Searching for "{query}"...</p>
      )}
      {error && (
        <p className="text-center mt-8 text-red-500">{error}</p>
      )}
      {!loading && products.length === 0 && query.trim() && (
        <p className="text-center mt-8 text-gray-500">No products found for "{query}"</p>
      )}

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
