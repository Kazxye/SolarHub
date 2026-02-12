import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FaqContent } from "@/components/sections/faq-content";

export const metadata: Metadata = {
  title: "FAQ | SolarHub — Perguntas Frequentes",
  description:
    "Respostas para perguntas comuns sobre instalação, requisitos do sistema, solução de problemas, conta e segurança. Central de ajuda SolarHub.",
  keywords: [
    "faq",
    "perguntas frequentes",
    "instalação",
    "requisitos",
    "solução de problemas",
    "solarhub",
    "suporte",
  ],
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqContent />
      </main>
      <Footer />
    </>
  );
}
