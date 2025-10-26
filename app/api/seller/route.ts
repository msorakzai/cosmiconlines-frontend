import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
});

// ------------------- CREATE STORE -------------------
export async function POST(req: Request): Promise<Response> {
  try {
    const {
      ownerId,
      storeName,
      description,
      tagline,
      storeEmail,
      storeCategory,
      storeSubCategory,
      theme,
      skipProduct,
    } = await req.json();

    if (!ownerId || !storeName) {
      return NextResponse.json(
        { message: "ownerId and storeName are required" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `INSERT INTO stores 
       (ownerId, storeName, description, tagline, email, category, badge, theme, skipProduct, isVerified, isDeleted, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 'draft')`,
      [
        ownerId,
        storeName,
        description ?? "",
        tagline ?? "",
        storeEmail ?? "",
        storeCategory ?? "",
        storeSubCategory ?? "",
        theme ?? "Light",
        skipProduct ? 1 : 0,
      ]
    );

    return NextResponse.json(
      { message: "✅ Store created successfully!", storeId: (result as any).insertId },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "❌ Error creating store", error: err.message },
      { status: 500 }
    );
  }
}

// ------------------- UPDATE STORE -------------------
export async function PUT(req: Request): Promise<Response> {
  try {
    const {
      storeId,
      storeName,
      description,
      tagline,
      storeEmail,
      storeCategory,
      storeSubCategory,
      theme,
      skipProduct,
    } = await req.json();

    if (!storeId) {
      return NextResponse.json({ message: "storeId is required" }, { status: 400 });
    }

    const [result] = await db.query(
      `UPDATE stores SET 
        storeName = ?, 
        description = ?, 
        tagline = ?, 
        email = ?, 
        category = ?, 
        badge = ?, 
        theme = ?, 
        skipProduct = ? 
       WHERE id = ?`,
      [
        storeName ?? "",
        description ?? "",
        tagline ?? "",
        storeEmail ?? "",
        storeCategory ?? "",
        storeSubCategory ?? "",
        theme ?? "Light",
        skipProduct ? 1 : 0,
        storeId,
      ]
    );

    return NextResponse.json(
      { message: "✅ Store updated successfully!", affectedRows: (result as any).affectedRows },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "❌ Error updating store", error: err.message },
      { status: 500 }
    );
  }
}

// ------------------- GET STORE -------------------
export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const storeId = url.searchParams.get("storeId");

    if (!storeId) {
      return NextResponse.json({ message: "storeId is required" }, { status: 400 });
    }

    const [rows] = await db.query("SELECT * FROM stores WHERE id = ?", [storeId]);

    if ((rows as any[]).length === 0) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json({ store: (rows as any)[0] }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "❌ Error fetching store", error: err.message },
      { status: 500 }
    );
  }
}
