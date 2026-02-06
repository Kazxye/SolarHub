"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, RefreshCw, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-accent/[0.04] to-transparent" />
      <div className="absolute -top-40 right-[20%] w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full pt-28 pb-16 lg:pt-0 lg:pb-0">

          {/* ======== LEFT SIDE — HUD MODULAR GRID ======== */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10">

            {/* Row 1: Headline */}
            <div className="hero-fade-in">
              {/* Headline — bold, short, impactful */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-text-primary leading-[1.05]">
                Domine cada
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                  partida.
                </span>
              </h1>

              <p className="mt-5 text-base text-text-secondary leading-relaxed max-w-md">
                Ferramentas Auxiliares para quem não aceita menos que a vitória.
              </p>
            </div>

            {/* Row 2: HUD Cards Grid — 2x2 assimétrico */}
            <div className="mt-8 grid grid-cols-2 gap-3 hero-fade-in hero-delay-1">

              {/* Card 1 — SPEED (destaque principal, maior) */}
              <div className="hud-card group col-span-2 sm:col-span-1 relative p-4 rounded-2xl bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden">
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/60 to-transparent" />
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Zap className="w-[18px] h-[18px] text-accent" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
                  0.3<span className="text-base text-text-secondary font-normal ml-0.5">ms</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 font-medium uppercase tracking-wider">
                  Latência de execução
                </div>
              </div>

              {/* Card 2 — SECURITY */}
              <div className="hud-card group relative p-4 rounded-2xl bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-500/60 to-transparent" />
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <ShieldCheck className="w-[18px] h-[18px] text-emerald-500" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
                  100<span className="text-base text-text-secondary font-normal ml-0.5">%</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 font-medium uppercase tracking-wider">
                  Anti-detecção
                </div>
              </div>

              {/* Card 3 — UPDATES */}
              <div className="hud-card group relative p-4 rounded-2xl bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-500/60 to-transparent" />
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <RefreshCw className="w-[18px] h-[18px] text-blue-500" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
                  &lt;2<span className="text-base text-text-secondary font-normal ml-0.5">hrs</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 font-medium uppercase tracking-wider">
                  Após cada patch
                </div>
              </div>

              {/* Card 4 — COMMUNITY */}
              <div className="hud-card group relative p-4 rounded-2xl bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-violet-500/60 to-transparent" />
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <Users className="w-[18px] h-[18px] text-violet-500" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
                  10K<span className="text-base text-text-secondary font-normal ml-0.5">+</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 font-medium uppercase tracking-wider">
                  Jogadores ativos
                </div>
              </div>
            </div>

            {/* Row 3: CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 hero-fade-in hero-delay-3">
              <Button size="lg" className="h-12 text-base px-8">
                Acessar Scripts
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" className="h-12 text-base px-8">
                Comunidade
              </Button>
            </div>

            {/* Row 4: Micro trust bar */}
            <div className="mt-6 flex items-center gap-4 text-xs text-text-secondary hero-fade-in hero-delay-4">
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

          {/* ======== RIGHT SIDE — JETT (intacto) ======== */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative hero-fade-in hero-delay-2">

              {/* Accent ring behind Jett */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-accent/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-accent/[0.06]" />

              {/* Radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-radial from-accent/15 to-transparent rounded-full blur-3xl" />

              {/* Jett */}
              <Image
                src="https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png"
                alt="Jett - VALORANT Agent"
                width={700}
                height={700}
                className="relative z-10 object-contain h-[55vh] sm:h-[65vh] lg:h-[85vh] w-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                priority
              />

              {/* Floating stat cards around Jett */}
              <div className="absolute top-[15%] left-0 z-20 px-4 py-3 rounded-2xl bg-surface/90 backdrop-blur-md border border-border/50 shadow-xl hero-fade-in hero-delay-4">
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Uptime</div>
                <div className="text-2xl font-bold text-text-primary">99.9%</div>
                <div className="mt-1.5 w-full h-1.5 rounded-full bg-border/50 overflow-hidden">
                  <div className="h-full w-[99.9%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                </div>
              </div>

              <div className="absolute bottom-[20%] left-[5%] z-20 px-4 py-3 rounded-2xl bg-surface/90 backdrop-blur-md border border-border/50 shadow-xl hero-fade-in hero-delay-5">
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Suporte</div>
                <div className="text-2xl font-bold text-accent">24/7</div>
              </div>

              <div className="absolute top-[30%] right-0 z-20 px-4 py-3 rounded-2xl bg-surface/90 backdrop-blur-md border border-border/50 shadow-xl hidden lg:block hero-fade-in" style={{ animationDelay: "1.1s" }}>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Atualizado</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-semibold text-text-primary">Patch atual</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
