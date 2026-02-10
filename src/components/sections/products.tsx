"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  X,
  Fingerprint,
  Crown,
  Star,
  Zap,
  Clock,
  ExternalLink,
  Shield,
  Monitor,
  Headset,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────── */

type TagVariant = "live" | "updated" | "stable" | "premium" | "popular" | "tool";

interface Tag {
  label: string;
  variant: TagVariant;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  badge?: string;
  icon: typeof Clock;
}

interface PlanCategory {
  label: string;
  plans: Plan[];
}

interface Feature {
  icon: typeof Shield;
  label: string;
}

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string | null;
  imagePosition?: string;
  accentColor: string;
  tags: Tag[];
  hudLabel: string;
  planCategories: PlanCategory[];
  features: Feature[];
  specs: Spec[];
}

/* ─────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────── */

const DISCORD_URL = "https://discord.gg/solarhub";

const products: Product[] = [
  {
    id: "valorant",
    name: "VALORANT",
    subtitle: "Tactical Shooter",
    description: "ESP completo e Skin Changer com precisão sub-milisegundo.",
    image: "/VALORANT_JETT_LIGHT.jpg",
    imagePosition: "center 10%",
    accentColor: "red",
    tags: [
      { label: "Undetected", variant: "live" },
      { label: "Atualizado", variant: "updated" },
      { label: "Popular", variant: "popular" },
    ],
    hudLabel: "LIVE",
    planCategories: [
      {
        label: "ESP",
        plans: [
          { name: "Diário", price: "R$25", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$60", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$120", period: "30 dias", badge: "Mais popular", icon: Star },
        ],
      },
      {
        label: "Skin Changer",
        plans: [
          { name: "Diário", price: "R$20", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$50", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$90", period: "30 dias", badge: "Melhor custo", icon: Star },
        ],
      },
    ],
    features: [
      { icon: Shield, label: "Anti-detecção ativa 24/7" },
      { icon: Zap, label: "Latência < 0.3ms" },
      { icon: Monitor, label: "Overlay não-intrusivo" },
      { icon: Headset, label: "Suporte prioritário" },
    ],
    specs: [
      { label: "Plataforma", value: "Windows 10/11" },
      { label: "Anti-cheat", value: "Vanguard bypass" },
      { label: "Atualização", value: "< 2 horas pós-patch" },
      { label: "Suporte", value: "Discord 24/7" },
    ],
  },
  {
    id: "cs2",
    name: "CS2",
    subtitle: "Competitive FPS",
    description: "Ferramenta completa com ESP, triggerbot e customizações.",
    image: "/cs2.png",
    accentColor: "amber",
    tags: [
      { label: "Undetected", variant: "live" },
      { label: "Recomendado", variant: "premium" },
    ],
    hudLabel: "SYNCED",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$5", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$25", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$40", period: "30 dias", badge: "Mais popular", icon: Star },
          { name: "Lifetime", price: "R$200", period: "Para sempre", badge: "Melhor custo", icon: Crown },
        ],
      },
    ],
    features: [
      { icon: Shield, label: "VAC/Overwatch bypass ativo" },
      { icon: Zap, label: "Triggerbot configurável" },
      { icon: Monitor, label: "ESP com filtros avançados" },
      { icon: Headset, label: "Comunidade ativa no Discord" },
    ],
    specs: [
      { label: "Plataforma", value: "Windows 10/11" },
      { label: "Anti-cheat", value: "VAC + Overwatch" },
      { label: "Atualização", value: "Automática" },
      { label: "Suporte", value: "Discord 24/7" },
    ],
  },
  {
    id: "fortnite",
    name: "FORTNITE",
    subtitle: "Battle Royale",
    description: "Aimbot suave e ESP de loot para dominar o mapa.",
    image: "/fortnite.jpg",
    accentColor: "blue",
    tags: [
      { label: "Undetected", variant: "live" },
      { label: "Estável", variant: "stable" },
    ],
    hudLabel: "READY",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$60", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$125", period: "7 dias", badge: "Mais popular", icon: Zap },
          { name: "Mensal", price: "R$200", period: "30 dias", badge: "Melhor custo", icon: Star },
        ],
      },
    ],
    features: [
      { icon: Shield, label: "EAC bypass integrado" },
      { icon: Zap, label: "Aimbot com smoothing" },
      { icon: Monitor, label: "ESP de loot e inimigos" },
      { icon: Headset, label: "Setup guiado via Discord" },
    ],
    specs: [
      { label: "Plataforma", value: "Windows 10/11" },
      { label: "Anti-cheat", value: "Easy Anti-Cheat" },
      { label: "Atualização", value: "< 4 horas pós-patch" },
      { label: "Suporte", value: "Discord 24/7" },
    ],
  },
  {
    id: "dayz",
    name: "DAYZ",
    subtitle: "Survival",
    description: "ESP de jogadores, loot e veículos para sobreviver.",
    image: "/Dayz.png",
    imagePosition: "center 6%",
    accentColor: "emerald",
    tags: [
      { label: "Undetected", variant: "live" },
      { label: "Atualizado", variant: "updated" },
    ],
    hudLabel: "ACTIVE",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$30", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$65", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$150", period: "30 dias", badge: "Mais popular", icon: Star },
        ],
      },
    ],
    features: [
      { icon: Shield, label: "BattlEye bypass ativo" },
      { icon: Zap, label: "ESP de longo alcance" },
      { icon: Monitor, label: "Radar de veículos" },
      { icon: Headset, label: "Suporte em português" },
    ],
    specs: [
      { label: "Plataforma", value: "Windows 10/11" },
      { label: "Anti-cheat", value: "BattlEye" },
      { label: "Atualização", value: "< 6 horas pós-patch" },
      { label: "Suporte", value: "Discord 24/7" },
    ],
  },
  {
    id: "spoofer",
    name: "HWID SPOOFER",
    subtitle: "Security Tool",
    description: "Reset completo de HWID para desbanir hardware.",
    image: null,
    accentColor: "violet",
    tags: [
      { label: "Undetected", variant: "live" },
      { label: "Security", variant: "tool" },
      { label: "Premium", variant: "premium" },
    ],
    hudLabel: "STEALTH",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$45", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$75", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$115", period: "30 dias", badge: "Mais popular", icon: Star },
          { name: "Lifetime", price: "R$250", period: "Para sempre", badge: "Melhor custo", icon: Crown },
        ],
      },
    ],
    features: [
      { icon: Shield, label: "Spoof de disco, MAC e GPU" },
      { icon: Zap, label: "Execução em < 10 segundos" },
      { icon: Monitor, label: "Compatível com todos os games" },
      { icon: Headset, label: "Suporte para re-spoof" },
    ],
    specs: [
      { label: "Plataforma", value: "Windows 10/11" },
      { label: "Compatibilidade", value: "Universal" },
      { label: "Persistência", value: "Até reboot" },
      { label: "Suporte", value: "Discord 24/7" },
    ],
  },
];

