"use client";

import { useState, useCallback, useRef, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { useAuth } from "@/components/providers/auth-provider";
import {
  User, Mail, Calendar, ShieldCheck, Settings,
  HeadphonesIcon, ArrowRight, Lock, LogOut,
  CheckCircle2, AlertCircle, Loader2, ShoppingBag,
  FileText, MessageCircle, HelpCircle,
} from "lucide-react";
import { updateProfile, changePassword } from "@/lib/profile-data";

const DISCORD_URL = "https://discord.gg/solarhub";

/* ═══════════════════════════════════════════════════
   SHARED PRIMITIVES
   ═══════════════════════════════════════════════════ */

type TabId = "overview" | "purchases" | "account" | "security" | "support";

const TABS: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Visão geral", icon: User },
  { id: "purchases", label: "Compras", icon: ShoppingBag },
  { id: "account", label: "Dados da conta", icon: Settings },
  { id: "security", label: "Segurança", icon: ShieldCheck },
  { id: "support", label: "Suporte", icon: HeadphonesIcon },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

/* ── Feedback ── */

function Feedback({ type, children }: { type: "success" | "error"; children: ReactNode }) {
  return (
      <div
          role="alert"
          aria-live="polite"
          className={cn(
              "flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium",
              type === "success"
                  ? "bg-emerald-500/[0.06] border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/[0.06] border-red-500/20 text-red-400"
          )}
      >
        {type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
        {children}
      </div>
  );
}

/* ── Form input ── */

function FormField({ id, label, icon: Icon, type = "text", value, onChange, disabled }: {
  id: string; label: string; icon: typeof User;
  type?: string; value: string; onChange: (v: string) => void; disabled?: boolean;
}) {
  return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
          <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-surface/60 border border-border/50 text-text-primary placeholder:text-text-secondary/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>
  );
}

/* ═══════════════════════════════════════════════════
   TAB PANELS
   ═══════════════════════════════════════════════════ */

/* ── Overview ── */

function OverviewTab() {
  const { user } = useAuth();

  return (
      <div className="space-y-6">
        {/* User card */}
        <div className="rounded-2xl border border-border/40 bg-surface/30 p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-text-primary truncate">{user!.name}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-text-secondary">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{user!.email}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-text-secondary/70">
                <Calendar className="w-3 h-3 shrink-0" />
                Membro desde {fmtDate(user!.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/30 bg-surface/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-[18px] h-[18px] text-accent" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Status</span>
            </div>
            <div className="text-xl font-bold text-text-primary">Ativa</div>
          </div>

          <div className="rounded-2xl border border-border/30 bg-surface/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-surface-hover/60 flex items-center justify-center">
                <Calendar className="w-[18px] h-[18px] text-text-secondary" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Criação</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{fmtDate(user!.createdAt)}</div>
          </div>
        </div>
      </div>
  );
}

/* ── Account ── */

function AccountTab() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSave = useCallback(async () => {
    if (!name.trim() || !email.trim()) {
      setFeedback({ type: "error", msg: "Preencha todos os campos." });
      return;
    }
    setLoading(true);
    setFeedback(null);
    const res = await updateProfile({ name: name.trim(), email: email.trim() });
    setLoading(false);
    if (res.ok) {
      setFeedback({ type: "success", msg: "Dados atualizados com sucesso." });
      if (user) login({ ...user, name: name.trim(), email: email.trim() });
    } else {
      setFeedback({ type: "error", msg: res.error ?? "Erro ao atualizar." });
    }
  }, [name, email, user, login]);

  return (
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
          Dados da conta
        </h2>
        <div className="rounded-2xl border border-border/40 bg-surface/30 p-6 space-y-5">
          {feedback && <Feedback type={feedback.type}>{feedback.msg}</Feedback>}
          <FormField id="acc-name" label="Nome" icon={User} value={name} onChange={setName} disabled={loading} />
          <FormField id="acc-email" label="Email" icon={Mail} type="email" value={email} onChange={setEmail} disabled={loading} />
          <div className="pt-2">
            <Button onClick={handleSave} disabled={loading} className="h-10 px-6 text-sm">
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Salvando...</>) : "Salvar alterações"}
            </Button>
          </div>
        </div>
      </div>
  );
}

/* ── Security ── */

function SecurityTab() {
  const { logout } = useAuth();
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleChange = useCallback(async () => {
    setFeedback(null);
    if (!curPw || !newPw || !confirmPw) {
      setFeedback({ type: "error", msg: "Preencha todos os campos." }); return;
    }
    if (newPw.length < 6) {
      setFeedback({ type: "error", msg: "A nova senha deve ter no mínimo 6 caracteres." }); return;
    }
    if (newPw !== confirmPw) {
      setFeedback({ type: "error", msg: "As senhas não coincidem." }); return;
    }
    setLoading(true);
    const res = await changePassword({ currentPassword: curPw, newPassword: newPw });
    setLoading(false);
    if (res.ok) {
      setFeedback({ type: "success", msg: "Senha alterada com sucesso." });
      setCurPw(""); setNewPw(""); setConfirmPw("");
    } else {
      setFeedback({ type: "error", msg: res.error ?? "Erro ao alterar senha." });
    }
  }, [curPw, newPw, confirmPw]);

  return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">Alterar senha</h2>
          <div className="rounded-2xl border border-border/40 bg-surface/30 p-6 space-y-5">
            {feedback && <Feedback type={feedback.type}>{feedback.msg}</Feedback>}
            <FormField id="sec-curpw" label="Senha atual" icon={Lock} type="password" value={curPw} onChange={setCurPw} disabled={loading} />
            <FormField id="sec-newpw" label="Nova senha" icon={Lock} type="password" value={newPw} onChange={setNewPw} disabled={loading} />
            <FormField id="sec-confirm" label="Confirmar nova senha" icon={Lock} type="password" value={confirmPw} onChange={setConfirmPw} disabled={loading} />
            <div className="pt-2">
              <Button onClick={handleChange} disabled={loading} className="h-10 px-6 text-sm">
                {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Alterando...</>) : "Alterar senha"}
              </Button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-1.5">Sair da conta</h3>
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            Você será desconectado e precisará fazer login novamente para acessar seu perfil.
          </p>
          <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair da conta
          </button>
        </div>
      </div>
  );
}

