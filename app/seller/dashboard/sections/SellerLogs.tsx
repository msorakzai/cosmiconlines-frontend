"use client";

export default function SellerLogs() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">📄 Seller Logs</h1>
      <p className="text-gray-600">Monitor system activity, API failures, and error diagnostics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "System Logs",
            description: "Track backend events and store-level operations.",
            action: "View Logs",
          },
          {
            title: "API Failures",
            description: "Identify failed requests and integration issues.",
            action: "Inspect Failures",
          },
          {
            title: "Error Tracking",
            description: "Diagnose issues and monitor platform health.",
            action: "Open Tracker",
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
