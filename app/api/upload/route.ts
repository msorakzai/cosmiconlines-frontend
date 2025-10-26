import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
