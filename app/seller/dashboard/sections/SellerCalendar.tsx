"use client";

export default function SellerCalendar() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">📅 Seller Calendar</h1>
      <p className="text-gray-600">Plan your launches, campaigns, and store events.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Launch Schedule",
            description: "Set dates for new product or service launches.",
            action: "Schedule Launch",
          },
          {
            title: "Campaign Planner",
            description: "Plan marketing campaigns and promotional events.",
            action: "Create Campaign",
          },
          {
            title: "Reminders & Deadlines",
            description: "Add reminders for goals, updates, and tasks.",
            action: "Add Reminder",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-blue-600 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
