import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { MediaFrame } from "./MacWindow";
import type { Project } from "@/data/portfolio";

const ROLE_LABELS = ["Storefront", "Auth", "Admin", "AI Tools", "Seller", "Analytics", "Rewards", "Ads"];

export function ProductGallery({ project }: { project: Project }) {
 const [lightbox, setLightbox] = useState<number | null>(null);

 if (project.gallery.length === 0) return null;

 return (
 <>
 <section id="gallery" className="mt-28 scroll-mt-24">
 <SectionHeading
 eyebrow="Gallery"
 title="Screens by role"
 description="Buyer storefront, seller ops, admin control, tap any frame to expand."
 />

 <div className="mt-8 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {project.gallery.map((shot, i) => {
 const role = ROLE_LABELS[i] ?? `Screen ${i + 1}`;
 return (
 <Reveal key={shot.caption} delay={i * 0.03}>
 <button
 type="button"
 onClick={() => setLightbox(i)}
 className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/40 text-left"
 >
 <div className="relative aspect-video w-full overflow-hidden">
 <img
 src={shot.image}
 alt={shot.caption}
 width={800}
 height={450}
 loading="lazy"
 className="size-full object-cover object-top"
 />
 <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/90 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
 {role}
 </span>
 </div>
 <div className="border-t border-border/50 px-4 py-3">
 <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
 {String(i + 1).padStart(2, "0")} · {role}
 </p>
 <p className="mt-1.5 text-xs leading-relaxed text-foreground/85">{shot.caption}</p>
 </div>
 </button>
 </Reveal>
 );
 })}
 </div>
 </section>

 <AnimatePresence>
 {lightbox !== null ? (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl sm:p-8"
 onClick={() => setLightbox(null)}
 >
 <motion.div
 initial={{ scale: 0.96, y: 12 }}
 animate={{ scale: 1, y: 0 }}
 exit={{ scale: 0.96, opacity: 0 }}
 className="relative w-full max-w-5xl"
 onClick={(e) => e.stopPropagation()}
 >
 <MediaFrame
 title={`${ROLE_LABELS[lightbox] ?? "Screen"}, ${String(lightbox + 1).padStart(2, "0")}`}
 right={
 <button type="button" onClick={() => setLightbox(null)} aria-label="Close" className="text-muted-foreground hover:text-accent">
 <X className="size-4" />
 </button>
 }
 >
 <img src={project.gallery[lightbox]!.image} alt={project.gallery[lightbox]!.caption} className="max-h-[70vh] w-full object-contain object-top bg-card/30" />
 <p className="border-t border-border/60 px-4 py-3 font-mono text-xs text-muted-foreground">{project.gallery[lightbox]!.caption}</p>
 </MediaFrame>
 </motion.div>
 </motion.div>
 ) : null}
 </AnimatePresence>
 </>
 );
}
