# SolarHub

Plataforma premium de scripts para VALORANT — landing page construída com foco em performance, design editorial e experiência imersiva.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## Visão Geral

SolarHub é uma landing page de alta conversão para uma plataforma de gaming tools. O projeto prioriza direção de arte editorial, micro-interações e composição visual avançada com personagens de VALORANT.

### Seções

| Seção | Descrição |
|---|---|
| **Hero** | Chamber com ESP box overlay, HUD cards 2×2, CTAs e trust bar |
| **Products** | Grid de game cards com status badges e hover states |
| **Showcase** | Composição editorial de 5 layers — Jett com tipografia "ALÉM DO LIMITE", SVGs decorativos e headline mascarada |

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.1 | Framework, SSR, routing |
| React | 19.2 | UI runtime |
| Tailwind CSS | v4 | Styling (CSS-first config) |
| TypeScript | 5 | Type safety |
| Geist | — | Tipografia (sans + mono) |
| Lucide React | 0.563 | Iconografia |
| next-themes | 0.4 | Dark mode |

---

## Início Rápido

```bash
# Instalar dependências
npm install

# Desenvolvimento (Turbopack)
npm run dev

# Build de produção
npm run build

# Servir produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Estrutura

```
src/
├── app/
│   ├── globals.css          # Design tokens + animações (CSS custom properties)
│   ├── layout.tsx           # Root layout (fontes, metadata, ThemeProvider)
│   ├── page.tsx             # Home — Hero → Products → Showcase
│   └── login/
│       └── page.tsx         # Página de autenticação
├── components/
│   ├── layout/
│   │   ├── header.tsx       # Navbar fixa com blur + mobile menu
│   │   └── footer.tsx       # Footer com links e Discord
│   ├── sections/
│   │   ├── hero.tsx         # Chamber + ESP box + HUD cards
│   │   ├── products.tsx     # Grid de game cards
│   │   └── showcase.tsx     # Editorial Jett + SVGs + headline mascarada
│   ├── ui/
│   │   └── button.tsx       # Button primitivo (variants: primary, secondary, outline)
│   └── providers/
│       └── theme-provider.tsx
└── lib/
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

---

## Design System

### Tokens (CSS Custom Properties)

```
--background    #0a0a0b        Fundo principal
--surface       #111113        Cards, inputs
--border        #27272a        Bordas
--text-primary  #fafafa        Texto principal
--text-secondary #a1a1aa       Texto secundário
--accent        #f97316        Laranja primário (orange-500)
--accent-hover  #ea580c        Hover state
--accent-glow   rgba(249,115,22,0.25)
```

### Animações

| Classe | Efeito | Duração |
|---|---|---|
| `hero-fade-in` | Fade + slide up (24px) | 0.8s ease-out |
| `scribble-draw` | SVG stroke draw-in via dashoffset | 1.8s ease-out |
| `jett-editorial` | Float vertical (8px) | 6s infinite |
| `micro-label-pulse` | Dot scale + opacity | 2.5s infinite |
| `section-fade-in` | Scroll-reveal fade + slide | 0.6s ease-out |

Todas as animações respeitam `prefers-reduced-motion: reduce`.

### Showcase — Sistema de 5 Layers

```
z-[5]   Ghost headline (opacity 0.05)
z-[8]   SVGs editoriais (MainStroke, DirectionalArrow, MicroLabel)
z-[10]  Jett character (.jett-editorial)
z-[15]  Front headline (radial mask cut-through)
z-[20]  CTA + trust bar
```

A tipografia é renderizada em duas camadas — a frontal usa `mask-image: radial-gradient(ellipse)` para criar o efeito de "corte" onde a Jett atravessa o texto.

---

## Assets Necessários

Coloque na pasta `public/`:

| Arquivo | Descrição |
|---|---|
| `chamber.png` | Chamber (VALORANT) — fundo transparente, ~800×800 |
| `jett.png` | Jett (VALORANT) — fundo transparente, ~800×800 |
| `icon.png` | Ícone do SolarHub — 32×32 |

---

## Scripts

```bash
npm run dev       # Dev server com Turbopack
npm run build     # Build otimizado
npm start         # Serve build de produção
npm run lint      # ESLint
```

---

## Licença

Projeto privado — todos os direitos reservados.
