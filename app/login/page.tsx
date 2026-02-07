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
function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { level: 1, label: "Fraca", color: "#ef4444" };
  if (s <= 2) return { level: 2, label: "Razoável", color: "#f59e0b" };
  if (s <= 3) return { level: 3, label: "Boa", color: "#eab308" };
  if (s <= 4) return { level: 4, label: "Forte", color: "#22c55e" };
  return { level: 5, label: "Excelente", color: "#34d399" };
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

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPw, setShowPw] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [remember, setRemember] = useState(false);

  const isLogin = mode === "login";
  const strength = useMemo(() => getStrength(password), [password]);

  const switchMode = useCallback((m: AuthMode) => {
    setMode(m);
    setShowPw(false);
    setPassword("");
    setConfirmPw("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0b" }}>
      {/* ── Background effects ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-[140px]"
          style={{
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            background: "rgba(249, 115, 22, 0.04)",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 250,
            background: "rgba(249, 115, 22, 0.025)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.03,
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
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "#a1a1aa" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar ao início</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/icon.png" alt="SolarHub" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-bold tracking-tight" style={{ color: "#fafafa" }}>
              Solar<span style={{ color: "#f97316" }}>Hub</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Centered card ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full" style={{ maxWidth: 420 }}>
          {/* Heading */}
          <div className="text-center mb-7">
            <h1
              className="text-[26px] sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "#fafafa" }}
            >
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              {isLogin
                ? "Acesse sua conta para continuar dominando"
                : "Junte-se à comunidade e comece agora"}
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#111113",
              border: "1px solid #27272a",
              boxShadow: "0 0 50px rgba(249, 115, 22, 0.04)",
            }}
          >
            {/* ── Tabs ── */}
            <div className="flex" style={{ borderBottom: "1px solid #27272a" }}>
              {(["login", "register"] as AuthMode[]).map((tab) => {
                const active = mode === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => switchMode(tab)}
                    className="flex-1 py-3.5 text-[13px] font-semibold tracking-wide uppercase relative transition-colors duration-200"
                    style={{
                      color: active ? "#fafafa" : "#71717a",
                      background: active ? "rgba(26, 26, 29, 0.5)" : "transparent",
                    }}
                  >
                    {tab === "login" ? "Login" : "Criar conta"}
                    {active && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                        style={{ width: 56, background: "#f97316" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Form ── */}
            <div className="p-6 sm:p-7">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
                      style={{ color: "#71717a" }}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* Strength bar (register) */}
                {!isLogin && password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full overflow-hidden"
                          style={{ background: "#27272a" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: i <= strength.level ? "100%" : "0%",
                              background: i <= strength.level ? strength.color : "transparent",
                              transition: "width 0.3s, background-color 0.3s",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px]" style={{ color: "#71717a" }}>
                      Força:{" "}
                      <span className="font-semibold" style={{ color: strength.color }}>
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
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
                        style={{ color: "#71717a" }}
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
                        className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all duration-150"
                        style={{
                          background: remember ? "#f97316" : "transparent",
                          border: `2px solid ${remember ? "#f97316" : "#3f3f46"}`,
                        }}
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
                      <span className="text-[13px] select-none" style={{ color: "#a1a1aa" }}>
                        Lembrar-me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-[13px] font-medium transition-colors duration-150"
                      style={{ color: "#f97316" }}
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
                <div className="flex-1 h-px" style={{ background: "#27272a" }} />
                <span
                  className="text-[11px] uppercase tracking-wider font-medium"
                  style={{ color: "#71717a" }}
                >
                  ou continue com
                </span>
                <div className="flex-1 h-px" style={{ background: "#27272a" }} />
              </div>

              {/* ── Discord ── */}
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(88, 101, 242, 0.12)",
                  color: "#7289DA",
                  border: "1px solid rgba(88, 101, 242, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5865F2";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "#5865F2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(88, 101, 242, 0.12)";
                  e.currentTarget.style.color = "#7289DA";
                  e.currentTarget.style.borderColor = "rgba(88, 101, 242, 0.25)";
                }}
              >
                <DiscordIcon className="w-[18px] h-[18px]" />
                Continuar com Discord
              </button>

              {/* Security note (register) */}
              {!isLogin && (
                <div
                  className="mt-5 flex items-start gap-2.5 p-3.5 rounded-xl"
                  style={{
                    background: "rgba(34, 197, 94, 0.06)",
                    border: "1px solid rgba(34, 197, 94, 0.15)",
                  }}
                >
                  <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
                  <p className="text-[12px] leading-relaxed" style={{ color: "#a1a1aa" }}>
                    Seus dados são protegidos com criptografia de ponta a ponta.
                    Nunca compartilhamos suas informações.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom toggle */}
          <p className="mt-6 text-center text-[13px]" style={{ color: "#a1a1aa" }}>
            {isLogin ? "Ainda não tem uma conta?" : "Já possui uma conta?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold transition-colors duration-150"
              style={{ color: "#f97316" }}
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
        className="block text-[13px] font-medium"
        style={{ color: "rgba(250, 250, 250, 0.7)" }}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: "#71717a" }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full pl-10 py-3 text-sm rounded-xl outline-none transition-all duration-200",
            rightAction ? "pr-11" : "pr-4"
          )}
          style={{
            background: "#1a1a1d",
            border: "1px solid #3f3f46",
            color: "#fafafa",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#f97316";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(249, 115, 22, 0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#3f3f46";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {rightAction}
      </div>
    </div>
  );
}
