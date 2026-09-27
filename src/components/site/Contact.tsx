import { motion } from "motion/react";
import { Mail, MapPin, ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { Reveal, SectionHeading, SectionShell, Stagger, StaggerItem, TextRise } from "./primitives";
import { scrollToTarget } from "@/lib/scroll";
import { profile, resumeDownloadName, resumeUrl } from "@/data/portfolio";
import { sections } from "./Navbar";

export function Contact() {
  return (
    <SectionShell id="contact" wash="cyan">
      <SectionHeading
        eyebrow="Say hello"
        title="Let's build something worth shipping"
        description={profile.availability}
      />

      <Reveal blur>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-card via-card to-accent/[0.07] p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <a href={`mailto:${profile.email}`} className="group block transition-colors">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-2 break-all text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                  {profile.email}
                </p>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="group block transition-colors">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                  {profile.phone}
                </p>
              </a>
              <div>
                <p className="text-sm text-muted-foreground">Based in</p>
                <p className="mt-2 flex items-center gap-3 text-xl text-foreground sm:text-2xl">
                  <MapPin className="size-5 shrink-0 text-accent" aria-hidden />
                  {profile.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-sm text-muted-foreground">Elsewhere</p>
                <Stagger className="mt-4 space-y-3">
                  {profile.socials.map((social) => (
                    <StaggerItem key={social.label}>
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-accent/45"
                      >
                        <span className="text-sm text-muted-foreground">{social.label}</span>
                        <span className="inline-flex items-center gap-2 font-mono text-base text-foreground">
                          @{social.handle}
                          <ArrowUpRight className="size-4 text-accent" aria-hidden />
                        </span>
                      </motion.a>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,#64748b,#38bdf8)] px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_-14px_rgba(56,189,248,0.55)] transition-opacity hover:opacity-95"
                >
                  <Mail className="size-4" aria-hidden />
                  Email me directly
                </a>
                <a
                  href={resumeUrl}
                  download={resumeDownloadName}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/45 hover:bg-background/80"
                >
                  <Download className="size-4 text-accent" aria-hidden />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

export function Footer() {
  const nav = sections.filter((section) => !["home", "chat"].includes(section.id));

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(56,189,248,0.12), transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(167,139,250,0.1), transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
        <TextRise>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-foreground">{profile.fullName}</p>
            <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-foreground"
            >
              {profile.email}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {nav.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToTarget(section.id)}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    @{social.handle}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.fullName}.
          </p>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            aria-label="Back to top"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </button>
        </div>
        </TextRise>
      </div>
    </footer>
  );
}
