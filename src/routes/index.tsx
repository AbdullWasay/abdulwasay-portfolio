import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Backdrop, Cursor, ScrollProgress, Preloader } from "@/components/site/Atmosphere";
import { Navbar } from "@/components/site/Navbar";
import { CommandPalette } from "@/components/site/CommandPalette";
import { Hero, StackMarquee } from "@/components/site/Hero";
import {
  About,
  Skills,
  Projects,
  Experience,
  Education,
  Toolkit,
  GithubHandle,
} from "@/components/site/Sections";
import { ChatSection } from "@/components/site/Terminal";
import { Contact, Footer } from "@/components/site/Contact";

const title = "Abdul Wasay - Software Engineer";
const description =
  "Portfolio of Abdul Wasay - full-stack software engineer building production web apps with React, Next.js, Node.js, and AWS.";

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
    <div className="relative min-h-screen bg-background text-foreground">
      <Preloader />
      <Backdrop />
      <Cursor />
      <ScrollProgress />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <StackMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Toolkit />
        <GithubHandle />
        <ChatSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
