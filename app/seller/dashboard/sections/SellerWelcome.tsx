"use client";

import { useRouter } from "next/navigation";

export default function SellerWelcome() {
  const router = useRouter();

  const handleNext = () => {
    // Next step: Setup Checklist
    router.push("/seller/dashboard-wizard?tab=Checklist");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-purple-700">👋 Welcome to Cosmic Seller</h1>
      <p className="text-gray-600 text-lg">
        Let's get your store online step by step. Follow the wizard to set up your store professionally.
      </p>
      <div className="mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          🚀 Start Setup
        </button>
      </div>
    </div>
  );
}
