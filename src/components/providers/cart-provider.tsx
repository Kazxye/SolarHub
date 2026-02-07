"use client";

import { type ReactNode } from "react";
import { CartProvider as CartContextProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartToast } from "@/components/cart/cart-toast";

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      {children}
      <CartDrawer />
      <CartToast />
    </CartContextProvider>
  );
}
