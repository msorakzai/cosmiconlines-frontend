// src/app/api/store/preview/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// POST: create preview store
export async function POST() {
  try {
    // Find preview user
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      ["preview@cosmic.com"]
    );
    const user = (users as any[])[0];

    if (!user) {
      return NextResponse.json({ error: "Preview user not found" }, { status: 404 });
    }

    // Insert new store
    const [result] = await db.query(
      `INSERT INTO stores 
      (storeName, description, theme, category, subCategories, logoUrl, bannerUrl, email, status, ownerId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Cosmic Marketplace",
        "Modular store preview",
        "light",
        "general",
        JSON.stringify(["tech", "fashion"]), // store subcategories as JSON
        "",
        "",
        "preview@cosmic.com",
        "active",
        user.id,
      ]
    );

    const storeId = (result as any).insertId;

    // Fetch the newly created store
    const [stores] = await db.query("SELECT * FROM stores WHERE id = ?", [storeId]);
    const store = (stores as any[])[0];

    return NextResponse.json({ store }, { status: 200 });
  } catch (err: any) {
    console.error("Preview store error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
