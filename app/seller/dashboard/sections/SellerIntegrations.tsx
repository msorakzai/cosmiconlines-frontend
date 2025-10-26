"use client";

export default function SellerIntegrations() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-700">🔌 Seller Integrations</h1>
      <p className="text-gray-600">Connect third-party tools to automate workflows and track performance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Stripe Payments",
            description: "Enable secure payment processing with Stripe.",
            action: "Connect Stripe",
          },
          {
            title: "Zapier Automation",
            description: "Automate tasks across your apps using Zapier.",
            action: "Setup Zapier",
          },
          {
            title: "Google Analytics",
            description: "Track visitor behavior and store performance.",
            action: "Link Analytics",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-purple-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
