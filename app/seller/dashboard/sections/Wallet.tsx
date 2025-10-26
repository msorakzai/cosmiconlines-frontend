"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

export default function Wallet({ storeId }: { storeId: string }) {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wallet data from localStorage or API
    const savedBalance = localStorage.getItem("storeWalletBalance");
    const savedHistory = localStorage.getItem("storeWalletHistory");

    setBalance(savedBalance ? Number(savedBalance) : 0);
    setHistory(savedHistory ? JSON.parse(savedHistory) : []);
    setLoading(false);
  }, []);

  const triggerPayout = () => {
    if (!payoutAmount || isNaN(Number(payoutAmount)) || Number(payoutAmount) > balance) {
      toast.error("Enter valid payout amount.");
      return;
    }

    const amt = Number(payoutAmount);
    const newHistory = [
      { type: "Paid", amount: amt, date: new Date().toISOString() },
      ...history,
    ];

    setBalance((prev) => prev - amt);
    setHistory(newHistory);
    setPayoutAmount("");

    // Save locally
    localStorage.setItem("storeWalletBalance", String(balance - amt));
    localStorage.setItem("storeWalletHistory", JSON.stringify(newHistory));

    toast.success("✅ Payout triggered!");
  };

  const exportCSV = () => {
    const rows = [["Type", "Amount", "Date"], ...history.map((tx) => [tx.type, tx.amount, new Date(tx.date).toLocaleString()])];
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "wallet-report.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Seller Wallet Report", 14, 15);
    (doc as any).autoTable({
      startY: 20,
      head: [["Type", "Amount", "Date"]],
      body: history.map((tx) => [tx.type, tx.amount, new Date(tx.date).toLocaleString()]),
    });
    doc.save("wallet-report.pdf");
  };

  const handleBack = () => {
    router.push(`/seller/dashboard?tab=Payment`);
  };

  const handleNext = () => {
    router.push(`/seller/dashboard?tab=Preview`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🧮 Seller Wallet</h2>
      <p className="text-gray-600 text-sm">Track your earnings, payouts, and export reports.</p>

      {/* Balance */}
      <div className="text-center text-3xl font-bold text-green-600 mt-2">
        ₨ {balance.toLocaleString()} PKR
      </div>

      {/* Payout */}
      <div className="flex gap-4 mt-4">
        <input
          type="number"
          value={payoutAmount}
          onChange={(e) => setPayoutAmount(e.target.value)}
          placeholder="Enter payout amount"
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={triggerPayout}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          💸 Payout
        </button>
      </div>

      {/* Export */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={exportCSV}
          className="flex-1 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
          📄 Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="flex-1 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
          📑 Download PDF
        </button>
      </div>

      {/* History */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📜 Transaction History</h3>
        {history.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((tx, index) => (
              <li key={index} className="border rounded px-4 py-2 flex justify-between">
                <span>{tx.type}</span>
                <span>₨ {tx.amount.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{new Date(tx.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          ⬅️ Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
