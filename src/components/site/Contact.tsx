import { useState } from "react";
import { Mail, MapPin, Send, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading, Magnetic } from "./primitives";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Open_channel"
        title="Let's build something"
        description="Contracts, product work, or a hard problem you want a second opinion on."
      />
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="space-y-6 lg:col-span-2">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 font-mono text-sm text-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-4 text-accent" aria-hidden />
              {profile.email}
            </a>
            <p className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden />
              {profile.location}
            </p>
          </div>
          <div className="space-y-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                  {social.label}
                </span>
                <span className="font-mono text-xs text-accent">{social.handle}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSending(true);
              window.setTimeout(() => {
                setSending(false);
                (event.target as HTMLFormElement).reset();
                toast.success("Message queued", { description: "Connect an email service to deliver it for real." });
              }, 700);
            }}
            className="space-y-4 rounded-xl border border-border bg-card/50 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label
                    htmlFor={field.id}
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    className="w-full rounded-md border border-border bg-secondary/30 px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-md border border-border bg-secondary/30 px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              />
            </div>
            <Magnetic>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground disabled:opacity-60"
              >
                <Send className="size-3.5" aria-hidden />
                {sending ? "Transmitting..." : "Send message"}
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-accent">{profile.initials}</span> — {profile.role} © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-6">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}