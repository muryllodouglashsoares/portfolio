import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Stack } from "@/components/portfolio/Stack";
import { Engineering } from "@/components/portfolio/Engineering";
import { Projects } from "@/components/portfolio/Projects";
import { Timeline } from "@/components/portfolio/Timeline";
import { GithubCta } from "@/components/portfolio/GithubCta";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollRobot } from "@/components/robot/ScrollRobot";

const title = "Muryllo Douglas — Estudante e Desenvolvedor Web";
const description =
  "Portfólio de Muryllo Douglas, estudante de Informática no IFPB e desenvolvedor em formação: projetos com React, TypeScript, Node.js, PostgreSQL, Firebase, Rust, automação e robótica.";

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
    links: [{ rel: "canonical", href: "https://portfolio-c1u.pages.dev/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Stack />
        <Engineering />
        <Projects />
        <Timeline />
        <GithubCta />
        <Contact />
      </main>
      <Footer />
      <ScrollRobot />
    </>
  );
}
