"use client";

export default function SellerChat() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">💬 Seller Chat</h1>
      <p className="text-gray-600">Communicate with buyers, support, and your team in real-time.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Buyer Chat",
            description: "Respond to buyer questions and order inquiries.",
            action: "Open Chat",
          },
          {
            title: "Team Messaging",
            description: "Coordinate with your team on listings and logistics.",
            action: "Start Conversation",
          },
          {
            title: "Support Inbox",
            description: "Get help from platform support or report issues.",
            action: "Contact Support",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-indigo-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
