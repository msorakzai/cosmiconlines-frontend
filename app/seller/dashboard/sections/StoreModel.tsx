"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoreModel() {
  const router = useRouter();
  const [model, setModel] = useState(localStorage.getItem("storeModel") || "");
  const [inventory, setInventory] = useState(localStorage.getItem("storeInventory") || "");

  const handleNext = () => {
    if (!model) {
      alert("Please select a store type.");
      return;
    }
    if (!inventory) {
      alert("Please select inventory source.");
      return;
    }

    localStorage.setItem("storeModel", model);
    localStorage.setItem("storeInventory", inventory);
    router.push("/seller/dashboard-wizard?tab=Branding");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-purple-700">📦 Store Model & Inventory</h2>
      <p className="text-gray-600">Choose the type of store and how you will manage inventory.</p>

      {/* Store Type */}
      <div className="mt-4 space-y-2">
        <h3 className="font-medium">Store Type</h3>
        <div className="flex flex-col space-y-2">
          {["Physical", "Digital", "Hybrid"].map((type) => (
            <label
              key={type}
              className={`border p-4 rounded-lg cursor-pointer flex justify-between items-center ${
                model === type ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <span>{type}</span>
              <input
                type="radio"
                name="storeModel"
                value={type}
                checked={model === type}
                onChange={() => setModel(type)}
                className="accent-purple-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Inventory Source */}
      <div className="mt-4 space-y-2">
        <h3 className="font-medium">Inventory Source / Fulfillment</h3>
        <div className="flex flex-col space-y-2">
          {["Own Stock", "Dropshipping", "Mixed / Third-party"].map((source) => (
            <label
              key={source}
              className={`border p-4 rounded-lg cursor-pointer flex justify-between items-center ${
                inventory === source ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <span>{source}</span>
              <input
                type="radio"
                name="storeInventory"
                value={source}
                checked={inventory === source}
                onChange={() => setInventory(source)}
                className="accent-purple-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          🎨 Next: Store Branding
        </button>
      </div>
    </div>
  );
}
