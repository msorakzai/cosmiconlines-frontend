"use client";

export default function StoreBackup() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🗂️ Store Backup</h1>
      <p className="text-gray-600">Export your listings, settings, and store data for safekeeping.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Export Listings",
            description: "Download all product and service listings as a backup.",
            action: "Export Now",
          },
          {
            title: "Backup Settings",
            description: "Save your store layout, theme, and preferences.",
            action: "Save Settings",
          },
          {
            title: "Full Snapshot",
            description: "Create a complete backup of your store before major changes.",
            action: "Create Snapshot",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-gray-900 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
