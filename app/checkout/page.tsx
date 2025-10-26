"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartContext";


type BuyerInfo = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
};

const PLATFORM_COMMISSION_PERCENT = 10;

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();
  const router = useRouter();

  const [buyer, setBuyer] = useState<BuyerInfo>({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [billing, setBilling] = useState<BuyerInfo>({ ...buyer });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<{ code: string; discountAmount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "wallet">("cod");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Group cart items by seller
  const itemsBySeller = useMemo(() => {
    const map = new Map<string, { sellerName: string; items: CartItem[] }>();
    cartItems.forEach((it) => {
      const existing = map.get(it.sellerId);
      if (existing) existing.items.push(it);
      else map.set(it.sellerId, { sellerName: it.sellerName, items: [it] });
    });
    return Array.from(map.entries()).map(([sellerId, value]) => ({ sellerId, ...value }));
  }, [cartItems]);

  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems]);
  const perSellerTotals = useMemo(() => {
    return itemsBySeller.map((s) => {
      const sellerSubtotal = s.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
      const commission = Math.round((sellerSubtotal * PLATFORM_COMMISSION_PERCENT) / 100);
      return { sellerId: s.sellerId, sellerName: s.sellerName, sellerSubtotal, commission, payoutToSeller: sellerSubtotal - commission };
    });
  }, [itemsBySeller]);

  const totalCommission = perSellerTotals.reduce((acc, p) => acc + p.commission, 0);
  const total = subtotal - (couponApplied ? couponApplied.discountAmount : 0);

  // Coupon validation
  const validateAndApplyCoupon = (code: string) => {
    setError(null);
    if (!code) return setCouponApplied(null);
    const upperCode = code.toUpperCase();
    if (upperCode === "SAVE10") {
      if (subtotal >= 5000) setCouponApplied({ code: "SAVE10", discountAmount: Math.round(subtotal * 0.1) });
      else setError("SAVE10 requires minimum cart value of Rs 5,000");
    } else if (upperCode === "FLAT500") {
      if (subtotal >= 40000) setCouponApplied({ code: "FLAT500", discountAmount: 500 });
      else setError("FLAT500 requires minimum cart value of Rs 40,000");
    } else {
      setError("Invalid coupon code");
      setCouponApplied(null);
    }
  };

  // Form validation
  const validateForm = (): string | null => {
    const addresses = sameAsShipping ? [buyer] : [buyer, billing];
    for (const addr of addresses) {
      if (!addr.fullName.trim()) return "Full name is required";
      if (!addr.email.trim()) return "Email is required";
      if (!addr.phone.trim()) return "Phone number is required";
      if (!addr.address1.trim()) return "Address is required";
      if (!addr.city.trim()) return "City is required";
      if (!addr.province.trim()) return "Province is required";
      if (!addr.postalCode.trim()) return "Postal code is required";
    }
    if (!agreePolicy) return "You must agree to the Terms and Return Policy";
    if (cartItems.length === 0) return "Your cart is empty";
    return null;
  };

  // Create orders per seller
  const createOrdersForSellers = async () => {
    const ordersPayload = itemsBySeller.map((s) => {
      const sellerOrderItems = s.items.map((it) => ({
        id: it.productId,
        name: it.productName,
        price: it.price,
        quantity: it.quantity,
      }));

      const sellerSubtotal = sellerOrderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
      const commission = Math.round((sellerSubtotal * PLATFORM_COMMISSION_PERCENT) / 100);
      const discountShare = couponApplied ? Math.round((sellerSubtotal / subtotal) * couponApplied.discountAmount) : 0;

      return {
        sellerId: s.sellerId,
        sellerName: s.sellerName,
        items: sellerOrderItems,
        amounts: {
          sellerSubtotal,
          discountShare,
          commission,
          totalPayableByBuyer: sellerSubtotal - discountShare,
          payoutToSeller: sellerSubtotal - commission - discountShare,
        },
      };
    });

    await new Promise((res) => setTimeout(res, 900)); // simulate API
    return ordersPayload.map((o, idx) => ({ ...o, orderId: `ORD-${Date.now()}-${idx}` }));
  };

  // Place order handler
  const handlePlaceOrder = async () => {
    setError(null);
    setSuccessMsg(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    try {
      const createdOrders = await createOrdersForSellers();
      clearCart();
      setSuccessMsg("Order placed successfully. Redirecting...");
      if (typeof window !== "undefined") localStorage.setItem("lastOrders", JSON.stringify(createdOrders));
      setTimeout(() => router.push("/orders/thank-you"), 900);
    } catch (err: any) {
      setError(err?.message || "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------
  // Render Checkout Form & Summary
  // ---------------------------------------
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🛒 Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="md:col-span-2 space-y-4">
          {/* Shipping Form */}
          {/* ...same as your previous Checkout JSX, no TS errors */}
        </div>

        {/* Right: Order Summary */}
        {/* ...same as your previous Order Summary JSX */}
      </div>
    </div>
  );
}
