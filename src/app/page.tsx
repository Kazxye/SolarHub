import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { Showcase } from "@/components/sections/showcase";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Showcase />
      </main>
      <Footer />
    </>
  );
}
