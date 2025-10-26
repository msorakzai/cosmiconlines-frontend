import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

type PublicStoreRow = RowDataPacket & {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  avatar: string;
  theme: string;
  bio: string;
};

export async function GET(req: NextRequest) {
  try {
    const conn = await pool.getConnection();

    const query = `
      SELECT id, name, category, subCategory,
             avatar AS logoUrl,
             theme AS bannerUrl,
             bio AS description
      FROM stores
      WHERE isDeleted = 0
        AND isVerified = 1
        AND status = 'published'
      ORDER BY createdAt DESC
    `;

    const [rows] = await conn.query<PublicStoreRow[]>(query);
    conn.release();

    const safeStores = rows.map((store) => ({
      id: store.id,
      name: store.name || "Untitled Store",
      category: store.category || "Uncategorized",
      subCategory: store.subCategory || "—",
      logoUrl: store.logoUrl || "https://i.pravatar.cc/100",
      bannerUrl: store.bannerUrl || "https://picsum.photos/600/200",
      description: store.description || "No description available.",
      theme: store.theme || "default",
    }));

    console.log("✅ Public stores returned:", safeStores.length);

    return NextResponse.json({ stores: safeStores }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Public store fetch error:", err.message);
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
