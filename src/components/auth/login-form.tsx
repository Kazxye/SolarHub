"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, Lock, Eye, EyeOff, Loader2, User, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────
   AuthForm — Login + Register with tabs
   ───────────────────────────────────────────────── */

type AuthMode = "login" | "register";

interface LoginFormProps {
  labelId: string;
  descriptionId: string;
  onSuccess: () => void;
}

/* ── Mock API — easy to replace with real endpoints ── */

async function handleLogin(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).catch(() => null);

  if (!res || !res.ok) {
    await new Promise((r) => setTimeout(r, 1200));
    return { ok: true };
  }
  return { ok: true };
}

async function handleRegister(name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).catch(() => null);

  if (!res || !res.ok) {
    await new Promise((r) => setTimeout(r, 1400));
    return { ok: true };
  }
  return { ok: true };
}

/* ── Validation ── */

function validateEmail(v: string): string | null {
  if (!v.trim()) return "Informe seu email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Formato de email inválido.";
  return null;
}

function validatePassword(v: string): string | null {
  if (!v) return "Informe sua senha.";
  if (v.length < 6) return "Mínimo 6 caracteres.";
  return null;
}

function validateConfirm(pw: string, confirm: string): string | null {
  if (!confirm) return "Confirme sua senha.";
  if (pw !== confirm) return "As senhas não coincidem.";
  return null;
}

function validateName(v: string): string | null {
  if (!v.trim()) return "Informe seu nome.";
  if (v.trim().length < 2) return "Mínimo 2 caracteres.";
  return null;
}

/* ── Discord icon ── */

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ── Reusable input field ── */

