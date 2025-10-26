import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { type, productTitle, category, price } = await req.json();

  if (!type || !productTitle || !category || !price) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  let content = "";

  switch (type) {
    case "listing":
      content = `🛍️ Title: ${productTitle}\n📄 Description: Premium ${category} with cosmic style.\n🏷️ Tags: ${category}, fashion, cosmic, hoodie`;
      break;

    case "pricing":
      const min = Math.floor(price * 0.8);
      const max = Math.ceil(price * 1.2);
      content = `💰 Suggested Price Range: PKR ${min} – PKR ${max}\nBased on similar ${category} listings in the marketplace.`;
      break;

    case "coaching":
      content = `📈 Seller Tips:\n- Use high-quality images\n- Highlight unique features\n- Offer limited-time discounts\n- Respond quickly to messages\n- Add keywords like "${category}", "trending", "exclusive"`;
      break;

    default:
      return NextResponse.json({ message: "Invalid AI helper type." }, { status: 400 });
  }

  return NextResponse.json({ content, message: `✅ ${type} suggestion generated.` }, { status: 200 });
}
