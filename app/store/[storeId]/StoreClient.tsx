"use client";

export default function StoreClient({ store }: { store: any }) {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">🛍️ {store.name}</h1>
      <p className="text-gray-400 mb-6">Store ID: {store.id}</p>

      <h2 className="text-xl font-semibold mb-2 text-orange-400">Products:</h2>
      <ul className="list-disc pl-6">
        {store.products?.map((p: any) => (
          <li key={p.id} className="text-gray-300 mb-1">
            {p.name} — Rs {p.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
