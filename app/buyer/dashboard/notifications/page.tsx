"use client";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  message: string;
  type: string;
  date: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/buyer/notifications", {
      headers: { Authorization: "Bearer demo" } // replace with real token
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">🛎️ Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((note) => (
          <li key={note.id} className="p-4 bg-white/10 rounded-lg shadow">
            <p>{note.message}</p>
            <span className="text-xs text-gray-300">{note.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
