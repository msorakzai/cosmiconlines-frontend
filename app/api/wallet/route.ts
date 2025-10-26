// File: src/app/api/wallet/route.ts

import { NextResponse } from "next/server";

type Payout = {
  id: string;
  amount: number;
  date: string;
  method: string;
};

type Transaction = {
  id: string;
  type: "sale" | "fee" | "refund";
  amount: number;
  date: string;
  description: string;
};

type Wallet = {
  balance: number;
  earnings: number;
  payouts: Payout[];
  transactions: Transaction[];
};

export async function GET() {
  const wallet: Wallet = {
    balance: 125000,
    earnings: 540000,
    payouts: [
      {
        id: "p1",
        amount: 50000,
        date: "2025-09-15",
        method: "Bank Transfer",
      },
      {
        id: "p2",
        amount: 75000,
        date: "2025-10-01",
        method: "JazzCash",
      },
    ],
    transactions: [
      {
        id: "t1",
        type: "sale",
        amount: 30000,
        date: "2025-10-10",
        description: "Order #1234",
      },
      {
        id: "t2",
        type: "fee",
        amount: -1500,
        date: "2025-10-11",
        description: "Platform Fee",
      },
      {
        id: "t3",
        type: "refund",
        amount: -5000,
        date: "2025-10-12",
        description: "Refund for Order #1229",
      },
      {
        id: "t4",
        type: "sale",
        amount: 45000,
        date: "2025-10-13",
        description: "Order #1235",
      },
    ],
  };

  return NextResponse.json(wallet);
}