/* ─────────────────────────────────────────────────
   Accent color map
   ───────────────────────────────────────────────── */

const accentMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  red:     { border: "#ef4444", glow: "rgba(239,68,68,0.12)", text: "#f87171", bg: "rgba(239,68,68,0.08)" },
  amber:   { border: "#f59e0b", glow: "rgba(245,158,11,0.12)", text: "#fbbf24", bg: "rgba(245,158,11,0.08)" },
  blue:    { border: "#3b82f6", glow: "rgba(59,130,246,0.12)", text: "#60a5fa", bg: "rgba(59,130,246,0.08)" },
  emerald: { border: "#10b981", glow: "rgba(16,185,129,0.12)", text: "#34d399", bg: "rgba(16,185,129,0.08)" },
  violet:  { border: "#8b5cf6", glow: "rgba(139,92,246,0.12)", text: "#a78bfa", bg: "rgba(139,92,246,0.08)" },
};

/* ─────────────────────────────────────────────────
   Tag variant → visual styles
   ───────────────────────────────────────────────── */

const tagStyles: Record<TagVariant, string> = {
  live:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  updated:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  stable:   "bg-blue-500/10 text-blue-400 border-blue-500/25",
  premium:  "bg-accent/15 text-accent border-accent/30",
  popular:  "bg-accent/10 text-accent border-accent/25",
  tool:     "bg-violet-500/10 text-violet-400 border-violet-500/25",
};

