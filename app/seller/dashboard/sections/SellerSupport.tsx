"use client";

export default function SellerSupport() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-red-600">🆘 Seller Support</h1>
      <p className="text-gray-600">Access help center, submit tickets, and get live support.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Help Center",
            description: "Browse FAQs and platform guides.",
            action: "Open Help",
          },
          {
            title: "Submit Ticket",
            description: "Report an issue or request assistance.",
            action: "Create Ticket",
          },
          {
            title: "Live Chat",
            description: "Connect with support team in real-time.",
            action: "Start Chat",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-red-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
