"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────
   ModalShell — accessible dialog wrapper
   ─────────────────────────────────────────────────
   ✓ Focus trap (Tab / Shift+Tab)
   ✓ Scroll lock on body
   ✓ ESC to close
   ✓ Click overlay to close
   ✓ Return focus to trigger on close
   ✓ role="dialog", aria-modal, aria-labelledby, aria-describedby
   ✓ prefers-reduced-motion respected via CSS
   ───────────────────────────────────────────────── */

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  labelId: string;
  descriptionId: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

export function ModalShell({
  open,
  onClose,
  triggerRef,
  labelId,
  descriptionId,
  children,
}: ModalShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);

  /* ── Scroll lock ── */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ── Focus trap + ESC ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open || !dialogRef.current) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Return focus on close ── */
  useEffect(() => {
    if (!open && isClosing.current) {
      isClosing.current = false;
      triggerRef?.current?.focus();
    }
    if (open) {
      isClosing.current = true;
    }
  }, [open, triggerRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="login-modal-overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog positioner */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          className={cn(
            "login-modal-card pointer-events-auto relative w-full max-w-[440px]",
            "rounded-2xl sm:rounded-3xl bg-surface border border-border/60",
            "shadow-2xl shadow-black/30",
            /* Mobile: bottom sheet feel */
            "max-h-[90vh] overflow-y-auto",
            "lg:max-h-[85vh]"
          )}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
