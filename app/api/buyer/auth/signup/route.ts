// src/app/api/buyer/auth/signup/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });
  }

  // Mock JWT token generation
  const token = btoa(JSON.stringify({ email, role: "buyer" }));

  // Save mock user in localStorage (frontend will use it)
  return NextResponse.json({ success: true, token, message: "Account created successfully!" });
}
