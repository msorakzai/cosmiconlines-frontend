"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { marketplaceCategories } from "./storeCategoryData"; // alag file me rakha ho

export default function StoreCategory() {
  const router = useRouter();

  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mainCategory) {
      setAvailableSubCategories(marketplaceCategories[mainCategory] || []);
      setSubCategories([]); // reset sub-categories when main changes
    }
  }, [mainCategory]);

  const handleNext = () => {
    if (!mainCategory) {
      alert("Please select a main category.");
      return;
    }

    if (subCategories.length === 0) {
      alert("Please select at least one sub-category.");
      return;
    }

    setLoading(true);

    // Save to localStorage for wizard
    localStorage.setItem("storeMainCategory", mainCategory);
    localStorage.setItem("storeSubCategories", JSON.stringify(subCategories));

    // Optional: Backend sync here

    setTimeout(() => {
      setLoading(false);
      router.push("/seller/dashboard?tab=Details"); // next step
    }, 500);
  };

  const toggleSubCategory = (sub: string) => {
    setSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🧭 Store Category</h2>
      <p className="text-gray-600 text-sm">
        Select your main store category and the relevant sub-categories. AI suggestions will guide you.
      </p>

      {/* Main Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Main Category *</label>
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Main Category</option>
          {Object.keys(marketplaceCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-categories */}
      {mainCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Sub-Categories *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableSubCategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => toggleSubCategory(sub)}
                className={`px-3 py-1 rounded border font-medium text-sm ${
                  subCategories.includes(sub)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Guidance Placeholder */}
      {mainCategory && (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4 text-gray-700 text-sm">
          🤖 AI Suggestion: Choose sub-categories that best match your store's products.
        </div>
      )}

      {/* Next Button */}
      <div className="pt-4 text-right">
        <button
          onClick={handleNext}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "➡️ Next"}
        </button>
      </div>
    </div>
  );
}
