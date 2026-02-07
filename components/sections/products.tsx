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
} from "lucide-react";
import { useCart, parsePrice } from "@/context/cart-context";

/* ────────────────────────────────────────────── */
/*  Types                                          */
/* ────────────────────────────────────────────── */

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

interface Game {
  id: string;
  name: string;
  subtitle: string;
  image: string | null;
  imagePosition?: string;
  accentColor: string;
  badge: string | null;
  planCategories: PlanCategory[];
}

/* ────────────────────────────────────────────── */
/*  Data                                           */
/* ────────────────────────────────────────────── */

const games: Game[] = [
  {
    id: "valorant",
    name: "VALORANT",
    subtitle: "Tactical shooter",
    image: "/VALORANT_JETT_LIGHT.jpg",
    imagePosition: "center 10%",
    accentColor: "red",
    badge: "Popular",
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
          { name: "Mensal", price: "R$90", period: "30 dias", badge: "Melhor custo-benefício", icon: Star },
        ],
      },
    ],
  },
  {
    id: "cs2",
    name: "CS2",
    subtitle: "Competitive FPS",
    image: "/cs2.png",
    accentColor: "amber",
    badge: "Recomendado",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$5", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$25", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$40", period: "30 dias", badge: "Mais popular", icon: Star },
          { name: "Lifetime", price: "R$200", period: "Para sempre", badge: "Melhor custo-benefício", icon: Crown },
        ],
      },
    ],
  },
  {
    id: "fortnite",
    name: "FORTNITE",
    subtitle: "Battle royale",
    image: "/fortnite.jpg",
    accentColor: "blue",
    badge: null,
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$60", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$125", period: "7 dias", badge: "Mais popular", icon: Zap },
          { name: "Mensal", price: "R$200", period: "30 dias", badge: "Melhor custo-benefício", icon: Star },
        ],
      },
    ],
  },
  {
    id: "dayz",
    name: "DAYZ",
    subtitle: "Survival",
    image: "/Dayz.png",
    imagePosition: "center 6%",
    accentColor: "emerald",
    badge: null,
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
  },
  {
    id: "spoofer",
    name: "HWID SPOOFER",
    subtitle: "Security Tool",
    image: null,
    accentColor: "violet",
    badge: "Security Tool",
    planCategories: [
      {
        label: "",
        plans: [
          { name: "Diário", price: "R$45", period: "1 dia", icon: Clock },
          { name: "Semanal", price: "R$75", period: "7 dias", icon: Zap },
          { name: "Mensal", price: "R$115", period: "30 dias", badge: "Mais popular", icon: Star },
          { name: "Lifetime", price: "R$250", period: "Para sempre", badge: "Melhor custo-benefício", icon: Crown },
        ],
      },
    ],
  },
];

/* ────────────────────────────────────────────── */
/*  Accent color map                               */
/* ────────────────────────────────────────────── */

const accentMap: Record<string, { border: string; glow: string; text: string; bg: string; badgeBg: string }> = {
  red:     { border: "#ef4444", glow: "rgba(239,68,68,0.15)", text: "#f87171", bg: "rgba(239,68,68,0.08)",  badgeBg: "rgba(239,68,68,0.15)" },
  amber:   { border: "#f59e0b", glow: "rgba(245,158,11,0.15)", text: "#fbbf24", bg: "rgba(245,158,11,0.08)", badgeBg: "rgba(245,158,11,0.15)" },
  blue:    { border: "#3b82f6", glow: "rgba(59,130,246,0.15)", text: "#60a5fa", bg: "rgba(59,130,246,0.08)", badgeBg: "rgba(59,130,246,0.15)" },
  emerald: { border: "#10b981", glow: "rgba(16,185,129,0.15)", text: "#34d399", bg: "rgba(16,185,129,0.08)", badgeBg: "rgba(16,185,129,0.15)" },
  violet:  { border: "#8b5cf6", glow: "rgba(139,92,246,0.15)", text: "#a78bfa", bg: "rgba(139,92,246,0.08)", badgeBg: "rgba(139,92,246,0.15)" },
};

/* ────────────────────────────────────────────── */
/*  Scroll-reveal hook                             */
/* ────────────────────────────────────────────── */

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

