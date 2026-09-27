import { AIConsole } from "./AIConsole";
import { SectionHeading, SectionShell, Reveal } from "./primitives";
import { profile } from "@/data/portfolio";

/** Simple chatbot section — replaces the old terminal shell. */
export function ChatSection() {
  return (
    <SectionShell id="chat" wash="slate">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal y={40}>
          <div className="space-y-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Ask away
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Chat with my portfolio
            </h2>
            <p className="max-w-[36ch] text-base leading-relaxed text-muted-foreground">
              Ask about projects, stack, experience, or availability. Answers stay grounded in what’s
              actually on this site.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["What have you shipped?", "What’s your stack?", "Are you available?"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#818cf8]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="pt-2 text-xs text-muted-foreground/80">
              Talking to {profile.fullName}’s on-site assistant.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} y={48} className="min-w-0">
          <div className="rounded-[1.35rem] border border-border bg-gradient-to-b from-card to-card/60 p-1 shadow-[0_24px_60px_-36px_rgba(56,189,248,0.35)] sm:p-1.5">
            <AIConsole variant="page" />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
