"use client";

import { Product } from "@/lib/api";
import AddToCart from "@/components/buyer/AddToCart";
import SellerCTA from "@/components/buyer/SellerCTA";

interface ProductGridProps {
  products: Product[];
  onClickProduct?: (product: Product) => void;
  theme?: "cosmic" | "minimal" | "seasonal";
  sellerName?: string;
  sellerId?: string;
}

export default function ProductGrid({
  products,
  onClickProduct,
  theme = "minimal",
  sellerName,
  sellerId,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No products available in this store.
      </p>
    );
  }

  const themeStyles = {
    cosmic: "bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-indigo-500",
    minimal: "bg-white text-gray-800 border-gray-200",
    seasonal: "bg-gradient-to-br from-orange-100 to-yellow-100 text-orange-900 border-orange-300",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onClickProduct?.(product)}
          className={`rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer border ${themeStyles[theme]}`}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-3 rounded"
            />
          )}
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-base font-semibold mt-1">Rs {product.price}</p>

          {/* 🏷️ Seller Badge */}
          {sellerName && (
            <div className="mt-2 text-xs text-gray-400">
              Sold by{" "}
              <span className="font-medium text-indigo-500">{sellerName}</span>
            </div>
          )}

          {/* 🛒 Add to Cart */}
          <div className="mt-4">
            <AddToCart
             productId={Number(product.id)}

              productName={product.name}
              price={product.price}
              imageUrl={product.image}
              sellerId={sellerId ?? "unknown"}
              sellerName={sellerName ?? "Seller"}
              className="w-full"
            />
          </div>

          {/* 💬 Contact Seller CTA */}
          <div className="mt-2">
            <SellerCTA sellerName={sellerName ?? "Seller"} />
          </div>
        </div>
      ))}
    </div>
  );
}