/* ─────────────────────────────────────────────────
   Scroll-reveal hook
   ───────────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".section-fade-in")
              .forEach((child) => child.classList.add("is-visible"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────────
   StatusPills — reusable tag row
   ───────────────────────────────────────────────── */

function StatusPills({ tags, size = "sm" }: { tags: Tag[]; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={cn(
            "inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border",
            tagStyles[tag.variant],
            size === "sm"
              ? "px-2 py-0.5 text-[9px]"
              : "px-2.5 py-1 text-[10px]"
          )}
        >
          {tag.variant === "live" && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
          {tag.label}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   ProductCard — editorial banner with HUD hover
   ───────────────────────────────────────────────── */

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const colors = accentMap[product.accentColor];
  const lowestPrice = product.planCategories
    .flatMap((c) => c.plans)
    .reduce((min, p) => {
      const num = parseFloat(p.price.replace(/[^\d,]/g, "").replace(",", "."));
      return num < min ? num : min;
    }, Infinity);

  return (
    <div className="product-card group relative rounded-2xl overflow-hidden border border-border/30 hover:border-border/60 cursor-pointer bg-surface/40">
      <button
        onClick={onClick}
        className="relative w-full text-left"
        aria-label={`Ver planos de ${product.name}`}
      >
        {/* ── Cover image ── */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-surface to-violet-950/50">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Fingerprint className="w-24 h-24 text-violet-500/15" />
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />

          {/* ── HUD scan line (hover only) ── */}
          <div className="product-scanline" />

          {/* ── HUD corner brackets (hover only) ── */}
          <div className="product-bracket product-bracket-tl" />
          <div className="product-bracket product-bracket-tr" />
          <div className="product-bracket product-bracket-bl" />
          <div className="product-bracket product-bracket-br" />

          {/* ── HUD micro label (hover only) ── */}
          <div className="product-hud-label">
            <span className="product-hud-dot" />
            {product.hudLabel}
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="px-5 pb-5 -mt-2 relative">
          {/* Tags */}
          <div className="mb-3">
            <StatusPills tags={product.tags} />
          </div>

          {/* Title + subtitle */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mt-0.5 font-medium">
            {product.subtitle}
          </p>

          {/* Description */}
          <p className="text-[13px] text-text-secondary/80 mt-2.5 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Footer: price + CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider">A partir de</span>
              <div className="text-lg font-extrabold" style={{ color: colors.text }}>
                R${lowestPrice.toFixed(0)}
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider group-hover:bg-accent group-hover:text-white transition-all duration-300">
              Ver detalhes
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PlanSelector — plan cards within drawer
   ───────────────────────────────────────────────── */

function PlanSelector({
  categories,
  colors,
}: {
  categories: PlanCategory[];
  colors: { border: string; glow: string; text: string; bg: string };
}) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const current = categories[activeCategory];

  return (
    <div>
      {/* Category tabs (only if multiple) */}
      {categories.length > 1 && (
        <div className="flex gap-2 mb-4">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => { setActiveCategory(i); setSelectedPlan(null); }}
              className="px-4 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200"
              style={{
                background: activeCategory === i ? colors.bg : "transparent",
                color: activeCategory === i ? colors.text : "#71717a",
                border: `1px solid ${activeCategory === i ? colors.border : "transparent"}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Plans */}
      <div className="space-y-2.5">
        {current.plans.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          const hasBadge = !!plan.badge;

          return (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.name)}
              className="plan-card relative w-full rounded-xl p-4 flex items-center justify-between gap-3 text-left transition-all duration-200"
              style={{
                background: isSelected ? colors.bg : "#1a1a1d",
                border: `2px solid ${isSelected ? colors.border : "#27272a"}`,
                boxShadow: isSelected ? `0 0 20px ${colors.glow}` : "none",
              }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: colors.bg }}
                >
                  <plan.icon className="w-4 h-4" style={{ color: colors.text }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{plan.name}</span>
                    {hasBadge && (
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shrink-0"
                        style={{
                          background: "rgba(249,115,22,0.15)",
                          color: "#f97316",
                          border: "1px solid rgba(249,115,22,0.3)",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5 text-text-secondary">{plan.period}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-extrabold text-accent">{plan.price}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-accent" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Acquire CTA */}
      <div className="mt-5 space-y-3">
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(!selectedPlan && "pointer-events-none")}
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold tracking-wide"
            disabled={!selectedPlan}
          >
            {selectedPlan ? `Adquirir — ${selectedPlan}` : "Selecione um plano"}
          </Button>
        </a>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="md" className="w-full mt-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Tirar dúvidas no Discord
          </Button>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   ProductDrawer — right (desktop) / bottom (mobile)
   ───────────────────────────────────────────────── */

function ProductDrawer({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const colors = accentMap[product.accentColor];

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  /* Escape + body lock + focus trap */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    /* Focus trap */
    const drawer = drawerRef.current;
    if (drawer) {
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();
    }

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Detalhes de ${product.name}`}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          closing ? "drawer-overlay-exit" : "drawer-overlay-enter"
        )}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={cn(
          /* Mobile: bottom sheet */
          "absolute bottom-0 left-0 right-0 max-h-[90vh]",
          "rounded-t-2xl",
          /* Desktop: right drawer */
          "lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[520px] lg:max-h-full",
          "lg:rounded-t-none lg:rounded-l-2xl",
          "bg-surface border-t border-border/50 lg:border-t-0 lg:border-l lg:border-border/50",
          "overflow-y-auto overscroll-contain",
          closing ? "drawer-panel-exit" : "drawer-panel-enter"
        )}
      >
        {/* ── Header with cover ── */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-surface to-violet-950/50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Fingerprint className="w-20 h-20 text-violet-500/15" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm text-text-secondary hover:text-text-primary hover:bg-black/60 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Name overlay */}
          <div className="absolute bottom-4 left-5 right-16">
            <StatusPills tags={product.tags} size="md" />
            <h2 className="text-2xl font-black text-text-primary tracking-tight mt-2">
              {product.name}
            </h2>
            <p className="text-sm text-text-secondary font-medium mt-0.5">
              {product.subtitle}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-5 pb-8 pt-5 space-y-7">
          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
              O que inclui
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-surface-hover/50 border border-border/30"
                >
                  <f.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-[13px] text-text-primary font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
              Especificações
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {product.specs.map((s) => (
                <div key={s.label}>
                  <div className="text-[11px] text-text-secondary uppercase tracking-wider">{s.label}</div>
                  <div className="text-sm text-text-primary font-semibold mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40" />

          {/* Plans */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
              Planos disponíveis
            </h3>
            <PlanSelector categories={product.planCategories} colors={colors} />
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-text-secondary/60 pt-2">
            <Shield className="w-3 h-3" />
            <span>Pagamento seguro via PIX ou cartão. Garantia de 24h.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Products — main section export
   ───────────────────────────────────────────────── */

export function Products() {
  const sectionRef = useScrollReveal();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section
        id="products"
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="relative py-24 sm:py-32"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-surface/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/[0.03] rounded-full blur-[140px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 section-fade-in">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4 border border-accent/20">
              Cheats
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Escolha sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                ferramenta
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Selecione um jogo para explorar as ferramentas disponíveis.
              <br className="hidden sm:block" />
              Todos os scripts atualizados e 100% indetectáveis.
            </p>
          </div>

          {/* Product grid — 2 cols desktop, 1 col mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "section-fade-in",
                  `section-delay-${index + 1}`,
                  /* Last item (odd count) spans full width on desktop */
                  products.length % 2 !== 0 && index === products.length - 1 && "md:col-span-2 md:max-w-[calc(50%-0.625rem)] md:mx-auto"
                )}
              >
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawer */}
      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
