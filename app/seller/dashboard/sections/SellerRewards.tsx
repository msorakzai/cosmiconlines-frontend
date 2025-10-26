"use client";

export default function SellerRewards() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-700">🎁 Seller Rewards</h1>
      <p className="text-gray-600">Launch loyalty programs and offer bonuses to engage buyers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Loyalty Program",
            description: "Reward repeat buyers with points and perks.",
            action: "Create Program",
          },
          {
            title: "Cashback Offers",
            description: "Set cashback incentives for specific products.",
            action: "Setup Cashback",
          },
          {
            title: "Referral Bonuses",
            description: "Reward buyers who refer others to your store.",
            action: "Manage Referrals",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-pink-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
