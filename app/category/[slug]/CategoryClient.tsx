"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/buyer/ProductGrid";
import { Product, fetchFeaturedProducts } from "@/lib/api";

export default function CategoryClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      const allProducts = await fetchFeaturedProducts();
      const filtered = allProducts.filter(
        p =>
          p.category.toLowerCase() ===
          decodeURIComponent(slug.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    };

    loadCategoryProducts();
  }, [slug]);

  const categoryName = decodeURIComponent(slug);

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>
        Category: {categoryName}
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "30px", color: "#999" }}>
          Loading products...
        </p>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "30px", color: "#999" }}>
          No products found in <strong>{categoryName}</strong>.
        </p>
      )}
    </main>
  );
}
