"use client";

import React, { useEffect, useState } from "react";

interface StoreStatus {
  setupComplete: boolean;
  subscriptionPaid: boolean;
  publishRequested: boolean;
  approved: boolean;
}

export default function Publish() {
  const [status, setStatus] = useState<StoreStatus>({
    setupComplete: false,
    subscriptionPaid: false,
    publishRequested: false,
    approved: false,
  });

  const sellerId =
    typeof window !== "undefined" ? localStorage.getItem("sellerId") || "" : "";

  useEffect(() => {
    async function fetchStatus() {
      if (!sellerId) return;
      try {
        const res = await fetch(`/api/store/status?sellerId=${sellerId}`);
        const data = await res.json();
        if (res.ok) setStatus(data);
      } catch (err) {
        console.error("❌ Failed to fetch store status:", err);
      }
    }
    fetchStatus();
  }, [sellerId]);

  const handlePublish = async () => {
    try {
      const res = await fetch(`/api/store/request-publish?sellerId=${sellerId}`, {
        method: "POST",
      });
      if (res.ok) {
        alert("🛎️ Publish request sent to admin!");
        setStatus((prev) => ({ ...prev, publishRequested: true }));
      } else {
        alert("❌ Failed to send publish request.");
      }
    } catch (err) {
      console.error("❌ Publish error:", err);
    }
  };

  const handlePayment = () => {
    alert("💸 Redirecting to payment...");
    // Redirect to billing or payment gateway
  };

  const canPublish =
    status.setupComplete && status.subscriptionPaid && !status.publishRequested;

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow border max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600">🔒 Publish Your Store</h2>
      <p className="text-gray-700">
        To make your store public, complete setup, pay ₹100, and request publish.
      </p>

      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>{status.setupComplete ? "✅ Store setup complete" : "❌ Setup incomplete"}</li>
        <li>{status.subscriptionPaid ? "✅ ₹100 subscription paid" : "🧾 ₹100 subscription unpaid"}</li>
        <li>{status.publishRequested ? "🛎️ Publish request sent" : "🛎️ Publish not requested"}</li>
        <li>{status.approved ? "✅ Approved by admin" : "🔍 Awaiting admin approval"}</li>
      </ul>

      {!status.subscriptionPaid && (
        <button
          onClick={handlePayment}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          💸 Pay ₹100 Subscription
        </button>
      )}

      {canPublish && (
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          🚀 Request Publish
        </button>
      )}

      {status.approved && (
        <p className="text-green-600 font-semibold mt-4">
          ✅ Your store is now live and visible to buyers!
        </p>
      )}
    </div>
  );
}
