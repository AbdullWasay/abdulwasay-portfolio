const placeholder = "/assets/project-vortex.jpg";
const placeholder2 = "/assets/project-cypher.jpg";
const placeholder3 = "/assets/project-lens.jpg";

import { gemelliImages } from "./gemelli-assets";
import { gemelliSchema } from "./gemelli-schema";
import { kingswellImages } from "./kingswell-assets";
import { clipperguysImages } from "./clipperguys-assets";
import { oradentalwellnessImages } from "./oradentalwellness-assets";
import { afroboosteurImages } from "./afroboosteur-assets";
import { souvenirhuntImages } from "./souvenirhunt-assets";
import { blueoceanImages } from "./blueocean-assets";
import { empoweredaiImages } from "./empoweredai-assets";

export const caseStudies = {
 gemelli: {
 tagline: "Production-grade AI-native multi-vendor marketplace for Moldova, 175+ APIs, Gemini intelligence, Paynet payments & smart logistics",
 briefPitch: "Gemelli is Moldova's multi-vendor marketplace: bridging sellers and buyers with a full commerce stack, Google OAuth sign-in, real MDL payments through Paynet, smart courier routing via Nova Post and FAN Courier, and AI woven into listing, search, moderation, and support from day one.",
 briefCards: [
 { label: "AI tools", value: "15+", hint: "Google Gemini embedded" },
 { label: "API routes", value: "175+", hint: "Serverless on Vercel" },
 { label: "Dashboard modules", value: "49", hint: "6 buyer · 16 seller · 27 admin" },
 { label: "Languages", value: "3", hint: "EN · RO · RU via AI translate" },
 ],
 briefDomains: [
 {
 title: "Identity",
 headline: "Google OAuth & 2FA",
 summary:
 "Buyers and sellers sign in with email/password or Google OAuth via NextAuth.js, plus optional two-factor authentication through email OTP or an authenticator app before accessing dashboards.",
 points: [
 "Google OAuth with optional 2FA for seller and admin access",
 ],
 },
 {
 title: "Commerce",
 headline: "Multi-vendor storefront",
 summary:
 "Buyers shop one catalog; each seller runs an independent shop behind it. One cart can hold products from many sellers, checkout splits orders, payments, and shipping labels automatically.",
 points: [
 "Multi-seller cart with split checkout and shipping per seller",
 "Trilingual storefront with returns and affiliate attribution",
 ],
 },
 {
 title: "AI",
 headline: "Gemini, OCR & automation",
 summary:
 "AI speeds up listing creation, KYC document checks, moderation, and support, including AWS Textract OCR for identity/product verification and Gemini across seller tools.",
 points: [
 "KYC OCR and product verification via AWS Textract",
 "Gemini tools for listing copy, moderation, and support",
 ],
 },
 {
 title: "Payments",
 headline: "MDL money flow",
 summary:
 "All transactions run in Moldovan Lei (MDL) through Paynet, from buyer checkout to seller wallet, subscriptions, ad spend, and weekly bank payouts.",
 points: [
 "Paynet 3DS, COD, wallet, and T+14 seller payouts",
 "Instant wallet refund when a return is collected",
 ],
 },
 {
 title: "Logistics",
 headline: "Nova Post & FAN Courier",
 summary:
 "Shipping labels are created automatically. The platform picks Nova Post or FAN Courier based on order weight, payment type, and delivery rules, sellers never choose manually.",
 points: [
 "Smart courier routing with automatic AWB labels",
 "Return pickup triggers automatic buyer credit",
 ],
 },
 ],
 architecture: [
 {
 role: "Buyer",
 description: "Public storefront + customer dashboard, browse, pay, track, earn.",
 groups: [
 {
 label: "Customer Dashboard",
 modules: [
 { name: "Dashboard", detail: "Order overview and Gemelli Balance summary" },
 { name: "Orders", detail: "Order history, tracking, and returns" },
 { name: "Gemelli Balance", detail: "Wallet ledger and transaction history" },
 { name: "Affiliate", detail: "Referral link, earnings, 30-day cookie" },
 { name: "Notifications", detail: "In-app notification inbox" },
 { name: "Settings", detail: "Account, addresses, security, privacy" },
 ],
 },
 {
 label: "Storefront",
 modules: [
 { name: "Storefront", detail: "Homepage, catalog, AI search, banners" },
 { name: "Auth", detail: "Email/password, Google OAuth, 2FA, seller signup" },
 { name: "Cart & Checkout", detail: "Multi-seller split, Paynet/COD/balance" },
 { name: "Product Detail", detail: "Reviews, 3D viewer, affiliate share" },
 { name: "Wishlist & Favorites", detail: "Saved products across sellers" },
 { name: "Help & AI Chat", detail: "FAQ matching and ticket escalation" },
 { name: "Become Seller", detail: "Onboarding CTA from storefront" },
 ],
 },
 ],
 },
 {
 role: "Seller",
 description: "Full operating system from KYC verification to bank payout.",
 groups: [
 {
 label: "Core Operations",
 modules: [
 { name: "Dashboard", detail: "Sales KPIs, targets, top products" },
 { name: "Verification", detail: "KYC documents and approval status" },
 { name: "Orders", detail: "Fulfillment, AWB generation, logistics" },
 { name: "Gemelli Balance", detail: "Seller wallet and credits" },
 ],
 },
 {
 label: "Growth & Analytics",
 modules: [
 { name: "Quick Stats", detail: "14-day trends, targets, AI insights" },
 { name: "Rewards", detail: "Milestone credits for boosts and slots" },
 { name: "Share & Earn", detail: "Affiliate program for sellers" },
 { name: "Advertising", detail: "CPC campaigns, ROAS, AI suggestions" },
 ],
 },
 {
 label: "Catalog & AI",
 modules: [
 { name: "Product Management", detail: "CRUD, bulk import, moderation queue" },
 { name: "Reviews", detail: "Review management and responses" },
 { name: "AI Tools", detail: "Copy, SEO, remove-bg, batch, social-sync" },
 ],
 },
 {
 label: "Business & Config",
 modules: [
 { name: "Help & Support", detail: "Support ticket system" },
 { name: "API & Integrations", detail: "REST API v1, keys, HMAC webhooks" },
 { name: "Subscription Plans", detail: "5 tiers, Paynet billing, plan gates" },
 { name: "Notifications", detail: "In-app seller notifications" },
 { name: "Settings", detail: "Sales, financial, AI, subscriptions, security" },
 ],
 },
 ],
 },
 {
 role: "Admin",
 description: "Platform control centre, moderation, money, content, and AI config.",
 groups: [
 {
 label: "Operations",
 modules: [
 { name: "Dashboard", detail: "GMV, revenue, sellers, ecosystem KPIs" },
 { name: "Orders", detail: "All platform orders" },
 { name: "Product Moderation", detail: "AI + manual approval queue" },
 { name: "Reviews", detail: "Review moderation" },
 { name: "Sellers", detail: "KYC review, approve, suspend" },
 { name: "AI Tools", detail: "Platform-wide AI tool management" },
 { name: "Help & Support", detail: "Ticket management" },
 { name: "Customers", detail: "User management and order history" },
 { name: "Notifications Engine", detail: "Template and broadcast config" },
 { name: "Video Reviews", detail: "Blogger/video review approval" },
 ],
 },
 {
 label: "Monetisation",
 modules: [
 { name: "Ads Management", detail: "Homepage banner management" },
 { name: "Ad Requests", detail: "Seller ad request approval" },
 { name: "Financials", detail: "Payouts, revenue, ad wallet, CSV" },
 { name: "Vouchers", detail: "Coupon and voucher management" },
 { name: "Broadcast", detail: "Email broadcast campaigns" },
 ],
 },
 {
 label: "Platform Config",
 modules: [
 { name: "API & Keys", detail: "Courier, Gemini, platform keys" },
 { name: "AI Control", detail: "Usage limits and Gemini config" },
 { name: "Checkout Control", detail: "Enable/disable checkout flows" },
 { name: "Content Management", detail: "CMS pages, FAQs, footer" },
 { name: "Inventory Alerts", detail: "Low-stock catalog alerts (KPI-linked)" },
 ],
 },
 {
 label: "Ad Engine",
 modules: [
 { name: "Boost Packages", detail: "Ad boost package pricing" },
 { name: "Placements", detail: "Ad placement slot config" },
 { name: "Plan Rules & Credits", detail: "Subscription ad credits" },
 { name: "Seller Milestones", detail: "Reward milestone configuration" },
 ],
 },
 {
 label: "Coming Soon",
 modules: [
 { name: "Waitlist", detail: "Pre-launch waitlist management" },
 { name: "Partners", detail: "Partner interest management" },
 ],
 },
 {
 label: "Account",
 modules: [
 { name: "Notifications", detail: "Admin notification inbox" },
 { name: "Settings", detail: "Account, notifications, security" },
 ],
 },
 ],
 },
 ],
 overview: [
 "Live at gemelli.store, Moldova's multi-vendor marketplace with trilingual EN/RO/RU support.",
 ],
 details: [
 { label: "Role", value: "Lead Full Stack Engineer" },
 { label: "Live", value: "gemelli.store" },
 { label: "Duration", value: "6–7 months" },
 { label: "Period", value: "Feb 2026 – Present" },
 { label: "Stack", value: "Next.js · React · Prisma · Neon · Gemini · Paynet" },
 ],
    challenges: [
 {
 title: "Paynet callback race, double-charge risk",
 severity: "Critical",
 impact: "Duplicate orders on IPN retry",
 body: "Paynet sends IPN callbacks and return-url hits simultaneously. Without idempotency, a single payment could mark two orders PAID or leave an orphaned PENDING order with depleted inventory.",
 fix: "paynetExternalId as unique constraint + idempotent completePayment handler. Every callback stores the Paynet event ID, duplicates short-circuit before inventory mutation.",
 },
 {
 title: "Neon pool exhaustion on cold starts",
 severity: "Critical",
 impact: "500s during traffic spikes",
 body: "Vercel serverless spins up dozens of concurrent lambdas. Each opened a fresh Prisma connection, Neon hit connection limits and checkout started failing mid-3DS redirect.",
 fix: "Switched to Neon pooled connection string (-pooler host), singleton Prisma client with globalThis cache, and connection_limit=1 per function. Checkout p99 dropped from timeout to <400ms.",
 },
 {
 title: "Multi-seller shipping fee collapse",
 severity: "High",
 impact: "Platform ate delivery margin",
 body: "Cart with 3 sellers applied free-shipping threshold globally instead of per-seller. Customers got free delivery on every package while Gemelli subsidised 180+ MDL per order.",
 fix: "Rewrote shipping allocation to compute per-seller subtotals independently. OrderItem rows carry shippingCost, codFee, and freeShippingSubsidy, auditable in admin financials.",
 },
 {
 title: "AI moderation blocking launch sellers",
 severity: "High",
 impact: "40% first listings rejected",
 body: "Gemini false-positive on return-policy phrase during launch week. Legitimate sellers in Fashion category got auto-rejected because descriptions used informal Romanian phrasing.",
 fix: "Added trusted-seller bypass, fuzzy phrase matching with RO/RU variants, and admin override queue. Rejection rate dropped to 8% with actionable moderationReason on every fail.",
 },
 {
 title: "T+14 payout drift with partial refunds",
 severity: "High",
 impact: "Seller trust erosion",
 body: "When a multi-item order had one item returned and another delivered, payout cron included the returned item's commission in the seller's net, sellers saw incorrect bank amounts.",
 fix: "Payout eligibility now per OrderItem with eligibleForPayoutAt set only after delivery + 14 days + no active ReturnRequest. Refunded items reverse commission via SellerPayout adjustment rows.",
 },
 {
 title: "i18n stale cache at checkout",
 severity: "Medium",
 impact: "RO buyers saw English product names",
 body: "Product translations saved via AI ran async but checkout read from stale RTK Query cache. Romanian buyers saw English titles on Paynet receipt, legal/compliance issue for MDL transactions.",
 fix: "Tag invalidation on translate endpoint + server-side locale resolution in checkout API. Product names now resolved from nameRo/nameRu at order creation, not client cache.",
 },
    ],
    methodology: [
 { phase: "01 · Foundation", title: "Neon PostgreSQL + Prisma schema", body: "Designed 40+ models, User, Product, Order, OrderItem, Store, Subscription, Campaign, SellerPayout, ReturnRequest, FraudAlert, AiUsage, SellerApiKey, WalletTransaction, AffiliateCommission, and more. Deployed on Neon with pooled connection strings for Vercel serverless." },
 { phase: "02 · Storefront", title: "Buyer commerce + auth", body: "Built trilingual homepage, product catalog with AI natural search, NextAuth with Google OAuth, 2FA for privileged accounts, multi-seller cart, checkout with Paynet 3DS/COD/balance split, coupon validation, affiliate cookie attribution, and order success flow." },
 { phase: "03 · Seller module", title: "Onboarding to fulfillment", body: "Seller signup → KYC document upload (S3) → admin approval → product CRUD with bulk CSV import, AI moderation on publish, order management, AWB generation, and logistics dashboard." },
 { phase: "04 · AI layer", title: "Gemini across 15+ tools", body: "Wired Google Gemini for seller tools (title, description, SEO, batch, social sync, migration, invoicing, consultant reports), platform automation (moderation, KYC, translation, support chat), and buyer search (natural language, image search)." },
 { phase: "05 · Payments", title: "Paynet + wallet + payouts", body: "Paynet Setecom 3DS checkout, Gemelli Balance wallet with instant refund, T+14 weekly payout engine, subscription billing via Paynet, ad wallet top-ups, and card BIN routing." },
 { phase: "06 · Logistics", title: "Smart courier routing", body: "Nova Post and FAN Courier API integration with automatic AWB generation, volumetric weight calculation, return AWB webhooks triggering instant refunds, and seller handover SLA enforcement." },
 { phase: "07 · Monetisation", title: "Subscriptions + advertising", body: "5-tier subscription plans with Paynet billing and auto-renewal cron. CPC advertising platform with campaign types, boost packages, click attribution, ROAS tracking, and AI smart suggestions." },
 { phase: "08 · Admin & API", title: "Control centre + integrations", body: "Admin dashboard with moderation queue, financials, CMS, AI control, ad approval. Seller REST API v1 with scoped keys and HMAC webhooks for ERP/1C sync. 47+ admin API routes." },
 { phase: "09 · Launch", title: "Production at gemelli.store", body: "Deployed to Vercel with Neon pooling, Paynet live keys, courier webhooks in production, and trilingual storefront serving real sellers and buyers across Moldova." },
 ],
 stackGroups: [
 { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux", "Ant Design", "Recharts", "Three.js"] },
 { label: "Backend", items: ["Next.js API", "Prisma", "Neon PostgreSQL", "NextAuth", "Google OAuth", "JWT", "Vitest", "Zod"] },
 { label: "AI", items: ["Google Gemini", "Remove.bg", "Cloudinary"] },
 { label: "Payments", items: ["Paynet", "Stripe"] },
 { label: "Logistics", items: ["Nova Post", "FAN Courier"] },
 { label: "Infrastructure", items: ["Vercel", "AWS S3", "Mailtrap"] },
 ],
 impactGroups: [
 {
 label: "Production",
 headline: "Live marketplace processing real MDL transactions",
 points: ["gemelli.store, Moldova's multi-vendor platform", "Split checkout across independent sellers"],
 },
 {
 label: "Money flow",
 headline: "Payments and payouts without manual reconciliation",
 points: ["Paynet 3DS, COD, and instant wallet refunds on return", "T+14 weekly seller payouts with admin CSV export"],
 },
 {
 label: "Integrations",
 headline: "Sellers connect to existing business systems",
 points: ["REST API v1 with scoped keys for ERP/1C sync", "Nova Post + FAN Courier auto-routing per order"],
 },
 ],
 schema: gemelliSchema,
 achievements: [],
 outcomes: [
 { metric: "Live", label: "Production", note: "gemelli.store" },
 { metric: "T+14", label: "Seller payouts", note: "Weekly Monday cycle" },
 { metric: "5", label: "Subscription tiers", note: "START → FOUNDING" },
 { metric: "2", label: "Couriers", note: "Nova Post + FAN Courier" },
 ],
 embedCover: true,
 gallery: [
 { image: gemelliImages.homepage, caption: "Buyer storefront, trilingual homepage with category navigation, AI search, featured products, and sponsored placements." },
 { image: gemelliImages.auth, caption: "Authentication, email/password login with Google OAuth, 2FA (email OTP + authenticator app), and seller/buyer registration flows." },
 { image: gemelliImages.admin, caption: "Admin control centre, platform KPIs (GMV, revenue, sellers, orders), pending KYC alerts, ecosystem health metrics, and master catalog control." },
 { image: gemelliImages.aiTools, caption: "AI Tools hub, Gemini-powered description generator, title generator, visual studio (background removal), and smart campaign optimization." },
 { image: gemelliImages.sellerDashboard, caption: "Seller dashboard, welcome analytics, product of the month, total sales, new customers, milestone progress, and reward wallet credits." },
 { image: gemelliImages.sellerAnalytics, caption: "Seller analytics, 14-day sales trend chart, monthly target tracking (63% progress), lifetime sales, and AI-powered performance insights." },
 { image: gemelliImages.sellerRewards, caption: "Seller rewards, milestone-based credits redeemable for Product Boost, Featured homepage placement, and extra listing capacity." },
 { image: gemelliImages.advertising, caption: "Advertising console, CPC campaign management, ad balance (9,682 MDL), impressions/clicks/ROAS metrics, and AI smart suggestions for high-stock products." },
 ],
 },

 kingswell: {
 tagline: "Premium estate agency platform for London & Kent: listings, CMS, RAG chatbot and lead capture",
 briefPitch:
 "A premium London & Kent estate agency platform with searchable listings, a staff CMS, RAG chatbot grounded in live property data, and a full lead pipeline into admin.",
 briefCards: [
 { label: "Admin modules", value: "9", hint: "Properties, blog, team, areas" },
 { label: "Content types", value: "8", hint: "Keyed MongoDB documents" },
 { label: "Lead forms", value: "4", hint: "Valuation to landlord" },
 { label: "AI", value: "RAG", hint: "Context-grounded listings" },
 ],
 briefDomains: [
 {
 title: "Listings",
 headline: "Property inventory",
 summary:
 "Sale and rent portfolios for London and Kent with status-aware publishing so sold stock stays out of the public site.",
 points: [
 "Structured inventory with media, maps, and viewing requests",
 "Sold and let-agreed homes remain in CMS but leave the public site",
 ],
 },
 {
 title: "CMS",
 headline: "Custom admin CMS",
 summary:
 "Staff-owned CMS for listings and content without a headless SaaS subscription.",
 points: [
 "Properties, blog, team, and area guides managed by staff",
 ],
 },
 {
 title: "Leads",
 headline: "Lead pipeline",
 summary:
 "Valuation, viewing, contact, and landlord enquiries land in one ops inbox with optional CRM handoff.",
 points: [
 "Unified inbox across enquiry types with staff alerts",
 ],
 },
 {
 title: "AI",
 headline: "RAG property chatbot",
 summary:
 "Retrieval-augmented assistant that answers only from live listings and agency facts.",
 points: [
 "Context rebuilt from live inventory on every reply",
 "Escalates to valuation or WhatsApp when human help is needed",
 ],
 },
 ],
 architecture: [
 {
 role: "Public",
 description: "Marketing site for buyers, tenants, and landlords, search, read, enquire.",
 groups: [
 {
 label: "Storefront",
 modules: [
 { name: "Homepage", detail: "Hero, search bar, services, featured properties, reviews" },
 { name: "For Sale / To Rent", detail: "Filterable listing indexes with status rules" },
 { name: "Property Detail", detail: "Gallery, features, map, viewing form, WhatsApp CTA" },
 { name: "Area Guides", detail: "SEO area pages, schools, transport, lifestyle" },
 { name: "Blog", detail: "Insights index and article pages" },
 ],
 },
 {
 label: "Conversion",
 modules: [
 { name: "Book Valuation", detail: "Free valuation lead form" },
 { name: "Contact", detail: "General enquiry + embedded map" },
 { name: "Landlords", detail: "Lettings services and landlord form" },
 { name: "Buyers & Tenants", detail: "Guide pages for each audience" },
 { name: "RAG Chatbot", detail: "Context-grounded assistant over live listings" },
 { name: "WhatsApp", detail: "Floating deep-link CTA" },
 ],
 },
 ],
 },
 {
 role: "Admin",
 description: "Staff CMS at /kingswell-admin, manage content, listings, and leads.",
 groups: [
 {
 label: "Overview",
 modules: [
 { name: "Dashboard", detail: "Entity counts and quick links" },
 { name: "Form Enquiries", detail: "All website leads, filter and delete" },
 { name: "Site Settings", detail: "Brand, contact, hours, social" },
 ],
 },
 {
 label: "Content",
 modules: [
 { name: "Properties", detail: "Full CRUD, photos, status, featured flag" },
 { name: "Blog", detail: "Create and edit articles" },
 { name: "Testimonials", detail: "Google-style review carousel" },
 { name: "Team", detail: "Staff profiles with photos and bios" },
 { name: "Area Guides", detail: "Long-form SEO area content" },
 { name: "Why Choose", detail: "Homepage USP cards" },
 ],
 },
 ],
 },
 ],
 overview: [
 "Kingswell Estate Agents is a production platform for a premium UK agency covering London and Kent, brand line *Move Like Royalty, Move Well.*",
 "The public site combines property search, area guides, blog, valuation CTAs, and partner trust signals. Behind the scenes, a custom MongoDB CMS lets non-technical staff update listings and content without a developer.",
 ],
 details: [
 { label: "Role", value: "Full Stack Engineer" },
 { label: "Live", value: "kingswellestateagents.co.uk" },
 { label: "Stack", value: "Next.js 15 · MongoDB · Gemini · Cloudinary" },
 ],
    challenges: [
 {
 title: "CMS without a headless SaaS",
 body: "The client needed full control over listings, blog posts, and testimonials, but without paying for Contentful or Sanity, and without calling a developer for every update.",
 fix: "Built a keyed-document CMS in MongoDB with nine admin modules, seed scripts from JSON, and middleware-protected admin routes.",
 severity: "High",
 impact: "Staff publish independently",
 },
 {
 title: "Chatbot inventing fake listings",
 body: "Generic AI widgets hallucinate properties and prices, unacceptable for a regulated estate agency where accuracy is a legal and trust requirement.",
 fix: "RAG grounding: the Gemini system prompt is rebuilt from live MongoDB on every request so only published properties and agency facts are included. Guardrails redirect to human contact when unsure.",
 severity: "Critical",
 impact: "Accurate AI answers",
 },
 {
 title: "Serverless image hosting",
 body: "Property listings need multiple photos per listing. Local disk storage breaks on Vercel serverless functions.",
 fix: "Cloudinary upload pipeline in the admin panel with JPEG/PNG/WebP validation and CDN delivery URLs stored in MongoDB.",
 severity: "High",
 impact: "Reliable media in production",
 },
 {
 title: "Sold listings still in database",
 body: "Staff mark properties sold or let-agreed but records must stay for reporting, while hiding them from the public site and chatbot.",
 fix: "Shared publish rules: public pages and AI context filter to available and under-offer status only.",
 severity: "Medium",
 impact: "Clean public inventory",
 },
    ],
    methodology: [
 { phase: "01 · Foundation", title: "Next.js foundation + design system" },
 { phase: "02 · Storefront", title: "Public marketing site" },
 { phase: "03 · Listings", title: "Sale & rent inventory" },
 { phase: "04 · CMS", title: "Custom admin CMS + auth" },
 { phase: "05 · Data", title: "MongoDB content model and seed pipelines" },
 { phase: "06 · Leads", title: "Lead capture pipeline with email and CRM handoff" },
 { phase: "07 · AI", title: "RAG chatbot grounded in live inventory" },
 { phase: "08 · Launch", title: "SEO foundations and production deploy" },
 ],
 stackGroups: [
 { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
 { label: "Backend", items: ["Next.js API", "MongoDB", "Cloudinary"] },
 { label: "AI & Comms", items: ["Google Gemini", "RAG Chat", "Resend", "WhatsApp"] },
 { label: "Infrastructure", items: ["Vercel", "MongoDB Atlas", "Cloudinary"] },
 ],
 achievements: [
 "End-to-end Next.js 15 platform, public site, admin CMS, and APIs in one codebase.",
 "Nine-module admin panel with property CRUD, media uploads, and lead inbox.",
 "RAG chatbot grounded in live MongoDB context: no hallucinated listings.",
 "Four lead capture flows with optional email and CRM webhook integration.",
 "SEO foundations: Schema.org, sitemap, robots, and local London/Kent signals.",
 ],
 outcomes: [
 { metric: "Live", label: "Production site", note: "kingswellestateagents.co.uk" },
 { metric: "9", label: "Admin modules", note: "Self-serve CMS" },
 { metric: "RAG", label: "AI chatbot", note: "Live listing context" },
 { metric: "4", label: "Lead forms", note: "Valuation to landlord" },
 ],
 impactGroups: [
 {
 label: "For the agency",
 headline: "Own branded presence beyond portals",
 points: [
 "Searchable portfolio on their own domain, not only portals",
 "London & Kent coverage with dedicated area SEO pages",
 ],
 },
 {
 label: "For staff",
 headline: "No developer needed for daily updates",
 points: [
 "Self-serve property and content updates from the CMS",
 "Media uploads and lead inbox in one admin surface",
 ],
 },
 {
 label: "For visitors",
 headline: "Trustworthy search and support",
 points: [
 "Sale and rent inventory with RAG answers from real stock",
 "WhatsApp and valuation CTAs on key conversion pages",
 ],
 },
 ],
  embedCover: true,
 gallery: [
 { image: kingswellImages.homepage, caption: "Homepage, premium hero with buy/rent search, London skyline, valuation and call CTAs, and partner trust strip." },
 { image: kingswellImages.admin, caption: "Admin CMS, /kingswell-admin dashboard with module counts for properties, blog, testimonials, team, area guides, and form enquiries." },
 { image: kingswellImages.areas, caption: "Coverage section, London, Kent, and surrounding areas with boutique positioning and explore CTAs." },
 { image: kingswellImages.propertyDetail, caption: "Property detail, Ronver Road listing with gallery, features, map, viewing request form, and WhatsApp enquiry." },
 { image: kingswellImages.areaGuides, caption: "Area guides, South East London and neighbourhood SEO pages with local market copy and property links." },
 { image: kingswellImages.contact, caption: "Contact page: enquiry form with map embed, plus floating RAG chatbot and WhatsApp widgets." },
 ],
 },

 afroboosteur: {
 tagline: "Full-stack dance & coaching platform, courses, marketplace, Socket.io chat, Google auth, and Stripe · Twint · PayPal · QR payments",
 briefPitch:
 "Afroboosteur is a full-stack platform for African dance coaches and entrepreneurs: publish and sell courses, run a multi-seller shop, handle event helmet reservations, and keep students engaged with real-time course chat. Auth covers email and Google sign-in, with a unified checkout across Stripe, Swiss Twint, PayPal, credits, gift cards, and QR discount cards.",
 briefCards: [
 { label: "Roles", value: "5", hint: "Student to admin" },
 { label: "Payments", value: "6", hint: "Stripe · Twint · PayPal · more" },
 { label: "Languages", value: "3", hint: "FR · EN · DE" },
 { label: "Realtime", value: "Chat", hint: "Live course rooms" },
 ],
 briefDomains: [
 {
 title: "Courses",
 headline: "Coaching operations",
 summary:
 "Course lifecycle for coaches and students, from publishing and enrollment through QR event check-in.",
 points: [
 "Coach publishing, enrollment, and QR event check-in",
 "Referral attribution with reward tracking",
 ],
 },
 {
 title: "Marketplace",
 headline: "Multi-seller commerce",
 summary:
 "Multi-seller shop with approval workflows and order fulfillment.",
 points: [
 "Seller onboarding with admin approval and order pipeline",
 ],
 },
 {
 title: "Realtime",
 headline: "Live course rooms",
 summary:
 "Socket-backed course rooms for messaging and push notifications.",
 points: [
 "Authenticated real-time chat with presence and notifications",
 ],
 },
 {
 title: "Payments",
 headline: "Multi-rail checkout",
 summary:
 "One checkout across Stripe, Twint, PayPal, credits, and QR gift or discount cards.",
 points: [
 "Unified payment handler across six rails including QR redemption",
 ],
 },
 ],
 architecture: [
 {
 role: "Student",
 description: "Public site + logged-in experience, browse, book, shop, chat.",
 groups: [
 {
 label: "Discovery",
 modules: [
 { name: "Homepage", detail: "Hero video, featured courses, admin-editable CMS blocks" },
 { name: "Courses", detail: "Catalog, course detail, enrollment and booking" },
 { name: "Shop", detail: "Product grid, variants, cart, and checkout modal" },
 { name: "Publications", detail: "Community posts and social feed" },
 ],
 },
 {
 label: "Account",
 modules: [
 { name: "Login / Signup", detail: "Email/password + Google OAuth via Firebase popup" },
 { name: "Dashboard", detail: "Role-aware hub, student, coach, or seller views" },
 { name: "Orders", detail: "Marketplace order history and delivery tracking" },
 { name: "My reservations", detail: "Helmet booking list with QR check-in status" },
 { name: "Tokens", detail: "Platform credit balance and top-up" },
 { name: "Profile", detail: "Avatar via Cloudinary, referral code, settings" },
 ],
 },
 ],
 },
 {
 role: "Coach / Seller",
 description: "Content creation, commerce, and earnings, from one dashboard.",
 groups: [
 {
 label: "Coach tools",
 modules: [
 { name: "Coach dashboard", detail: "Course management, schedules, student overview" },
 { name: "Seller dashboard", detail: "Product CRUD, gift cards, earnings" },
 { name: "Become seller", detail: "Application form with admin review pipeline" },
 { name: "Gift cards", detail: "Issue QR gift cards, with or without recipient email" },
 { name: "Discount cards", detail: "Coach-scoped promo cards for checkout" },
 ],
 },
 {
 label: "Engagement",
 modules: [
 { name: "Course chat", detail: "Socket.io messaging inside live course rooms" },
 { name: "Chat page", detail: "Community messaging surface" },
 { name: "Profile analytics", detail: "Per-coach engagement metrics" },
 { name: "Offers", detail: "Subscription and promotional offer popups" },
 ],
 },
 ],
 },
 {
 role: "Admin",
 description: "Platform control, referrals, email, marketplace, and content.",
 groups: [
 {
 label: "Operations",
 modules: [
 { name: "Referral admin", detail: "Codes, bulk import, reward processing, export" },
 { name: "Seller applications", detail: "Approve/reject marketplace sellers" },
 { name: "Email settings", detail: "Nodemailer templates and notification routing" },
 { name: "Home CMS", detail: "Hero title, video, and background admin settings" },
 ],
 },
 ],
 },
 ],
 overview: [
 "Afroboosteur connects African dance coaches with students worldwide, course enrollment, a full Afroboost Shop marketplace, helmet event reservations, and community chat in one Next.js 15 app deployed at afroboosteur.vercel.app.",
 "Firebase Authentication powers email/password and Google sign-in; MongoDB stores users, courses, products, orders, and gift cards; Socket.io drives real-time course messaging; and a single PaymentHandlerWithCredits component routes Stripe, Twint, PayPal, credits, and QR-scanned gift/discount cards through 67+ API routes.",
 ],
 details: [
 { label: "Role", value: "Full Stack Engineer" },
 { label: "Live", value: "afroboosteur.vercel.app" },
 { label: "Timeline", value: "2024" },
 { label: "Stack", value: "Next.js 15 · Firebase · MongoDB · Socket.io · Stripe" },
 ],
    challenges: [
 {
 title: "Six payment methods, one checkout modal",
 severity: "High",
 impact: "Split logic across course, shop, and token flows",
 body: "Courses, marketplace products, and token top-ups each need Stripe, Twint, PayPal, credits, gift cards, and coach discount cards, but duplicating checkout UI per surface would drift quickly.",
 fix: "Built PaymentHandlerWithCredits as a shared modal, pre-applied gift/discount codes, referral validation, method-specific sub-modals (Stripe, Twint, PayPal), and transactionType guards on gift-card validate API.",
 },
 {
 title: "QR gift cards, camera and upload",
 severity: "High",
 impact: "Redemption friction at events and checkout",
 body: "Seller-issued gift cards ship as single-use QR codes. Students need to redeem at checkout without typing long codes, including on mobile where camera permissions vary.",
 fix: "GiftCardScanner uses getUserMedia + jsQR frame loop with image-upload fallback. Validates against /api/gift-cards/validate with course/product/token type checks before applying balance.",
 },
 {
 title: "Realtime chat without message loss",
 severity: "Medium",
 impact: "Course engagement drops if chat feels laggy",
 body: "Course chat needs instant delivery, typing indicators, and push notifications when students are in other tabs, REST polling alone cannot keep up.",
 fix: "Socket.io server on /api/socket with authenticate, join_course, send_message, and typing events. Messages broadcast to course rooms; notifications fan out to user_${userId} personal channels.",
 },
 {
 title: "Google auth + Firestore profile sync",
 severity: "Medium",
 impact: "OAuth users missing roles or referral codes",
 body: "Google sign-in via signInWithPopup creates Firebase users who may not yet have a Firestore profile with role, referral code, or coach/seller flags.",
 fix: "Auth context onAuthStateChanged creates or merges User documents in Firestore, generates referral codes, preserves role, and syncs profileImage from Google account metadata.",
 },
 {
 title: "Twint via Stripe Checkout",
 severity: "Medium",
 impact: "Swiss users expect mobile wallet pay",
 body: "Twint is not a default Stripe payment method in most SDK examples, it requires explicit payment_method_types configuration in Checkout Session creation.",
 fix: "Dedicated TwintPaymentModal and /api/stripe/create-checkout-session with TWINT enabled, plus verify-session on /payment/success for session reconciliation.",
 },
 {
 title: "PWA install on iOS",
 severity: "Low",
 impact: "Mobile retention for returning students",
 body: "iOS Safari never fires beforeinstallprompt, automatic PWA install banners silently fail on iPhone and iPad.",
 fix: "Separate iOS install modal with Share → Add to Home Screen steps, triggered after a delay on detected iOS user agents; service worker caches shell assets for offline revisit.",
 },
    ],
    methodology: [
 { phase: "01 · Foundation", title: "App foundation & design system" },
 { phase: "02 · Auth", title: "Email & Google sign-in" },
 { phase: "03 · Courses", title: "Courses & coach tools" },
 { phase: "04 · Marketplace", title: "Multi-seller shop" },
 { phase: "05 · Payments", title: "Multi-rail checkout" },
 { phase: "06 · Realtime", title: "Live course chat" },
 { phase: "07 · Reach", title: "Trilingual PWA" },
 { phase: "08 · Admin", title: "Referrals & site CMS" },
 { phase: "09 · Launch", title: "Production release" },
 ],
 stackGroups: [
 { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"] },
 { label: "Backend", items: ["Next.js API", "MongoDB", "Firebase Auth", "Firebase Admin", "Socket.io"] },
 { label: "Payments", items: ["Stripe", "Twint", "PayPal", "QR codes"] },
 { label: "Media & Comms", items: ["Cloudinary", "Nodemailer", "Upstash Redis"] },
 { label: "i18n & PWA", items: ["react-i18next", "Service Worker", "FR / EN / DE"] },
 ],
 achievements: [
 "Full-stack coaching platform: courses, shop, reservations, chat, and subscriptions.",
 "Email and Google sign-in with role-based dashboards for students, coaches, and sellers.",
 "Unified checkout across Stripe, Twint, PayPal, credits, gift cards, and QR discounts.",
 "Real-time course messaging with notifications and presence.",
 "Referral system, helmet check-in, and admin analytics.",
 "Trilingual PWA in French, English, and German.",
 ],
 outcomes: [
 { metric: "6", label: "Payment rails", note: "Stripe · Twint · PayPal + more" },
 { metric: "5", label: "User roles", note: "Student to admin" },
 { metric: "3", label: "Languages", note: "FR · EN · DE" },
 { metric: "Live", label: "Production", note: "afroboosteur.vercel.app" },
 ],
 impactGroups: [
 {
 label: "For coaches",
 headline: "Teach, sell, and earn",
 points: [
 "Publish dance courses with schedules and video content",
 "Run a seller shop, products, gift cards, and commission tracking",
 "Coach dashboard with analytics and discount card tools",
 ],
 },
 {
 label: "For students",
 headline: "Book, pay, and connect",
 points: [
 "Sign in with Google or email, enroll in courses in minutes",
 "Pay with card, Twint, PayPal, credits, or scan a QR gift card",
 "Live course chat and community publications feed",
 ],
 },
 {
 label: "For the platform",
 headline: "Realtime commerce at scale",
 points: [
 "Socket.io messaging keeps course rooms engaged",
 "Referral system with admin analytics and reward processing",
 "Single PaymentHandler prevents checkout drift across surfaces",
 ],
 },
 ],
 embedCover: true,
 gallery: [
 { image: afroboosteurImages.hero, caption: "Homepage, Feel the rhythm hero with course booking CTA, FR navigation (Boutique, Devenir vendeur), and Connexion / Inscription auth buttons." },
 { image: afroboosteurImages.referral, caption: "Student dashboard, Referral Program with AW8765 code, share link, pending/approved CHF rewards, and sidebar for reservations, community chat, and credits." },
 { image: afroboosteurImages.giftCards, caption: "Seller dashboard, Gift card management with product/order/revenue tabs, monthly subscription plan, and Create a gift card flow for QR single-use cards." },
 { image: afroboosteurImages.sellerRevenue, caption: "Seller revenues, CHF balance, subscription fees, net income breakdown, and monthly subscription model for marketplace sellers." },
 ],
 },

 oradentalwellness: {
 tagline: "Quiet-luxury dental clinic site for aligners, implants, and considered care",
 briefPitch:
 "ORA Dental Wellness is the marketing site for a premium dental clinic: clear aligners, implants, cosmetic and general dentistry with a calm atelier aesthetic. The site sells the practice through founder storytelling, ten treatment disciplines, live Google reviews, a journal, and WhatsApp-first booking.",
 briefCards: [
 { label: "Stack", value: "TanStack", hint: "Start · React · TypeScript" },
 { label: "Reviews", value: "Places API", hint: "Live Google pull + fallback" },
 { label: "Booking", value: "Server fn", hint: "Zod + Nodemailer" },
 { label: "Motion", value: "Lenis", hint: "Scroll story + Tailwind 4" },
 ],
 briefDomains: [
 {
 title: "Brand",
 headline: "Quiet-luxury atelier",
 summary:
 "ORA is positioned as dentistry with restraint, arched alcoves, sage tones, and editorial typography that lowers anxiety before a patient ever sits in the chair.",
 points: [
 "Hero splash with clinic interior and Every detail, crafted for your smile",
 "Atelier section, considered, sculptural, calm positioning",
 "Founder portraits for Dr. Ahmed Sultan and Dr. Roha Ejaz",
 ],
 },
 {
 title: "Treatments",
 headline: "Ten disciplines, one standard",
 summary:
 "An interactive treatment explorer covers preventive, restorative, endodontics, extractions, gum care, emergency, pediatric, cosmetic, oral health, and diagnostics.",
 points: [
 "Radial discipline selector with animated tooth diagram",
 "Per-category service lists, scaling, root canals, aligners, and more",
 "Five-doctor team carousel with specialist roles",
 ],
 },
 {
 title: "Trust",
 headline: "Reviews & journal",
 summary:
 "Live Google reviews load from the Places API with a curated fallback, displayed in an orbital carousel and testimonial slider. The journal publishes typed blog guides for local SEO.",
 points: [
 "Google Reviews section, 5.0 rating with patient photo orbit",
 "16-review carousel with write-a-review CTA",
 "Journal index and slug routes with structured blog blocks",
 ],
 },
 {
 title: "Conversion",
 headline: "Book & enquire",
 summary:
 "Appointment requests go through a validated server function to Nodemailer. WhatsApp and phone CTAs appear across every section.",
 points: [
 "Booking form, name, email, phone, date, service select",
 "Floating WhatsApp widget + header WhatsApp button",
 "FAQ accordion for location, hours, aligners, and Islamabad proximity",
 ],
 },
 ],
 architecture: [
 {
 role: "Public",
 description: "Single-page marketing story with anchored sections, atelier, founders, treatments, team, journal, reviews, FAQ, contact.",
 groups: [
 {
 label: "Homepage",
 modules: [
 { name: "Hero + splash", detail: "HomeSplash intro, hero collage, stat counters, marquee ticker" },
 { name: "Atelier & founders", detail: "Brand story, Dr. Ahmed & Dr. Roha founder panels" },
 { name: "Treatments", detail: "Ten-discipline interactive wheel + service detail panel" },
 { name: "Team", detail: "Embla carousel, five specialists" },
 { name: "Journal", detail: "BlogNewsCarousel linking to /blog guides" },
 { name: "Reviews & FAQ", detail: "Google orbit + accordion FAQ + location block" },
 ],
 },
 {
 label: "Content & SEO",
 modules: [
 { name: "Blog", detail: "Typed BlogPost blocks, /blog and /blog/$slug" },
 { name: "Schema.org", detail: "Dentist, LocalBusiness, FAQ, and Article JSON-LD" },
 { name: "Meta", detail: "Per-page titles, OG images, sitemap, robots, llms.txt" },
 ],
 },
 ],
 },
 {
 role: "Leads",
 description: "Booking intake and social proof, server functions only, no database.",
 groups: [
 {
 label: "Conversion",
 modules: [
 { name: "Booking form", detail: "react-hook-form + Zod → submitForm server fn" },
 { name: "Email", detail: "Nodemailer sends appointment requests to clinic inbox" },
 { name: "Google reviews", detail: "Places API fetch with 6h cache + fallback data" },
 { name: "Meta Pixel", detail: "trackBookingLead + trackContact events" },
 { name: "WhatsApp", detail: "wa.me deep links across header, hero, and floating widget" },
 ],
 },
 ],
 },
 ],
 overview: [
 "ORA Dental Wellness is the public website for a premium dental clinic focused on clear aligners, implants, cosmetic dentistry, and general care.",
 "Built as a content-driven TanStack Start app, React 19, Tailwind CSS 4, and typed content modules for blog posts. No CMS or patient database. Booking emails via Nodemailer, Google reviews via Places API, and deployment on Vercel.",
 ],
 details: [
 { label: "Role", value: "Full Stack Engineer" },
 { label: "Live", value: "oradentalwellness.com" },
 { label: "Stack", value: "TanStack Start · React 19 · Tailwind 4 · Lenis" },
 ],
    challenges: [
 {
 title: "Clinical category, luxury feel",
 body: "Dental sites often feel sterile or generic. ORA needed a quiet-luxury atelier tone, editorial serif headlines, sage/olive palette, and photography-led sections that feel calm, not clinical.",
 fix: "Custom design system with SectionLabel components, FounderPanel split portraits, StatRoll counters, and Lenis smooth scroll, every section reads like a considered brand story.",
 severity: "High",
 impact: "Distinct clinic positioning",
 },
 {
 title: "Ten treatments, one interface",
 body: "Listing every service as flat copy would bury the differentiators. The clinic offers ten distinct disciplines each with six or more sub-services.",
 fix: "Built TreatmentsSection with a radial discipline selector and animated detail panel, one quiet standard across preventive through diagnostics.",
 severity: "Medium",
 impact: "Scannable service discovery",
 },
 {
 title: "Live reviews without breaking offline",
 body: "Social proof depends on real Google reviews, but the Places API can fail or rate-limit, the site must never show an empty reviews section.",
 fix: "getGoogleReviews server function with 6-hour cache, compact photo URLs, and FALLBACK_GOOGLE_REVIEWS so the orbital carousel always renders.",
 severity: "Medium",
 impact: "Reliable 5.0 social proof",
 },
 {
 title: "Local SEO for Rawalpindi",
 body: "Patients search dentist Rawalpindi, Bahria Town, clear aligners, and Islamabad proximity, the site needs structured data and keyword-rich pages without keyword stuffing.",
 fix: "PAGE_SEO config per section, Dentist + LocalBusiness JSON-LD, blog guides with FAQ blocks, sitemap.xml, and llms.txt for AI crawlers.",
 severity: "High",
 impact: "Local discoverability",
 },
    ],
    methodology: [
 { phase: "01 · Brand", title: "Atelier direction", body: "Mapped quiet-luxury positioning, sage palette, editorial type, arched imagery, and WhatsApp-first conversion paths from the clinic brief." },
 { phase: "02 · Foundation", title: "TanStack Start + Tailwind 4", body: "App Router with file-based routes, Radix UI primitives, Lenis scroll, and lazy-loaded section components for performance." },
 { phase: "03 · Homepage", title: "Scroll story", body: "Built splash, hero, stats, atelier, founders, treatments, team, journal, location, booking, reviews, FAQ, and footer, each as isolated components." },
 { phase: "04 · Treatments", title: "Discipline wheel", body: "Interactive ten-category selector with service lists for preventive, restorative, endodontics, gum care, cosmetic, and more." },
 { phase: "05 · Journal", title: "Typed blog system", body: "BlogPost schema with blocks (split, portraits, notes, CTA), index and slug routes with Article JSON-LD." },
 { phase: "06 · Trust", title: "Google reviews orbit", body: "Places API integration, photo compaction, cached server fn, orbital reviewer UI, and 16-slide testimonial carousel." },
 { phase: "07 · Conversion", title: "Booking + email", body: "Zod-validated booking form, submitForm server function, Nodemailer delivery, Meta Pixel tracking, and floating WhatsApp." },
 { phase: "08 · Launch", title: "Vercel deploy", body: "Production at oradentalwellness.com with redirects, OG images, and Bahria Town local SEO metadata." },
 ],
 stackGroups: [
 { label: "Frontend", items: ["TanStack Start", "React", "TypeScript", "Tailwind CSS"] },
 { label: "UI & Motion", items: ["Radix UI", "Lenis", "Embla Carousel", "Lucide"] },
 { label: "Forms & Email", items: ["Zod", "React Hook Form", "Nodemailer"] },
 { label: "Infrastructure", items: ["Vercel", "Google Places API"] },
 ],
 achievements: [
 "Quiet-luxury dental marketing site for a Bahria Town Phase 4 clinic.",
 "Interactive ten-discipline treatment explorer with specialist team carousel.",
 "Live Google reviews with cached Places API and fallback data.",
 "Typed journal/blog system with local SEO guides and Schema.org markup.",
 "Booking pipeline via server function and Nodemailer, live at oradentalwellness.com.",
 ],
 outcomes: [
 { metric: "5.0", label: "Google rating", note: "48+ reviews" },
 { metric: "10", label: "Treatment areas", note: "Discipline wheel" },
 { metric: "5", label: "Specialists", note: "Team carousel" },
 { metric: "Live", label: "oradentalwellness.com", note: "Vercel deploy" },
 ],
 impactGroups: [
 {
 label: "For patients",
 headline: "Calm before the chair",
 points: [
 "Atelier storytelling lowers anxiety, not a generic dental template",
 "Clear aligners, implants, and cosmetic care explained by discipline",
 "Book via form, WhatsApp, or phone, Mon – Sat 12 PM – 9 PM",
 ],
 },
 {
 label: "For the clinic",
 headline: "Premium positioning online",
 points: [
 "Founder profiles for Dr. Ahmed Sultan and Dr. Roha Ejaz",
 "Live Google reviews orbit builds trust on first visit",
 "Journal guides drive local SEO for Rawalpindi and Islamabad patients",
 ],
 },
 {
 label: "For operations",
 headline: "Leads without a CMS",
 points: [
 "Appointment requests emailed instantly via Nodemailer",
 "Blog content lives in typed TypeScript modules",
 "No patient database, marketing site stays lightweight",
 ],
 },
 ],
 embedCover: true,
 gallery: [
 { image: oradentalwellnessImages.hero, caption: "Hero, Every detail, crafted for your smile with clinic interior, WhatsApp CTA, and Bahria Town location marquee." },
 { image: oradentalwellnessImages.atelier, caption: "The Atelier, Dentistry, but slower. Considered, sculptural, calm brand section with arched clinic photography." },
 { image: oradentalwellnessImages.founders, caption: "Founders, Dr. Ahmed Sultan (aligners specialist) and Dr. Roha Ejaz (restorative & cosmetic) split portrait panels." },
 { image: oradentalwellnessImages.treatments, caption: "Treatments, ten-discipline radial selector with gum care detail panel and numbered service list." },
 { image: oradentalwellnessImages.team, caption: "Our Team, five-specialist Embla carousel with Dr. Ahmed, Dr. Roha, Dr. Usman, Dr. Ozair, and Dr. Zain." },
 { image: oradentalwellnessImages.booking, caption: "Book now, appointment form with service select, visit/call/email/hours blocks, and WhatsApp CTA." },
 { image: oradentalwellnessImages.reviews, caption: "Google reviews, 5.0 orbital reviewer display with patient photos and 48+ rating badge." },
 { image: oradentalwellnessImages.faq, caption: "FAQ, Before you arrive accordion covering location, hours, aligners, booking, and Islamabad proximity." },
 ],
 },

 clipperguys: {
  tagline: "Clipping agency marketing site, predictable virality across TikTok, Reels, Shorts & X",
  briefPitch:
   "Clipper Guys is the marketing site for a managed clipping agency: long-form content cut into native short clips and distributed through a creator network on TikTok, Reels, Shorts, and X. The build is a content-driven Next.js site with typed SEO landers, Calendly strategy-call booking, and a clipper join pipeline, no CMS.",
  briefCards: [
   { label: "Stack", value: "Next.js", hint: "React · TypeScript · Tailwind" },
   { label: "Motion", value: "Lenis", hint: "Smooth scroll + reveals" },
   { label: "Booking", value: "Calendly", hint: "Strategy-call embed" },
   { label: "Leads", value: "Formspree", hint: "Join API + honeypot" },
  ],
  briefDomains: [
   {
    title: "Clipping",
    headline: "Long-form → short clips",
    summary:
     "The core service: turn podcasts, keynotes, and brand films into scroll-stopping vertical clips edited for each platform's format and pacing.",
    points: [
     "Editorial cut-downs from source content you already have",
     "Native uploads through a vetted clipper network, not reposts from your account",
     "Campaigns go live within 24–72 hours of kickoff",
    ],
   },
   {
    title: "Distribution",
    headline: "Four feeds, one network",
    summary:
     "Clips ship to TikTok, Instagram Reels, YouTube Shorts, and X from real creator accounts where your audience already scrolls.",
    points: [
     "Anti-bot filtering, junk traffic removed before it counts",
     "Live dashboard for verified view tracking",
     "Custom CPM pricing, pay for verified views, not vanity metrics",
    ],
   },
   {
    title: "Conversion",
    headline: "Awareness or UGC engines",
    summary:
     "Two service tracks on one infrastructure: clipping for reach, or UGC distribution where creators post about your brand on their own accounts.",
    points: [
     "Clipping engine for volume and predictable organic reach",
     "UGC engine for creator-native brand posts and conversion KPIs",
     "Case studies from OKX, Polkadot, Wispr Flow, Stake, and more",
    ],
   },
   {
    title: "Site",
    headline: "Static marketing + leads",
    summary:
     "A content-driven Next.js site with no CMS, marketing copy lives in TypeScript content modules, Calendly handles booking, and a join API captures clipper applications.",
    points: [
     "20+ programmatic SEO pages for vertical keywords",
     "Calendly embed for free strategy calls",
     "Clipper join form via /api/join → Formspree",
    ],
   },
  ],
  architecture: [
   {
    role: "Marketing",
    description: "Public site, homepage story, SEO landers, and conversion CTAs.",
    groups: [
     {
      label: "Homepage",
      modules: [
       { name: "Hero + Reel", detail: "18B+ views headline, live-cut reel showcase, client logo marquee" },
       { name: "Network & Booking", detail: "Platform stats, Calendly strategy-call calendar embed" },
       { name: "Mission & Press", detail: "Brand positioning, Forbes coverage callout" },
       { name: "Problem & Infra", detail: "Pain-point cards, anti-bot + analytics messaging" },
       { name: "Process & Solutions", detail: "5-step workflow, clipping vs UGC service engines" },
       { name: "Results & FAQ", detail: "Client campaign reels, accordion FAQ, testimonials" },
      ],
     },
     {
      label: "SEO & Legal",
      modules: [
       { name: "Vertical landers", detail: "Crypto, SaaS, podcast, casino, music, founder brand + more" },
       { name: "Core pages", detail: "About, services, pricing, how-it-works, case studies, blog" },
       { name: "Legal", detail: "Privacy policy and terms of service" },
      ],
     },
    ],
   },
   {
    role: "Leads",
    description: "Capture strategy calls and clipper applications, no database.",
    groups: [
     {
      label: "Conversion",
      modules: [
       { name: "Calendly booking", detail: "Embedded strategy call scheduler across CTAs" },
       { name: "Clipper join", detail: "Community application form on homepage" },
       { name: "Join API", detail: "POST /api/join, validates, honeypot, forwards to Formspree" },
       { name: "Cookie consent", detail: "GDPR-friendly banner on first visit" },
      ],
     },
    ],
   },
  ],
  overview: [
   "Clipper Guys is a high-conversion marketing site for a clipping agency that helps brands turn long-form content into thousands of native short clips across TikTok, Reels, Shorts, and X.",
   "Built as a static-content Next.js app, no CMS or database. Copy lives in typed content modules, interactions are client-side, and the only server route forwards clipper applications to Formspree.",
  ],
  details: [
   { label: "Role", value: "Full Stack Engineer" },
   { label: "Live", value: "clipperguys.vercel.app" },
   { label: "Stack", value: "Next.js 15 · React 19 · Tailwind 4 · Lenis" },
  ],
    challenges: [
   {
    title: "Long homepage, smooth scroll",
    body: "The homepage has 15+ full-width sections with scroll-triggered reveals, counters, and parallax, janky native scroll kills the premium feel.",
    fix: "Integrated Lenis for buttery smooth scrolling and Intersection Observer hooks for staged section reveals and animated stat counters.",
    severity: "Medium",
    impact: "Premium scroll experience",
   },
   {
    title: "20+ pages without a CMS",
    body: "SEO landing pages for every vertical (crypto, casino, SaaS, podcast…) need consistent layout but unique copy, without a headless CMS overhead.",
    fix: "Typed MarketingPageData content modules in src/content/pages with a shared InnerPage/MarketingPage template, one layout, many routes.",
    severity: "High",
    impact: "Fast SEO page shipping",
   },
   {
    title: "Booking without building scheduling",
    body: "Strategy calls are the primary conversion, building custom scheduling would delay launch.",
    fix: "Embedded Calendly across hero, booking section, FAQ, and footer CTAs, all pointing to the same call type.",
    severity: "Low",
    impact: "Live booking on day one",
   },
    ],
    methodology: [
   { phase: "01 · Reference", title: "Structure & token extraction", body: "Mapped clipperguys.com section order, typography (Inter + Source Serif 4), gold/dark palette, and animation timing from the live reference." },
   { phase: "02 · Foundation", title: "Next.js 15 + Tailwind 4", body: "App Router, TypeScript, Tailwind CSS 4 via PostCSS, and Google Fonts wired through next/font." },
   { phase: "03 · Homepage", title: "15-section scroll story", body: "Built Hero, Reel, Showcase, Network, Booking, Mission, Forbes, Problem, Infra, Process, Solutions, Results, FAQ, Testimonials, ClipperJoin, and CTA, each as isolated components." },
   { phase: "04 · Motion", title: "Lenis + scroll effects", body: "HomeEffects client wrapper with Lenis smooth scroll, reveal-on-scroll, hover cards, and animated view counters." },
   { phase: "05 · SEO pages", title: "20+ landing routes", body: "Vertical-specific pages (crypto-clipping-agency, ai-saas-clipping-agency, etc.) sharing MarketingPage layout and content index." },
   { phase: "06 · Conversion", title: "Booking + join flow", body: "Calendly embed in Booking section, clipper application form, /api/join route with honeypot spam filter forwarding to Formspree." },
   { phase: "07 · Launch", title: "Vercel deploy", body: "Production build on Vercel at clipperguys.vercel.app with middleware, cookie consent, and mobile navigation." },
  ],
  stackGroups: [
   { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
   { label: "UI & Motion", items: ["Lenis", "Radix UI"] },
   { label: "Content", items: ["TypeScript modules", "Calendly", "Formspree"] },
   { label: "Infrastructure", items: ["Vercel", "Next.js API"] },
  ],
  achievements: [
   "Full clipping-agency marketing site with 15+ homepage sections and scroll-driven storytelling.",
   "20+ SEO landing pages from a shared typed content system, no CMS required.",
   "Calendly strategy-call booking embedded across all conversion points.",
   "Clipper join pipeline via serverless API route to Formspree.",
   "Deployed live at clipperguys.vercel.app on Vercel.",
  ],
  outcomes: [
   { metric: "Next.js", label: "App Router", note: "Typed content modules" },
   { metric: "Lenis", label: "Motion", note: "Scroll story + reveals" },
   { metric: "Calendly", label: "Booking", note: "Strategy-call embed" },
   { metric: "Live", label: "Vercel deploy", note: "clipperguys.vercel.app" },
  ],
  impactGroups: [
   {
    label: "For the agency",
    headline: "Sell clipping as infrastructure",
    points: [
     "Homepage communicates clipping vs UGC engines clearly",
     "Client logo marquee, Adobe, OKX, Polkadot, Midjourney, and more",
     "Forbes press coverage section builds category credibility",
    ],
   },
   {
    label: "For prospects",
    headline: "Book a call in one click",
    points: [
     "Calendly embedded directly, no contact-form friction",
     "FAQ answers pricing, launch speed, and view verification",
     "Case study reels with real view counts (Stake 742M+, Marty Supreme 314M+)",
    ],
   },
   {
    label: "For clippers",
    headline: "Join the network",
    points: [
     "Dedicated ClipperJoin section on homepage",
     "Application form with name, email, and social links",
     "Server-side validation and spam honeypot before Formspree forward",
    ],
   },
  ],
  embedCover: true,
  gallery: [
   { image: clipperguysImages.hero, caption: "Hero, predictable virality headline, floating clip cards with view counts, phone mockup, and 18B+ social proof." },
   { image: clipperguysImages.verifiedViews, caption: "Verified views hub, live 18B+ counter with TikTok, Reels, Shorts, and X reach metrics plus anti-bot and dashboard callouts." },
   { image: clipperguysImages.booking, caption: "Calendly booking, embedded Growth Strategy Call scheduler with 30-minute slots across homepage conversion points." },
   { image: clipperguysImages.mission, caption: "Mission bento, Your Content. Everywhere. Now. with campaign creative, 55M+ views badge, and retention metrics." },
   { image: clipperguysImages.problem, caption: "Problem section, three scroll cards on distribution volume, winner replication, and operating rhythm." },
   { image: clipperguysImages.infrastructure, caption: "Infrastructure, every feed natively, quality + scale creator network, and anti-bot analytics positioning." },
   { image: clipperguysImages.process, caption: "How we work, five-step vertical process from content share through edit, distribute, track, and optimise." },
   { image: clipperguysImages.results, caption: "Client results, horizontal reel gallery for Wispr Flow, Polkadot, OKX, Stake, and Marty Supreme with view counts." },
   { image: clipperguysImages.cta, caption: "Closing CTA, Ready to make your brand famous? with OKX campaign creative and follower/view badges." },
  ],
 },

 souvenirhunt: {
 tagline: "Self-guided city clue hunts, Stripe checkout, mobile play engine, admin CMS & QR souvenir confirmation",
 briefPitch:
 "Souvenir Hunt turns real streets into premium self-guided treasure hunts, players buy access via Stripe, solve clue steps on mobile, and earn a physical souvenir confirmed by on-site staff through a QR handoff. Built with TanStack Start, MongoDB, and a full admin Studio for hunt authoring, plus a staff close workflow that marks pickup complete and emails the player.",
 briefCards: [
 { label: "Live hunt", value: "1", hint: "Split, Croatia" },
 { label: "Cities", value: "7", hint: "4 countries" },
 { label: "Players", value: "1–6", hint: "Per purchase" },
 { label: "Price", value: "EUR 25", hint: "Per hunt access" },
 ],
 briefDomains: [
 {
 title: "Discovery",
 headline: "Experience marketing",
 summary:
 "Public marketing surface for city hunts with live and upcoming destinations.",
 points: [
 "Live Split hunt plus seeded multi-country expansion catalog",
 ],
 },
 {
 title: "Commerce",
 headline: "Tokenized access sales",
 summary:
 "Stripe checkout issues private play access with resume by code or email, no player accounts required.",
 points: [
 "Stripe purchase, fulfillment email, and resume without accounts",
 ],
 },
 {
 title: "Play",
 headline: "Mobile play engine",
 summary:
 "Mobile clue engine with progress, hints, answer validation, and souvenir QR handoff.",
 points: [
 "Clue steps with progress persistence and completion QR",
 ],
 },
 {
 title: "Ops",
 headline: "Studio & field close",
 summary:
 "Admin Studio authors hunts; staff confirm souvenir pickup to complete the player session.",
 points: [
 "Hunt CMS plus PIN-protected staff souvenir confirmation",
 ],
 },
 ],
 architecture: [
 {
 role: "Player",
 description: "No account, access via Stripe-issued token.",
 groups: [
 {
 label: "Purchase",
 modules: [
 { name: "Hunt detail", detail: "/hunts/$slug, pricing, duration, player count, buy CTA" },
 { name: "Checkout", detail: "Name + email → Stripe Checkout → success fulfillment" },
 { name: "Resume", detail: "/your-hunt access code or email lookup on hunt page" },
 ],
 },
 {
 label: "Play",
 modules: [
 { name: "Intro", detail: "Guidelines, how Guide, Story, and Clue tabs work" },
 { name: "Steps", detail: "Answer validation, hint reveal with cost, progress strip" },
 { name: "Navigation", detail: "Google Maps links to each step location" },
 { name: "Complete", detail: "QR code (QuickChart) encoding staff close URL + Game ID" },
 { name: "Closed", detail: "Poll until staff confirms, completion state UI" },
 ],
 },
 ],
 },
 {
 role: "Admin",
 description: "Souvenir Hunt Studio, signed cookie session, full hunt CMS.",
 groups: [
 {
 label: "Studio",
 modules: [
 { name: "Login", detail: "Env-based admin credentials + 7-day HMAC session cookie" },
 { name: "Hunt list", detail: "Search, status pills, published/draft badges" },
 { name: "Hunt editor", detail: "Name, slug, country, city, EUR price, status, description" },
 { name: "Step builder", detail: "Add/remove steps, title, location, guide, story, clue, image" },
 { name: "Hints & answers", detail: "Multi-hint editor with cost; acceptedAnswers array" },
 { name: "Publish", detail: "Toggle published; preview link to public hunt page" },
 { name: "CRUD", detail: "Create hunt, save, delete with confirm" },
 ],
 },
 ],
 },
 {
 role: "Staff",
 description: "On-site souvenir pickup, no login, PIN-gated close flow.",
 groups: [
 {
 label: "Close",
 modules: [
 { name: "QR handoff", detail: "Player displays QR → staff opens /staff/close/$token" },
 { name: "Verify", detail: "Player name, hunt name, Game ID shown on staff screen" },
 { name: "PIN confirm", detail: "Staff PIN entry closes hunt_progress.closedAt" },
 { name: "Notify", detail: "Completion email to player; player UI auto-updates via polling" },
 ],
 },
 ],
 },
 ],
 overview: [
 "Souvenir Hunt is a full-stack self-guided city hunt platform, marketing site, Stripe commerce, mobile play engine, admin CMS, and staff souvenir confirmation in one TanStack Start app deployed at souvenirhunt.vercel.app.",
 "Players purchase The Emperor's Secret (Split, Croatia) for EUR 25, receive a private play link, solve 8 clue steps on mobile, and show a completion QR to staff who confirm pickup with a PIN. Admins author hunts, steps, hints, and pricing from Souvenir Hunt Studio backed by MongoDB.",
 ],
 details: [
 { label: "Role", value: "Full Stack Engineer" },
 { label: "Live", value: "souvenirhunt.vercel.app" },
 { label: "Stack", value: "TanStack Start · MongoDB · Stripe · Zod" },
 ],
    challenges: [
 {
 title: "Commerce-to-play handoff without accounts",
 severity: "High",
 impact: "Players need instant access post-payment",
 body: "Hunts sell to tourists who won't create accounts, payment must atomically create an access token, persist order state, and email a play link before the user navigates away from Stripe.",
 fix: "createCheckoutSession writes pending orders doc; fulfillCheckoutSession on success marks paid, generates HUNT-XXXXXXXX token, creates hunt_progress, and sends play-link email via Mailtrap or Resend.",
 },
 {
 title: "Dual Stripe fulfillment paths",
 severity: "Medium",
 impact: "Missed emails if only webhook fires",
 body: "Stripe can confirm payment on the success-page redirect or via webhook, relying on one path risks orders stuck pending or emails never sent.",
 fix: "Success loader calls fulfillCheckoutSession; POST /api/stripe-webhook handles checkout.session.completed as idempotent backup. Email sends from success path; webhook ensures order status even if user closes tab early.",
 },
 {
 title: "QR souvenir confirmation loop",
 severity: "High",
 impact: "Physical handoff must sync to player phone",
 body: "The souvenir is earned in-app but collected in person, staff need a trusted way to mark pickup without player accounts, and the player's completion screen must update live.",
 fix: "Completion QR encodes /staff/close/$token via QuickChart. Staff page shows player + Game ID, PIN-gated closeHuntProgress sets closedAt. Player polls every 3s until closed state renders.",
 },
 {
 title: "Hunt content migrations without breaking progress",
 severity: "Medium",
 impact: "Live players mid-hunt during admin edits",
 body: "The Emperor's Secret seed content evolves, step IDs and copy upgrades must not orphan in-progress hunt_progress documents.",
 fix: "stepsContentVersion on hunts + ensureSeedHunts merge logic; hunt-utils normalizes legacy fields (storyIntro, hint, answers) to current StepDoc shape.",
 },
 {
 title: "Mobile-first play UX on marketing SSR stack",
 severity: "Medium",
 impact: "Play UI must feel native on phones",
 body: "Marketing pages use wide layouts but play happens on narrow mobile viewports in bright sunlight, pinch-zoom on clue images, safe-area insets, and touch targets matter.",
 fix: "Dedicated PlayMobileUi shell, max-width 420px, zoomable image lightbox portal, progress strip, sessionStorage completion cache, and Google Maps deep links per step.",
 },
    ],
    methodology: [
 { phase: "01 · Prototype", title: "Base site in Lovable", body: "Spun up the first marketing and product shell in Lovable to lock direction, layout, and core user flows quickly." },
 { phase: "02 · Rebuild", title: "Local production codebase", body: "Rebuilt the Lovable base locally into a real app stack so features, data, and payments could grow beyond a prototype." },
 { phase: "03 · Marketing", title: "Public site & hunt catalog", body: "Shipped the public experience site and city hunt catalog with live vs coming-soon destinations." },
 { phase: "04 · Commerce", title: "Stripe access purchase", body: "Players buy hunt access, get a private play link by email, and can resume later without creating an account." },
 { phase: "05 · Play", title: "Mobile clue engine", body: "Built the phone-first clue journey with progress, hints, answer checks, and a completion QR for souvenir pickup." },
 { phase: "06 · Studio", title: "Admin hunt CMS", body: "Added an admin studio to create, edit, and publish hunts without touching code." },
 { phase: "07 · Field ops", title: "Staff souvenir close", body: "Staff confirm physical souvenir handoff so the player session completes in sync." },
 { phase: "08 · Launch", title: "Production release", body: "Deployed the full loop, marketing, purchase, play, admin, and staff close, to production." },
 ],
 stackGroups: [
 { label: "Frontend", items: ["TanStack Start", "React", "TypeScript", "Tailwind CSS", "Motion"] },
 { label: "Backend", items: ["TanStack Server Functions", "MongoDB", "Zod", "bcryptjs"] },
 { label: "Payments", items: ["Stripe Checkout", "Webhooks"] },
 { label: "Comms", items: ["Mailtrap", "Resend", "QuickChart QR"] },
 { label: "Infrastructure", items: ["Vercel", "Cloudflare Workers"] },
 ],
 achievements: [
 "End-to-end hunt platform, marketing, Stripe purchase, mobile play, admin CMS, and staff QR confirmation.",
 "The Emperor's Secret, 8-step live hunt in Split with EUR 25 Stripe checkout for 1–6 players.",
 "Admin Studio, full hunt CRUD with step builder, hints, accepted answers, and publish controls.",
 "Staff close flow, QR handoff, PIN confirmation, completion email, and 3s player polling sync.",
 "15 TanStack server functions + Stripe webhook across 3 MongoDB collections (hunts, orders, hunt_progress).",
 "Dual deploy targets, Vercel production and Cloudflare Workers adapter.",
 ],
 outcomes: [
 { metric: "8", label: "Clue steps", note: "Emperor's Secret" },
 { metric: "7", label: "Cities mapped", note: "4 countries" },
 { metric: "3", label: "Mongo collections", note: "hunts · orders · progress" },
 { metric: "Live", label: "souvenirhunt.vercel.app", note: "Vercel deploy" },
 ],
 impactGroups: [
 {
 label: "For explorers",
 headline: "Sightseeing worth remembering",
 points: [
 "Self-guided clue hunt through real Split streets, no tour group required",
 "Guide, Story, and Clue layers make each stop feel narrative, not trivia",
 "Physical souvenir earned at the end, confirmed by staff QR handoff",
 ],
 },
 {
 label: "For operators",
 headline: "Author hunts without code",
 points: [
 "Admin Studio, create cities, set EUR pricing, build multi-step routes",
 "Publish/draft controls and status labels (live, coming soon, in design)",
 "Seed migration keeps Emperor's Secret content upgradable in production",
 ],
 },
 {
 label: "For the business",
 headline: "Commerce + ops in one stack",
 points: [
 "Stripe Checkout with instant play-link email, no player accounts",
 "Staff PIN close loop ties digital completion to physical pickup",
 "Partner contact funnel for launching hunts in new cities",
 ],
 },
 ],
 embedCover: true,
 gallery: [
 { image: souvenirhuntImages.hero, caption: "Homepage, Explore City. Solve Clues. Earn Souvenir. hero with city illustration, #Made by local artists, and Start Hunt CTA." },
 { image: souvenirhuntImages.hunts, caption: "Hunts catalog, The Emperor's Secret featured card for Split, Croatia, 30–45 min, 1–6 players, EUR 25, live now badge." },
 { image: souvenirhuntImages.checkout, caption: "Stripe checkout, name + email form, hunt summary with Diocletian's Palace art, EUR 25 total, and Continue to payment with Stripe secure checkout badge." },
 ],
 },

 blueocean: {
 tagline: "Feature development for Blue Ocean at Lantrotech, full-stack modules across frontend, backend, database & deployment",
    briefPitch:
      "How I contributed in Blue Ocean at Lantrotech: shipping complete new modules end-to-end across frontend, backend, database, and deployment, including AI schedule generation with chunking, PDF SOW extraction with token utilization controls, change-order report generation, and multi-model AI failover.",
    briefCards: [
      { label: "Role", value: "Full stack", hint: "Software Developer I · Lantrotech" },
      { label: "Scope", value: "E2E", hint: "Modules + reports" },
      { label: "AI", value: "Chunking", hint: "Schedules + PDF SOW" },
      { label: "Resilience", value: "Failover", hint: "Backup AI models" },
    ],
    briefDomains: [
      {
        title: "Frontend",
        headline: "React admin surfaces",
        summary:
          "Production UI for new modules: dashboards, data-heavy grids, and multi-step flows.",
        points: [
          "New module screens with performance-minded data grids and workflows",
        ],
      },
      {
        title: "Backend",
        headline: "APIs & real-time services",
        summary:
          "NestJS / FastAPI services and WebSocket updates for the modules I shipped.",
        points: [
          "Service-layer APIs with live Socket.io feedback where needed",
        ],
      },
      {
        title: "AI",
        headline: "Chunked schedules & resilient models",
        summary:
          "AI schedule generation, PDF SOW extraction, and provider failover so jobs keep running when a primary model is down.",
        points: [
          "Prompt design and chunking for AI schedule generation",
          "Batched generation so long multi-phase schedules complete without hallucination",
          "PDF SOW extraction with schema validation and token utilization controls",
          "Backup model routing when primary providers are unavailable or rate-limited",
        ],
      },
      {
        title: "Change Orders",
        headline: "Report generation modules",
        summary:
          "Change-order report pipelines and related construction ops modules that turn project deltas into auditable outputs.",
        points: [
          "Change-order report generation from project and SOW state",
          "Additional full-stack modules shipped across the Blue Ocean surface",
        ],
      },
      {
        title: "Database",
        headline: "PostgreSQL & data layer",
        summary:
          "Schema and query work for new features with leaner list endpoints.",
        points: [
          "Migrations plus query shaping to cut over-fetching",
        ],
      },
      {
        title: "Ops",
        headline: "Deploy & pipelines",
        summary:
          "Docker packaging and release pipelines so new modules ship cleanly.",
        points: [
          "CI/CD and Docker packaging for production releases",
        ],
      },
    ],
 overview: [
 "How I contributed in Blue Ocean at Lantrotech: full-stack delivery of new modules.",
 "Work spanned frontend, backend, database, AI extraction/scheduling, change-order reports, and deployment.",
 ],
 details: [
 { label: "Role", value: "Full Stack · Lantrotech" },
 { label: "Focus", value: "Feature development" },
 { label: "Period", value: "Oct 2025 - Present" },
 { label: "Stack", value: "NestJS · React · Prisma · MySQL" },
 ],
 challenges: [
 {
 title: "Long schedules hallucinated and failed",
 severity: "High",
 impact: "Incomplete or failed AI schedules",
 body: "Generating a full construction schedule in one AI pass caused hallucinations, truncated output, and failed runs. Long multi-phase projects needed more context than a single prompt could reliably hold, so schedules came back incomplete or unusable.",
 fix: "Implemented chunked, batched schedule generation: split the job into phase-sized batches with shared context, stitch results into a complete schedule, and retry failed chunks independently instead of regenerating everything.",
 },
 {
 title: "PDF scope-of-work extraction drifted",
 severity: "High",
 impact: "Wrong SOW line items and schedule inputs",
 body: "AI extraction from PDF scopes of work dropped sections, invented quantities, and misread tables or multi-column layouts. Long SOWs either blew the context window or under-extracted when truncated, so downstream schedule generation started from bad structured data.",
 fix: "Built a layout-aware PDF pipeline: page/section chunking, schema-validated extraction (Zod/JSON Schema) with required SOW fields, confidence scoring and retry on low-confidence chunks, then merge with idempotent keys. Added a token utilization option so operators can choose extraction budget (model tier, max tokens per chunk, overlap, and page batch size) to trade cost vs completeness without silent truncation.",
 },
 {
 title: "Primary AI models became unavailable",
 severity: "High",
 impact: "Schedule and extraction jobs stalled",
 body: "Production AI calls depended on a single provider path. Outages, region blocks, and rate limits made schedule generation, SOW extraction, and related AI modules fail hard with no graceful degradation.",
 fix: "Added a multi-model failover layer: primary + backup providers with health checks, timeout budgets, and automatic switchover. Requests retry on backup models with the same schema contracts so change-order reports, schedules, and extraction keep completing when the primary model is unavailable.",
 },
 ],
 methodology: [],
 stackGroups: [
 { label: "Frontend", items: ["React", "TypeScript", "Redux", "Ant Design", "Chart.js"] },
 { label: "Backend", items: ["NestJS", "Prisma", "MySQL", "JWT", "Socket.io"] },
 { label: "AI", items: ["Google Gemini", "OpenAI"] },
 { label: "Infrastructure", items: ["AWS S3", "Docker", "Sentry"] },
 ],
 achievements: [
 "Feature development on Blue Ocean at Lantrotech, complete new modules end to end.",
 "Built change-order report generation and additional construction ops modules.",
 "Frontend, backend, database, and deployment work on the same features.",
 "Solved long-schedule AI failures with chunked, batched generation.",
 "Hardened PDF SOW extraction with schema validation and token utilization controls.",
 "Added backup AI models so jobs survive primary-provider outages.",
 "Applied performance techniques across queries, caching, and UI render paths.",
 ],
 outcomes: [
 { metric: "E2E", label: "New modules", note: "UI → API → DB → ship" },
 { metric: "Reports", label: "Change orders", note: "Generated from project state" },
 { metric: "Failover", label: "AI models", note: "Primary + backup routing" },
 { metric: "Ongoing", label: "At Lantrotech", note: "Feature development" },
 ],
 gallery: [
 { image: blueoceanImages.login, caption: "Blue Ocean, production admin sign-in (Lantrotech)." },
 { image: blueoceanImages.dashboard, caption: "Blue Ocean, production dashboard overview (Lantrotech)." },
 ],
 },

 empoweredai: {
 tagline: "Flutter accessibility app for the visually impaired, fine-tuned YOLO detection and voice-first AI assist",
 briefPitch:
 "Empowered-AI is a Flutter mobile app that helps visually impaired users understand their surroundings through fine-tuned YOLO object detection, scene description, OCR, facial emotion detection, currency detection, color recognition, item locator, and spoken feedback. Heavy CV/ML runs on a Flask server so the phone stays responsive.",
 briefCards: [
 { label: "Client", value: "Flutter", hint: "Voice-first mobile UI" },
 { label: "Detection", value: "YOLO", hint: "Fine-tuned object model" },
 { label: "Assist", value: "8+", hint: "Detect · OCR · currency · more" },
 { label: "Server", value: "Flask", hint: "Off-device CV / ML" },
 ],
 briefDomains: [
 {
 title: "Vision",
 headline: "Fine-tuned YOLO + scene tools",
 summary:
 "Computer vision that names objects, describes scenes, and reads colors so users get a spoken map of what is in front of them.",
 points: [
 "Dataset analysis and YOLO fine-tuning for object detection",
 "Scene understanding layered on detected objects",
 "Color recognition for clothing, packaging, and everyday cues",
 ],
 },
 {
 title: "Mobile",
 headline: "Flutter voice-first client",
 summary:
 "Flutter app captures frames on voice command and returns audio feedback so the experience stays hands-free.",
 points: [
 "Voice commands to trigger detection and assist flows",
 "Camera frame capture with TTS / audio response",
 "Accessible UI designed for visually impaired users",
 ],
 },
 {
 title: "Assist",
 headline: "OCR, currency, emotion & more",
 summary:
 "Daily independence tools beyond objects: read text, identify banknotes, sense emotion, and find misplaced items.",
 points: [
 "OCR for signs, labels, and documents",
 "Currency detection that announces paper-money denominations",
 "Facial emotion detection for social context",
 "Item locator for keys, wallets, and personal belongings",
 ],
 },
 {
 title: "Server",
 headline: "Flask AI backend",
 summary:
 "Client-server design offloads model inference so the phone stays light while PyTorch / TensorFlow models run on the server.",
 points: [
 "Flask APIs for detection, scene, OCR, currency, and emotion",
 "Training and experiments on Google Colab",
 "Firebase / MongoDB for app data where needed",
 ],
 },
 ],
 overview: [
 "Empowered-AI is an accessibility Flutter app that delivers real-time computer-vision assist for visually impaired users.",
 "Built across vision and app modules, including YOLO object-detection fine-tuning, currency detection, OCR, emotion, and a Flask backend for inference.",
 ],
 details: [
 { label: "Role", value: "Full Stack · Mobile + AI" },
 { label: "Focus", value: "Accessibility CV" },
 { label: "Period", value: "2024 – 2025" },
 { label: "Stack", value: "Flutter · YOLO · Flask" },
 ],
 challenges: [],
 methodology: [
 {
 phase: "01 · Dataset",
 title: "Assistive dataset analysis",
 body: "Collected and reviewed image sets for everyday objects, distances, and lighting that matter for visually impaired users, so training data matched real assistive scenes instead of generic COCO-only classes.",
 },
 {
 phase: "02 · YOLO",
 title: "Fine-tune object detection",
 body: "Fine-tuned a YOLO model for real-time object detection, validated precision/recall on held-out frames, and exported weights the Flask server could load for live inference.",
 },
 {
 phase: "03 · Scene",
 title: "Scene understanding",
 body: "Layered scene description on top of detections so the app could narrate spatial context, not only list isolated object labels.",
 },
 {
 phase: "04 · Color",
 title: "Color recognition",
 body: "Added color detection for clothing coordination, packaging, and visual cues, piped into the same audio response path as objects and scenes.",
 },
 {
 phase: "05 · Design",
 title: "Accessible UI in Figma",
 body: "Designed a simple voice-first Flutter interface with large hit targets, clear states, and flows that work when the user is listening rather than looking.",
 },
 {
 phase: "06 · Speech",
 title: "Text-to-speech feedback",
 body: "Integrated TTS so every vision result, objects, scenes, text, currency, emotion, comes back as clear spoken feedback on the device.",
 },
 {
 phase: "07 · Flutter",
 title: "App shell + camera",
 body: "Built the Flutter client: auth/home, camera capture, voice command routing, and API calls that send frames to the Flask backend and play audio results.",
 },
 {
 phase: "08 · OCR",
 title: "Text recognition",
 body: "Shipped OCR for printed signs, labels, and documents so users can hear text in the environment without a separate reader app.",
 },
 {
 phase: "09 · Currency",
 title: "Currency detection",
 body: "Added banknote recognition that identifies and announces paper-money denominations, supporting safer independent transactions.",
 },
 {
 phase: "10 · Locator",
 title: "Item locator",
 body: "Built a targeted item-finding flow so users can search for personal belongings like keys or wallets using camera frames and spoken guidance.",
 },
 {
 phase: "11 · Emotion",
 title: "Facial emotion detection",
 body: "Integrated facial emotion recognition so social cues become audible context during conversations and interactions.",
 },
 {
 phase: "12 · Server",
 title: "Flask CV / ML APIs",
 body: "Stood up Flask endpoints for object, scene, OCR, currency, color, item locator, and emotion inference, keeping heavy PyTorch / TensorFlow work off the phone.",
 },
 {
 phase: "13 · Harden",
 title: "End-to-end testing",
 body: "Exercised the full voice → capture → server → audio loop across modules, fixed failure modes, and tuned latency so assist stays usable in everyday conditions.",
 },
 ],
 stackGroups: [
 { label: "Mobile", items: ["Flutter", "Dart"] },
 { label: "AI / CV", items: ["YOLO", "PyTorch", "TensorFlow", "Python"] },
 { label: "Backend", items: ["Flask", "Firebase", "MongoDB"] },
 { label: "Tools", items: ["Figma", "Google Colab", "GitHub", "Postman"] },
 ],
 achievements: [
 "Shipped a Flutter accessibility client with voice-first object, scene, OCR, currency, color, item-locator, and emotion assist.",
 "Fine-tuned YOLO for object detection tailored to assistive use cases.",
 "Built Flask server APIs so heavy CV/ML inference stays off-device.",
 "Currency detection announces banknote denominations for independent payments.",
 ],
 outcomes: [
 { metric: "YOLO", label: "Fine-tuned", note: "Object detection" },
 { metric: "8+", label: "Assist modules", note: "Detect · OCR · currency · more" },
 { metric: "Flutter", label: "Mobile client", note: "Voice + camera" },
 { metric: "Flask", label: "AI backend", note: "Off-device inference" },
 ],
 embedCover: false,
 gallery: [
 { image: empoweredaiImages.poster, caption: "Empowered-AI, Sense Beyond Limits, Flutter + YOLO + Flask assist for visually impaired users." },
 ],
 },
};
