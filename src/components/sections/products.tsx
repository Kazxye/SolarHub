"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  RefreshCw,
  Zap,

  Crosshair,
  Eye,
  Cpu,
  Package,
  Monitor,
  Fingerprint,
  Server,
  Layers,
} from "lucide-react";

/* ────────────────────────────────────────────── */
/*  Types                                          */
/* ────────────────────────────────────────────── */

interface Tool {
  name: string;
  type: "ESP" | "Aim" | "Utility" | "Full Package";
  description: string;
  icon: typeof Crosshair;
}

interface Game {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  accentColor: string;
  badge: string | null;
  isSpoofer?: boolean;
  compatibleGames?: string[];
  tools: Tool[];
}

/* ────────────────────────────────────────────── */
/*  Data                                           */
/* ────────────────────────────────────────────── */

const games: Game[] = [
  {
    id: "valorant",
    name: "VALORANT",
    subtitle: "Tactical shooter",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    accentColor: "red",
    badge: "Popular",
    tools: [
      { name: "Aimbot Pro", type: "Aim", description: "Mira assistida com humanização e suavização avançada", icon: Crosshair },
      { name: "Wallhack ESP", type: "ESP", description: "Visualize jogadores, agentes e armas através de paredes", icon: Eye },
      { name: "Full Package", type: "Full Package", description: "Todos os recursos combinados em um único loader", icon: Package },
    ],
  },
  {
    id: "cs2",
    name: "CS2",
    subtitle: "Competitive FPS",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    accentColor: "amber",
    badge: "Recomendado",
    tools: [
      { name: "Aimbot + Anti-Recoil", type: "Aim", description: "Sistema de mira com compensação automática de recuo", icon: Crosshair },
      { name: "Wallhack + Radar", type: "ESP", description: "ESP completo com radar overlay discreto", icon: Eye },
      { name: "Full Package", type: "Full Package", description: "Pacote completo com todas as ferramentas CS2", icon: Package },
    ],
  },
  {
    id: "fortnite",
    name: "FORTNITE",
    subtitle: "Battle royale",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    accentColor: "blue",
    badge: null,
    tools: [
      { name: "Aimbot Predictivo", type: "Aim", description: "Mira com predição de movimento e drop de projétil", icon: Crosshair },
      { name: "ESP + Loot Finder", type: "ESP", description: "Visualize jogadores e itens raros em tempo real", icon: Eye },
      { name: "Build Assist", type: "Utility", description: "Construção e edição rápida assistida por IA", icon: Cpu },
    ],
  },
  {
    id: "dayz",
    name: "DAYZ",
    subtitle: "Survival",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    accentColor: "emerald",
    badge: null,
    tools: [
      { name: "Player + Loot ESP", type: "ESP", description: "Veja jogadores, veículos, loot e bases no mapa", icon: Eye },
      { name: "Aimbot Balístico", type: "Aim", description: "Mira com compensação de balística e queda de bala", icon: Crosshair },
      { name: "Mapa Interativo", type: "Utility", description: "Overlay com pontos de interesse e rotas seguras", icon: Monitor },
    ],
  },
  {
    id: "spoofer",
    name: "HWID SPOOFER",
    subtitle: "Security Tool",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    accentColor: "violet",
    badge: "Security Tool",
    isSpoofer: true,
    compatibleGames: ["Valorant", "CS2", "Fortnite", "DayZ", "EAC", "BattlEye", "Vanguard"],
    tools: [
      { name: "HWID Spoof", type: "Utility", description: "Spoof completo de hardware ID, serial e volume ID", icon: Fingerprint },
      { name: "MAC Spoof", type: "Utility", description: "Alteração de endereço MAC de todos os adaptadores", icon: Server },
      { name: "Full Clean", type: "Full Package", description: "Reset completo de ban com limpeza de registros", icon: Layers },
    ],
  },
];

/* ────────────────────────────────────────────── */
/*  Color map (static strings for Tailwind JIT)    */
/* ────────────────────────────────────────────── */

