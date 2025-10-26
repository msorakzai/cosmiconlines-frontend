"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreManager() {
  const router = useRouter();
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    const savedRaw = localStorage.getItem("sellerStores");

    if (!sellerId || sellerId === "null" || sellerId === "") {
      alert("Seller ID missing. Please login again.");
      router.push("/seller/dashboard?tab=Welcome");
      return;
    }

    if (!savedRaw || savedRaw === "null") {
      alert("No store data found. Please create a store first.");
      router.push("/seller/dashboard?tab=Welcome");
      return;
    }

    try {
      const saved = JSON.parse(savedRaw);
      if (!Array.isArray(saved)) throw new Error("Invalid store data format");

      const filtered = saved.filter((store: any) => store?.ownerId === sellerId);
      setStores(filtered);
    } catch (err) {
      console.error("❌ Failed to parse sellerStores:", err);
      alert("Store data corrupted. Please recreate your store.");
      router.push("/seller/dashboard?tab=Welcome");
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🧮 Store Manager</h2>
      <p className="text-sm text-gray-600">
        Manage all your stores from one place. You can view, edit, or create new stores anytime.
      </p>

      {stores.length === 0 ? (
        <div className="text-center text-gray-600 py-10 space-y-4">
          <h3 className="text-xl font-semibold text-purple-700">👋 Welcome Cosmic Seller</h3>
          <p>
            You haven’t created any stores yet. Let’s build your first one step by step — category, model, branding, delivery, and more.
          </p>
          <button
            onClick={() => router.push("/seller/dashboard?tab=StoreCategory")}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            🚀 Start Building Your Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store, index) => (
            <div key={store.id || index} className="border rounded-lg p-4 bg-gray-50 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                {store.avatar && (
                  <img
                    src={store.avatar}
                    alt="Logo"
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-purple-700">{store.name}</h3>
                  <p className="text-xs text-gray-500">{store.email || "No email set"}</p>
                </div>
              </div>

              {store.tagline && (
                <p className="text-sm text-gray-700">{store.tagline}</p>
              )}

              <div className="text-xs text-gray-500 space-y-1">
                <p>Type: {store.storeType || "N/A"}</p>
                <p>Category: {store.category || "N/A"}</p>
                <p>
                  Subcategories:{" "}
                  {Array.isArray(store.subCategory)
                    ? store.subCategory.join(", ")
                    : store.subCategory || "N/A"}
                </p>
                <p>
                  Created:{" "}
                  {store.createdAt
                    ? new Date(store.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => router.push(`/seller/dashboard?tab=Preview&id=${store.id}`)}
                  className="text-sm text-purple-600 hover:underline"
                >
                  🔍 View
                </button>
                <button
                  onClick={() => router.push(`/seller/dashboard?tab=Edit&id=${store.id}`)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
