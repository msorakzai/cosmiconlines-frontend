"use client";

import { useState, useEffect } from "react";

interface Campaign {
  _id?: string;
  type: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  targetSegment?: string;
}

export default function SellerCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<Campaign>({
    type: "flash",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    targetSegment: "All Buyers",
  });

  const [editing, setEditing] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    const res = await fetch("/api/campaigns");
    const data = await res.json();
    setCampaigns(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({
        type: "flash",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        targetSegment: "All Buyers",
      });
      setEditing(null);
      fetchCampaigns();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/campaigns", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCampaigns();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-orange-700">📈 Seller Campaigns</h1>
      <p className="text-gray-600">Create and manage seasonal promotions and flash sales.</p>

      {/* Campaign Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="flash">Flash Sale</option>
          <option value="seasonal">Seasonal Campaign</option>
          <option value="targeting">Buyer Targeting</option>
        </select>

        <input
          type="text"
          placeholder="Campaign Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <input
          type="text"
          placeholder="Target Segment (optional)"
          className="border p-2 rounded col-span-full"
          value={form.targetSegment}
          onChange={(e) => setForm({ ...form, targetSegment: e.target.value })}
        />

        <textarea
          placeholder="Campaign Description"
          className="border p-2 rounded col-span-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          type="submit"
          className="col-span-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          {editing ? "Update Campaign" : "Create Campaign"}
        </button>
      </form>

      {/* Campaign List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{c.title}</h2>
            <p className="text-sm text-gray-500">{c.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              {c.startDate} → {c.endDate || "No end date"}
            </p>
            <p className="text-xs text-gray-400">🎯 {c.targetSegment}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleDelete(c._id!)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
