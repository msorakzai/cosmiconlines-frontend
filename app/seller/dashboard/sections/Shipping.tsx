"use client";

export default function Shipping() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-teal-700">🚚 Shipping Settings</h1>
      <p className="text-gray-600">Configure delivery zones, rates, and courier options.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Delivery Zones",
            description: "Define where you ship and set zone-specific rules.",
            action: "Manage Zones",
          },
          {
            title: "Shipping Rates",
            description: "Set flat or dynamic rates based on weight or location.",
            action: "Configure Rates",
          },
          {
            title: "Courier Integration",
            description: "Connect with delivery partners for real-time tracking.",
            action: "Setup Courier",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-teal-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
