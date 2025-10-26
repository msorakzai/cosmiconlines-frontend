"use client";

export default function UserClient({ seller }: { seller: any }) {
  if (!seller) {
    return <p className="text-red-400">⚠️ Seller not found.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Seller: {seller.name}</h1>
      <p className="text-gray-400">Seller ID: {seller.id}</p>
      {/* Add more seller details here */}
    </div>
  );
}
