"use client";

export default function SellerInsights() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">📊 Seller Insights</h1>
      <p className="text-gray-600">Track buyer behavior, product trends, and store performance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Top Products",
            description: "See which products are performing best this month.",
            action: "View Report",
          },
          {
            title: "Buyer Activity",
            description: "Understand how buyers interact with your listings.",
            action: "Analyze Behavior",
          },
          {
            title: "Sales Trends",
            description: "Visualize revenue growth and seasonal patterns.",
            action: "Explore Trends",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-blue-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
