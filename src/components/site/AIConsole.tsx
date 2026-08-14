import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, RotateCcw } from "lucide-react";
import { suggestions } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { TrafficLights } from "./MacWindow";

function messageText(parts: Array<{ type: string; text?: string }>) {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function AIConsole() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const ask = (text: string) => {
    if (!text.trim() || busy) return;
    void sendMessage({ text: text.trim() });
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-accent/20 opacity-30 blur transition-opacity duration-700 group-focus-within:opacity-80" />
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scanline bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
        <div className="relative flex items-center gap-3 border-b border-border/70 bg-gradient-to-b from-secondary/70 to-secondary/20 px-4 py-2.5">
          <TrafficLights />
          <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[11px] tracking-wide text-foreground/80">
            portfolio_assistant.v1
          </span>
          {messages.length > 0 ? (
            <button
              onClick={() => setMessages([])}
              className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              <RotateCcw className="size-3" aria-hidden /> reset
            </button>
          ) : null}
        </div>

        <div ref={scrollRef} className="max-h-72 space-y-4 overflow-y-auto px-5 py-5">
          {messages.length === 0 ? (
            <div className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded bg-accent/10 font-mono text-[10px] text-accent">
                AI
              </span>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                Ask anything about me — experience, projects, stack, or availability.
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
              </p>
            </div>
          ) : null}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" ? (
                <span className="grid size-7 shrink-0 place-items-center rounded bg-accent/10 font-mono text-[10px] text-accent">
                  AI
                </span>
              ) : null}
              <p
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed",
                  message.role === "user"
                    ? "rounded-lg bg-accent px-3 py-2 font-medium text-accent-foreground"
                    : "font-mono text-foreground/90",
                )}
              >
                {messageText(message.parts as Array<{ type: string; text?: string }>)}
              </p>
            </div>
          ))}

          {status === "submitted" ? (
            <div className="flex items-center gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded bg-accent/10 font-mono text-[10px] text-accent">
                AI
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                thinking
                <span className="size-1 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                <span className="size-1 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                <span className="size-1 animate-bounce rounded-full bg-accent" />
              </span>
            </div>
          ) : null}

          {error ? (
            <p className="font-mono text-xs text-destructive">
              Assistant unavailable right now. Try again in a moment.
            </p>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
          className="border-t border-border px-5 py-4"
        >
          <div className="relative">
            <label htmlFor="ai-input" className="sr-only">
              Ask anything about Abdul
            </label>
            <input
              id="ai-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about me..."
              autoComplete="off"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 pr-12 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send question"
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md bg-accent text-accent-foreground transition-opacity disabled:opacity-30"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                [ {suggestion} ]
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}