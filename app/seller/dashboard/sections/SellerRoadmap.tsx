"use client";

import { useState, useEffect } from "react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  votes: number;
}

export default function SellerRoadmap() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roadmap");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.description) return;

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        setNewItem({ title: "", description: "" });
        fetchRoadmap();
      }
    } catch (error) {
      console.error("Failed to submit idea:", error);
    }
  };

  const handleVote = async (id: string) => {
    try {
      await fetch("/api/roadmap/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchRoadmap();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">🧭 Seller Roadmap</h1>
      <p className="text-gray-600">Submit ideas, vote on features, and track progress.</p>

      {/* Submit Idea */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Feature Title"
          className="border p-2 rounded"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Describe your idea..."
          className="border p-2 rounded col-span-full"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <button
          type="submit"
          className="col-span-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit Idea
        </button>
      </form>

      {/* Roadmap List */}
      {loading ? (
        <div className="text-center text-gray-500 py-6">Loading roadmap...</div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No roadmap items yet. Be the first to submit!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-xs text-gray-400 mt-1">📌 Status: {item.status}</p>
              <p className="text-xs text-gray-400">👍 Votes: {item.votes}</p>
              <button
                onClick={() => handleVote(item.id)}
                className="mt-3 text-sm text-purple-600 hover:underline"
              >
                Vote Up
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
