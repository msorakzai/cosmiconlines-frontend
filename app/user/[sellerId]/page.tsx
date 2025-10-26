import UserClient from "./UserClient";
import { sellers } from "@/data/sellers";

export default function SellerPage({ params }: { params: { sellerId: string } }) {
  const seller = sellers.find((s) => s.id === params.sellerId);
  return <UserClient seller={seller} />;
}

export async function generateStaticParams() {
  return sellers.map((s) => ({
    sellerId: s.id,
  }));
}
