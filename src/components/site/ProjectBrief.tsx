import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
 Layers,
 ShoppingBag,
 Store,
 ShieldCheck,
 Users,
 ShoppingCart,
 Sparkles,
 CreditCard,
 Truck,
 Check,
 KeyRound,
 CalendarClock,
 FileStack,
 BarChart3,
 HardHat,
 MapPin,
 BookOpen,
 Clapperboard,
 Compass,
 Palette,
} from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

type ArchRole = NonNullable<Project["architecture"]>[number];

function countModules(role: ArchRole) {
 return role.groups.reduce((n, g) => n + g.modules.length, 0);
}

const ROLE_STYLE = {
 Marketing: {
 icon: ShoppingBag,
 stroke: "#38bdf8",
 glow: "shadow-[0_0_24px_rgba(56,189,248,0.28)]",
 node: "border-accent/50 bg-accent/10 text-accent",
 active: "border-accent bg-accent/20 ring-2 ring-accent/30",
 branch: "from-accent/40",
 cat: "border-accent/25 bg-accent/5",
 },
 Leads: {
 icon: Store,
 stroke: "#fb7185",
 glow: "shadow-[0_0_24px_rgba(251,113,133,0.28)]",
 node: "border-accent-purple/50 bg-accent-purple/10 text-[#fda4af]",
 active: "border-accent-purple bg-accent-purple/20 ring-2 ring-accent-purple/30",
 branch: "from-accent-purple/40",
 cat: "border-accent-purple/25 bg-accent-purple/5",
 },
 Public: {
 icon: ShoppingBag,
 stroke: "#38bdf8",
 glow: "shadow-[0_0_24px_rgba(56,189,248,0.28)]",
 node: "border-accent/50 bg-accent/10 text-accent",
 active: "border-accent bg-accent/20 ring-2 ring-accent/30",
 branch: "from-accent/40",
 cat: "border-accent/25 bg-accent/5",
 },
 Admin: {
 icon: ShieldCheck,
 stroke: "#818cf8",
 glow: "shadow-[0_0_24px_rgba(129,140,248,0.28)]",
 node: "border-indigo-400/40 bg-indigo-500/10 text-indigo-200",
 active: "border-indigo-400 bg-indigo-500/20 ring-2 ring-indigo-400/30",
 branch: "from-indigo-400/40",
 cat: "border-indigo-400/25 bg-indigo-500/5",
 },
 Buyer: {
 icon: ShoppingBag,
 stroke: "#38bdf8",
 glow: "shadow-[0_0_24px_rgba(56,189,248,0.28)]",
 node: "border-accent/50 bg-accent/10 text-accent",
 active: "border-accent bg-accent/20 ring-2 ring-accent/30",
 branch: "from-accent/40",
 cat: "border-accent/25 bg-accent/5",
 },
 Seller: {
 icon: Store,
 stroke: "#fb7185",
 glow: "shadow-[0_0_24px_rgba(251,113,133,0.28)]",
 node: "border-accent-purple/50 bg-accent-purple/10 text-[#fda4af]",
 active: "border-accent-purple bg-accent-purple/20 ring-2 ring-accent-purple/30",
 branch: "from-accent-purple/40",
 cat: "border-accent-purple/25 bg-accent-purple/5",
 },
} as const;

function FlowConnector({ className }: { className?: string }) {
 return (
 <div className={cn("flex justify-center", className)} aria-hidden>
 <div className="h-8 w-px bg-gradient-to-b from-accent/60 to-border/80" />
 </div>
 );
}

function FlowNode({
 label,
 sub,
 active,
 onClick,
 style,
 icon: Icon,
}: {
 label: string;
 sub?: string;
 active?: boolean;
 onClick?: () => void;
 style: (typeof ROLE_STYLE)[keyof typeof ROLE_STYLE] | "root" | "hub";
 icon?: React.ComponentType<{ className?: string }>;
}) {
 const isRoot = style === "root";
 const isHub = style === "hub";

 return (
 <button
 type="button"
 onClick={onClick}
 disabled={!onClick}
 className={cn(
 "relative rounded-xl border px-4 py-2.5 text-center transition-all duration-300",
 isRoot && "cursor-default border-accent/40 bg-accent/10 px-6 py-3",
 isHub && "cursor-default border-border/70 bg-card/60 px-5",
 !isRoot && !isHub && typeof style === "object" && (active ? style.active : style.node),
 onClick && "hover:scale-[1.03]",
 active && typeof style === "object" && style.glow,
 )}
 >
 {Icon ? (
 <Icon className={cn("mx-auto mb-1 size-4", active ? "text-foreground" : "text-muted-foreground")} aria-hidden />
 ) : null}
 <p className={cn("font-mono text-xs font-bold uppercase tracking-widest", isRoot && "text-accent")}>{label}</p>
 {sub ? <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{sub}</p> : null}
 </button>
 );
}

