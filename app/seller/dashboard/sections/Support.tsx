"use client";

export default function Support() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-red-700">💬 Support</h1>
      <p className="text-gray-600">View buyer messages and resolve issues quickly.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Inbox",
            description: "View all incoming buyer messages and inquiries.",
            action: "Open Inbox",
          },
          {
            title: "Resolution Center",
            description: "Track and resolve disputes or complaints.",
            action: "Go to Resolution",
          },
          {
            title: "Feedback Tracker",
            description: "Monitor buyer feedback and ratings.",
            action: "View Feedback",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-red-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
