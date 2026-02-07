"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent-glow hover:shadow-xl hover:shadow-accent-glow",
      secondary:
        "bg-surface text-text-primary hover:bg-surface-hover border border-border",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-surface",
      outline:
        "border border-accent text-accent hover:bg-accent hover:text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
