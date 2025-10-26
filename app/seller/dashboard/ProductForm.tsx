"use client";

import { useState } from "react";

export default function ProductForm({
  storeId,
  onProductAdded,
}: {
  storeId: string;
  onProductAdded?: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    pickupAddresses: [] as string[],
    certifications: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      storeId,
    };

    if (!payload.name || !payload.price || !storeId) {
      setError("❌ Missing required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess("✅ Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          pickupAddresses: [],
          certifications: [],
        });

        if (onProductAdded) onProductAdded(); // ✅ Trigger refresh
      } else {
        setError(result.message || "Failed to add product.");
      }
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">➕ Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Product name"
          className="w-full p-2 border rounded-md"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Product description"
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          value={formData.price}
          onChange={(e) => updateFormData({ price: e.target.value })}
          placeholder="Price"
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          placeholder="Category"
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          value={formData.pickupAddresses.join(", ")}
          onChange={(e) => updateFormData({ pickupAddresses: e.target.value.split(",").map(s => s.trim()) })}
          placeholder="Pickup addresses (comma separated)"
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          value={formData.certifications.join(", ")}
          onChange={(e) => updateFormData({ certifications: e.target.value.split(",").map(s => s.trim()) })}
          placeholder="Certifications (comma separated)"
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        {success && <p className="text-sm text-green-600 pt-2">{success}</p>}
        {error && <p className="text-sm text-red-600 pt-2">{error}</p>}
      </form>
    </div>
  );
}
