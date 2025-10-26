"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StoreDetail() {
  const router = useRouter();

  const [storeName, setStoreName] = useState("");
  const [storeTagline, setStoreTagline] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing data from localStorage if available
    setStoreName(localStorage.getItem("storeName") || "");
    setStoreTagline(localStorage.getItem("storeTagline") || "");
    setStoreDescription(localStorage.getItem("storeDescription") || "");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "cover") => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    type === "logo" ? setLogo(file) : setCover(file);
  };

  const handleNext = async () => {
    if (!storeName || !storeTagline || !storeDescription) {
      toast.error("Store name, tagline, and description are required.");
      return;
    }

    setLoading(true);

    try {
      // Save to localStorage for wizard preview
      localStorage.setItem("storeName", storeName);
      localStorage.setItem("storeTagline", storeTagline);
      localStorage.setItem("storeDescription", storeDescription);

      // Optionally: Upload files to backend or cloud storage
      if (logo) localStorage.setItem("storeLogo", URL.createObjectURL(logo));
      if (cover) localStorage.setItem("storeCover", URL.createObjectURL(cover));

      toast.success("✅ Store details saved locally!");

      // Navigate to next step
      router.push("/seller/dashboard?tab=Model");
    } catch (err) {
      console.error("❌ Error saving store details:", err);
      toast.error("Failed to save store details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🏪 Store Details</h2>
      <p className="text-sm text-gray-500">
        Fill in your store’s basic information. AI tips will guide you to write an attractive description.
      </p>

      {/* Store Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Store Name *</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="e.g., Cosmic Mart"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Tagline */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tagline *</label>
        <input
          type="text"
          value={storeTagline}
          onChange={(e) => setStoreTagline(e.target.value)}
          placeholder="e.g., Your one-stop shop for everything!"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description *</label>
        <textarea
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          placeholder="Write a short description about your store..."
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={5}
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Store Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "logo")}
          className="w-full text-sm"
        />
        {logo && <p className="text-green-600 text-sm mt-1">Logo selected: {logo.name}</p>}
      </div>

      {/* Cover Upload */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "cover")}
          className="w-full text-sm"
        />
        {cover && <p className="text-green-600 text-sm mt-1">Cover selected: {cover.name}</p>}
      </div>

      {/* Next Button */}
      <div className="pt-4">
        <button
          onClick={handleNext}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "✅ Save & Continue"}
        </button>
      </div>
    </div>
  );
}