/* ── Support ── */

function SupportTab() {
  const cards = [
    { icon: MessageCircle, title: "Discord", desc: "Fale com a equipe em tempo real", href: DISCORD_URL, external: true },
    { icon: HeadphonesIcon, title: "Abrir ticket", desc: "Suporte via ticket no Discord", href: DISCORD_URL, external: true },
    { icon: HelpCircle, title: "FAQ", desc: "Respostas para perguntas comuns", href: "/faq", external: false },
    { icon: FileText, title: "Termos de serviço", desc: "Políticas e termos de uso", href: "/termos", external: false },
  ];

  return (
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">Central de suporte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const props = card.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
            const Tag = card.external ? "a" : Link;
            return (
                <Tag
                    key={card.title}
                    href={card.href}
                    {...props}
                    className="group rounded-2xl border border-border/30 bg-surface/30 p-5 hover:border-border/50 hover:bg-surface/50 transition-all block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-[18px] h-[18px] text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary">{card.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{card.desc}</p>
                </Tag>
            );
          })}
        </div>
      </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */

export function ProfileContent() {
  const { isLoggedIn, login } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loginOpen, setLoginOpen] = useState(false);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  const handleLoginSuccess = useCallback(() => {
    login({
      id: "usr_001",
      name: "Jogador",
      email: "jogador@email.com",
      createdAt: "2024-08-15T00:00:00Z",
    });
    setLoginOpen(false);
  }, [login]);

  /* ── LOCKED ── */

  if (!isLoggedIn) {
    return (
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/[0.03] rounded-full blur-[140px]" />
          </div>

          <div className="relative max-w-lg mx-auto px-4 sm:px-6 pt-40 pb-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-hover/60 border border-border/30 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-text-secondary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3">
              Acesso restrito
            </h1>
            <p className="text-sm text-text-secondary mb-8 leading-relaxed max-w-sm mx-auto">
              Faça login para acessar seu perfil e gerenciar sua conta.
            </p>
            <Button ref={loginBtnRef} size="lg" className="h-12 px-8 text-base" onClick={() => setLoginOpen(true)}>
              Entrar
              <ArrowRight className="w-4 h-4" />
            </Button>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={handleLoginSuccess}
                triggerRef={loginBtnRef}
            />
          </div>
        </div>
    );
  }

  /* ── LOGGED IN ── */

  return (
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/[0.03] rounded-full blur-[140px]" />
          <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-20">
          {/* Header */}
          <div className="mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Perfil
            </h1>
            <p className="mt-2 text-base text-text-secondary">
              Gerencie sua conta e configurações.
            </p>
          </div>

          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Sidebar — desktop */}
            <aside className="hidden lg:block w-52 shrink-0">
              <nav className="sticky top-28 space-y-1" aria-label="Navegação do perfil" role="tablist">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          className={cn(
                              "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium rounded-xl transition-all duration-200 text-left cursor-pointer",
                              activeTab === tab.id
                                  ? "text-accent bg-accent/[0.08]"
                                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover/60"
                          )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {tab.label}
                      </button>
                  );
                })}
              </nav>
            </aside>

            {/* Tabs — mobile */}
            <div className="lg:hidden overflow-x-auto scrollbar-none -mx-4 px-4" role="tablist" aria-label="Navegação do perfil">
              <div className="flex gap-1.5 min-w-max pb-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          className={cn(
                              "flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer",
                              activeTab === tab.id
                                  ? "bg-accent/10 border-accent/30 text-accent"
                                  : "bg-surface/40 border-border/30 text-text-secondary"
                          )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0" role="tabpanel">
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "purchases" && (
                  <div className="text-center py-16 rounded-2xl border border-border/30 bg-surface/20">
                    <div className="w-12 h-12 rounded-2xl bg-surface-hover/60 flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-5 h-5 text-text-secondary" />
                    </div>
                    <p className="text-base font-medium text-text-primary">Você ainda não possui compras</p>
                    <p className="mt-1.5 text-sm text-text-secondary mb-6">Explore nossos produtos e comece agora.</p>
                    <Link href="/#products">
                      <Button size="md">
                        Explorar produtos
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
              )}
              {activeTab === "account" && <AccountTab />}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "support" && <SupportTab />}
            </div>
          </div>
        </div>
      </div>
  );
}