"use client";

export default function SellerGoals() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-700">🎯 Seller Goals</h1>
      <p className="text-gray-600">Set monthly targets and track your progress toward key milestones.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Monthly Sales Target",
            description: "Aim to reach $5,000 in revenue this month.",
            progress: 3200,
            goal: 5000,
          },
          {
            title: "New Product Launches",
            description: "Add 10 new listings to your store.",
            progress: 6,
            goal: 10,
          },
          {
            title: "Customer Satisfaction",
            description: "Maintain a 4.5+ star rating from buyers.",
            progress: 4.7,
            goal: 4.5,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-600"
                style={{
                  width: `${Math.min((item.progress / item.goal) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {item.progress} / {item.goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