/* ────────────────────────────────────────────── */
/*  Game Card (click to open modal)                */
/* ────────────────────────────────────────────── */

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <div className="game-card group relative rounded-2xl overflow-hidden border border-border/30 hover:border-border/60 transition-all duration-500 cursor-pointer">
      <button
        onClick={onClick}
        className="relative w-full h-48 sm:h-56 overflow-hidden text-left"
      >
        {/* Image or gradient fallback */}
        {game.image ? (
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={game.imagePosition ? { objectPosition: game.imagePosition } : undefined}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0a0a0b] to-violet-950/50">
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Fingerprint className="w-28 h-28 text-violet-500/20" />
            </div>
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
          {/* Badges */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/40 backdrop-blur-sm text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Undetected
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/40 backdrop-blur-sm text-emerald-400 border border-emerald-500/30">
                Atualizado
              </span>
            </div>
            {game.badge && (
              <span className={cn(
                "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm border",
                game.badge === "Popular"
                  ? "bg-accent/20 text-accent border-accent/40"
                  : game.badge === "Security Tool"
                    ? "bg-violet-500/20 text-violet-400 border-violet-500/40"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              )}>
                {game.badge}
              </span>
            )}
          </div>

          {/* Name + CTA hint */}
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {game.name}
              </h3>
              <p className="text-sm text-white/60 font-medium mt-0.5">
                {game.subtitle}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver planos
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Plans Modal                                    */
/* ────────────────────────────────────────────── */

function PlansModal({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const colors = accentMap[game.accentColor];
  const { addItem } = useCart();

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 150);
  }, [onClose]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const currentCategory = game.planCategories[activeCategory];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-sm",
          closing ? "modal-overlay-exit" : "modal-overlay-enter"
        )}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl overflow-hidden",
          closing ? "modal-content-exit" : "modal-content-enter"
        )}
        style={{
          background: "#111113",
          border: `1px solid #27272a`,
          boxShadow: `0 0 60px ${colors.glow}`,
        }}
      >
        {/* Header with image */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          {game.image ? (
            <Image
              src={game.image}
              alt={game.name}
              fill
              className="object-cover"
              style={game.imagePosition ? { objectPosition: game.imagePosition } : undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0a0a0b] to-violet-950/50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Fingerprint className="w-20 h-20 text-violet-500/20" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ background: "rgba(0,0,0,0.5)", color: "#a1a1aa" }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Game info overlay */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{game.name}</h2>
              <p className="text-sm font-medium mt-0.5" style={{ color: "#71717a" }}>{game.subtitle}</p>
            </div>
            <div className="flex gap-1.5">
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                Undetected
              </span>
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                Atualizado
              </span>
            </div>
          </div>
        </div>

        {/* Category tabs (if multiple) */}
        {game.planCategories.length > 1 && (
          <div className="flex px-5 pt-4 gap-2">
            {game.planCategories.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(i)}
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

        {/* Plans grid */}
        <div className="p-5 space-y-3">
          {currentCategory.plans.map((plan) => {
            const isFeatured = plan.badge === "Mais popular";
            const isBestValue = plan.badge === "Melhor custo-benefício";
            const isHighlighted = isFeatured || isBestValue;

            return (
              <div
                key={plan.name}
                className="plan-card relative rounded-xl p-4 flex items-center justify-between gap-4"
                style={{
                  background: isHighlighted ? colors.bg : "#1a1a1d",
                  border: `1px solid ${isHighlighted ? colors.border : "#27272a"}`,
                  boxShadow: isHighlighted ? `0 0 20px ${colors.glow}` : "none",
                }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: colors.bg }}
                  >
                    <plan.icon className="w-4 h-4" style={{ color: colors.text }} />
                  </div>

                  {/* Name + period */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: "#fafafa" }}>
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shrink-0"
                          style={{
                            background: isFeatured ? "rgba(249,115,22,0.15)" : colors.badgeBg,
                            color: isFeatured ? "#f97316" : colors.text,
                            border: `1px solid ${isFeatured ? "rgba(249,115,22,0.3)" : colors.border}`,
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] mt-0.5" style={{ color: "#71717a" }}>
                      {plan.period}
                    </p>
                  </div>
                </div>

                {/* Price + buy */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-lg font-extrabold" style={{ color: "#f97316" }}>
                    {plan.price}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const categoryLabel = currentCategory.label;
                      const productName = categoryLabel
                        ? `${game.name} ${categoryLabel}`
                        : game.name;
                      addItem({
                        id: `${game.id}-${categoryLabel || "default"}-${plan.name}`.toLowerCase(),
                        productName,
                        planName: plan.name,
                        period: plan.period,
                        price: plan.price,
                        priceValue: parsePrice(plan.price),
                        accentColor: game.accentColor,
                        image: game.image,
                      });
                    }}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="px-5 pb-5">
          <p className="text-[11px] text-center leading-relaxed" style={{ color: "#52525b" }}>
            Pagamento seguro via PIX ou cartão. Ativação instantânea após confirmação.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Products Section                               */
/* ────────────────────────────────────────────── */

export function Products() {
  const sectionRef = useScrollReveal();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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

          {/* Game Cards */}
          <div className="space-y-4">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={cn("section-fade-in", `section-delay-${index + 1}`)}
              >
                <GameCard
                  game={game}
                  onClick={() => setSelectedGame(game)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans modal */}
      {selectedGame && (
        <PlansModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </>
  );
}
