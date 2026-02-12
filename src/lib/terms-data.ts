/* ─────────────────────────────────────────────────
   Terms Data — typed, anchored sections
   ───────────────────────────────────────────────── */

export interface TermsContentBlock {
  /** Plain paragraph */
  type: "paragraph";
  text: string;
}

export interface TermsListBlock {
  /** Bulleted list */
  type: "list";
  items: string[];
}

export type TermsBlock = TermsContentBlock | TermsListBlock;

export interface TermsSection {
  id: string;
  title: string;
  icon: "shield" | "receipt" | "clock";
  blocks: TermsBlock[];
}

export const TERMS_UPDATED = "16 de fevereiro de 2025";

export const termsData: TermsSection[] = [
  {
    id: "banimentos",
    title: "Responsabilidade sobre banimentos",
    icon: "shield",
    blocks: [
      {
        type: "paragraph",
        text: "Nós não nos responsabilizamos por banimentos ou penalidades aplicadas em qualquer plataforma, jogo ou serviço decorrente do uso dos nossos produtos ou serviços.",
      },
      {
        type: "paragraph",
        text: "Cada cliente é responsável por seguir as regras e diretrizes das plataformas envolvidas. Ao adquirir qualquer produto, você declara estar ciente dos riscos associados ao uso de software de terceiros em ambientes protegidos por sistemas anti-cheat.",
      },
    ],
  },
  {
    id: "reembolso",
    title: "Política de reembolso",
    icon: "receipt",
    blocks: [
      {
        type: "paragraph",
        text: "Não aceitamos reembolsos após a compra. Certifique-se de que deseja o produto ou serviço antes de finalizar a transação.",
      },
      {
        type: "list",
        items: [
          "Todas as vendas são finais.",
          "Não há período de teste ou garantia de devolução.",
          "Problemas técnicos serão tratados pelo suporte, sem necessidade de reembolso.",
          "Em situações excepcionais, cada caso poderá ser analisado individualmente pela equipe.",
        ],
      },
    ],
  },
  {
    id: "atendimento",
    title: "Horários de atendimento",
    icon: "clock",
    blocks: [
      {
        type: "paragraph",
        text: "Nosso suporte segue os seguintes horários para garantir a melhor experiência de atendimento:",
      },
      {
        type: "list",
        items: [
          "Meios de semana: atendimento disponível a partir das 13:30.",
          "Fins de semana: atendimento disponível durante todo o dia.",
        ],
      },
      {
        type: "paragraph",
        text: "Fora desses horários, você pode abrir um ticket pelo Discord e será respondido assim que possível.",
      },
    ],
  },
];
