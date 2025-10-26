import { NextResponse } from "next/server";

type ThemeConfig = {
  sellerId: string;
  theme: string;
  preset: string;
  suggested: string;
};

const themeStore: Record<string, ThemeConfig> = {};

// ------------------- GET THEME -------------------
export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const sellerId = url.searchParams.get("sellerId");

    if (!sellerId) {
      return NextResponse.json({ error: "Missing sellerId" }, { status: 400 });
    }

    const saved = themeStore[sellerId];
    const suggested = saved?.theme === "dark" ? "cosmic" : "dark";

    return NextResponse.json({
      theme: saved?.theme ?? "light",
      preset: saved?.preset ?? "",
      suggested,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Unexpected error" }, { status: 500 });
  }
}

// ------------------- SET THEME -------------------
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { sellerId, theme, preset } = body;

    if (!sellerId || !theme) {
      return NextResponse.json({ error: "Missing sellerId or theme" }, { status: 400 });
    }

    themeStore[sellerId] = {
      sellerId,
      theme,
      preset: preset ?? "",
      suggested: theme === "light" ? "dark" : "cosmic",
    };

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Unexpected error" }, { status: 500 });
  }
}