function ModuleLeaf({
 name,
 detail,
 accentClass,
 index,
}: {
 name: string;
 detail: string;
 accentClass: string;
 index: number;
}) {
 const [open, setOpen] = useState(false);

 return (
 <motion.li
 initial={{ opacity: 0, x: -8 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: index * 0.03 }}
 className="relative pl-5"
 >
 <span className={cn("absolute left-0 top-3 h-px w-3 bg-border/80", accentClass.replace("from-", "bg-").split(" ")[0])} aria-hidden />
 <span className="absolute left-0 top-0 bottom-0 w-px bg-border/50" aria-hidden />
 <button
 type="button"
 onMouseEnter={() => setOpen(true)}
 onMouseLeave={() => setOpen(false)}
 onFocus={() => setOpen(true)}
 onBlur={() => setOpen(false)}
 className={cn(
 "group w-full rounded-lg border border-border/50 bg-background/40 px-3 py-2 text-left transition-all duration-200",
 "hover:border-accent/40 hover:bg-accent/5",
 open && "border-accent/50 bg-accent/5",
 )}
 >
 <span className="font-mono text-[11px] text-foreground/90">{name}</span>
 <AnimatePresence>
 {open ? (
 <motion.p
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 className="mt-1 overflow-hidden text-xs leading-relaxed text-muted-foreground"
 >
 {detail}
 </motion.p>
 ) : null}
 </AnimatePresence>
 </button>
 </motion.li>
 );
}

function CategoryBranch({
 label,
 modules,
 style,
 index,
}: {
 label: string;
 modules: { name: string; detail: string }[];
 style: (typeof ROLE_STYLE)[keyof typeof ROLE_STYLE];
 index: number;
}) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 + index * 0.06 }}
 className={cn("relative flex flex-col rounded-xl border p-4", style.cat)}
 >
 <div className="mb-3 flex items-center justify-between gap-2">
 <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">{label}</span>
 <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
 {modules.length}
 </span>
 </div>
 <ul className="space-y-1.5">
 {modules.map((mod, i) => (
 <ModuleLeaf key={mod.name} name={mod.name} detail={mod.detail} accentClass={style.branch} index={i} />
 ))}
 </ul>
 </motion.div>
 );
}

