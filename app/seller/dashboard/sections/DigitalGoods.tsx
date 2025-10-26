"use client";

import { useState, useEffect } from "react";
import { useSeller } from "@/context/SellerContext";

export default function DigitalGoods() {
  const { sellerId } = useSeller();
  const [digitalItems, setDigitalItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    licenseType: "Single-use",
    file: null as File | null,
  });

  const fetchItems = async () => {
    const res = await fetch(`/api/digital-goods?sellerId=${sellerId}`);
    const data = await res.json();
    setDigitalItems(data.items || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async () => {
    if (!form.file) return alert("Please upload a file.");

    const body = new FormData();
    body.append("title", form.title);
    body.append("licenseType", form.licenseType);
    body.append("sellerId", sellerId);
    body.append("file", form.file);

    const res = await fetch("/api/digital-goods", {
      method: "POST",
      body,
    });

    const result = await res.json();
    alert(result.message || "Digital item uploaded!");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">💾 Digital Goods</h1>
      <p className="text-gray-600">Upload and manage your digital products.</p>

      {/* Upload Form */}
      <div className="space-y-4 max-w-md">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Item Title"
          className="w-full border p-2 rounded"
        />

        <select
          name="licenseType"
          value={form.licenseType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Single-use">Single-use</option>
          <option value="Multi-use">Multi-use</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          type="file"
          accept=".pdf,.zip,.mp3,.mp4,.png,.jpg,.jpeg"
          onChange={handleFile}
          className="w-full border p-2 rounded"
        />

        {form.file && (
          <p className="text-sm text-gray-500">Selected: {form.file.name}</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Upload Item
        </button>
      </div>

      {/* Item Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {digitalItems.map((item: any, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">License: {item.licenseType}</p>
            <a
              href={item.fileUrl}
              target="_blank"
              className="mt-3 text-sm text-purple-600 hover:underline block"
            >
              Download Preview
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
