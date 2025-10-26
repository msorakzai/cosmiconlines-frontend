"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface StorePreviewProps {
  storeId: string;
}

export default function StorePreview({ storeId }: StorePreviewProps) {
  const router = useRouter();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    // Fetch store preview data
    if (!storeId) return;

    const fetchStore = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stores/${storeId}/preview`);
        const data = await res.json();
        setStoreData(data);
        setPublished(data?.published || false);
      } catch (err) {
        console.error("❌ Fetch store preview error:", err);
        toast.error("Failed to load store preview");
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  const togglePublish = async () => {
    if (!storeId) return;

    try {
      const res = await fetch(`/api/stores/${storeId}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to update publish status");
        return;
      }

      setPublished(!published);
      toast.success(`Store ${!published ? "published" : "unpublished"} successfully!`);
    } catch (err) {
      console.error("❌ Publish toggle error:", err);
      toast.error("Server error while updating publish status");
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-center py-10">🔄 Loading store preview...</div>;
  }

  if (!storeData) {
    return <div className="text-red-400 text-center py-10">❌ Store data not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">👁️ Store Preview</h2>
      <p className="text-gray-600 text-sm">Preview your store before publishing it live.</p>

      {/* Store Cover */}
      {storeData.cover && (
        <img
          src={storeData.cover}
          alt="Store Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      {/* Store Logo & Info */}
      <div className="flex items-center space-x-4 mt-4">
        {storeData.logo && (
          <img
            src={storeData.logo}
            alt="Store Logo"
            className="w-20 h-20 object-cover rounded-full border-2 border-purple-600"
          />
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{storeData.name}</h3>
          <p className="text-gray-500">{storeData.tagline}</p>
          <p className="text-gray-400 text-sm">Category: {storeData.category}</p>
          {storeData.subCategory && (
            <p className="text-gray-400 text-sm">Sub-category: {storeData.subCategory}</p>
          )}
        </div>
      </div>

      {/* Description / Bio */}
      {storeData.bio && (
        <p className="text-gray-600 mt-4">{storeData.bio}</p>
      )}

      {/* Contact / Socials */}
      <div className="mt-4 space-y-1 text-gray-700">
        {storeData.email && <p>Email: {storeData.email}</p>}
        {storeData.phone && <p>Phone: {storeData.phone}</p>}
        {storeData.whatsapp && <p>WhatsApp: {storeData.whatsapp}</p>}
        {storeData.instagram && <p>Instagram: {storeData.instagram}</p>}
        {storeData.facebook && <p>Facebook: {storeData.facebook}</p>}
        {storeData.tiktok && <p>TikTok: {storeData.tiktok}</p>}
      </div>

      {/* Currency & Payment */}
      <div className="mt-4 space-y-1 text-gray-700">
        {storeData.currency && <p>Currency: {storeData.currency}</p>}
        {storeData.paymentMethods && (
          <p>Payment Methods: {storeData.paymentMethods.join(", ")}</p>
        )}
      </div>

      {/* Publish Toggle */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={togglePublish}
          className={`px-6 py-2 rounded text-white ${
            published ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {published ? "Unpublish Store" : "Publish Store"}
        </button>
      </div>
    </div>
  );
}
