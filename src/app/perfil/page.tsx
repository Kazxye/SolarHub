import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileContent } from "@/components/sections/profile-content";

export const metadata: Metadata = {
  title: "Perfil | SolarHub",
  description:
    "Gerencie sua conta SolarHub, visualize seu histórico de compras e atualize seus dados.",
  keywords: [
    "perfil",
    "conta",
    "compras",
    "histórico",
    "solarhub",
    "configurações",
  ],
};

export default function PerfilPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <ProfileContent />
      </main>
      <Footer />
    </>
  );
}
