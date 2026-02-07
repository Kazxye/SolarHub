"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  X,
  Trash2,
  ShoppingBag,
  Fingerprint,
  ArrowRight,
} from "lucide-react";

/* ────────────────────────────────────────────── */
/*  Accent colors for item accents                 */
/* ────────────────────────────────────────────── */

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  red:     { text: "#f87171", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)" },
  amber:   { text: "#fbbf24", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  blue:    { text: "#60a5fa", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
  emerald: { text: "#34d399", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
  violet:  { text: "#a78bfa", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)" },
};

/* ────────────────────────────────────────────── */
/*  Cart Drawer                                    */
/* ────────────────────────────────────────────── */

export function CartDrawer() {
  const { items, removeItem, clearCart, isOpen, closeCart, total } = useCart();
  const [closing, setClosing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      closeCart();
      setClosing(false);
    }, 250);
  }, [closeCart]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const handleRemove = useCallback(
    (id: string) => {
      setRemovingId(id);
      setTimeout(() => {
        removeItem(id);
        setRemovingId(null);
      }, 200);
    },
    [removeItem]
  );

  const scrollToProducts = useCallback(() => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [handleClose]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;

  return (
    <div className="fixed inset-0 z-[55]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${
          closing ? "cart-overlay-exit" : "cart-overlay-enter"
        }`}
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-[420px] flex flex-col ${
          closing ? "cart-drawer-exit" : "cart-drawer-enter"
        }`}
        style={{
          background: "#0f0f11",
          borderLeft: "1px solid #1e1e21",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid #1e1e21" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(249,115,22,0.1)" }}
            >
              <ShoppingBag className="w-4 h-4" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold" style={{ color: "#fafafa" }}>
                Seu carrinho
              </h2>
              {!isEmpty && (
                <p className="text-[11px]" style={{ color: "#52525b" }}>
                  {items.length} {items.length === 1 ? "item" : "itens"}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ background: "#1a1a1d", color: "#71717a" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Content ── */}
        {isEmpty ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.1)" }}
            >
              <ShoppingBag className="w-7 h-7" style={{ color: "#52525b" }} />
            </div>
            <h3 className="text-base font-semibold mb-1" style={{ color: "#a1a1aa" }}>
              Carrinho vazio
            </h3>
            <p className="text-[13px] text-center leading-relaxed mb-5" style={{ color: "#52525b" }}>
              Explore nossos scripts e adicione<br />planos ao seu carrinho.
            </p>
            <Button variant="primary" size="md" onClick={scrollToProducts}>
              Explorar ferramentas
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 cart-scroll">
              {items.map((item, index) => {
                const colors = colorMap[item.accentColor] || colorMap.amber;
                const isRemoving = removingId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`cart-item-enter transition-all duration-200 ${
                      isRemoving ? "opacity-0 translate-x-4 scale-95" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 40}ms`,
                    }}
                  >
                    <div
                      className="relative flex items-center gap-3 p-3 rounded-xl group"
                      style={{
                        background: "#141416",
                        border: "1px solid #1e1e21",
                      }}
                    >
                      {/* Product image / icon */}
                      <div
                        className="w-11 h-11 rounded-lg overflow-hidden shrink-0 relative"
                        style={{ border: `1px solid ${colors.border}` }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: colors.bg }}
                          >
                            <Fingerprint className="w-5 h-5" style={{ color: colors.text }} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[13px] font-bold truncate"
                            style={{ color: "#fafafa" }}
                          >
                            {item.productName}
                          </span>
                          <span
                            className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded shrink-0"
                            style={{ background: colors.bg, color: colors.text }}
                          >
                            {item.planName}
                          </span>
                        </div>
                        <p className="text-[11px] mt-0.5" style={{ color: "#52525b" }}>
                          {item.period}
                        </p>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-extrabold" style={{ color: "#f97316" }}>
                          {item.price}
                        </span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#f87171" }}
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Footer / Summary ── */}
            <div
              className="shrink-0 px-5 py-4 space-y-3"
              style={{
                borderTop: "1px solid #1e1e21",
                background: "linear-gradient(to top, #0c0c0e, #0f0f11)",
              }}
            >
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: "#71717a" }}>
                  Subtotal
                </span>
                <span className="text-[13px] font-medium" style={{ color: "#a1a1aa" }}>
                  R${total.toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Total */}
              <div
                className="flex items-center justify-between py-3 px-4 rounded-xl"
                style={{
                  background: "rgba(249,115,22,0.04)",
                  border: "1px solid rgba(249,115,22,0.1)",
                }}
              >
                <span className="text-[13px] font-semibold" style={{ color: "#fafafa" }}>
                  Total
                </span>
                <span className="text-lg font-extrabold" style={{ color: "#f97316" }}>
                  R${total.toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  Finalizar compra
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  onClick={scrollToProducts}
                  className="w-full py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 text-center"
                  style={{ color: "#71717a" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#a1a1aa")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
                >
                  Continuar comprando
                </button>
              </div>

              {/* Clear cart */}
              {items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="w-full py-1.5 text-[11px] font-medium rounded-lg transition-colors duration-200 text-center"
                  style={{ color: "#3f3f46" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3f3f46")}
                >
                  Limpar carrinho
                </button>
              )}

              {/* Security note */}
              <p className="text-[10px] text-center leading-relaxed" style={{ color: "#3f3f46" }}>
                Pagamento seguro via PIX ou cartão. Ativação instantânea.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
