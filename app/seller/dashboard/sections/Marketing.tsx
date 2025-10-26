"use client";

export default function Marketing() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-700">📣 Marketing</h1>
      <p className="text-gray-600">Create promotions, coupons, and banners to boost your store.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Create Coupon",
            description: "Offer discounts to attract new buyers or reward loyal ones.",
            action: "Generate Coupon",
          },
          {
            title: "Launch Promotion",
            description: "Run time-limited deals to increase visibility and urgency.",
            action: "Start Promotion",
          },
          {
            title: "Design Banner",
            description: "Customize homepage banners to highlight your best offers.",
            action: "Upload Banner",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-pink-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
