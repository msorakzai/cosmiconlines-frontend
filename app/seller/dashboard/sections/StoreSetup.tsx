"use client";

import { useState, useEffect } from "react";

const marketplaceCategories: Record<string, string[]> = {
  "E-Commerce Retail": [
    "Electronics & Gadgets",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Books & Stationery",
    "Mobile & Accessories",
    "Toys & Baby Products",
    "Furniture & Decor",
    "Sports & Fitness",
    "Beauty & Personal Care",
  ],
  "Pharmacy & Health": [
    "Medicines",
    "Supplements",
    "Medical Equipment",
    "Wellness Products",
    "Clinics & Labs",
  ],
  "Grocery & Mart": [
    "Cash & Carry",
    "Supermarket",
    "Bakery",
    "Fresh Produce",
    "Frozen Items",
    "Beverages",
  ],
  "Digital Services": [
    "Web Design",
    "Software Development",
    "Hosting & Domains",
    "Online Courses",
    "Freelance Services",
  ],
  "Food & Beverage": [
    "Restaurants",
    "Cafes",
    "Catering",
    "Cloud Kitchens",
  ],
  "Local Services": [
    "Event Planners",
    "Repair Services",
    "Cleaning Services",
    "Tailoring",
  ],
  "Others": ["General Store", "Mixed Category", "Unlisted"],
};

export default function StoreSetup() {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    brandColor: "",
    category: "",
    subCategory: "",
    contactEmail: "",
    logoUrl: "",
    bannerUrl: "",
  });

  const [setupScore, setSetupScore] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const filled = Object.values(form).filter(Boolean).length;
    setSetupScore(Math.round((filled / Object.keys(form).length) * 100));
  }, [form]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "category") {
      setForm((prev) => ({ ...prev, subCategory: "" }));
    }
  };

  const handleAI = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/store-helper", {
        method: "POST",
        body: JSON.stringify({ prompt: form.name }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({
          ...prev,
          tagline: data.tagline,
          description: data.description,
          brandColor: data.brandColor,
        }));
      }
    } catch (err) {
      console.error("❌ AI fill error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const storeId = localStorage.getItem("storeId");
      const token = localStorage.getItem("sellerToken");

      const res = await fetch(`/api/stores/${storeId}/setup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Store setup saved!");
      } else {
        alert("❌ Failed to save store.");
      }
    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };

  const subCategories = form.category ? marketplaceCategories[form.category] || [] : [];

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow border max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700">🛠️ Store Setup</h2>

      <div className="text-sm text-gray-600">
        Setup Completeness: <span className="font-semibold">{setupScore}%</span>
      </div>

      {/* Branding Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🎨 Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Store Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Sidzmart"
              required
            />

            <label className="block text-sm font-medium mt-4 mb-1">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Affordable fashion for all"
            />

            <label className="block text-sm font-medium mt-4 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={4}
              placeholder="Tell buyers what your store is about..."
            />

            <label className="block text-sm font-medium mt-4 mb-1">Brand Color</label>
            <input
              type="text"
              value={form.brandColor}
              onChange={(e) => handleChange("brandColor", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="#FF6600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Logo URL</label>
            <input
              type="text"
              value={form.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://..."
            />
            {form.logoUrl && (
              <img src={form.logoUrl} alt="Logo" className="mt-2 w-24 h-24 object-cover rounded border" />
            )}

            <label className="block text-sm font-medium mt-4 mb-1">Banner URL</label>
            <input
              type="text"
              value={form.bannerUrl}
              onChange={(e) => handleChange("bannerUrl", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://..."
            />
            {form.bannerUrl && (
              <img src={form.bannerUrl} alt="Banner" className="mt-2 w-full h-32 object-cover rounded border" />
            )}
          </div>
        </div>
      </div>

      {/* Identity Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🧠 Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select category</option>
              {Object.keys(marketplaceCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subcategory</label>
            <select
              value={form.subCategory}
              onChange={(e) => handleChange("subCategory", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={!form.category}
            >
              <option value="">Select subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8">
       (<h3 className="text-lg font-semibold text-gray-700 mb-2">📍 Contact</h3>):
               <label className="block text-sm font-medium mb-1">Contact Email *</label>
        <input
          type="email"
          value={form.contactEmail}
          onChange={(e) => handleChange("contactEmail", e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g. sidzmart@gmail.com"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          💾 Save Store
        </button>

        <button
          onClick={handleAI}
          disabled={aiLoading || !form.name}
          className={`px-4 py-2 rounded ${
            aiLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          } text-white`}
        >
          🤖 {aiLoading ? "Generating..." : "Auto-fill with AI"}
        </button>
      </div>
    </div>
  );
}
