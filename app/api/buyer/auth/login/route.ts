// src/app/api/buyer/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });
  }

  // Mock check: in real app, query DB
  const token = btoa(JSON.stringify({ email, role: "buyer" }));

  return NextResponse.json({ success: true, token, message: "Login successful!" });
}
