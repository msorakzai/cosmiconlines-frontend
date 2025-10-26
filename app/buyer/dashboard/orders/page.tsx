'use client';

import { Package, Clock, Truck, CheckCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuyerOrdersPage() {
  const router = useRouter();

  // 🧾 Mock orders (replace with real API later)
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-10-12',
      status: 'Delivered',
      total: 7248,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2025-10-09',
      status: 'Shipped',
      total: 2999,
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2025-10-05',
      status: 'Processing',
      total: 1549,
      items: 2,
    },
    {
      id: 'ORD-004',
      date: '2025-09-30',
      status: 'Cancelled',
      total: 4499,
      items: 1,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'Shipped':
        return <Truck className="text-blue-600" size={20} />;
      case 'Processing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'Cancelled':
        return <Package className="text-red-500" size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/buyer/dashboard/orders/${orderId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-10 rounded-lg border">
          <Package size={40} className="mx-auto mb-3 text-gray-400" />
          <p>You haven’t placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-indigo-700">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                {getStatusIcon(order.status)}
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Items:</span>{' '}
                  {order.items}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Total:</span> Rs{' '}
                  {order.total.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{' '}
                  <span
                    className={`font-semibold ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Shipped'
                        ? 'text-blue-600'
                        : order.status === 'Processing'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleViewDetails(order.id)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
              >
                <Eye size={18} /> View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
