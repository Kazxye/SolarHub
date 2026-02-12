"use client";

import { useState, useCallback, useMemo, useRef, useId, Fragment } from "react";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  faqData,
  categoryLabels,
  categoryOrder,
  type FaqCategory,
  type FaqItem,
} from "@/lib/faq-data";

const DISCORD_URL = "https://discord.gg/solarhub";

/* ─────────────────────────────────────────────────
   Highlight matched text
   ───────────────────────────────────────────────── */

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-accent/20 text-accent rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────
   FaqAccordionItem
   ───────────────────────────────────────────────── */

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  query,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  query: string;
}) {
  const contentId = `faq-content-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200",
        isOpen
          ? "bg-surface/80 border-border/60 shadow-sm"
          : "bg-surface/40 border-border/30 hover:border-border/50"
      )}
    >
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer group"
      >
        <span className="text-[15px] sm:text-base font-semibold text-text-primary leading-snug pr-2">
          <HighlightText text={item.question} query={query} />
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 text-text-secondary transition-transform duration-200",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          "faq-accordion-body overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "faq-accordion-open" : "faq-accordion-closed"
        )}
      >
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="border-t border-border/30 pt-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightText text={item.answer} query={query} />
            </p>

            {item.steps && item.steps.length > 0 && (
              <ol className="mt-4 space-y-2.5">
                {item.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-text-secondary">
                      <HighlightText text={step} query={query} />
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   FaqContent — Main client component
   ───────────────────────────────────────────────── */

export function FaqContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);
  const id = useId();

  /* Toggle accordion */
  const toggleItem = useCallback((itemId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  /* Filter logic */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return faqData.filter((item) => {
      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;

      if (!q) return matchCategory;

      const matchText =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.steps && item.steps.some((s) => s.toLowerCase().includes(q)));

      return matchCategory && matchText;
    });
  }, [search, activeCategory]);

  /* Group by category for display */
  const grouped = useMemo(() => {
    const map = new Map<FaqCategory, FaqItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return categoryOrder
      .filter((cat) => map.has(cat))
      .map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, [filtered]);

  /* Count per category */
  const counts = useMemo(() => {
    const q = search.toLowerCase().trim();
    const c: Partial<Record<FaqCategory | "all", number>> = { all: 0 };

    for (const item of faqData) {
      const matchText =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.steps && item.steps.some((s) => s.toLowerCase().includes(q)));

      if (matchText) {
        c.all = (c.all ?? 0) + 1;
        c[item.category] = (c[item.category] ?? 0) + 1;
      }
    }
    return c;
  }, [search]);

  return (
    <div className="relative">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/[0.03] rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-20">
        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
            Central de ajuda
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            FAQ
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
            Perguntas comuns sobre instalação, requisitos e solução de problemas.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              ref={searchRef}
              id={`${id}-search`}
              type="search"
              placeholder="Buscar pergunta, termo ou palavra-chave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl outline-none transition-all duration-200",
                "bg-surface/60 border border-border/50 text-text-primary placeholder:text-text-secondary/50",
                "focus:border-accent/50 focus:ring-1 focus:ring-accent/20 focus:bg-surface/80"
              )}
              aria-label="Buscar no FAQ"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  searchRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded-lg hover:bg-surface-hover transition-colors"
                aria-label="Limpar busca"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Category Chips ── */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Categorias do FAQ">
          <button
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-3.5 py-2 text-[13px] font-medium rounded-xl border transition-all duration-200",
              activeCategory === "all"
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-surface/40 border-border/30 text-text-secondary hover:text-text-primary hover:border-border/50"
            )}
          >
            Todos
            <span className="ml-1.5 text-[11px] opacity-60">{counts.all ?? 0}</span>
          </button>
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3.5 py-2 text-[13px] font-medium rounded-xl border transition-all duration-200",
                activeCategory === cat
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "bg-surface/40 border-border/30 text-text-secondary hover:text-text-primary hover:border-border/50"
              )}
            >
              {categoryLabels[cat]}
              <span className="ml-1.5 text-[11px] opacity-60">{counts[cat] ?? 0}</span>
            </button>
          ))}
        </div>

        {/* ── Accordion groups ── */}
        {grouped.length > 0 ? (
          <div className="space-y-10">
            {grouped.map(({ category, items }) => (
              <section key={category}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4 pl-1">
                  {categoryLabels[category]}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openIds.has(item.id)}
                      onToggle={() => toggleItem(item.id)}
                      query={search}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-surface-hover/60 flex items-center justify-center mx-auto mb-4">
              <Search className="w-5 h-5 text-text-secondary" />
            </div>
            <p className="text-base font-medium text-text-primary">
              Nenhum resultado encontrado
            </p>
            <p className="mt-1.5 text-sm text-text-secondary">
              Tente buscar por outros termos ou{" "}
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                  searchRef.current?.focus();
                }}
                className="text-accent hover:text-accent-hover font-medium transition-colors"
              >
                limpe os filtros
              </button>
            </p>
          </div>
        )}

        {/* ── Support CTA ── */}
        <div className="mt-16 rounded-2xl border border-border/40 bg-surface/40 p-6 sm:p-8 text-center">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            Não encontrou sua dúvida?
          </h3>
          <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Nossa equipe está disponível 24/7 para ajudar com qualquer problema.
            Entre em contato pelo Discord ou abra um ticket de suporte.
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
                Abrir ticket
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
