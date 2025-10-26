"use client";

export default function SellerVault() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">🧷 Seller Vault</h1>
      <p className="text-gray-600">Securely store API keys, tokens, and sensitive credentials.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "API Keys",
            description: "Store and manage third-party integration keys.",
            action: "Manage Keys",
          },
          {
            title: "Access Tokens",
            description: "Securely save tokens for external services.",
            action: "Store Token",
          },
          {
            title: "Encrypted Credentials",
            description: "Keep passwords and secrets safe with encryption.",
            action: "Open Vault",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-emerald-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
