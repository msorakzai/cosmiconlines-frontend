"use client";

export default function StoreReview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-800">⭐ Store Reviews</h1>
      <p className="text-gray-600">Monitor buyer feedback and maintain your reputation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Recent Reviews",
            description: "See what buyers are saying about your products and services.",
            action: "View Reviews",
          },
          {
            title: "Average Rating",
            description: "Track your overall store rating and performance.",
            action: "Check Rating",
          },
          {
            title: "Respond to Feedback",
            description: "Reply to reviews and resolve concerns publicly.",
            action: "Manage Responses",
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
