import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TermsContent } from "@/components/sections/terms-content";

export const metadata: Metadata = {
  title: "Termos de Serviço | SolarHub",
  description:
    "Termos de serviço da SolarHub. Informações sobre responsabilidade, política de reembolso e horários de atendimento.",
  keywords: [
    "termos de serviço",
    "termos de uso",
    "política",
    "reembolso",
    "solarhub",
  ],
};

export default function TermosPage() {
  return (
    <>
      <Header />
      <main>
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
