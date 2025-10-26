import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
  }

  let db;
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "cosmi_admin",
      password: "M@$ko-14301",
      database: "marketplace",
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    return NextResponse.json({ message: "Database connection error" }, { status: 500 });
  }

  try {
    const [sellerRows]: any = await db.execute(
      "SELECT id, password, store_id FROM sellers WHERE email = ?",
      [email]
    );

    if (sellerRows.length === 0) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    const seller = sellerRows[0];
    const dbPassword = seller.password;

    const isMatch =
      dbPassword === password || bcrypt.compareSync(password, dbPassword);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    if (dbPassword === password) {
      const hashed = bcrypt.hashSync(password, 10);
      await db.execute("UPDATE sellers SET password = ? WHERE id = ?", [hashed, seller.id]);
      console.log("🔐 Password upgraded to bcrypt for seller:", seller.id);
    }

    // ✅ Fix: fetch store via store_id
    const [storeRows]: any = await db.execute(
      "SELECT id, name FROM stores WHERE id = ? LIMIT 1",
      [seller.store_id]
    );

    if (storeRows.length === 0) {
      return NextResponse.json({ message: "No store found" }, { status: 404 });
    }

    const store = storeRows[0];

    return NextResponse.json({
      token: `token-${seller.id}`,
      ownerId: seller.id,
      storeId: store.id,
      storeName: store.name,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
