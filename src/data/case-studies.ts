import vortex from "@/assets/project-vortex.jpg";
import cypher from "@/assets/project-cypher.jpg";
import lens from "@/assets/project-lens.jpg";

const images: Record<string, string> = { vortex, cypher, lens };

export const caseStudies = {
  vortex: {
    tagline: "Realtime observability for distributed inference clusters",
    overview: ["Fleet operators were flying blind: 400+ inference nodes emitting 50k events per second with nothing but log tails and a 30-second Grafana refresh.", "Vortex renders the entire cluster as a living graph \u2014 every node, every request hop, every anomaly \u2014 at 60fps in the browser, with a replay timeline that lets an on-call engineer scrub back to the moment things broke."],
    details: [{ label: "Role", value: "Lead Full Stack Engineer" }, { label: "Timeline", value: "7 months \u2014 2025" }, { label: "Team", value: "3 engineers, 1 designer" }, { label: "Scale", value: "50k events/sec sustained" }, { label: "Status", value: "In production" }],
    challenges: [
      { title: "Browser could not paint 50k nodes", body: "Naive React + SVG rendering collapsed past 2,000 nodes; the main thread was saturated before data even arrived.", fix: "Moved rendering to a WebGL instanced-quad pipeline and kept React purely for chrome \u2014 50k nodes now paint in under 6ms per frame." },
      { title: "WebSocket fan-out melted the gateway", body: "A single broadcast per client meant O(n\u00b7m) serialisation and 90% CPU on the socket tier at 300 concurrent viewers.", fix: "Introduced a Redis-backed pub/sub relay with pre-serialised binary frames shared across sockets, cutting gateway CPU by 78%." },
      { title: "Anomalies drowned in noise", body: "Static thresholds fired hundreds of false alerts a day and operators learned to ignore them.", fix: "Shipped rolling z-score baselining per node cohort, so alerts adapt to traffic shape \u2014 false positives dropped from ~180/day to 4." },
    ],
    methodology: [
      { phase: "01 \u00b7 Discovery", title: "Shadowed on-call", body: "Sat through two weeks of on-call rotations and recorded every question engineers asked their dashboards. That list became the spec." },
      { phase: "02 \u00b7 Architecture", title: "Streaming-first design", body: "Modelled the system as an append-only event log with derived views, so live mode and replay mode share exactly one code path." },
      { phase: "03 \u00b7 Prototype", title: "Render budget first", body: "Built the WebGL renderer against synthetic 100k-node data before writing a single product feature, to prove the ceiling." },
      { phase: "04 \u00b7 Hardening", title: "Chaos and load", body: "Ran weekly chaos drills \u2014 killed nodes, throttled sockets, replayed production traffic at 2x \u2014 and fixed what fell over." },
      { phase: "05 \u00b7 Rollout", title: "Shadow then switch", body: "Ran Vortex beside the legacy dashboard for six weeks, compared alert accuracy, then cut over with a one-line flag." },
    ],
    stackGroups: [{ label: "Frontend", items: ["Next.js", "React", "WebGL", "Canvas 2D", "Zustand", "Tailwind CSS"] }, { label: "Backend", items: ["Node.js", "Fastify", "WebSockets", "Redis Streams", "ClickHouse"] }, { label: "Infrastructure", items: ["AWS ECS", "CloudFront", "Terraform", "GitHub Actions", "Grafana"] }],
    achievements: ["Sustained 50k events/sec end to end with a p95 render latency of 34ms.", "Cut mean time to detection for cluster incidents from 11 minutes to 90 seconds.", "Replay timeline became the default artifact attached to every incident post-mortem.", "Open-sourced the WebGL graph renderer; 214 stars in the first quarter."],
    outcomes: [{ metric: "50k/s", label: "Events processed", note: "Sustained, not peak" }, { metric: "\u221287%", label: "Time to detect", note: "11 min \u2192 90 sec" }, { metric: "60fps", label: "Render floor", note: "Even at 40k nodes" }, { metric: "4", label: "False alerts/day", note: "Down from ~180" }],
    gallery: [{ image: images["vortex"]!, caption: "Cluster graph in live mode \u2014 node colour encodes saturation, edge thickness encodes throughput." }, { image: images["cypher"]!, caption: "Incident replay panel with scrubbable timeline and correlated log stream." }, { image: images["lens"]!, caption: "Anomaly detail view showing the rolling baseline against the firing signal." }],
  },
  cypher: {
    tagline: "Encrypted operations console for autonomous server fleets",
    overview: ["Infrastructure teams were SSH-ing into production with shared keys and no audit trail. Compliance flagged it; nobody had a better answer.", "Cypher Core replaces ad-hoc shell access with a browser console: scoped commands, per-action approval, end-to-end encrypted transport and an append-only ledger that satisfies SOC 2 evidence requests without a screenshot in sight."],
    details: [{ label: "Role", value: "Full Stack Engineer" }, { label: "Timeline", value: "9 months \u2014 2024" }, { label: "Team", value: "4 engineers" }, { label: "Scale", value: "1,800 managed hosts" }, { label: "Status", value: "In production" }],
    challenges: [
      { title: "Shared credentials everywhere", body: "Ops shared a root key across 12 people; revoking access meant rotating everything and breaking automation.", fix: "Introduced short-lived per-user certificates minted on login, with role scoping enforced server side rather than in the UI." },
      { title: "Log tailing at scale was unusable", body: "Streaming logs from 1,800 hosts through one socket froze the browser within seconds.", fix: "Added server-side sampling with adaptive backpressure plus a virtualised log viewer that renders only the visible window." },
      { title: "Auditors needed provable history", body: "Standard database rows could be edited, so the ledger carried no evidentiary weight.", fix: "Built a hash-chained audit ledger where each entry seals the previous hash \u2014 tampering breaks the chain and is detectable in one query." },
    ],
    methodology: [
      { phase: "01 \u00b7 Research", title: "Threat modelling", body: "Wrote the attack tree before the schema: who can do what, from where, and what evidence remains afterwards." },
      { phase: "02 \u00b7 Design", title: "Command palette as the UI", body: "Ops people live in keyboards, so the primary interface became a typed command surface, not a form maze." },
      { phase: "03 \u00b7 Build", title: "Policy engine first", body: "Every capability routes through one authorisation function, so a new feature cannot accidentally bypass a rule." },
      { phase: "04 \u00b7 Verification", title: "External pen test", body: "Commissioned a third-party test at beta; all four findings were fixed and retested before general availability." },
      { phase: "05 \u00b7 Adoption", title: "Deprecate the old path", body: "Disabled direct SSH host-by-host as teams migrated, with a weekly burn-down of remaining bastion sessions." },
    ],
    stackGroups: [{ label: "Frontend", items: ["React", "TypeScript", "TanStack Query", "Radix UI", "xterm.js", "Tailwind CSS"] }, { label: "Backend", items: ["Express", "PostgreSQL", "Prisma", "gRPC", "JWT + mTLS"] }, { label: "Infrastructure", items: ["Docker", "AWS EKS", "Vault", "OpenTelemetry"] }],
    achievements: ["Eliminated shared production credentials across an 1,800-host fleet.", "Passed SOC 2 Type II audit with the ledger accepted as primary access evidence.", "Cut incident command execution time by 62% versus the bastion workflow.", "Zero critical findings on the follow-up penetration test."],
    outcomes: [{ metric: "1,800", label: "Hosts managed", note: "Single console" }, { metric: "100%", label: "Audit coverage", note: "Hash-chained ledger" }, { metric: "\u221262%", label: "Command latency", note: "Versus bastion SSH" }, { metric: "0", label: "Critical findings", note: "Post-remediation pen test" }],
    gallery: [{ image: images["cypher"]!, caption: "Command palette executing a scoped fleet action with inline approval." }, { image: images["vortex"]!, caption: "Fleet topology with health, region and policy scope overlays." }, { image: images["lens"]!, caption: "Audit ledger view \u2014 every entry sealed with the previous entry's hash." }],
  },
  lens: {
    tagline: "LLM code review companion that reads the whole repository",
    overview: ["Review queues were the bottleneck: senior engineers spent 9 hours a week on mechanical feedback that a machine could have given instantly.", "Neural Lens embeds an entire repository, understands its conventions, and posts reviews that reference the project's own prior art \u2014 with concrete diffs, not vague advice."],
    details: [{ label: "Role", value: "Full Stack + ML Engineer" }, { label: "Timeline", value: "6 months \u2014 2024" }, { label: "Team", value: "2 engineers" }, { label: "Scale", value: "1.4M files indexed" }, { label: "Status", value: "Public beta" }],
    challenges: [
      { title: "Context windows could not hold a repo", body: "Naive prompting truncated context and produced confidently wrong reviews.", fix: "Built a chunk-and-rank retrieval layer on pgvector with symbol-aware splitting, feeding only the 12 most relevant spans per hunk." },
      { title: "Reviews felt generic", body: "Early output read like a linter with a thesaurus and engineers dismissed it within a week.", fix: "Grounded every suggestion in the repository's own precedent \u2014 each comment cites a file and line where the pattern already exists." },
      { title: "Latency killed the habit", body: "A 40-second review meant developers had already context-switched away.", fix: "Streamed reviews hunk by hunk and pre-warmed embeddings on push, bringing first token to 1.2 seconds." },
    ],
    methodology: [
      { phase: "01 \u00b7 Framing", title: "Measure the pain", body: "Instrumented review queues for a month to find which comment categories were repetitive and automatable." },
      { phase: "02 \u00b7 Retrieval", title: "Symbol-aware indexing", body: "Parsed each repo into an AST and embedded semantic units instead of arbitrary character chunks." },
      { phase: "03 \u00b7 Evaluation", title: "Golden set before features", body: "Assembled 400 historical PRs with human reviews as ground truth and scored every prompt change against it." },
      { phase: "04 \u00b7 Product", title: "Meet devs in the PR", body: "Delivered everything through a GitHub bot \u2014 no new tab, no new tool, no new habit to learn." },
      { phase: "05 \u00b7 Loop", title: "Feedback as training data", body: "Thumbs on each comment feed a weekly re-ranking pass on the retrieval layer." },
    ],
    stackGroups: [{ label: "Frontend", items: ["Next.js", "React", "Streaming UI", "Tailwind CSS"] }, { label: "AI & Data", items: ["Python", "pgvector", "OpenAI-compatible APIs", "Tree-sitter", "Eval harness"] }, { label: "Infrastructure", items: ["AWS Lambda", "SQS", "RDS", "GitHub Apps"] }],
    achievements: ["Indexed 1.4M files across 60 repositories with sub-second retrieval.", "Reached 78% comment acceptance on the golden evaluation set.", "Reduced average human review turnaround from 9.4 hours to 3.1 hours.", "Shipped an eval harness now reused by two other internal AI products."],
    outcomes: [{ metric: "78%", label: "Comment acceptance", note: "On 400-PR golden set" }, { metric: "1.2s", label: "First token", note: "Streaming reviews" }, { metric: "\u221267%", label: "Review turnaround", note: "9.4h \u2192 3.1h" }, { metric: "1.4M", label: "Files indexed", note: "Across 60 repos" }],
    gallery: [{ image: images["lens"]!, caption: "Streaming review posting inline suggestions against a live diff." }, { image: images["vortex"]!, caption: "Repository embedding map clustered by module ownership." }, { image: images["cypher"]!, caption: "Evaluation dashboard tracking acceptance rate per prompt revision." }],
  },
  atlas: {
    tagline: "Headless storefront platform at 1.2M sessions a month",
    overview: ["A fast-growing retailer had outgrown its monolithic storefront: 4.2 second navigations, a CMS only developers could operate, and a checkout that failed under campaign traffic.", "Atlas is the replacement \u2014 an edge-rendered headless platform where merchandisers publish without a deploy and pages navigate in under 400ms on a mid-tier phone."],
    details: [{ label: "Role", value: "Lead Full Stack Engineer" }, { label: "Timeline", value: "10 months \u2014 2023" }, { label: "Team", value: "5 engineers, 2 merchandisers" }, { label: "Scale", value: "1.2M sessions/month" }, { label: "Status", value: "In production" }],
    challenges: [
      { title: "Campaign traffic broke checkout", body: "Flash sales produced 20x spikes and the origin database saturated within minutes.", fix: "Moved catalogue reads to edge caches with stale-while-revalidate and pushed cart state to an isolated write path with queue-backed order creation." },
      { title: "Merchandisers depended on engineers", body: "Every banner change was a pull request, so campaigns shipped days late.", fix: "Built a block-based authoring model with live preview and scheduled publishing \u2014 content changes now ship in minutes, without a deploy." },
      { title: "Migration risk was existential", body: "The legacy storefront could not be switched off in one night without risking peak-season revenue.", fix: "Ran a route-by-route strangler migration behind a proxy, moving traffic in 5% increments with automated revenue-parity checks." },
    ],
    methodology: [
      { phase: "01 \u00b7 Audit", title: "Follow the money", body: "Mapped every revenue-bearing route and ranked migration order by revenue-at-risk rather than by engineering convenience." },
      { phase: "02 \u00b7 Foundation", title: "Contracts before code", body: "Defined the catalogue, cart and content APIs as typed contracts so the frontend and backend teams could build in parallel." },
      { phase: "03 \u00b7 Delivery", title: "Ship behind a proxy", body: "Every new route went live behind a percentage-based proxy split with instant rollback." },
      { phase: "04 \u00b7 Optimisation", title: "Budget-driven performance", body: "Set hard budgets \u2014 120KB JS, LCP under 1.8s \u2014 and failed the build when a PR exceeded them." },
      { phase: "05 \u00b7 Handover", title: "Train the operators", body: "Ran authoring workshops so the merchandising team owned the CMS from launch day, not months later." },
    ],
    stackGroups: [{ label: "Frontend", items: ["Next.js", "React", "Edge runtime", "Tailwind CSS", "Playwright"] }, { label: "Backend", items: ["Node.js", "MongoDB", "Stripe", "Algolia", "Webhooks"] }, { label: "Infrastructure", items: ["Vercel", "Cloudflare", "Datadog", "GitHub Actions"] }],
    achievements: ["Cut median navigation time from 4.2s to 380ms on mid-tier mobile.", "Migrated 100% of revenue routes with zero unplanned downtime.", "Lifted mobile conversion by 22% within two quarters of launch.", "Reduced campaign publish time from three days to eleven minutes."],
    outcomes: [{ metric: "380ms", label: "Median navigation", note: "Was 4.2 seconds" }, { metric: "+22%", label: "Mobile conversion", note: "Two quarters post-launch" }, { metric: "1.2M", label: "Monthly sessions", note: "Peak 20x spikes handled" }, { metric: "11 min", label: "Campaign publish", note: "Was three days" }],
    gallery: [{ image: images["cypher"]!, caption: "Storefront home rendered at the edge with personalised merchandising blocks." }, { image: images["vortex"]!, caption: "Block-based CMS authoring canvas with scheduled publishing." }, { image: images["lens"]!, caption: "Performance budget dashboard enforced in CI on every pull request." }],
  },
  pulse: {
    tagline: "Self-hosted product analytics with a 40ms query budget",
    overview: ["Teams wanted product analytics without shipping customer behaviour to a third party \u2014 but every self-hosted option was either slow or a full data-engineering project.", "Pulse ships as one container, ingests events at 30k/minute, and answers funnel and retention questions in under 40 milliseconds against 400 million rows."],
    details: [{ label: "Role", value: "Full Stack Engineer" }, { label: "Timeline", value: "8 months \u2014 2023" }, { label: "Team", value: "2 engineers" }, { label: "Scale", value: "400M events stored" }, { label: "Status", value: "Open source" }],
    challenges: [
      { title: "Row-store queries took minutes", body: "A three-step funnel over 90 days ran for 4 minutes on Postgres and timed out the UI.", fix: "Introduced a columnar store with pre-aggregated daily rollups and bitmap user sets, taking the same funnel to 38ms." },
      { title: "Self-hosting had to be trivial", body: "Early builds needed five services and a message broker, which killed adoption for small teams.", fix: "Collapsed the deployment to a single container with an embedded queue and automatic schema migration on boot." },
      { title: "Funnel definitions were too rigid", body: "Analysts needed to ask 'what if' questions without engineering support.", fix: "Built a drag-based funnel builder that compiles to a typed query AST, so any exploration stays inside the 40ms budget." },
    ],
    methodology: [
      { phase: "01 \u00b7 Benchmark", title: "Define the budget", body: "Set a hard 40ms p95 query budget on day one and treated every design decision as a trade against it." },
      { phase: "02 \u00b7 Storage", title: "Model for the question", body: "Designed storage around funnel and retention access patterns instead of generic event querying." },
      { phase: "03 \u00b7 Interface", title: "Query builder as a first-class product", body: "Treated the funnel builder as the main product surface, not a settings page." },
      { phase: "04 \u00b7 Packaging", title: "One command to run", body: "Optimised the getting-started path until a new user had live data in under four minutes." },
      { phase: "05 \u00b7 Community", title: "Ship in the open", body: "Released early, triaged issues weekly, and let real self-hosters drive the roadmap." },
    ],
    stackGroups: [{ label: "Frontend", items: ["React", "TanStack Query", "Recharts", "Tailwind CSS"] }, { label: "Backend", items: ["Node.js", "PostgreSQL", "Columnar rollups", "Redis", "Webhooks"] }, { label: "Infrastructure", items: ["Docker", "Fly.io", "GitHub Actions"] }],
    achievements: ["Held a 38ms p95 query time across 400M stored events.", "Reduced self-host setup from a multi-service deployment to a single container.", "106 GitHub stars and 14 external contributors in the first year.", "Adopted internally by four product teams as the default analytics layer."],
    outcomes: [{ metric: "38ms", label: "p95 query time", note: "Across 400M events" }, { metric: "30k/min", label: "Ingest rate", note: "Single container" }, { metric: "4 min", label: "Time to first insight", note: "From docker run" }, { metric: "400M", label: "Events stored", note: "Columnar rollups" }],
    gallery: [{ image: images["vortex"]!, caption: "Funnel builder compiling a four-step conversion query in real time." }, { image: images["lens"]!, caption: "Cohort retention grid with weekly buckets and colour-scaled decay." }, { image: images["cypher"]!, caption: "Self-host setup screen \u2014 schema migration runs automatically on boot." }],
  },
  orbit: {
    tagline: "Block-based publishing that retires legacy WordPress",
    overview: ["Eight WordPress properties, twelve years of content, a plugin stack nobody dared upgrade, and an editorial team that just wanted to publish.", "Orbit migrates that content into a block-based model with a React front end \u2014 keeping every URL alive, every redirect mapped, and every editor productive from day one."],
    details: [{ label: "Role", value: "Full Stack Engineer" }, { label: "Timeline", value: "7 months \u2014 2022" }, { label: "Team", value: "3 engineers, 1 editor" }, { label: "Scale", value: "8 sites, 42k articles" }, { label: "Status", value: "Delivered" }],
    challenges: [
      { title: "Twelve years of messy HTML", body: "Legacy posts mixed shortcodes, inline styles and broken markup that no parser handled cleanly.", fix: "Wrote a deterministic HTML-to-blocks transformer with a review queue for the 3% of documents it could not classify confidently." },
      { title: "SEO could not regress", body: "Any lost URL meant lost traffic on properties earning real revenue from organic search.", fix: "Built a redirect mapper that diffed old and new sitemaps and failed the release if any indexed URL lacked a destination." },
      { title: "Editors resisted a new tool", body: "The team had a decade of WordPress muscle memory and no appetite for retraining.", fix: "Mirrored familiar shortcuts, kept a WordPress-style publish flow, and ran paired editing sessions during the first two weeks." },
    ],
    methodology: [
      { phase: "01 \u00b7 Inventory", title: "Count everything", body: "Crawled all eight properties to build a full inventory of URLs, templates, media and plugin behaviour." },
      { phase: "02 \u00b7 Transform", title: "Deterministic migration", body: "Made the content transformer idempotent and re-runnable, so migration could be rehearsed dozens of times." },
      { phase: "03 \u00b7 Rebuild", title: "Templates as blocks", body: "Rewrote each legacy template as composable blocks the editorial team could rearrange without code." },
      { phase: "04 \u00b7 Protect", title: "SEO regression gate", body: "Added automated crawl comparisons for titles, canonicals, structured data and redirects in CI." },
      { phase: "05 \u00b7 Cutover", title: "One site at a time", body: "Launched the smallest property first, held it for two weeks, then rolled the pattern across the rest." },
    ],
    stackGroups: [{ label: "Frontend", items: ["React", "Block editor", "Tailwind CSS", "Cloudflare Images"] }, { label: "Backend", items: ["PHP bridge", "MySQL", "Node migration workers", "REST"] }, { label: "Infrastructure", items: ["AWS S3", "CloudFront", "GitHub Actions"] }],
    achievements: ["Migrated 42,000 articles across 8 properties with 100% URL continuity.", "Held organic traffic flat through cutover, then grew it 14% in the following quarter.", "Cut median page weight by 61% versus the legacy WordPress themes.", "Editorial team shipped independently from week one \u2014 no engineer in the publish loop."],
    outcomes: [{ metric: "42k", label: "Articles migrated", note: "Across 8 properties" }, { metric: "100%", label: "URLs preserved", note: "Zero orphaned routes" }, { metric: "\u221261%", label: "Page weight", note: "Versus legacy themes" }, { metric: "+14%", label: "Organic traffic", note: "Quarter after cutover" }],
    gallery: [{ image: images["lens"]!, caption: "Block editor with drag-ordered sections and live front-end preview." }, { image: images["cypher"]!, caption: "Redirect mapper diffing legacy and new sitemaps before release." }, { image: images["vortex"]!, caption: "Media pipeline generating responsive derivatives on upload." }],
  },
} as const;
