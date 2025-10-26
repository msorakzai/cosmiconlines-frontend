"use client";

export default function Referral() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700">🔗 Referral Program</h1>
      <p className="text-gray-600">Invite others and earn rewards for every successful signup.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Generate Invite Link",
            description: "Create a unique referral link to share with others.",
            action: "Create Link",
          },
          {
            title: "Track Referrals",
            description: "Monitor who signed up and how much you've earned.",
            action: "View Stats",
          },
          {
            title: "Reward History",
            description: "See your payout history and upcoming bonuses.",
            action: "Check Rewards",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-green-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
``