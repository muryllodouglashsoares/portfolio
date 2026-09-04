import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Building } from "@/components/sections/Building";
import { Journey } from "@/components/sections/Journey";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Projects } from "@/components/sections/Projects";
import { Technologies } from "@/components/sections/Technologies";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Contact } from "@/components/sections/Contact";

const title = "Muryllo Douglas — Desenvolvedor em formação | Portfólio";
const description =
  "Portfólio de Muryllo Douglas, estudante de Informática no IFPB. Projetos reais em React, TypeScript e Firebase: Tekidu, IFConnect, Savora e mais.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Building />
        <Journey />
        <FeaturedProject />
        <Projects />
        <Technologies />
        <BeyondCode />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
