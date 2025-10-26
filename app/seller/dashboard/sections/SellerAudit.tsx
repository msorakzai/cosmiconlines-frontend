"use client";

export default function SellerAudit() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🧾 Seller Audit</h1>
      <p className="text-gray-600">Track store activity, changes, and user actions for accountability.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Activity Logs",
            description: "View a timeline of actions performed on your store.",
            action: "View Logs",
          },
          {
            title: "Change History",
            description: "Track edits to listings, settings, and team roles.",
            action: "Review Changes",
          },
          {
            title: "Audit Filters",
            description: "Filter logs by user, section, or action type.",
            action: "Apply Filters",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-gray-900 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
