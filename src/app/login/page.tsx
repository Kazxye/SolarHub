"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ShieldCheck,
} from "lucide-react";

/* ─── Password strength ─── */

const strengthLevels = [
  { level: 1, label: "Fraca", class: "bg-red-500" },
  { level: 2, label: "Razoável", class: "bg-amber-500" },
  { level: 3, label: "Boa", class: "bg-yellow-500" },
  { level: 4, label: "Forte", class: "bg-green-500" },
  { level: 5, label: "Excelente", class: "bg-emerald-400" },
] as const;

const strengthTextColors = [
  "text-red-500",
  "text-amber-500",
  "text-yellow-500",
  "text-green-500",
  "text-emerald-400",
];

function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return 0;
  if (s <= 2) return 1;
  if (s <= 3) return 2;
  if (s <= 4) return 3;
  return 4;
}

/* ─── Discord icon ─── */

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ─── Types ─── */

type AuthMode = "login" | "register";

/* ─── Page ─── */

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPw, setShowPw] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [remember, setRemember] = useState(false);

  const isLogin = mode === "login";
  const strengthIndex = useMemo(() => getStrength(password), [password]);
  const strength = strengthLevels[strengthIndex];

  const switchMode = useCallback((m: AuthMode) => {
    setMode(m);
    setShowPw(false);
    setPassword("");
    setConfirmPw("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Background effects ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[250px] bg-accent/[0.025] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Top bar ── */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar ao início</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/icon.png" alt="SolarHub" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-bold tracking-tight text-text-primary">
              Solar<span className="text-accent">Hub</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Centered card ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-[420px]">
          {/* Heading */}
          <div className="text-center mb-7 auth-fade-in">
            <h1 className="text-[26px] sm:text-3xl font-extrabold tracking-tight text-text-primary">
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {isLogin
                ? "Acesse sua conta para continuar dominando"
                : "Junte-se à comunidade e comece agora"}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl overflow-hidden bg-surface border border-border auth-card-glow auth-fade-in auth-delay-1">
            {/* ── Tabs ── */}
            <div className="flex border-b border-border">
              {(["login", "register"] as AuthMode[]).map((tab) => {
                const active = mode === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => switchMode(tab)}
                    className={cn(
                      "flex-1 py-3.5 text-[13px] font-semibold tracking-wide uppercase relative transition-colors duration-200",
                      active
                        ? "text-text-primary bg-surface-hover/50"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {tab === "login" ? "Login" : "Criar conta"}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[2px] rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Form ── */}
            <div className="p-6 sm:p-7" key={mode}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5 auth-content-enter">
                {/* Username (register) */}
                {!isLogin && (
                  <InputField
                    id="username"
                    label="Nome de usuário"
                    placeholder="Seu nome de usuário"
                    icon={User}
                    value={username}
                    onChange={setUsername}
                  />
                )}

                {/* Email */}
                <InputField
                  id="email"
                  label={isLogin ? "Email ou usuário" : "Email"}
                  placeholder={isLogin ? "email@exemplo.com" : "seu@email.com"}
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />

                {/* Password */}
                <InputField
                  id="password"
                  label="Senha"
                  placeholder="••••••••"
                  icon={Lock}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  rightAction={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* Strength bar (register) */}
                {!isLogin && password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full overflow-hidden bg-border"
                        >
                          <div
                            className={cn(
                              "h-full rounded-full strength-bar-fill",
                              i <= strengthIndex ? strength.class : "bg-transparent"
                            )}
                            style={{ width: i <= strengthIndex ? "100%" : "0%" }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-text-secondary">
                      Força:{" "}
                      <span className={cn("font-semibold", strengthTextColors[strengthIndex])}>
                        {strength.label}
                      </span>
                    </p>
                  </div>
                )}

                {/* Confirm password (register) */}
                {!isLogin && (
                  <InputField
                    id="confirmPw"
                    label="Confirmar senha"
                    placeholder="••••••••"
                    icon={Lock}
                    type={showPw ? "text" : "password"}
                    value={confirmPw}
                    onChange={setConfirmPw}
                    rightAction={
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPw((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                      >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                )}

                {/* Login extras */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer">
                      <button
                        type="button"
                        onClick={() => setRemember((r) => !r)}
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
                      <span className="text-[13px] select-none text-text-secondary">
                        Lembrar-me
                      </span>
                    </label>
                    <button
                      type="button"
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
                  className="w-full font-semibold tracking-wide"
                >
                  {isLogin ? "Entrar" : "Criar conta"}
                </Button>
              </form>

              {/* ── Divider ── */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] uppercase tracking-wider font-medium text-text-secondary">
                  ou continue com
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* ── Discord ── */}
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 bg-[#5865F2]/10 text-[#7289DA] border border-[#5865F2]/25 hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]"
              >
                <DiscordIcon className="w-[18px] h-[18px]" />
                Continuar com Discord
              </button>

              {/* Security note (register) */}
              {!isLogin && (
                <div className="mt-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                  <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                  <p className="text-[12px] leading-relaxed text-text-secondary">
                    Seus dados são protegidos com criptografia de ponta a ponta.
                    Nunca compartilhamos suas informações.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom toggle */}
          <p className="mt-6 text-center text-[13px] text-text-secondary auth-fade-in auth-delay-2">
            {isLogin ? "Ainda não tem uma conta?" : "Já possui uma conta?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold text-accent hover:text-accent-hover transition-colors duration-150"
            >
              {isLogin ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable input ─── */

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  rightAction,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: typeof Mail;
  value: string;
  onChange: (v: string) => void;
  rightAction?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-text-primary/70"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary transition-colors duration-200">
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "auth-input w-full pl-10 py-3 text-sm rounded-xl outline-none transition-all duration-200",
            "bg-surface-hover border border-zinc-700 text-text-primary",
            "placeholder:text-text-secondary/50",
            "focus:border-accent",
            rightAction ? "pr-11" : "pr-4"
          )}
        />
        {rightAction}
      </div>
    </div>
  );
}
