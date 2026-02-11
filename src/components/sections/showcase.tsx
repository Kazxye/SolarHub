"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

/* ────────────────────────────────────────────── */
/*  SVG Elements — Editorial direction art         */
/* ────────────────────────────────────────────── */

/**
 * MAIN STROKE — Sweeping underline beneath "ALÉM"
 * Bold 4px primary + thinner echo for editorial depth.
 */
function MainStroke({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 18C60 8 140 6 220 12C300 18 360 10 416 14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="scribble-draw"
      />
      <path
        d="M12 24C80 16 160 18 240 20C310 22 370 14 410 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
        className="scribble-draw scribble-draw-delay"
      />
    </svg>
  );
}

/**
 * DIRECTIONAL ARROW — Clean diagonal curve + arrowhead.
 */
function DirectionalArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 130C24 100 32 60 55 35C70 20 90 15 105 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="scribble-draw"
      />
      <path
        d="M92 4L108 12L96 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scribble-draw scribble-draw-delay"
      />
    </svg>
  );
}

/**
 * CROSSHAIR MARK — Small tech registration mark.
 * Thin plus sign with gap center. Architectural feel.
 */
function CrosshairMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="16" y1="2" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="scribble-draw" />
      <line x1="16" y1="20" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="scribble-draw" />
      <line x1="2" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="scribble-draw scribble-draw-delay" />
      <line x1="20" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="scribble-draw scribble-draw-delay" />
    </svg>
  );
}

/**
 * ARC FRAGMENT — Incomplete circle arc (~270°). Sketch-editorial vibe.
 */
function ArcFragment({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M65 20A30 30 0 1 0 55 62"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="scribble-draw"
      />
    </svg>
  );
}

/**
 * MICRO-LABEL — Mono text with status dot + connector line.
 */
