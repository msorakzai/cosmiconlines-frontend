"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Zone = { name: string; fee: number };

const shippingMethods = ["Standard Shipping", "Express Shipping", "Courier Pickup"];

export default function StoreShipping() {
  const router = useRouter();
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneFee, setNewZoneFee] = useState("");

  // Load saved shipping config
  useEffect(() => {
    try {
      const savedMethods = localStorage.getItem("storeShippingMethods");
      const savedZones = localStorage.getItem("storeShippingZones");
      if (savedMethods) setSelectedMethods(JSON.parse(savedMethods));
      if (savedZones) setZones(JSON.parse(savedZones));
    } catch (err) {
      console.error("Error loading shipping data:", err);
    }
  }, []);

  // Toggle method selection
  const toggleMethod = (method: string) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  // Add delivery zone
  const addZone = () => {
    const fee = Number(newZoneFee);
    if (!newZoneName.trim() || isNaN(fee)) return;
    setZones((prev) => [...prev, { name: newZoneName.trim(), fee }]);
    setNewZoneName("");
    setNewZoneFee("");
  };

  // Remove delivery zone
  const removeZone = (index: number) => {
    setZones((prev) => prev.filter((_, i) => i !== index));
  };

  // Save and move next
  const handleNext = () => {
    if (selectedMethods.length === 0) {
      alert("Please select at least one shipping method.");
      return;
    }

    setLoading(true);
    localStorage.setItem("storeShippingMethods", JSON.stringify(selectedMethods));
    localStorage.setItem("storeShippingZones", JSON.stringify(zones));

    setTimeout(() => {
      setLoading(false);
      router.push("/seller/dashboard?tab=Delivery");
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🚚 Store Shipping Setup</h2>
      <p className="text-gray-600 text-sm">
        Choose your shipping methods and define delivery zones with fees.
      </p>

      {/* Shipping Methods */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Shipping Methods</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {shippingMethods.map((method) => (
            <button
              key={method}
              onClick={() => toggleMethod(method)}
              type="button"
              className={`px-3 py-1 rounded border transition ${
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

      {/* Delivery Zones */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800 mb-1">Delivery Zones</label>
        {zones.map((zone, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded px-3 py-2 bg-gray-50"
          >
            <span>{zone.name} — ₨ {zone.fee}</span>
            <button
              type="button"
              onClick={() => removeZone(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add new zone */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Zone Name"
            value={newZoneName}
            onChange={(e) => setNewZoneName(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Fee"
            value={newZoneFee}
            onChange={(e) => setNewZoneFee(e.target.value)}
            className="w-24 border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={addZone}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            ➕ Add
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => router.push("/seller/dashboard?tab=Currency")}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          ⬅️ Back
        </button>
        <button
          type="button"
          onClick={handleNext}
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
