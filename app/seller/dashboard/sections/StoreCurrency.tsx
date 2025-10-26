"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const supportedCurrencies = ["PKR", "USD", "EUR", "GBP", "INR", "AED"];

export default function StoreCurrency() {
  const router = useRouter();

  const [defaultCurrency, setDefaultCurrency] = useState("PKR");
  const [multiCurrency, setMultiCurrency] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load from localStorage if wizard already started
    const savedDefault = localStorage.getItem("storeDefaultCurrency");
    const savedMulti = localStorage.getItem("storeMultiCurrency");
    if (savedDefault) setDefaultCurrency(savedDefault);
    if (savedMulti) setMultiCurrency(JSON.parse(savedMulti));
  }, []);

  const handleNext = () => {
    if (loading) return;

    if (!defaultCurrency) {
      alert("Default currency is required.");
      return;
    }

    setLoading(true);

    // Save to localStorage for wizard continuity
    localStorage.setItem("storeDefaultCurrency", defaultCurrency);
    localStorage.setItem("storeMultiCurrency", JSON.stringify(multiCurrency));

    // Simulate save delay
    setTimeout(() => {
      setLoading(false);
      // Move to next wizard step: Shipping
      router.push("/seller/dashboard?tab=Shipping");
    }, 500);
  };

  const toggleCurrency = (currency: string) => {
    setMultiCurrency((prev) =>
      prev.includes(currency)
        ? prev.filter((c) => c !== currency)
        : [...prev, currency]
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">💱 Store Currency Setup</h2>
      <p className="text-gray-600 text-sm">
        Select your default currency and optionally enable multiple currencies for your store.
      </p>

      {/* Default Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Default Currency *</label>
        <select
          value={defaultCurrency}
          onChange={(e) => setDefaultCurrency(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {supportedCurrencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Multi-Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Enable Additional Currencies</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {supportedCurrencies.map((cur) => (
            <button
              key={cur}
              onClick={() => toggleCurrency(cur)}
              className={`px-3 py-1 rounded border ${
                multiCurrency.includes(cur)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => router.push("/seller/dashboard?tab=Contact")}
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
