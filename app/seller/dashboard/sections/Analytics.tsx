"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const [stats, setStats] = useState<any>(null);
  const sellerId =
    typeof window !== "undefined" ? localStorage.getItem("sellerId") || "" : "";

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(`/api/analytics?sellerId=${sellerId}`);
        const data = await res.json();
        console.log("📊 Analytics response:", data);
        setStats(data);
      } catch (err) {
        console.error("❌ Failed to fetch analytics:", err);
      }
    }

    if (sellerId) fetchAnalytics();
  }, [sellerId]);

  const visitorSourceData = {
    labels: Object.keys(stats?.visitorSources || { Direct: 100 }),
    datasets: [
      {
        data: Object.values(stats?.visitorSources || { Direct: 100 }),
        backgroundColor: ["#f97316", "#22c55e", "#3b82f6", "#eab308"],
      },
    ],
  };

  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "₦",
        data: [stats?.totalRevenue || 0],
        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h3 className="text-xl font-semibold text-orange-400">📈 Store Analytics</h3>

      {!stats ? (
        <div className="text-gray-400 text-center py-10">🔄 Loading analytics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Revenue Bar */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="text-white mb-2">Total Revenue</h4>
              <Bar data={revenueData} options={{ responsive: true }} />
            </div>

            {/* Visitor Sources Doughnut */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="text-white mb-2">Visitor Sources</h4>
              <Doughnut data={visitorSourceData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-gray-800 p-4 rounded-lg shadow text-white space-y-2">
            <p>🛒 Total Orders: {stats?.totalOrders ?? 0}</p>
            <p>💰 Total Revenue: ₦{stats?.totalRevenue ?? "0.00"}</p>
          </div>
        </>
      )}
    </div>
  );
}
