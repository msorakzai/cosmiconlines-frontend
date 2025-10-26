"use client";

import { createContext, useContext } from "react";

type SellerContextType = {
  sellerId: string;
};

export const SellerContext = createContext<SellerContextType>({
  sellerId: "abc123",
});

export const useSeller = () => useContext(SellerContext);