function PlatformFlowchart({ architecture, rootLabel }: { architecture: NonNullable<Project["architecture"]>; rootLabel: string }) {
 const [activeRole, setActiveRole] = useState(0);
 const role = architecture[activeRole]!;
 const style = ROLE_STYLE[role.role as keyof typeof ROLE_STYLE] ?? ROLE_STYLE.Buyer;
 const Icon = style.icon;
 const total = countModules(role);

 return (
 <div className="mt-28 border-t border-border/60 pt-28">
 <SectionHeading
 eyebrow="Platform_flow"
 title="Platform flow"
 description="Users branch into roles → categories → modules."
 right={
 <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
 <Layers className="size-3.5 text-accent" aria-hidden />
 {architecture.reduce((n, r) => n + countModules(r), 0)} total modules
 </div>
 }
 />

 {/* Flowchart canvas */}
 <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/20">
 <div
 className="pointer-events-none absolute inset-0 opacity-[0.35]"
 style={{
 backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
 backgroundSize: "24px 24px",
 }}
 aria-hidden
 />

 <div className="relative px-4 py-8 sm:px-8">
 {/* Level 1, Platform root */}
 <div className="flex justify-center">
 <FlowNode label={rootLabel} style="root" />
 </div>
 <FlowConnector />

 {/* Level 2, Users hub */}
 <div className="flex justify-center">
 <FlowNode label="Users" sub={`${architecture.length} roles`} style="hub" icon={Users} />
 </div>

 {/* Level 3, Role branches with SVG split */}
 <div className="relative mx-auto mt-2 max-w-3xl">
 {architecture.length === 3 ? (
 <svg className="mx-auto h-10 w-full max-w-lg" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden>
 <path d="M200 0 L200 20" stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />
 <path d="M200 20 L60 20 L60 40" stroke={ROLE_STYLE.Buyer.stroke} strokeWidth="1.5" fill="none" opacity={activeRole === 0 ? 1 : 0.25} />
 <path d="M200 20 L200 40" stroke={ROLE_STYLE.Seller.stroke} strokeWidth="1.5" fill="none" opacity={activeRole === 1 ? 1 : 0.25} />
 <path d="M200 20 L340 20 L340 40" stroke={ROLE_STYLE.Admin.stroke} strokeWidth="1.5" fill="none" opacity={activeRole === 2 ? 1 : 0.25} />
 </svg>
 ) : (
 <FlowConnector className="!py-0" />
 )}

 <div className={cn("grid gap-3 sm:gap-6", architecture.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
 {architecture.map((item, i) => {
 const meta = ROLE_STYLE[item.role as keyof typeof ROLE_STYLE] ?? ROLE_STYLE.Buyer;
 const RoleIcon = meta.icon;
 return (
 <FlowNode
 key={item.role}
 label={item.role}
 sub={`${countModules(item)} modules · ${item.groups.length} groups`}
 active={activeRole === i}
 onClick={() => setActiveRole(i)}
 style={meta}
 icon={RoleIcon}
 />
 );
 })}
 </div>
 </div>

 {/* Level 4, Active role stem */}
 <FlowConnector className="mt-2" />

 <AnimatePresence mode="wait">
 <motion.div
 key={role.role}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -12 }}
 transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
 className="mx-auto max-w-5xl"
 >
 {/* Role header + category fan-out */}
 <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3 sm:px-5">
 <span className={cn("flex size-10 items-center justify-center rounded-xl border", style.node)}>
 <Icon className="size-5" aria-hidden />
 </span>
 <div className="min-w-0 flex-1">
 <div className="flex flex-wrap items-center gap-2">
 <h3 className="font-mono text-sm font-bold uppercase tracking-widest">{role.role}</h3>
 <span className="font-mono text-[10px] text-muted-foreground">
 {total} modules · {role.groups.length} categories
 </span>
 </div>
 <p className="mt-0.5 text-sm text-muted-foreground">{role.description}</p>
 </div>
 </div>

 {/* Category branches, horizontal fan from role */}
 <div className="relative">
 <div className="mb-4 flex justify-center" aria-hidden>
 <div className={cn("h-px w-full max-w-md bg-gradient-to-r from-transparent via-border to-transparent")} />
 </div>
 <div
 className={cn(
 "grid gap-4",
 role.groups.length <= 2 && "sm:grid-cols-2",
 role.groups.length === 3 && "sm:grid-cols-2 lg:grid-cols-3",
 role.groups.length >= 4 && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
 )}
 >
 {role.groups.map((group, i) => (
 <CategoryBranch key={group.label} label={group.label} modules={group.modules} style={style} index={i} />
 ))}
 </div>
 </div>
 </motion.div>
 </AnimatePresence>
 </div>
 </div>
 </div>
 );
}

const PILLAR_META: Record<
 string,
 { icon: ComponentType<{ className?: string }>; tint: string; ring: string }
