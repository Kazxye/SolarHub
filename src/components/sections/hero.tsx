"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

const products = [
  {
    name: "Val-SkinChanger",
    description: "Desbloqueie todas as skins do jogo",
    tag: "Popular",
    tagColor: "bg-accent",
    icon: Sparkles,
    features: ["Todas as skins", "Atualização automática", "Indetectável"],
    image: "/amigo.png",
  },
  {
    name: "Val-Esp",
    description: "Visualize informações avançadas",
    tag: "Novo",
    tagColor: "bg-emerald-500",
    icon: Shield,
    features: ["ESP de players", "Radar 2D"],
    image: "/amigo.png",
  },
];

const stats = [
  { value: "10K+", label: "Usuários ativos" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Suporte" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Gradient accent - subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
              Ferramentas premium
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                para VALORANT
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-text-secondary max-w-xl mb-8">
              Eleve seu gameplay com scripts desenvolvidos por especialistas.
              Seguro, atualizado e com suporte dedicado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center">
              <Button size="lg" className="min-w-[160px]">
                Ver Produtos
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" className="min-w-[160px]">
                Entrar no Discord
              </Button>
            </div>
          </div>

          {/* Right side - Jett Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png"
                alt="Jett - VALORANT Agent"
                width={500}
                height={500}
                className="relative z-10 drop-shadow-2xl object-contain max-h-[60vh]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative bg-surface/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Tag */}
              <div className={`absolute top-4 right-4 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${product.tagColor}`}>
                {product.tag}
              </div>

              {/* Product Cover Image */}
              <div className="w-full h-40 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 rounded-md bg-background/50 text-xs text-text-secondary border border-border/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-accent" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
