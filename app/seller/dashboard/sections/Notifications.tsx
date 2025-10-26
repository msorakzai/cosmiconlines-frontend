"use client";

export default function Notifications() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-700">🔔 Notifications</h1>
      <p className="text-gray-600">Stay updated with system alerts, buyer messages, and platform changes.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "System Alerts",
            description: "Important updates about your store, billing, or account.",
            action: "View Alerts",
          },
          {
            title: "Buyer Messages",
            description: "Unread messages and inquiries from buyers.",
            action: "Open Inbox",
          },
          {
            title: "Platform Updates",
            description: "New features, announcements, and policy changes.",
            action: "See What's New",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-yellow-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
