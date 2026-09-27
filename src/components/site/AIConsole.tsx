import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, RotateCcw, Sparkles } from "lucide-react";
import { suggestions } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function messageText(parts: Array<{ type: string; text?: string }>) {
 return parts
 .filter((part) => part.type === "text")
 .map((part) => part.text ?? "")
 .join("")
 .replace(/\*\*([^*]+)\*\*/g, "$1")
 .replace(/\*([^*]+)\*/g, "$1")
 .replace(/`([^`]+)`/g, "$1");
}

const chips = [
 { label: "Projects", ask: suggestions[0]! },
 { label: "Stack", ask: suggestions[1]! },
 { label: "Availability", ask: suggestions[2]! },
];

export function AIConsole({ variant = "hero" }: { variant?: "hero" | "page" }) {
 const [input, setInput] = useState("");
 const inputRef = useRef<HTMLInputElement>(null);
 const scrollRef = useRef<HTMLDivElement>(null);
 const page = variant === "page";

 const { messages, sendMessage, status, error, setMessages } = useChat({
 transport: new DefaultChatTransport({ api: "/api/chat" }),
 });

 const busy = status === "submitted" || status === "streaming";
 const idle = messages.length === 0 && !busy && !error;

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
 <div className={cn("w-full", page ? "mx-auto" : "mx-auto max-w-xl")}>
 <div
 className={cn(
 "overflow-hidden bg-card/90 backdrop-blur-sm",
 page
 ? "rounded-[1.2rem] border-0 shadow-none"
 : "rounded-xl border border-border shadow-sm",
 )}
 >
 <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
 <div className="flex items-center gap-2">
 <span className="grid size-7 place-items-center rounded-full bg-accent/15">
 <Sparkles className="size-3.5 text-accent" aria-hidden />
 </span>
 <div>
 <p className="text-sm font-medium text-foreground">Ask Abdul</p>
 {page ? (
 <p className="text-[11px] text-muted-foreground">Projects, stack, experience, availability</p>
 ) : null}
 </div>
 </div>
 {messages.length > 0 ? (
 <button
 type="button"
 onClick={() => setMessages([])}
 aria-label="Reset chat"
 className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
 >
 <RotateCcw className="size-3.5" aria-hidden />
 Reset
 </button>
 ) : null}
 </div>

 <div className={cn("px-4 pb-4 pt-3 sm:px-5", page && "pb-5 pt-4")}>
 <div
 ref={scrollRef}
 data-lenis-prevent
 className={cn(
 "mb-3 space-y-2.5 overflow-y-auto",
 page ? "min-h-[320px] max-h-[480px]" : "max-h-44 sm:max-h-52",
 )}
 >
 <AnimatePresence mode="popLayout">
 {idle ? (
 <motion.div
 key="idle"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className={cn("space-y-3", page ? "py-8 text-center" : "py-2 text-center")}
 >
 <p className="text-sm text-muted-foreground">
 Ask about projects, stack, or availability
 </p>
 {page ? (
 <div className="flex flex-wrap items-center justify-center gap-2">
 {chips.map((chip) => (
 <button
 key={chip.label}
 type="button"
 onClick={() => ask(chip.ask)}
 className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
 >
 {chip.label}
 </button>
 ))}
 </div>
 ) : null}
 </motion.div>
 ) : null}

 {messages.map((message) => (
 <motion.div
 key={message.id}
 layout
 initial={{ opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
 >
 <p
 className={cn(
 "max-w-[90%] whitespace-pre-wrap text-sm leading-relaxed",
 message.role === "user"
 ? "rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-accent-foreground"
 : "rounded-2xl rounded-bl-md bg-white/[0.05] px-3.5 py-2.5 text-foreground/90",
 )}
 >
 {messageText(message.parts as Array<{ type: string; text?: string }>)}
 </p>
 </motion.div>
 ))}
 </AnimatePresence>

 {status === "submitted" ? (
 <div className="flex justify-start">
 <span className="flex items-center gap-1.5 rounded-2xl bg-white/[0.05] px-3 py-2.5 text-xs text-muted-foreground">
 <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
 <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
 <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
 </span>
 </div>
 ) : null}

 {error ? <p className="text-center text-xs text-destructive">Unavailable, try again.</p> : null}
 </div>

 <form
 onSubmit={(event) => {
 event.preventDefault();
 ask(input);
 }}
 className="space-y-2.5"
 >
 <div className="relative">
 <label htmlFor={`ai-input-${variant}`} className="sr-only">
 Ask about Abdul
 </label>
 <input
 id={`ai-input-${variant}`}
 ref={inputRef}
 value={input}
 onChange={(event) => setInput(event.target.value)}
 placeholder="Ask anything…"
 autoComplete="off"
 className="w-full rounded-xl border border-border bg-background/60 py-3 pl-4 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/50"
 />
 <button
 type="submit"
 disabled={busy || !input.trim()}
 aria-label="Send"
 className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg bg-foreground text-background transition-opacity disabled:opacity-25"
 >
 <ArrowUp className="size-4" aria-hidden />
 </button>
 </div>

 {!page ? (
 <div className="flex flex-wrap items-center justify-center gap-2">
 {chips.map((chip) => (
 <button
 key={chip.label}
 type="button"
 onClick={() => ask(chip.ask)}
 className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
 >
 {chip.label}
 </button>
 ))}
 </div>
 ) : null}
 </form>
 </div>
 </div>
 </div>
 );
}
