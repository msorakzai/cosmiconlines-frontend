// src/pages/api/products/featured.ts

import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

type FeaturedProductRow = RowDataPacket & {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  badge: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const conn = await pool.getConnection();

    const query = `
      SELECT id, name, category, price, description, imageUrl, badge
      FROM products
      WHERE isActive = 1
      ORDER BY createdAt DESC
      LIMIT 8
    `;

    const [rows] = await conn.query<FeaturedProductRow[]>(query);
    conn.release();

    const safeProducts = rows.map((product) => ({
      id: product.id,
      name: product.name || "Untitled Product",
      category: product.category || "Uncategorized",
      price: product.price || 0,
      description: product.description || "No description available.",
      imageUrl: product.imageUrl || "https://via.placeholder.com/300",
      badge: product.badge || "",
    }));

    console.log("✅ Featured products returned:", safeProducts.length);

    res.status(200).json(safeProducts);
  } catch (err: any) {
    console.error("❌ Featured product fetch error:", err.message);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}