const inputBase = [
  "w-full py-3 text-sm rounded-xl outline-none transition-all duration-200",
  "bg-surface-hover border text-text-primary placeholder:text-text-secondary/50",
  "focus:border-accent focus:ring-1 focus:ring-accent/30",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

function InputField({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  icon: Icon,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  errorId,
  rightAction,
  inputRef,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  icon: typeof Mail;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  errorId?: string;
  rightAction?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-medium text-text-primary/70">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
          <Icon className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            inputBase,
            "pl-10",
            rightAction ? "pr-11" : "pr-4",
            error ? "border-red-500/50" : "border-zinc-700"
          )}
        />
        {rightAction}
      </div>
      {error && (
        <p id={errorId} className="text-[12px] text-red-400 pl-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────── */

export function LoginForm({ labelId, descriptionId, onSuccess }: LoginFormProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const isLogin = mode === "login";

  /* Refs for auto-focus */
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const registerNameRef = useRef<HTMLInputElement>(null);

  /* ── Shared state ── */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);

  /* ── Register-only state ── */
  const [name, setName] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  /* ── UI state ── */
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /* Auto-focus first field on mode change */
  useEffect(() => {
    const t = setTimeout(() => {
      if (isLogin) {
        loginEmailRef.current?.focus();
      } else {
        registerNameRef.current?.focus();
      }
    }, 80);
    return () => clearTimeout(t);
  }, [mode, isLogin]);

  /* Clear messages when typing */
  useEffect(() => {
    if (globalError) setGlobalError("");
    if (globalSuccess) setGlobalSuccess("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, name, confirmPw]);

  /* Switch mode — reset state cleanly */
  const switchMode = useCallback((m: AuthMode) => {
    setMode(m);
    setShowPw(false);
    setPassword("");
    setConfirmPw("");
    setName("");
    setGlobalError("");
    setGlobalSuccess("");
    setFieldErrors({});
    setTouched({});
  }, []);

  /* Blur handler */
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((t) => ({ ...t, [field]: true }));
      const validators: Record<string, () => string | null> = {
        name: () => validateName(name),
        email: () => validateEmail(email),
        password: () => validatePassword(password),
        confirmPw: () => validateConfirm(password, confirmPw),
      };
      if (validators[field]) {
        setFieldErrors((e) => ({ ...e, [field]: validators[field]() ?? undefined }));
      }
    },
    [name, email, password, confirmPw]
  );

  /* Live validation for touched fields */
  useEffect(() => {
    if (touched.email) setFieldErrors((e) => ({ ...e, email: validateEmail(email) ?? undefined }));
  }, [email, touched.email]);

  useEffect(() => {
    if (touched.password) setFieldErrors((e) => ({ ...e, password: validatePassword(password) ?? undefined }));
  }, [password, touched.password]);

  useEffect(() => {
    if (touched.name) setFieldErrors((e) => ({ ...e, name: validateName(name) ?? undefined }));
  }, [name, touched.name]);

  useEffect(() => {
    if (touched.confirmPw) setFieldErrors((e) => ({ ...e, confirmPw: validateConfirm(password, confirmPw) ?? undefined }));
  }, [password, confirmPw, touched.confirmPw]);

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const emailErr = validateEmail(email);
      const pwErr = validatePassword(password);
      setTouched({ email: true, password: true });
      setFieldErrors({ email: emailErr ?? undefined, password: pwErr ?? undefined });
      if (emailErr || pwErr) return;

      setLoading(true);
      setGlobalError("");
      try {
        const result = await handleLogin(email, password);
        if (result.ok) {
          onSuccess();
        } else {
          setGlobalError(result.error ?? "Email ou senha incorretos.");
        }
      } catch {
        setGlobalError("Erro de conexão. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      const nameErr = validateName(name);
      const emailErr = validateEmail(email);
      const pwErr = validatePassword(password);
      const confirmErr = validateConfirm(password, confirmPw);
      setTouched({ name: true, email: true, password: true, confirmPw: true });
      setFieldErrors({
        name: nameErr ?? undefined,
        email: emailErr ?? undefined,
        password: pwErr ?? undefined,
        confirmPw: confirmErr ?? undefined,
      });
      if (nameErr || emailErr || pwErr || confirmErr) return;

      setLoading(true);
      setGlobalError("");
      try {
        const result = await handleRegister(name, email, password);
        if (result.ok) {
          setGlobalSuccess("Conta criada com sucesso!");
          setTimeout(() => onSuccess(), 800);
        } else {
          setGlobalError(result.error ?? "Erro ao criar conta.");
        }
      } catch {
        setGlobalError("Erro de conexão. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  /* ── Password toggle button ── */
  const pwToggle = (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPw((p) => !p)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
      aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
    >
      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="p-6 sm:p-7">
      {/* ── Header ── */}
      <div className="mb-5">
        <h2 id={labelId} className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
          {isLogin ? "Entrar" : "Criar conta"}
        </h2>
        <p id={descriptionId} className="mt-1.5 text-sm text-text-secondary">
          {isLogin ? "Acesse sua conta para continuar." : "Preencha os dados abaixo para começar."}
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex mb-5 p-1 rounded-xl bg-surface-hover/60 border border-border/40">
        {(["login", "register"] as AuthMode[]).map((tab) => {
          const active = mode === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => !loading && switchMode(tab)}
              disabled={loading}
              className={cn(
                "flex-1 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-all duration-200",
                active
                  ? "bg-surface text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
                loading && "cursor-not-allowed opacity-60"
              )}
            >
              {tab === "login" ? "Entrar" : "Criar conta"}
            </button>
          );
        })}
      </div>

      {/* ── Global alerts ── */}
      {globalError && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-400 text-[13px]"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 10.5a.75.75 0 110-1.5.75.75 0 010 1.5zM8.75 4.5v4a.75.75 0 01-1.5 0v-4a.75.75 0 011.5 0z" />
          </svg>
          {globalError}
        </div>
      )}

      {globalSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-[13px]"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {globalSuccess}
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 auth-form-transition" key={mode}>

        {/* Name (register only) */}
        {!isLogin && (
          <InputField
            id="register-name"
            label="Nome"
            placeholder="Seu nome"
            icon={User}
            autoComplete="name"
            value={name}
            onChange={setName}
            onBlur={() => handleBlur("name")}
            disabled={loading}
            error={fieldErrors.name}
            errorId="register-name-err"
            inputRef={registerNameRef}
          />
        )}

        {/* Email */}
        <InputField
          id={`${mode}-email`}
          label="Email"
          type="email"
          placeholder="email@exemplo.com"
          icon={Mail}
          autoComplete="email"
          value={email}
          onChange={setEmail}
          onBlur={() => handleBlur("email")}
          disabled={loading}
          error={fieldErrors.email}
          errorId={`${mode}-email-err`}
          inputRef={isLogin ? loginEmailRef : undefined}
        />

        {/* Password */}
        <InputField
          id={`${mode}-password`}
          label="Senha"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          icon={Lock}
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={setPassword}
          onBlur={() => handleBlur("password")}
          disabled={loading}
          error={fieldErrors.password}
          errorId={`${mode}-pw-err`}
          rightAction={pwToggle}
        />

        {/* Confirm password (register only) */}
        {!isLogin && (
          <InputField
            id="register-confirm"
            label="Confirmar senha"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            autoComplete="new-password"
            value={confirmPw}
            onChange={setConfirmPw}
            onBlur={() => handleBlur("confirmPw")}
            disabled={loading}
            error={fieldErrors.confirmPw}
            errorId="register-confirm-err"
            rightAction={pwToggle}
          />
        )}

        {/* Remember + forgot (login only) */}
        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2.5 cursor-pointer">
              <button
                type="button"
                role="checkbox"
                aria-checked={remember}
                onClick={() => setRemember((r) => !r)}
                disabled={loading}
                className={cn(
                  "w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all duration-150 border-2",
                  remember
                    ? "bg-accent border-accent"
                    : "bg-transparent border-zinc-700 hover:border-zinc-500"
                )}
              >
                {remember && (
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <span className="text-[13px] select-none text-text-secondary">Lembrar-me</span>
            </label>
            <button
              type="button"
              disabled={loading}
              className="text-[13px] font-medium text-accent hover:text-accent-hover transition-colors duration-150"
            >
              Esqueci minha senha
            </button>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full font-semibold tracking-wide"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isLogin ? "Entrando..." : "Criando conta..."}
            </>
          ) : (
            isLogin ? "Entrar" : "Criar conta"
          )}
        </Button>
      </form>

      {/* ── Divider ── */}
      <div className="my-5 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] uppercase tracking-wider font-medium text-text-secondary">
          ou continue com
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── Discord ── */}
      <button
        type="button"
        disabled={loading}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200",
          "bg-[#5865F2]/10 text-[#7289DA] border border-[#5865F2]/25",
          "hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <DiscordIcon className="w-[18px] h-[18px]" />
        Continuar com Discord
      </button>

      {/* ── Bottom toggle ── */}
      <p className="mt-5 text-center text-[13px] text-text-secondary">
        {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
        <button
          type="button"
          onClick={() => !loading && switchMode(isLogin ? "register" : "login")}
          disabled={loading}
          className="font-semibold text-accent hover:text-accent-hover transition-colors duration-150"
        >
          {isLogin ? "Criar conta" : "Entrar"}
        </button>
      </p>
    </div>
  );
}
