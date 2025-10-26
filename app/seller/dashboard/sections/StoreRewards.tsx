"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoreRewards() {
  const router = useRouter();
  const [rewardEnabled, setRewardEnabled] = useState(false);
  const [rewardAmount, setRewardAmount] = useState("");

  const handleNext = () => {
    router.push("/seller/dashboard-wizard?tab=Category");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-purple-700">🎁 Welcome Rewards</h2>
      <p className="text-gray-600">
        Enable a small reward or discount for your first customers:
      </p>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={rewardEnabled}
          onChange={() => setRewardEnabled(!rewardEnabled)}
          className="h-4 w-4 text-purple-600"
        />
        <span>Enable Welcome Reward</span>
      </div>

      {rewardEnabled && (
        <input
          type="number"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          placeholder="Reward amount in your currency"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
        />
      )}

      <div className="mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          🧭 Next: Store Category
        </button>
      </div>
    </div>
  );
}
