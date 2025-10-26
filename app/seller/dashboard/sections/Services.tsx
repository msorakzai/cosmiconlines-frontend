"use client";

import { useState, useEffect } from "react";

interface Service {
  _id?: string;
  title: string;
  description: string;
  price: number;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>({
    title: "",
    description: "",
    price: 0,
  });

  const [editing, setEditing] = useState<Service | null>(null);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, _id: editing._id } : form),
    });
    if (res.ok) {
      setForm({ title: "", description: "", price: 0 });
      setEditing(null);
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    setForm(service);
    setEditing(service);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">🛠 Services</h1>
      <p className="text-gray-600">List and manage your offered services.</p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Service Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded col-span-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editing ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Service List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s._id} className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-gray-500">{s.description}</p>
            <p className="mt-2 text-blue-600 font-medium">${s.price}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(s)}
                className="px-3 py-1 bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id!)}
                className="px-3 py-1 bg-red-500 text-white rounded"
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
