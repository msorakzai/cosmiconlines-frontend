"use client";

export default function SellerBoost() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-orange-700">🚀 Seller Boost</h1>
      <p className="text-gray-600">Increase visibility and sales with paid promotions and campaign boosts.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Promote Listings",
            description: "Boost specific products to appear higher in search results.",
            action: "Start Promotion",
          },
          {
            title: "Campaign Boost",
            description: "Launch a visibility campaign with budget and duration control.",
            action: "Create Campaign",
          },
          {
            title: "Performance Analytics",
            description: "Track ROI and engagement from boosted content.",
            action: "View Analytics",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-orange-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
