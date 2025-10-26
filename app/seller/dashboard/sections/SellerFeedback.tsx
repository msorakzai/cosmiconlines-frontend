"use client";

export default function SellerFeedback() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-700">🗣️ Seller Feedback</h1>
      <p className="text-gray-600">Review buyer feedback and improve your store experience.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Recent Reviews",
            description: "See what buyers are saying about your products and services.",
            action: "View Reviews",
          },
          {
            title: "Feedback Trends",
            description: "Track satisfaction scores and recurring suggestions.",
            action: "Analyze Trends",
          },
          {
            title: "Respond to Feedback",
            description: "Reply to buyer comments and resolve concerns.",
            action: "Start Responding",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-yellow-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
