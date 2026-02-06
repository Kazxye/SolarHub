# SolarHub - Frontend

Plataforma de venda de scripts premium para VALORANT.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.3
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS v4 + PostCSS
- **Tema:** next-themes (dark/light)
- **Ícones:** lucide-react
- **Utilitários:** clsx + tailwind-merge

## Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Variáveis de tema, animações, estilos globais
│   ├── layout.tsx           # Layout raiz (fontes, ThemeProvider)
│   └── page.tsx             # Página principal (Home)
│
├── components/
│   ├── layout/
│   │   ├── header.tsx       # Header fixa com scroll blur e nav responsiva
│   │   └── footer.tsx       # Footer do site
│   │
│   ├── sections/
│   │   └── hero.tsx         # Hero Section (HUD cards + Jett)
│   │
│   ├── providers/
│   │   └── theme-provider.tsx  # Provider do next-themes
│   │
│   └── ui/
│       ├── button.tsx       # Componente Button (primary, secondary, ghost, outline)
│       └── theme-toggle.tsx # Toggle dark/light mode
│
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│
public/
├── icon.png                 # Ícone/logo da SolarHub
├── logo-horizontal.png      # Logo horizontal
├── logo-vertical.png        # Logo vertical
├── logo-symbol.png          # Símbolo do logo
└── amigo.png                # Asset auxiliar
```

## Paleta de Cores

| Token            | Light       | Dark        |
|------------------|-------------|-------------|
| background       | `#ffffff`   | `#0a0a0b`   |
| surface          | `#f4f4f5`   | `#111113`   |
| border           | `#e4e4e7`   | `#27272a`   |
| text-primary     | `#09090b`   | `#fafafa`   |
| text-secondary   | `#71717a`   | `#a1a1aa`   |
| accent           | `#f97316`   | `#f97316`   |
| accent-hover     | `#ea580c`   | `#ea580c`   |

## Scripts

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Build de produção
npm run start    # Servir build de produção
npm run lint     # ESLint
```

## Componentes Principais

### Header
- Fixa no topo, transparente no início e com backdrop-blur ao scrollar
- Nav: Home, Scripts, Planos, Suporte
- CTAs: Discord (link) + Entrar (botão primário)
- Menu mobile colapsável

### Hero Section
- Layout assimétrico (grid 12-col)
- **Esquerda:** Headline + 4 HUD cards modulares (Speed, Security, Updates, Community) + CTAs + trust bar
- **Direita:** Jett (imagem da API do VALORANT) com glow, rings e floating stat cards
- Animações staggered de fade-in

### Imagem da Jett
Carregada via API externa (não está em `/public`):
```
https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png
```
Domínio configurado em `next.config.ts` > `images.remotePatterns`.
