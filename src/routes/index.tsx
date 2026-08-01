import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Backdrop, Cursor, ScrollProgress, Preloader } from "@/components/site/Atmosphere";
import { Navbar } from "@/components/site/Navbar";
import { CommandPalette } from "@/components/site/CommandPalette";
import { Hero, StackMarquee } from "@/components/site/Hero";
import {
  StatsBar,
  About,
  Skills,
  Projects,
  Experience,
  GithubPanel,
  Services,
  Testimonials,
  Blog,
} from "@/components/site/Sections";
import { TerminalSection } from "@/components/site/Terminal";
import { Contact, Footer } from "@/components/site/Contact";

const title = "Abdul Rahman — Full Stack Software Engineer";
const description =
  "Interactive portfolio of Abdul Rahman, full stack engineer building React, Next.js, Node.js and AWS products with an AI-powered assistant.";

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
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Preloader />
      <Backdrop />
      <Cursor />
      <ScrollProgress />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <StackMarquee />
        <StatsBar />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GithubPanel />
        <Services />
        <Testimonials />
        <TerminalSection />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
