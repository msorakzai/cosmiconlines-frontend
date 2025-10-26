// 📁 File: src/app/buyer/page.tsx

import React from "react";
import { buyerNotifications } from "@/data/buyerNotifications";



export default function BuyerDashboard() {
  const data = { success: true, notifications: buyerNotifications };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">🔔 Buyer Notifications</h1>

      {data.success && data.notifications.length > 0 ? (
        <ul className="space-y-4">
          {data.notifications.map((note) => (
            <li
              key={note.id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900 text-white shadow-sm"
            >
              <div className="text-sm text-gray-400">{note.date}</div>
              <div className="text-lg font-semibold text-orange-400">{note.type.toUpperCase()}</div>
              <p className="mt-1 text-gray-200">{note.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No notifications found.</p>
      )}
    </main>
  );
}
