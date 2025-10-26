"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const deliveryModels = ["In-House Delivery", "Third-Party Courier", "Hybrid Model"];

export default function StoreDelivery() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedModel = localStorage.getItem("storeDeliveryModel");
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  const handleNext = () => {
    if (!selectedModel) {
      alert("Please select a delivery model.");
      return;
    }
    setLoading(true);
    localStorage.setItem("storeDeliveryModel", selectedModel);
    setTimeout(() => {
      setLoading(false);
      router.push("/seller/dashboard?tab=Payment");
    }, 500);
  };

  const handleBack = () => {
    router.push("/seller/dashboard?tab=Shipping");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🚚 Delivery Model</h2>
      <p className="text-gray-600 text-sm">
        Select how you want to fulfill your orders: in-house, via third-party courier, or a hybrid model.
      </p>

      <div className="flex flex-col gap-3 mt-4">
        {deliveryModels.map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            className={`px-4 py-2 rounded border text-left ${
              selectedModel === model
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {model}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          ⬅️ Back
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}
