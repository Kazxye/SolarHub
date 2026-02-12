<div align="center">

<img src="public/icon.png" alt="SolarHub" width="56" height="56" />

# SolarHub

**Plataforma premium de scripts para VALORANT**

Landing page de alta conversão com direção de arte editorial,<br/>micro-interações premium e composição visual avançada.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-087EA4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

</div>

<br/>

> [!NOTE]
> Este é um projeto privado. O código-fonte, assets e conteúdo são protegidos e não devem ser redistribuídos.

<br/>

## 📑 Sumário

- [Início Rápido](#-início-rápido)
- [Rotas](#-rotas)
- [Funcionalidades](#-funcionalidades)
- [Estrutura](#-estrutura-do-projeto)
- [Design System](#-design-system)
- [Acessibilidade](#-acessibilidade)
- [Assets](#-assets)
- [Scripts](#-scripts)

<br/>

## 🚀 Início Rápido

**Pré-requisitos:** Node.js 18+ e npm 9+

```bash
git clone https://github.com/seu-user/solarhub.git
cd solarhub
npm install
```

```bash
npm run dev          # → http://localhost:3000 (Turbopack)
```

```bash
npm run build        # Build otimizado
npm start            # Servir produção
```

<br/>

## 🗺 Rotas

```
/              Home — Hero · Products · Showcase
/faq           Central de ajuda — busca, categorias, accordion
/termos        Termos de serviço — sidebar com navegação ancorada
```

<br/>

## ✦ Funcionalidades

### `Hero` — Chamber + ESP Overlay + HUD Cards

<table>
<tr>
<td width="50%">

- Character showcase com Chamber e **ESP bounding box** overlay estilo cheat HUD
- **4 HUD cards** com tracing border animada via `@property --hud-angle` + `conic-gradient`
- Cores codificadas por card — laranja, verde, azul, violeta
- Trust bar com indicadores de status em tempo real
- ESP simplificado em mobile (corners only)

</td>
<td width="50%">

**Técnico**
- `overflow: hidden` contém pseudo-elements
- `::before` — sharp inset line (`padding: 1.5px`)
- `::after` — soft glow (`padding: 4px`, `blur(4px)`)
- Responsive: `h-[50vh]` → `h-[85vh]` em 5 breakpoints

</td>
</tr>
</table>

### `Products` — Game Cards Grid

- Grid responsivo de cards com status badges — *Online*, *Em breve*, *Manutenção*
- Hover minimalista com brightness transition
- Layout adaptativo de 1 a 3 colunas

### `Showcase` — Editorial Jett · 5 Layers

<table>
<tr>
<td width="50%">

- Composição editorial com **Jett** em 5 camadas de profundidade
- Tipografia "ALÉM DO LIMITE" em **dual-layer** com `mask-image` radial para efeito de cutout
- 5 SVGs decorativos procedurais com `stroke-dasharray` animation

</td>
<td width="50%">

```
z-[5]   Ghost headline (opacity 0.06)
z-[8]   SVGs — stroke, arrow, crosshair, arc, label
z-[10]  Jett character (float animation)
z-[15]  Front headline (radial mask cutout)
z-[20]  CTA + trust bar
```

</td>
</tr>
</table>

### `Auth Modal` — Login + Registro

- Modal **sem rota dedicada** — acionado por state no Header
- **Tabs segmentadas**: Entrar / Criar conta no mesmo modal
- Focus trap · scroll lock · ESC close · overlay click · return focus
- Validação em tempo real — email, senha (min 6), confirmação de senha
- Loading states com spinner e inputs disabled
- OAuth: botão "Continuar com Discord"
- `handleLogin()` e `handleRegister()` prontos para API

### `FAQ` — Central de Ajuda

- **Busca em tempo real** com highlight de termos via `<mark>`
- Chips de categoria com **contagem dinâmica** e filtro cruzado
- Accordion com `grid-template-rows: 0fr → 1fr` transition
- 15 perguntas em 5 categorias: Requisitos · Instalação · Problemas · Conta · Segurança
- Empty state com reset de filtros
- CTA de suporte (Discord + ticket)

### `Termos` — Termos de Serviço

- **Sidebar sticky** no desktop com scroll tracking da seção ativa
- Mobile: nav inline no topo do conteúdo
- 3 seções com ícones — Banimentos · Reembolso · Atendimento
- Card principal com dividers e footer de copyright

<br/>

## 🏗 Estrutura do Projeto

```
src/
│
├─ app/
│  ├─ globals.css ·················· Design tokens, animações, ESP, HUD (~800 linhas)
│  ├─ layout.tsx ··················· Root layout — Geist fonts, metadata, ThemeProvider
│  ├─ page.tsx ····················· Home: Hero → Products → Showcase
│  ├─ faq/page.tsx ················· FAQ — SEO metadata
│  ├─ termos/page.tsx ·············· Termos — SEO metadata
│  └─ login/page.tsx ··············· Login page (legacy, substituída por modal)
│
├─ components/
│  ├─ auth/
│  │  ├─ modal-shell.tsx ··········· Dialog reutilizável (focus trap, a11y, scroll lock)
│  │  ├─ login-form.tsx ············ Tabs Login/Register, validação, Discord OAuth
│  │  └─ login-modal.tsx ··········· Composição: shell + form
│  │
│  ├─ layout/
│  │  ├─ header.tsx ················ Navbar fixa + blur + mobile menu + modal trigger
│  │  └─ footer.tsx ················ Footer com links categorizados + Discord
│  │
│  ├─ sections/
│  │  ├─ hero.tsx ·················· Chamber + ESP bounding box + HUD cards 2×2
│  │  ├─ products.tsx ·············· Grid de game cards com status badges
│  │  ├─ showcase.tsx ·············· Editorial Jett + SVGs + dual-layer headline
│  │  ├─ faq-content.tsx ··········· Search + chips + accordion + highlight
│  │  └─ terms-content.tsx ········· Sidebar + seções com ícones + CTA
│  │
│  ├─ ui/
│  │  └─ button.tsx ················ Button primitivo (primary, secondary, ghost, outline)
│  │
│  └─ providers/
│     └─ theme-provider.tsx ········ next-themes wrapper
│
└─ lib/
   ├─ utils.ts ····················· cn() — clsx + tailwind-merge
   ├─ faq-data.ts ·················· 15 FAQ items tipados com tags e steps
   └─ terms-data.ts ················ 3 seções de termos tipadas com blocos
```

<br/>

## 🎨 Design System

### Tokens — CSS Custom Properties

| Token | Dark | Função |
|:---|:---|:---|
| `--background` | `#0a0a0b` | Fundo principal |
| `--surface` | `#111113` | Cards, inputs, modais |
| `--surface-hover` | `#1a1a1d` | Hover states |
| `--border` | `#27272a` | Bordas e dividers |
| `--text-primary` | `#fafafa` | Texto principal |
| `--text-secondary` | `#a1a1aa` | Texto auxiliar |
| `--accent` | `#f97316` | Laranja primário · orange-500 |
| `--accent-hover` | `#ea580c` | Accent hover state |
| `--accent-glow` | `rgba(249,115,22,0.25)` | Glow e halos |

Configuração via Tailwind v4 `@theme inline` — sem `tailwind.config`.

### Animações

| Keyframe | Efeito | Timing |
|:---|:---|:---|
| `heroFadeIn` | Fade + slide up 24px | `0.8s ease-out` |
| `hudTrace` | Tracing border rotation (`--hud-angle` 0→360°) | `2.8s linear infinite` |
| `scribbleDraw` | SVG stroke reveal via `stroke-dashoffset` | `1.8s ease-out` |
| `jettFloat` | Float vertical ±8px | `6s ease-in-out infinite` |
| `loginCardIn` | Modal entrada: slide up + scale 0.98→1 | `0.3s cubic-bezier` |
| `authFormSwitch` | Tab switch: fade + slide 6px | `0.25s ease-out` |
| `faq-accordion` | `grid-template-rows: 0fr → 1fr` | `0.3s cubic-bezier` |

> Todas respeitam `@media (prefers-reduced-motion: reduce)` — animações desativadas ou substituídas por estados estáticos.

### Tipografia

| Uso | Font | Variable |
|:---|:---|:---|
| Interface, corpo | Geist Sans | `--font-geist-sans` |
| Código, métricas | Geist Mono | `--font-geist-mono` |

<br/>

## ♿ Acessibilidade

| Componente | Implementação |
|:---|:---|
| **Modal (Auth)** | `role="dialog"` · `aria-modal` · focus trap · scroll lock · ESC/overlay close · return focus |
| **Accordion (FAQ)** | `aria-expanded` · `aria-controls` · `role="region"` · `aria-labelledby` |
| **Inputs** | `aria-invalid` · `aria-describedby` · `<label>` associados |
| **Erros** | `role="alert"` · `aria-live="polite"` |
| **Navegação** | `aria-label` · skip-links · foco visível em todos os interativos |
| **Animações** | `prefers-reduced-motion: reduce` em 100% dos keyframes |

<br/>

## 📦 Assets

Coloque na pasta `public/`:

| Arquivo | Especificação |
|:---|:---|
| `chamber.png` | Chamber (VALORANT) · fundo transparente · ≥800×800px |
| `jett.png` | Jett (VALORANT) · fundo transparente · ≥800×800px |
| `icon.png` | Ícone SolarHub · 32×32px |

<br/>

## 📜 Scripts

| Comando | Descrição |
|:---|:---|
| `npm run dev` | Dev server com Turbopack |
| `npm run build` | Build otimizado de produção |
| `npm start` | Servir build de produção |
| `npm run lint` | ESLint |

<br/>

## 🔧 Stack Completa

| Dependência | Versão | Tipo |
|:---|:---|:---|
| `next` | 16.1.6 | Framework |
| `react` / `react-dom` | 19.2.3 | Runtime |
| `tailwindcss` | 4.x | Styling |
| `typescript` | 5.x | Tipagem |
| `lucide-react` | 0.563 | Ícones |
| `next-themes` | 0.4.6 | Dark mode |
| `clsx` | 2.1.1 | Class merging |
| `tailwind-merge` | 3.4.0 | Tailwind dedup |

<br/>

---

<div align="center">

**SolarHub** · Projeto privado — todos os direitos reservados.

Feito com Next.js, Tailwind CSS e TypeScript.

</div>
