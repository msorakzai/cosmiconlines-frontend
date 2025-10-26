"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type StorePaymentProps = {
  storeId?: string; // ✅ optional so build won’t break
};

const paymentMethodsByCountry: Record<string, string[]> = {
  PK: ["JazzCash", "Easypaisa", "Bank Transfer"],
  IN: ["UPI", "Paytm", "Razorpay"],
  US: ["ACH", "PayPal", "Stripe"],
  GB: ["Faster Payments", "PayPal"],
  AE: ["PayBy", "Bank Transfer"],
  NG: ["Flutterwave", "Paystack"],
  GLOBAL: ["Stripe", "PayPal"],
};

const cryptoFields = ["BTC", "ETH", "USDT", "BNB", "SOL"];

export default function StorePayment({ storeId }: StorePaymentProps) {
  const router = useRouter();
  const [country, setCountry] = useState("PK");
  const [localMethods, setLocalMethods] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [cryptoWallets, setCryptoWallets] = useState<Record<string, string>>({});
  const [defaultMethod, setDefaultMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem("storeCountry");
      const savedSelected = localStorage.getItem("storePaymentMethods");
      const savedWallets = localStorage.getItem("storeCryptoWallets");
      const savedDefault = localStorage.getItem("storeDefaultPaymentMethod");

      if (savedCountry) setCountry(savedCountry);
      if (savedSelected) setSelectedMethods(JSON.parse(savedSelected));
      if (savedWallets) setCryptoWallets(JSON.parse(savedWallets));
      if (savedDefault) setDefaultMethod(savedDefault);
    } catch (err) {
      console.error("Error loading saved payment data:", err);
    }
  }, []);

  // Update local methods when country changes
  useEffect(() => {
    const methods = paymentMethodsByCountry[country] || paymentMethodsByCountry["GLOBAL"];
    setLocalMethods(methods);
  }, [country]);

  const toggleMethod = (method: string) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleNext = () => {
    if (!selectedMethods.length) {
      alert("Select at least one payment method.");
      return;
    }

    setLoading(true);

    // Save locally
    localStorage.setItem("storeCountry", country);
    localStorage.setItem("storePaymentMethods", JSON.stringify(selectedMethods));
    localStorage.setItem("storeCryptoWallets", JSON.stringify(cryptoWallets));
    localStorage.setItem("storeDefaultPaymentMethod", defaultMethod);

    // Simulate save & go next
    setTimeout(() => {
      setLoading(false);
      router.push("/seller/dashboard?tab=Wallet");
    }, 500);
  };

  const handleBack = () => {
    router.push("/seller/dashboard?tab=Delivery");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">
        💰 Payment Setup {storeId ? `(Store: ${storeId})` : ""}
      </h2>
      <p className="text-gray-600 text-sm">
        Select your local and crypto payment methods for receiving payments.
      </p>

      {/* Country */}
      <div>
        <label className="text-sm font-medium text-gray-700">🌍 Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          {Object.keys(paymentMethodsByCountry).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Local Payment Methods */}
      <div>
        <label className="text-sm font-medium text-gray-700 mt-4">🏦 Local Methods</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {localMethods.map((method) => (
            <button
              key={method}
              onClick={() => toggleMethod(method)}
              type="button"
              className={`px-3 py-1 rounded border ${
                selectedMethods.includes(method)
                  ? "bg-purple-600 text-white border-purple-700"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Crypto Wallets */}
      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium text-gray-700">🪙 Crypto Wallets</label>
        {cryptoFields.map((coin) => (
          <input
            key={coin}
            type="text"
            placeholder={`${coin} Wallet Address`}
            value={cryptoWallets[coin] ?? ""}
            onChange={(e) =>
              setCryptoWallets({ ...cryptoWallets, [coin]: e.target.value.trim() })
            }
            className="w-full border rounded px-3 py-2"
          />
        ))}
      </div>

      {/* Default Method */}
      <div>
        <label className="text-sm font-medium text-gray-700 mt-4">⭐ Default Payment Method</label>
        <select
          value={defaultMethod}
          onChange={(e) => setDefaultMethod(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          {[...selectedMethods, ...cryptoFields].map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          type="button"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          ⬅️ Back
        </button>
        <button
          onClick={handleNext}
          type="button"
          disabled={loading}
          className={`px-6 py-2 rounded text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}
