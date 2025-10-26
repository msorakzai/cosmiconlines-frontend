"use client";

import { useState, useEffect } from "react";

interface Message {
  _id?: string;
  type: "buyer" | "support" | "order";
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export default function SellerInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [active, setActive] = useState<Message | null>(null);

  const fetchMessages = async () => {
    const res = await fetch("/api/inbox");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (_id: string) => {
    await fetch("/api/inbox", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/inbox", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
  };

  const handleReply = async () => {
    if (!active || !reply) return;
    await fetch("/api/inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "support",
        sender: "Seller",
        subject: `Reply to: ${active.subject}`,
        content: reply,
      }),
    });
    setReply("");
    setActive(null);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">📥 Seller Inbox</h1>
      <p className="text-gray-600">View and respond to messages from buyers and support.</p>

      {/* Message List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`bg-white border rounded-xl p-4 shadow-sm transition hover:shadow-md ${
              msg.read ? "border-gray-200" : "border-blue-400"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800">{msg.subject}</h2>
            <p className="text-sm text-gray-500">{msg.content}</p>
            <p className="text-xs text-gray-400 mt-1">📨 {msg.sender} • {msg.type}</p>
            <p className="text-xs text-gray-400">🕒 {new Date(msg.timestamp).toLocaleString()}</p>
            <div className="mt-3 flex gap-2">
              {!msg.read && (
                <button
                  onClick={() => markAsRead(msg._id!)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Mark Read
                </button>
              )}
              <button
                onClick={() => setActive(msg)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Reply
              </button>
              <button
                onClick={() => handleDelete(msg._id!)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      {active && (
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Reply to: {active.subject}</h3>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleReply}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
}
