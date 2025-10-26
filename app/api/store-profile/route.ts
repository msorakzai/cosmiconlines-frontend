import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// ✅ Correct type for App Router context
export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;

  console.log("🔍 Incoming request for store profile");
  console.log("🧠 storeId param:", storeId);

  if (!storeId) {
    return NextResponse.json({ message: "Missing storeId" }, { status: 400 });
  }

  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "cosmi_admin",
      password: "M@$ko-14301",
      database: "marketplace",
    });

    const [rows]: any = await db.execute(
      "SELECT * FROM stores WHERE id = ? AND isDeleted = 0",
      [storeId]
    );

    console.log("📦 Store rows:", rows);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    const store = rows[0];

    return NextResponse.json({
      name: store.name || "Untitled Store",
      avatar: store.avatar || "",
      bio: store.bio || "",
      theme: store.theme || "#000000",
      subCategory: store.subCategory || "Uncategorized",
      badge: store.badge || "—",
      status: store.status || "draft",
      launchDate: store.launchDate || "—",
      revenue: store.revenue || "0.00",
      orders: store.orders || 0,
      logoUrl: store.avatar || "",
      bannerUrl: store.theme || "",
      description: store.bio || "",
    });
  } catch (err: any) {
    console.error("❌ Store profile fetch error:", err.message);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
