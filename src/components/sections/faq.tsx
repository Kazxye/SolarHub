"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────── */
/*  Types & Data                                   */
/* ────────────────────────────────────────────── */

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Os scripts são seguros de usar?",
    answer:
      "Sim. Todos os nossos scripts passam por múltiplas camadas de ofuscação e utilizam técnicas avançadas de anti-detecção. Mantemos uma taxa de 100% indetectável com atualizações constantes após cada patch do jogo.",
  },
  {
    question: "Com que frequência os scripts são atualizados?",
    answer:
      "Atualizamos nossos scripts em menos de 2 horas após cada patch dos jogos suportados. Nossa equipe monitora atualizações 24/7 para garantir que você nunca fique sem acesso.",
  },
  {
    question: "Como funciona o processo de compra?",
    answer:
      "Após escolher seu plano, você será redirecionado ao nosso Discord onde um de nossos atendentes processará seu pedido. Aceitamos PIX e cartão de crédito. Após a confirmação do pagamento, o acesso é liberado em minutos.",
  },
  {
    question: "E se eu for banido?",
    answer:
      "Nossos scripts são desenvolvidos para serem indetectáveis. No entanto, caso ocorra qualquer problema relacionado ao uso do nosso produto, oferecemos suporte completo e, dependendo do caso, substituição da licença.",
  },
  {
    question: "Posso usar em mais de um computador?",
    answer:
      "Cada licença é vinculada a um HWID (identificador de hardware). Para usar em outro computador, você pode solicitar um reset de HWID pelo nosso Discord, disponível uma vez por período de assinatura.",
  },
  {
    question: "Qual é a política de reembolso?",
    answer:
      "Oferecemos reembolso dentro de 24 horas após a compra, desde que o produto não tenha sido utilizado. Após o uso ou passado o período de 24 horas, não realizamos reembolsos. Entre em contato pelo Discord para mais detalhes.",
  },
];

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
/*  Accordion Item                                 */
/* ────────────────────────────────────────────── */

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "section-fade-in faq-item group rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-accent/30 bg-accent/[0.03]"
          : "border-border/40 bg-surface/30 hover:border-border/70 hover:bg-surface/50",
        `section-delay-${index + 1}`
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
      >
        <span
          className={cn(
            "text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-200",
            isOpen ? "text-text-primary" : "text-text-primary/80"
          )}
        >
          {item.question}
        </span>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
            isOpen
              ? "bg-accent/15 rotate-180"
              : "bg-surface group-hover:bg-surface-hover"
          )}
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              isOpen ? "text-accent" : "text-text-secondary"
            )}
          />
        </div>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height }}
      >
        <div ref={contentRef} className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="h-px bg-border/30 mb-4" />
          <p className="text-sm text-text-secondary leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  FAQ Section                                    */
/* ────────────────────────────────────────────── */

export function Faq() {
  const sectionRef = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[140px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 section-fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4 border border-accent/20">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
              frequentes
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Tire suas dúvidas antes de começar.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center section-fade-in section-delay-6">
          <p className="text-sm text-text-secondary">
            Ainda tem dúvidas?{" "}
            <a
              href="https://discord.gg/solarhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline underline-offset-4"
            >
              Fale conosco no Discord
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