> = {
 Identity: { icon: KeyRound, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Commerce: { icon: ShoppingCart, tint: "#38bdf8", ring: "ring-sky-400/30" },
 AI: { icon: Sparkles, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Payments: { icon: CreditCard, tint: "#64748b", ring: "ring-slate-400/30" },
 Logistics: { icon: Truck, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Access: { icon: ShieldCheck, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Scheduling: { icon: CalendarClock, tint: "#818cf8", ring: "ring-indigo-400/30" },
 "Change Orders": { icon: FileStack, tint: "#94a3b8", ring: "ring-slate-400/30" },
 Insights: { icon: BarChart3, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Field: { icon: HardHat, tint: "#64748b", ring: "ring-slate-400/30" },
 Listings: { icon: MapPin, tint: "#38bdf8", ring: "ring-sky-400/30" },
 CMS: { icon: BookOpen, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Chat: { icon: Sparkles, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Leads: { icon: Users, tint: "#64748b", ring: "ring-slate-400/30" },
 Courses: { icon: BookOpen, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Marketplace: { icon: Store, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Realtime: { icon: Sparkles, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Shop: { icon: Store, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Auth: { icon: KeyRound, tint: "#94a3b8", ring: "ring-slate-400/30" },
 Content: { icon: Clapperboard, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Brand: { icon: Palette, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Treatments: { icon: Layers, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Trust: { icon: ShieldCheck, tint: "#64748b", ring: "ring-slate-400/30" },
 Conversion: { icon: CreditCard, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Social: { icon: Users, tint: "#38bdf8", ring: "ring-sky-400/30" },
 YouTube: { icon: Clapperboard, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Proof: { icon: BarChart3, tint: "#94a3b8", ring: "ring-slate-400/30" },
 Clipping: { icon: Clapperboard, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Distribution: { icon: Truck, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Site: { icon: Layers, tint: "#64748b", ring: "ring-slate-400/30" },
 Discovery: { icon: Compass, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Play: { icon: Compass, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Ops: { icon: HardHat, tint: "#94a3b8", ring: "ring-slate-400/30" },
 Frontend: { icon: Layers, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Backend: { icon: HardHat, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Database: { icon: FileStack, tint: "#64748b", ring: "ring-slate-400/30" },
 Deploy: { icon: Truck, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Hunt: { icon: Compass, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Design: { icon: Palette, tint: "#64748b", ring: "ring-slate-400/30" },
 Vision: { icon: Sparkles, tint: "#38bdf8", ring: "ring-sky-400/30" },
 Mobile: { icon: Layers, tint: "#818cf8", ring: "ring-indigo-400/30" },
 Assist: { icon: Users, tint: "#6366f1", ring: "ring-indigo-400/30" },
 Server: { icon: HardHat, tint: "#94a3b8", ring: "ring-slate-400/30" },
};

function PlatformPillars({
 domains,
 projectName,
 contributionOnly,
}: {
 domains: NonNullable<Project["briefDomains"]>;
 projectName: string;
 contributionOnly?: boolean;
}) {
 const [active, setActive] = useState(0);
 const [paused, setPaused] = useState(false);
 const pillar = domains[active]!;
 const meta = PILLAR_META[pillar.title] ?? { icon: Layers, tint: "#38bdf8", ring: "ring-sky-400/30" };
 const Icon = meta.icon;
 const heading = pillar.headline ?? pillar.title;

 useEffect(() => {
 if (paused || domains.length < 2) return;
 const id = window.setInterval(() => setActive((prev) => (prev + 1) % domains.length), 4800);
 return () => window.clearInterval(id);
 }, [paused, domains.length]);

 return (
 <div className="mt-16">
 <Reveal className="mb-8 max-w-2xl space-y-2">
 <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">
 {contributionOnly ? "Feature areas" : "Key features"}
 </p>
 <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
 {contributionOnly ? `What I shipped on ${projectName}` : "What it offers"}
 </h3>
 <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
 {contributionOnly
 ? `What I shipped on ${projectName}, and how each area landed in production. Hover to pause auto-rotate.`
 : `${domains.map((d) => d.title).join(", ")}. Hover a tab to pause auto-rotate.`}
 </p>
 </Reveal>

 <div
 onMouseEnter={() => setPaused(true)}
 onMouseLeave={() => setPaused(false)}
 className="overflow-hidden rounded-2xl border border-border bg-card/40"
 >
 {/* Pillar selector */}
 <div className="flex gap-px overflow-x-auto border-b border-border bg-border/40">
 {domains.map((item, index) => {
 const itemMeta = PILLAR_META[item.title] ?? { icon: Layers, tint: "#38bdf8", ring: "ring-sky-400/30" };
 const ItemIcon = itemMeta.icon;
 const isActive = index === active;
 return (
 <button
 key={item.title}
 type="button"
 onClick={() => setActive(index)}
 className={cn(
 "relative flex min-w-[8.5rem] flex-1 items-center gap-2.5 bg-card/80 px-4 py-3.5 text-left transition-colors",
 isActive ? "bg-card" : "hover:bg-card/95",
 )}
 >
 {isActive ? (
 <motion.span
 layoutId="pillar-active-bar"
 className="absolute inset-x-0 bottom-0 h-[2px]"
 style={{ background: itemMeta.tint }}
 transition={{ type: "spring", stiffness: 380, damping: 34 }}
 />
 ) : null}
 <span
 className={cn(
 "grid size-8 shrink-0 place-items-center rounded-lg border border-border/70 bg-background/70",
 isActive && `ring-2 ${itemMeta.ring}`,
 )}
 >
 <ItemIcon
 className="size-3.5"
 style={{ color: isActive ? itemMeta.tint : undefined }}
 aria-hidden
 />
 </span>
 <span className="min-w-0">
 <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
 {String(index + 1).padStart(2, "0")}
 </span>
 <span
 className={cn(
 "block truncate text-sm font-medium",
 isActive ? "text-foreground" : "text-muted-foreground",
 )}
 >
 {item.title}
 </span>
 </span>
 </button>
 );
 })}
 </div>

 {/* Active pillar stage */}
 <div className="relative min-h-[280px] overflow-hidden p-6 sm:p-8 lg:p-10">
 <div
 aria-hidden
 className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full opacity-25 blur-3xl"
 style={{ background: meta.tint }}
 />
 <div
 aria-hidden
 className="pointer-events-none absolute -bottom-24 -left-10 size-56 rounded-full opacity-15 blur-3xl"
 style={{ background: "#64748b" }}
 />

 <AnimatePresence mode="wait">
 <motion.div
 key={pillar.title}
 initial={{ opacity: 0, y: 28 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -16 }}
 transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
 className="relative grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start"
 >
 <div>
 <div className="flex items-center gap-4">
 <motion.span
 initial={{ scale: 0.7, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ type: "spring", stiffness: 320, damping: 22 }}
 className={cn(
 "grid size-14 place-items-center rounded-2xl border border-border/70 bg-background/70 ring-2",
 meta.ring,
 )}
 >
 <Icon className="size-6" style={{ color: meta.tint }} aria-hidden />
 </motion.span>
 <div>
 <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
 Pillar {String(active + 1).padStart(2, "0")} / {String(domains.length).padStart(2, "0")}
 </p>
 <h4 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
 {heading}
 </h4>
 </div>
 </div>
 <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
 {pillar.summary}
 </p>

 {/* Progress for auto-rotate */}
 <div className="mt-8 h-px w-full max-w-xs overflow-hidden rounded bg-border/60">
 <motion.div
 key={`progress-${pillar.title}-${paused}`}
 className="h-full origin-left"
 style={{ background: meta.tint }}
 initial={{ scaleX: 0 }}
 animate={{ scaleX: paused ? 0 : 1 }}
 transition={
 paused
 ? { duration: 0.2 }
 : { duration: 4.8, ease: "linear" }
 }
 />
 </div>
 </div>

 <ul className="space-y-3">
 {pillar.points.map((point, pointIndex) => (
 <motion.li
 key={point}
 initial={{ opacity: 0, x: 18 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.08 + pointIndex * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/50 px-4 py-3.5"
 >
 <span
 className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
 style={{ background: `color-mix(in srgb, ${meta.tint} 22%, transparent)` }}
 >
 <Check className="size-3.5" style={{ color: meta.tint }} aria-hidden />
 </span>
 <span className="text-sm leading-relaxed text-foreground/90">{point}</span>
 </motion.li>
 ))}
 </ul>
 </motion.div>
 </AnimatePresence>
 </div>
 </div>
 </div>
 );
}

export function ProjectBrief({ project }: { project: Project }) {
 const cards = project.briefCards ?? [];
 const domains = project.briefDomains ?? [];

 if (!project.briefPitch && cards.length === 0 && !project.architecture) {
 return (
 <section id="brief" className="mt-28 scroll-mt-24">
 <SectionHeading eyebrow="Project_details" title="The brief" />
 <div className="grid gap-8 md:grid-cols-2">
 {project.overview.map((paragraph, i) => (
 <Reveal key={paragraph} delay={i * 0.06}>
 <p className="border-l border-accent/30 pl-5 text-base leading-relaxed text-muted-foreground">{paragraph}</p>
 </Reveal>
 ))}
 </div>
 </section>
 );
 }

 return (
 <section id="brief" className="mt-28 scroll-mt-24">
 <SectionHeading
 eyebrow={project.contributionOnly ? "Contribution" : "Platform_overview"}
 title={
   project.contributionOnly
     ? `How I contributed in ${project.name}`
     : `What ${project.name} is`
 }
 />

 {project.briefPitch ? (
 <Reveal className="-mt-6 mb-10">
 <p className="w-full text-base leading-relaxed text-muted-foreground sm:text-lg">{project.briefPitch}</p>
 </Reveal>
 ) : null}

 {cards.length > 0 ? (
 <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:items-stretch">
 {cards.map((card, i) => (
 <Reveal key={card.label} delay={i * 0.05} className="h-full">
 <div className="group relative flex h-full min-h-[7.5rem] flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 p-4 transition-colors hover:border-accent/40">
 <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
 <div className="font-mono text-2xl font-bold leading-none text-accent sm:text-3xl">{card.value}</div>
 <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground">{card.label}</div>
 {card.hint ? (
 <p className="mt-auto pt-2 font-mono text-[10px] leading-snug text-muted-foreground">{card.hint}</p>
 ) : null}
 </div>
 </Reveal>
 ))}
 </div>
 ) : null}

 {domains.length > 0 && project.kind !== "static" ? (
 <PlatformPillars
 domains={domains}
 projectName={project.name}
 {...(project.contributionOnly ? { contributionOnly: true as const } : {})}
 />
 ) : null}

 {project.architecture && project.kind !== "static" ? (
 <PlatformFlowchart
 architecture={project.architecture}
 rootLabel={(project.demo ?? project.name).replace(/^https?:\/\//, "").replace(/\/$/, "")}
 />
 ) : null}
 </section>
 );
}
