"use client";

import { ReactNode } from "react";
import HeaderNav from "./HeaderNav";
import SellerFooter from "./SellerFooter";

interface LayoutProps {
  children: ReactNode;
}

export default function SellerLayoutWrapper({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />
      <main className="p-6">{children}</main>
      <SellerFooter />
    </div>
  );
}
