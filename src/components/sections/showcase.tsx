"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, RefreshCw, Users } from "lucide-react";

export function Showcase() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px]" />
      <div className="absolute top-[30%] right-0 w-[300px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />

      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[25]" />

      {/* ═══════════════════════════════════════════════════
          DESKTOP — Centered Character, Split Headline (lg+)
          ═══════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative">
        <div className="hero-editorial-center" style={{ minHeight: "80vh" }}>

          {/* ── JETT — Centered, dominant, z-[10] ── */}
          <div className="relative z-[10] hero-fade-in hero-delay-2 flex items-end justify-center" style={{ height: "80vh" }}>

            {/* Radial glow behind Jett */}
            {/*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-radial from-accent/15 to-transparent rounded-full blur-3xl" />*/}

            <Image
              src="/jett.png"
              alt="Jett - VALORANT Agent"
              width={700}
              height={700}
              className="relative z-10 object-contain h-[72vh] w-auto jett-glow"
              priority
            />
          </div>

          {/* ── HEADLINE BACK LAYER — behind Jett, very subtle ghost text ── */}
          <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none hero-fade-in hero-delay-1">
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* ALÉM — shifted to the LEFT */}
              <div className="hero-headline-back text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase text-text-primary select-none text-left -ml-4">
                ALÉM
              </div>
              {/* DO — shifted to the RIGHT */}
              <div className="hero-headline-back text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase select-none text-right -mr-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent/30 to-amber-500/30">
                  DO
                </span>
              </div>
              {/* LIMITE — shifted to the LEFT */}
              <div className="hero-headline-back text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase text-text-primary select-none text-left ml-8">
                LIMITE
              </div>
            </div>
          </div>

          {/* ── HEADLINE FRONT LAYER — in front of Jett, masked around her silhouette ── */}
          <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none hero-headline-front hero-fade-in hero-delay-1">
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* ALÉM — shifted to the LEFT */}
              <div className="text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase text-text-primary select-none text-left -ml-4">
                ALÉM
              </div>
              {/* DO — shifted to the RIGHT, in ORANGE */}
              <div className="text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase select-none text-right -mr-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                  DO
                </span>
              </div>
              {/* LIMITE — shifted to the LEFT */}
              <div className="text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase text-text-primary select-none text-left ml-8">
                LIMITE
              </div>
            </div>
          </div>

          {/* ── CTA + SUBHEADLINE — bottom-left anchored ── */}
          <div className="absolute bottom-[6vh] left-0 z-[20] max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ left: "50%", transform: "translateX(-50%)" }}>
            <p className="text-sm xl:text-base text-text-secondary leading-relaxed max-w-md hero-fade-in hero-delay-3">
              Onde a habilidade encontra a tecnologia. Eleve seu gameplay ao próximo nível.
            </p>

            <div className="mt-5 flex items-center gap-3 hero-fade-in hero-delay-4">
              <Button size="lg" className="h-12 text-base px-8">
                Acessar Scripts
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" className="h-12 text-base px-8">
                Comunidade
              </Button>
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

      {/* ═══════════════════════════════════════════════════
          MOBILE — Stacked Layout (<lg)
          ═══════════════════════════════════════════════════ */}
      <div className="lg:hidden relative">
        <div className="flex flex-col gap-6 pt-16 pb-16 min-h-[80vh] justify-center px-4 sm:px-6">

          {/* Headline */}
          <div className="hero-fade-in">
            <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tight leading-[0.9] text-text-primary">
              ALÉM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                DO
              </span>
              <br />
              LIMITE
            </h2>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-sm">
              Onde a habilidade encontra a tecnologia. Eleve seu gameplay ao próximo nível.
            </p>
          </div>

          {/* Jett */}
          <div className="relative hero-fade-in hero-delay-1 flex justify-center -mx-4">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-accent/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-radial from-accent/15 to-transparent rounded-full blur-3xl" />
              <Image
                src="/jett.png"
                alt="Jett - VALORANT Agent"
                width={700}
                height={700}
                className="relative z-10 object-contain h-[50vh] sm:h-[60vh] w-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          {/* Stat cards — horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 hero-fade-in hero-delay-2 scrollbar-none">
            <div className="glass-card shrink-0 px-4 py-3" style={{ boxShadow: "0 0 20px rgba(249, 115, 22, 0.08), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium whitespace-nowrap">Latência de execução</span>
              </div>
              <div className="text-xl font-bold text-text-primary font-mono tracking-tight">
                0.3<span className="text-sm text-text-secondary font-normal ml-0.5">ms</span>
              </div>
            </div>

            <div className="glass-card shrink-0 px-4 py-3" style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.08), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium whitespace-nowrap">Anti-detecção</span>
              </div>
              <div className="text-xl font-bold text-text-primary font-mono tracking-tight">
                100<span className="text-sm text-text-secondary font-normal ml-0.5">%</span>
              </div>
            </div>

            <div className="glass-card shrink-0 px-4 py-3" style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.08), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium whitespace-nowrap">Atualizações após patch</span>
              </div>
              <div className="text-xl font-bold text-text-primary font-mono tracking-tight">
                &lt;2<span className="text-sm text-text-secondary font-normal ml-0.5">h</span>
              </div>
            </div>

            <div className="glass-card shrink-0 px-4 py-3" style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.08), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium whitespace-nowrap">Jogadores ativos</span>
              </div>
              <div className="text-xl font-bold text-text-primary font-mono tracking-tight">
                10K<span className="text-sm text-text-secondary font-normal ml-0.5">+</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 hero-fade-in hero-delay-3">
            <Button size="lg" className="h-12 text-base px-8">
              Acessar Scripts
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" className="h-12 text-base px-8">
              Comunidade
            </Button>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-4 text-xs text-text-secondary hero-fade-in hero-delay-4">
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

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[25]" />
    </section>
  );
}