const colorMap: Record<string, {
  gradient: string;
  bg: string;
  text: string;
  border: string;
  ring: string;
  shadow: string;
}> = {
  red:     { gradient: "from-red-500/80 to-red-900/90",     bg: "bg-red-500/10",     text: "text-red-500",     border: "border-red-500/40",     ring: "ring-red-500/30",     shadow: "shadow-red-500/10" },
  amber:   { gradient: "from-amber-500/80 to-amber-900/90", bg: "bg-amber-500/10",   text: "text-amber-500",   border: "border-amber-500/40",   ring: "ring-amber-500/30",   shadow: "shadow-amber-500/10" },
  blue:    { gradient: "from-blue-500/80 to-blue-900/90",   bg: "bg-blue-500/10",    text: "text-blue-500",    border: "border-blue-500/40",    ring: "ring-blue-500/30",    shadow: "shadow-blue-500/10" },
  emerald: { gradient: "from-emerald-500/80 to-emerald-900/90", bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/40", ring: "ring-emerald-500/30", shadow: "shadow-emerald-500/10" },
  violet:  { gradient: "from-violet-500/80 to-violet-900/90", bg: "bg-violet-500/10",  text: "text-violet-500",  border: "border-violet-500/40",  ring: "ring-violet-500/30",  shadow: "shadow-violet-500/10" },
};

const typeColorMap: Record<string, string> = {
  "ESP":          "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "Aim":          "bg-red-500/15 text-red-400 border-red-500/25",
  "Utility":      "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Full Package": "bg-accent/15 text-accent border-accent/25",
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
/*  Game Card                                      */
/* ────────────────────────────────────────────── */

function GameCard({
  game,
  isOpen,
  onToggle,
}: {
  game: Game;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const colors = colorMap[game.accentColor];
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "game-card group relative rounded-2xl overflow-hidden",
        "border transition-all duration-500",
        isOpen
          ? cn("border-border/60", colors.shadow, "shadow-lg")
          : "border-border/30 hover:border-border/60"
      )}
    >
      {/* ── Game cover (clickable) ── */}
      <button
        onClick={onToggle}
        className="relative w-full h-48 sm:h-56 overflow-hidden cursor-pointer text-left"
      >
        {/* Image with zoom on hover */}
        <Image
          src={game.image}
          alt={game.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isOpen ? "scale-105" : "group-hover:scale-105"
          )}
        />

        {/* Dark overlay gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t to-transparent",
          isOpen ? colors.gradient : "from-black/80 via-black/40"
        )} />

        {/* Content over the image */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
          {/* Top row — badges */}
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

          {/* Bottom row — name + action */}
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {game.name}
              </h3>
              <p className="text-sm text-white/60 font-medium mt-0.5">
                {game.subtitle}
              </p>
            </div>
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
              "bg-white/10 backdrop-blur-sm border border-white/20",
              isOpen && "rotate-180 bg-white/20"
            )}>
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </button>

      {/* ── Expandable tools panel ── */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 600}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="p-5 sm:p-6 bg-surface/40 backdrop-blur-sm border-t border-border/30">
          {/* Spoofer compatibility row */}
          {game.isSpoofer && game.compatibleGames && (
            <div className="mb-5 pb-5 border-b border-border/30">
              <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-2.5">
                Compatível com
              </p>
              <div className="flex flex-wrap gap-2">
                {game.compatibleGames.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tools grid */}
          <div className="grid sm:grid-cols-3 gap-3">
            {game.tools.map((tool) => (
              <div
                key={tool.name}
                className="group/tool relative p-4 rounded-xl bg-background/60 border border-border/40 hover:border-border/70 transition-all duration-200 hover:shadow-sm"
              >
                {/* Tool icon + type */}
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    colors.bg
                  )}>
                    <tool.icon className={cn("w-4 h-4", colors.text)} />
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border",
                    typeColorMap[tool.type]
                  )}>
                    {tool.type}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-text-primary mb-1">
                  {tool.name}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA inside expanded panel */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button variant="primary" size="md" className="flex-1 sm:flex-none">
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="md" className="flex-1 sm:flex-none">
              Comparar planos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Products Section (Game Hub)                    */
/* ────────────────────────────────────────────── */

export function Products() {
  const sectionRef = useScrollReveal();
  const [openGameId, setOpenGameId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenGameId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="produtos"
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
            Game Hub
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            Escolha seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
              jogo
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Selecione um jogo para explorar as ferramentas disponíveis.
            <br className="hidden sm:block" />
            Todos os scripts atualizados e 100% indetectáveis.
          </p>
        </div>

        {/* Game Cards Stack */}
        <div className="space-y-4">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={cn("section-fade-in", `section-delay-${index + 1}`)}
            >
              <GameCard
                game={game}
                isOpen={openGameId === game.id}
                onToggle={() => handleToggle(game.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 section-fade-in section-delay-6">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-surface/60 backdrop-blur-sm border border-border/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/60 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Indetectável</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <span>Atualização em &lt;2hrs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Suporte 24/7</span>
                </div>
              </div>

              <Button size="lg" className="shrink-0">
                Ver todos os planos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
