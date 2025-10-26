"use client";

export default function TeamAccess() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">🧑‍🤝‍🧑 Team Access</h1>
      <p className="text-gray-600">Invite team members and manage their permissions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Invite Member",
            description: "Send an invite to a teammate to join your store dashboard.",
            action: "Send Invite",
          },
          {
            title: "Assign Roles",
            description: "Set access levels like Admin, Manager, or Support.",
            action: "Manage Roles",
          },
          {
            title: "Activity Logs",
            description: "Track actions performed by each team member.",
            action: "View Logs",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <button className="mt-3 text-sm text-blue-900 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
