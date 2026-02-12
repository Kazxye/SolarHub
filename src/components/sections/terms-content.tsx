"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ShieldAlert, Receipt, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  termsData,
  TERMS_UPDATED,
  type TermsSection,
  type TermsBlock,
} from "@/lib/terms-data";

const DISCORD_URL = "https://discord.gg/solarhub";

/* ─────────────────────────────────────────────────
   Icon map
   ───────────────────────────────────────────────── */

const iconMap = {
  shield: ShieldAlert,
  receipt: Receipt,
  clock: Clock,
} as const;

/* ─────────────────────────────────────────────────
   Section renderer
   ───────────────────────────────────────────────── */

function TermsSectionBlock({ section }: { section: TermsSection }) {
  const Icon = iconMap[section.icon];

  return (
    <section id={section.id} className="scroll-mt-28">
      <div className="flex items-start gap-3.5 mb-4">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center mt-0.5">
          <Icon className="w-[18px] h-[18px] text-accent" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-text-primary leading-snug pt-1">
          {section.title}
        </h2>
      </div>

      <div className="pl-0 sm:pl-[52px] space-y-4">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

function BlockRenderer({ block }: { block: TermsBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
        {block.text}
      </p>
    );
  }

  return (
    <ul className="space-y-2.5 pl-1">
      {block.items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm sm:text-[15px] text-text-secondary leading-relaxed">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent/50 mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────
   Sidebar links
   ───────────────────────────────────────────────── */

function SidebarLinks({
  activeId,
  className,
}: {
  activeId: string;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Navegação dos termos">
      <ul className="space-y-1">
        {termsData.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200",
                activeId === s.id
                  ? "text-accent bg-accent/[0.08]"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover/60"
              )}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────── */

export function TermsContent() {
  const [activeId, setActiveId] = useState(termsData[0].id);

  /* Intersection observer for active section tracking */
  const handleScroll = useCallback(() => {
    const offsets = termsData.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return { id: s.id, top: Infinity };
      return { id: s.id, top: el.getBoundingClientRect().top };
    });

    const threshold = 160;
    const active = offsets.reduce((closest, curr) => {
      if (curr.top < threshold && curr.top > closest.top) return curr;
      if (closest.top >= threshold && curr.top < closest.top) return curr;
      return closest;
    });

    if (active.top < threshold) {
      setActiveId(active.id);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/[0.03] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-20">
        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
            Atualizado em {TERMS_UPDATED}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            Termos de serviço
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
            Leia com atenção antes de adquirir qualquer produto ou serviço.
          </p>
        </div>

        {/* ── Mobile nav ── */}
        <div className="lg:hidden mb-8">
          <div className="rounded-2xl border border-border/40 bg-surface/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 px-1">
              Nesta página
            </p>
            <SidebarLinks activeId={activeId} />
          </div>
        </div>

        {/* ── Grid: sidebar + content ── */}
        <div className="flex gap-10 lg:gap-14">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 px-3">
                Nesta página
              </p>
              <SidebarLinks activeId={activeId} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-border/40 bg-surface/30 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10 space-y-10">
                {termsData.map((section, i) => (
                  <div key={section.id}>
                    <TermsSectionBlock section={section} />
                    {i < termsData.length - 1 && (
                      <div className="mt-10 h-px bg-border/30" />
                    )}
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="px-6 sm:px-8 lg:px-10 py-5 border-t border-border/30 bg-surface/20">
                <p className="text-xs text-text-secondary/60">
                  Copyright © Solar Hub. Todos os direitos reservados.
                </p>
              </div>
            </div>

            {/* ── Support CTA ── */}
            <div className="mt-10 rounded-2xl border border-border/40 bg-surface/40 p-6 sm:p-8 text-center">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Em caso de dúvidas, fale com o suporte
              </h3>
              <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Nossa equipe está pronta para esclarecer qualquer ponto sobre os termos ou ajudar com seu pedido.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="h-11 px-6 text-sm">
                    Discord
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </a>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg" className="h-11 px-6 text-sm">
                    Suporte
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
