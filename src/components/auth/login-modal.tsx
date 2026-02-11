"use client";

import { type RefObject } from "react";
import { ModalShell } from "./modal-shell";
import { LoginForm } from "./login-form";

/* ─────────────────────────────────────────────────
   LoginModal — shell + form composed
   ───────────────────────────────────────────────── */

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

const LABEL_ID = "login-modal-title";
const DESC_ID = "login-modal-desc";

export function LoginModal({ open, onClose, onSuccess, triggerRef }: LoginModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      triggerRef={triggerRef}
      labelId={LABEL_ID}
      descriptionId={DESC_ID}
    >
      <LoginForm
        labelId={LABEL_ID}
        descriptionId={DESC_ID}
        onSuccess={onSuccess}
      />
    </ModalShell>
  );
}
