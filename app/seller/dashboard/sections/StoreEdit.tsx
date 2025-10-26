"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StoreEdit({ storeId }: { storeId: string }) {
  const router = useRouter();
  const [storeData, setStoreData] = useState<any>(null);
  const [customSub, setCustomSub] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storeId) return;

    fetch(`/api/stores/dashboard?storeId=${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        const store = data?.store;

        if (!store) {
          toast.error("Store not found");
          return;
        }
        setStoreData(store);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch store:", err);
        toast.error("Error fetching store data");
      });
  }, [storeId]);

  const handleSave = async () => {
    if (!storeData) return;

    const missing: string[] = [];
    if (!storeData.name) missing.push("Store Name");
    if (!storeData.email) missing.push("Store Email");
    if (!storeData.description) missing.push("Store Description");

    if (missing.length > 0) {
      toast.error(`Missing: ${missing.join(", ")}`);
      return;
    }

    const cleanSubs = Array.isArray(storeData.subCategory)
      ? storeData.subCategory
          .map((s: string) => s.trim())
          .filter((s: string) => s && !/^-\s*$/.test(s))
      : [];

    const payload = {
      storeId,
      name: storeData.name,
      email: storeData.email,
      tagline: storeData.tagline || "",
      description: storeData.description || "",
      themeColor: storeData.themeColor || "#6b21a8",
      storeType: storeData.storeType || "physical",
      facebook: storeData.facebook || "",
      instagram: storeData.instagram || "",
      twitter: storeData.twitter || "",
      linkedin: storeData.linkedin || "",
      subCategory: cleanSubs,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/stores/dashboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success("✅ Store updated successfully!");
      setTimeout(() => {
        router.push("/seller/dashboard?tab=Manager");
      }, 500);
    } catch (err) {
      console.error("❌ Update error:", err);
      toast.error("Server error during update");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomSub = () => {
    const trimmed = customSub.trim();
    if (trimmed && !storeData.subCategory.includes(trimmed)) {
      setStoreData({
        ...storeData,
        subCategory: [...storeData.subCategory, trimmed],
      });
      setCustomSub("");
    }
  };

  if (!storeData)
    return <p className="text-center text-gray-400 mt-10">Loading store editor...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-6 rounded-xl shadow-md space-y-10">
      <h2 className="text-2xl font-bold text-purple-700">✏️ Edit Store</h2>
      <p className="text-sm text-gray-500">Update your store details below. AI will guide you to improve each section.</p>

      {/* Basic Info */}
      <section className="space-y-4">
        <input
          type="text"
          placeholder="Store Name"
          value={storeData.name ?? ""}
          onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={storeData.email ?? ""}
          onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Tagline"
          value={storeData.tagline ?? ""}
          onChange={(e) => setStoreData({ ...storeData, tagline: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Description"
          value={storeData.description ?? ""}
          onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
        <p className="text-xs text-gray-500">🧠 Tip: Clear tagline + story builds trust.</p>
      </section>

      {/* Branding */}
      <section className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Theme Color</label>
        <input
          type="color"
          value={storeData.themeColor ?? "#6b21a8"}
          onChange={(e) => setStoreData({ ...storeData, themeColor: e.target.value })}
          className="w-16 h-10 border rounded"
        />
        <p className="text-xs text-gray-500">🎯 Tip: Strong visuals = stronger brand recall.</p>
      </section>

      {/* Category */}
      <section className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Main Category (Locked)</label>
        <input
          type="text"
          value={storeData.category ?? ""}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500"
        />

        <label className="block text-sm font-medium text-gray-700">Subcategories</label>
        <input
          type="text"
          value={Array.isArray(storeData.subCategory) ? storeData.subCategory.join(", ") : ""}
          onChange={(e) =>
            setStoreData({ ...storeData, subCategory: e.target.value.split(",").map((s) => s.trim()) })
          }
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customSub}
            onChange={(e) => setCustomSub(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Add custom subcategory"
          />
          <button
            onClick={handleAddCustomSub}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            ➕ Add
          </button>
        </div>
      </section>

      {/* Store Type */}
      <section className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Store Type</label>
        <select
          value={storeData.storeType ?? "physical"}
          onChange={(e) => setStoreData({ ...storeData, storeType: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <p className="text-xs text-gray-500">🧠 Tip: Choose the model that matches your delivery style.</p>
      </section>

      {/* Social Links */}
      <section className="space-y-4">
        {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
          <div key={platform}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{platform}</label>
            <input
              type="url"
              value={storeData[platform] ?? ""}
              onChange={(e) => setStoreData({ ...storeData, [platform]: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder={`https://${platform}.com/yourhandle`}
            />
          </div>
        ))}
        <p className="text-xs text-gray-500">🔗 Tip: Add social links to build trust and visibility.</p>
      </section>

      {/* Save Button */}
      <div className="pt-8 text-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "💾 Save & Go to Manager"}
        </button>
      </div>
    </div>
  );
}
