"use client";

export default function SellerTraining() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">📚 Seller Training</h1>
      <p className="text-gray-600">Learn how to use the platform and grow your store with expert guidance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Tutorial Library",
            description: "Watch step-by-step videos on store setup and features.",
            action: "Browse Tutorials",
          },
          {
            title: "Onboarding Guide",
            description: "Follow a structured path to launch your store successfully.",
            action: "Start Guide",
          },
          {
            title: "Best Practices",
            description: "Learn tips from top sellers to boost performance.",
            action: "Explore Tips",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-indigo-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
