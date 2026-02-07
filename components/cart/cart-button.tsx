"use client";

import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { toggleCart, itemCount } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 rounded-lg transition-all duration-200 group"
      style={{ color: "#a1a1aa" }}
      aria-label={`Carrinho (${itemCount} itens)`}
    >
      <ShoppingCart className="w-[18px] h-[18px] transition-colors duration-200 group-hover:text-white" />

      {/* Badge */}
      {itemCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold rounded-full cart-badge-pop"
          style={{
            background: "#f97316",
            color: "#fff",
            boxShadow: "0 0 8px rgba(249,115,22,0.4)",
            padding: "0 4px",
          }}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: "rgba(249,115,22,0.06)" }}
      />
    </button>
  );
}
