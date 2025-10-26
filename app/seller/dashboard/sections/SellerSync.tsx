"use client";

export default function SellerSync() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-800">🔄 Seller Sync</h1>
      <p className="text-gray-600">Connect and synchronize your store with external platforms.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Shopify Sync",
            description: "Import products and orders from your Shopify store.",
            action: "Connect Shopify",
          },
          {
            title: "Etsy Sync",
            description: "Sync listings and inventory with Etsy.",
            action: "Link Etsy",
          },
          {
            title: "WooCommerce Sync",
            description: "Integrate with your WooCommerce backend.",
            action: "Setup WooCommerce",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-green-800 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
