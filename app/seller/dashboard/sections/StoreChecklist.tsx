"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoreChecklist() {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({
    storeName: false,
    logo: false,
    category: false,
    branding: false,
  });

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    router.push("/seller/dashboard-wizard?tab=Rewards");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-purple-700">🧩 Setup Checklist</h2>
      <p className="text-gray-600">Complete these basic steps before proceeding:</p>

      <ul className="space-y-2">
        {[
          { key: "storeName", label: "Store Name & Logo" },
          { key: "category", label: "Category & Sub-category" },
          { key: "branding", label: "Branding & Theme" },
        ].map((item) => (
          <li key={item.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked[item.key]}
              onChange={() => toggle(item.key)}
              className="h-4 w-4 text-purple-600"
            />
            <span className={checked[item.key] ? "line-through text-gray-400" : ""}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          🎁 Next: Welcome Rewards
        </button>
      </div>
    </div>
  );
}
