"use client";

import { useEffect, useState } from "react";
import { useSeller } from "@/context/SellerContext";
import { motion } from "framer-motion";

type QuickStatsProps = {
  revenue?: string | number;
  orders?: number;
  products?: number;
  visitors?: number;
  section?: string;
};

export default function QuickStats({
  revenue,
  orders,
  products,
  visitors,
  section,
}: QuickStatsProps) {
  const { sellerId } = useSeller();
  const [stats, setStats] = useState({
    orders: orders ?? 0,
    revenue: revenue ?? "0.00",
    products: products ?? 0,
    visitors: visitors ?? 0,
  });

  useEffect(() => {
    if (!revenue && !orders && !products && !visitors) {
      const fetchStats = async () => {
        try {
          const res = await fetch(`/api/analytics?sellerId=${sellerId}`);
          const data = await res.json();
          setStats({
            orders: data.orders ?? 0,
            revenue: data.revenue ?? "0.00",
            products: data.products ?? 0,
            visitors: data.visitors ?? 0,
          });
        } catch (err) {
          console.error("❌ Failed to fetch analytics:", err);
        }
      };
      fetchStats();
    }
  }, [sellerId, revenue, orders, products, visitors]);

  const statList = [
    { title: "Orders", value: stats.orders, color: "text-blue-600" },
    { title: "Revenue", value: `₦${stats.revenue}`, color: "text-green-600" },
    { title: "Products", value: stats.products, color: "text-purple-600" },
    { title: "Visitors", value: stats.visitors, color: "text-orange-600" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {statList.map((stat) => (
        <motion.div
          key={stat.title}
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-sm rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all"
        >
          <h3 className="text-sm text-gray-500">{stat.title}</h3>
          <p className={`text-2xl font-bold ${stat.color}`}>
            {stat.value ?? "—"}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
