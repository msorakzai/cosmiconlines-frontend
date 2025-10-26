"use client";

import { useState } from "react";
import { Truck, PackageCheck, XCircle, Clock } from "lucide-react";

interface Order {
  id: number;
  customer: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: "Ali Khan", total: 3200, status: "Pending" },
    { id: 2, customer: "Sara Malik", total: 5400, status: "Shipped" },
    { id: 3, customer: "Bilal Ahmed", total: 2100, status: "Delivered" },
  ]);

  const handleStatusChange = (id: number, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">📦 Orders</h2>
      <p className="text-gray-600 mb-6">
        Track and manage customer orders efficiently.
      </p>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Total (PKR)</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium">{order.id}</td>
                  <td className="p-3 border-b">{order.customer}</td>
                  <td className="p-3 border-b">{order.total.toLocaleString()}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(order.id, "Pending")}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Clock size={16} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, "Shipped")}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Truck size={16} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, "Delivered")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <PackageCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, "Cancelled")}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
