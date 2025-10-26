"use client";

export default function SellerSecurity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-red-700">🔐 Seller Security</h1>
      <p className="text-gray-600">Protect your store with advanced security settings and access controls.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Two-Factor Authentication",
            description: "Add an extra layer of protection to your account.",
            action: "Enable 2FA",
          },
          {
            title: "Login History",
            description: "Review recent login activity and device access.",
            action: "View History",
          },
          {
            title: "Access Control",
            description: "Manage who can access your store and from where.",
            action: "Configure Access",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-red-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
