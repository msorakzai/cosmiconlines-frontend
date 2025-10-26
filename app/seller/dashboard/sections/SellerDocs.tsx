"use client";

export default function SellerDocs() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">📁 Seller Documents</h1>
      <p className="text-gray-600">Upload and manage your store's legal and compliance documents.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Upload License",
            description: "Add your business license or registration certificate.",
            action: "Upload File",
          },
          {
            title: "Verify Compliance",
            description: "Submit documents for platform verification.",
            action: "Start Verification",
          },
          {
            title: "Manage Certificates",
            description: "Track expiry and renew important documents.",
            action: "View Certificates",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-gray-700 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
