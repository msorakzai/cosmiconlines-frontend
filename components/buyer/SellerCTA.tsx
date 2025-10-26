"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface SellerCTAProps {
  sellerName: string;
  theme?: "cosmic" | "minimal" | "seasonal";
}

export default function SellerCTA({ sellerName, theme = "minimal" }: SellerCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const themeStyles = {
    cosmic: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
    minimal: "bg-gray-100 text-gray-800",
    seasonal: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
  };

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Send message to seller inbox via API
    console.log(`Message to ${sellerName}: ${message}`);
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full h-9 rounded-full font-semibold text-sm text-center transition-all px-3 py-1 ${
          theme === "minimal"
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : theme === "cosmic"
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-yellow-500 text-white hover:bg-orange-600"
        }`}
      >
        💬 Contact {sellerName}
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className={`w-full max-w-md rounded-xl p-6 shadow-xl ${themeStyles[theme]}`}>
          <Dialog.Title className="text-lg font-bold mb-2">Message {sellerName}</Dialog.Title>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Type your message..."
            className="w-full p-3 rounded-md text-black text-sm mb-4"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
