"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoreBranding() {
  const router = useRouter();

  const [primaryColor, setPrimaryColor] = useState("#6B46C1");
  const [secondaryColor, setSecondaryColor] = useState("#ECC94B");
  const [themeLogo, setThemeLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrimaryColor(localStorage.getItem("storePrimaryColor") || "#6B46C1");
    setSecondaryColor(localStorage.getItem("storeSecondaryColor") || "#ECC94B");
  }, []);

  const handleNext = () => {
    setLoading(true);

    localStorage.setItem("storePrimaryColor", primaryColor);
    localStorage.setItem("storeSecondaryColor", secondaryColor);

    // Optional: Upload themeLogo or change theme preview

    setLoading(false);
    router.push("/seller/dashboard?tab=Contact"); // Next step
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">🎨 Store Branding</h2>

      <label className="block text-sm font-medium text-gray-700">Primary Color</label>
      <input
        type="color"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
        className="w-20 h-10 border rounded"
      />

      <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
      <input
        type="color"
        value={secondaryColor}
        onChange={(e) => setSecondaryColor(e.target.value)}
        className="w-20 h-10 border rounded"
      />

      <label className="block text-sm font-medium text-gray-700">Optional Logo for Branding/Preview</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThemeLogo(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-4"
      >
        {loading ? "Saving..." : "Next: Contact & Socials"}
      </button>
    </div>
  );
}
