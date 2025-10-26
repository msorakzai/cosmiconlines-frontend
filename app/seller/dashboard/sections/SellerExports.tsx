"use client";

export default function SellerExports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-teal-700">📤 Seller Exports</h1>
      <p className="text-gray-600">Export your listings, orders, and analytics for reporting or backup.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Export Listings",
            description: "Download product listings in CSV or JSON format.",
            action: "Export Listings",
          },
          {
            title: "Export Orders",
            description: "Generate order history for accounting or analysis.",
            action: "Export Orders",
          },
          {
            title: "Export Analytics",
            description: "Save performance metrics and traffic reports.",
            action: "Export Analytics",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-teal-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
