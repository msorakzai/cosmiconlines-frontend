import OrderClient from "./OrderClient";
import { orders } from "@/data/orders";

export default function OrderPage({ params }: { params: { orderId: string } }) {
  const order = orders.find((o) => o.id === params.orderId);
  return <OrderClient order={order} />;
}

export async function generateStaticParams() {
  return orders.map((o) => ({
    orderId: o.id,
  }));
}
