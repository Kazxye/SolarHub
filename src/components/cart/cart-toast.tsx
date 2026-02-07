"use client";

import { useCart } from "@/context/cart-context";
import { ShoppingCart, Check } from "lucide-react";

export function CartToast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none transition-all duration-300 ${
        toast.visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
      }`}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-2xl"
        style={{
          background: "#1a1a1d",
          border: "1px solid #27272a",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(249,115,22,0.08)",
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(249,115,22,0.12)" }}
        >
          {toast.message.includes("já está") ? (
            <ShoppingCart className="w-3.5 h-3.5" style={{ color: "#f97316" }} />
          ) : (
            <Check className="w-3.5 h-3.5" style={{ color: "#f97316" }} />
          )}
        </div>
        <span className="text-[13px] font-medium" style={{ color: "#fafafa" }}>
          {toast.message}
        </span>
      </div>
    </div>
  );
}
