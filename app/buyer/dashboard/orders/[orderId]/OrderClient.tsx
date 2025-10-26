"use client";

export default function OrderClient({ order }: { order: any }) {
  if (!order) {
    return <p className="text-red-400">⚠️ Order not found.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Order ID: {order.id}</h1>
      <p className="text-gray-400">Buyer: {order.buyer}</p>
      <p className="text-orange-400 font-bold">Total: Rs {order.total.toLocaleString()}</p>
      {/* Add more order details here */}
    </div>
  );
}