function MicroLabel({
  className,
  text = "AIM MODE",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        className="w-[40px] h-[2px] mb-2 overflow-visible"
        viewBox="0 0 40 2"
        fill="none"
      >
        <line
          x1="0" y1="1" x2="40" y2="1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="scribble-draw"
        />
      </svg>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-accent micro-label-pulse" />
        <span className="font-mono text-[10px] xl:text-[11px] tracking-[0.2em] uppercase text-text-secondary/70 micro-label-fade">
          {text}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Headline text config                           */
/* ────────────────────────────────────────────── */

const headlineClass =
  "text-[7rem] xl:text-[8.5rem] 2xl:text-[11rem] font-black leading-[0.82] tracking-[-0.04em] uppercase select-none";

/* ────────────────────────────────────────────── */
/*  Showcase Section                               */
/* ────────────────────────────────────────────── */

export function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/[0.03] rounded-full blur-[160px]" />

      {/* Section fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[25]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[25]" />

      {/* ═══════════════════════════════════════════
          DESKTOP (lg+)
          ═══════════════════════════════════════════ */}
      <div className="hidden lg:block relative">
        <div className="hero-editorial-center" style={{ minHeight: "90vh" }}>

          {/* ── Layer 1: Back headline (ghost) ── z-[5] */}
          <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none hero-fade-in hero-delay-1">
            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`${headlineClass} showcase-headline-back text-text-primary -translate-x-[12%]`}>
                ALÉM
              </div>
              <div className={`${headlineClass} showcase-headline-back text-right translate-x-[12%]`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent/25 to-amber-500/25">
                  DO
                </span>
              </div>
              <div className={`${headlineClass} showcase-headline-back text-text-primary -translate-x-[5%]`}>
                LIMITE
              </div>
            </div>
          </div>

          {/* ── Layer 2: Editorial SVG elements ── z-[8] */}
          <div className="absolute inset-0 z-[8] pointer-events-none">
            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full">

              {/* Main stroke — bold underline beneath "ALÉM" */}
              <div className="absolute top-[28%] left-[1%] w-[340px] xl:w-[420px] hero-fade-in hero-delay-3">
                <MainStroke className="w-full h-auto text-accent/50" />
              </div>

              {/* Directional arrow — bottom-right */}
              <div className="absolute bottom-[30%] right-[12%] xl:right-[14%] w-[80px] xl:w-[100px] hero-fade-in hero-delay-4">
                <DirectionalArrow className="w-full h-auto text-accent/40 -scale-y-100" />
              </div>

              {/* Crosshair mark — top-right, tech registration */}
              <div className="absolute top-[18%] right-[22%] xl:right-[24%] w-[28px] xl:w-[32px] hero-fade-in hero-delay-5">
                <CrosshairMark className="w-full h-auto text-accent/30" />
              </div>

              {/* Arc fragment — bottom-left, incomplete circle */}
              <div className="absolute bottom-[24%] left-[6%] xl:left-[8%] w-[60px] xl:w-[72px] hero-fade-in hero-delay-4">
                <ArcFragment className="w-full h-auto text-text-secondary/15" />
              </div>

              {/* Micro-label — near arrow */}
              <div className="absolute bottom-[22%] right-[5%] xl:right-[7%] hero-fade-in hero-delay-5">
                <MicroLabel className="text-accent/50" text="AIM MODE" />
              </div>

            </div>
          </div>

          {/* ── Layer 3: JETT ── z-[10] */}
          <div className="relative z-[10] hero-fade-in hero-delay-2 flex items-end justify-center" style={{ height: "90vh" }}>
            <Image
              src="/jett.png"
              alt="Jett - VALORANT Agent"
              width={900}
              height={900}
              className="jett-editorial relative z-10 object-contain h-[80vh] w-auto"
              priority
            />
          </div>

          {/* ── Layer 4: Front headline (masked around Jett) ── z-[15] */}
          <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none showcase-headline-front hero-fade-in hero-delay-1">
            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`${headlineClass} showcase-text-outline text-text-primary -translate-x-[12%]`}>
                ALÉM
              </div>
              <div className={`${headlineClass} text-right translate-x-[12%]`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                  DO
                </span>
              </div>
              <div className={`${headlineClass} showcase-text-outline text-text-primary -translate-x-[5%]`}>
                LIMITE
              </div>
            </div>
          </div>

          {/* ── Layer 5: CTA ── z-[20] */}
          <div className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-[20] max-w-5xl w-full px-4 sm:px-6 lg:px-8">
            <p className="text-sm xl:text-base text-text-secondary leading-relaxed max-w-md hero-fade-in hero-delay-3">
              Onde a habilidade encontra a tecnologia. Eleve seu gameplay ao próximo nível.
            </p>

            <div className="mt-5 flex items-center gap-3 hero-fade-in hero-delay-4">
              <a href="https://discord.gg/solarhub" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-12 text-base px-8">
                  Entrar no Discord
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary hero-fade-in hero-delay-5">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-accent" />
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-blue-500" />
                <span>Patch atual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE (<lg)
          ═══════════════════════════════════════════ */}
      <div className="lg:hidden relative">
        <div className="flex flex-col gap-4 pt-16 pb-16 min-h-[85vh] justify-center px-4 sm:px-6">

          {/* Headline with bold stroke */}
          <div className="hero-fade-in relative">
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tight leading-[0.9] text-text-primary">
              <span className="relative inline-block">
                ALÉM
                <MainStroke className="absolute -bottom-2 left-0 w-[115%] h-auto text-accent/45" />
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                DO
              </span>
              <br />
              LIMITE
            </h2>
            <p className="mt-5 text-sm text-text-secondary leading-relaxed max-w-sm">
              Onde a habilidade encontra a tecnologia. Eleve seu gameplay ao próximo nível.
            </p>

            {/* Micro-label mobile */}
            <div className="absolute -top-1 right-0 hero-fade-in hero-delay-3">
              <MicroLabel className="text-accent/45 scale-90 origin-top-right" text="PRO READY" />
            </div>
          </div>

          {/* Jett — clean, no dark halo */}
          <div className="relative hero-fade-in hero-delay-1 flex justify-center -mx-4">
            <div className="relative">
              {/* Subtle accent ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full border border-accent/[0.07]" />

              {/* Minimal warm glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] bg-accent/[0.05] rounded-full blur-[80px]" />

              {/* Crosshair — near Jett */}
              <div className="absolute top-[8%] left-[8%] w-[22px] hero-fade-in hero-delay-4">
                <CrosshairMark className="w-full h-auto text-accent/25" />
              </div>

              {/* Directional arrow */}
              <div className="absolute top-[12%] right-[5%] w-[50px] hero-fade-in hero-delay-4">
                <DirectionalArrow className="w-full h-auto text-accent/30 -scale-x-100" />
              </div>

              <Image
                src="/jett.png"
                alt="Jett - VALORANT Agent"
                width={700}
                height={700}
                className="jett-editorial-mobile relative z-10 object-contain h-[50vh] sm:h-[58vh] w-auto"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 hero-fade-in hero-delay-2">
            <a href="https://discord.gg/solarhub" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 text-base px-8 w-full sm:w-auto">
                Entrar no Discord
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-4 text-xs text-text-secondary hero-fade-in hero-delay-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <span>Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <span>Patch atual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
