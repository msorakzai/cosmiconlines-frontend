"use client";

export default function StoreEditClient({ store }: { store: any }) {
  if (!store) {
    return <p className="text-red-400">⚠️ Store not found.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Editing Store: {store.name}</h1>
      <p className="text-gray-400">Store ID: {store.id}</p>
      {/* Add your store edit form or logic here */}
    </div>
  );
}
