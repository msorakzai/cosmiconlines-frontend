"use client";

export default function SellerSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">⚙️ Seller Settings</h1>
      <p className="text-gray-600">Configure your store's timezone, currency, language, and preferences.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Timezone",
            description: "Set your preferred timezone for scheduling and analytics.",
            action: "Change Timezone",
          },
          {
            title: "Currency",
            description: "Choose your store's default currency for pricing.",
            action: "Select Currency",
          },
          {
            title: "Language",
            description: "Set your preferred language for dashboard and buyers.",
            action: "Update Language",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-gray-800 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
