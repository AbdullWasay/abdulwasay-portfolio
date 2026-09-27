# Kingswell Estate Agents — Full Project Overview

> Portfolio-ready technical & product documentation for a production estate-agency web platform.

**Project type:** Full-stack web application (client website + CMS admin + AI assistant)  
**Client / brand:** Kingswell Estate Agents — boutique premium agency covering London & Kent  
**Slogan:** *Move Like Royalty, Move Well.*  
**Primary URL pattern:** `https://kingswellestateagents.co.uk`  
**Admin URL:** `/kingswell-admin`

---

## Table of contents

1. [Project summary](#1-project-summary)
2. [Problem & solution](#2-problem--solution)
3. [Tech stack](#3-tech-stack)
4. [System architecture](#4-system-architecture)
5. [Repository structure](#5-repository-structure)
6. [Routing map](#6-routing-map)
7. [Database design](#7-database-design)
8. [Data models / schema](#8-data-models--schema)
9. [Content management flow](#9-content-management-flow)
10. [Admin module](#10-admin-module)
11. [Public website features](#11-public-website-features)
12. [Lead capture & CRM](#12-lead-capture--crm)
13. [AI chatbot (Gemini)](#13-ai-chatbot-gemini)
14. [Image storage](#14-image-storage)
15. [SEO & performance](#15-seo--performance)
16. [Security](#16-security)
17. [Environment variables](#17-environment-variables)
18. [Scripts & tooling](#18-scripts--tooling)
19. [Deployment (Vercel)](#19-deployment-vercel)
20. [Design system](#20-design-system)
21. [My role & highlights (portfolio framing)](#21-my-role--highlights-portfolio-framing)
22. [Future improvements](#22-future-improvements)

---

## 1. Project summary

**Kingswell** is a custom-built digital platform for a UK estate agency. It combines:

- A **premium public marketing website** (property search, service pages, valuations, blog)
- A **secure admin CMS** for non-technical staff to manage listings and content
- A **MongoDB-backed content store** (no headless CMS SaaS required)
- An **AI chatbot** grounded in live property and agency data (Google Gemini)
- **Lead capture** into MongoDB (and optionally email / CRM webhooks)
- **SEO foundations** (metadata, sitemap, robots, Schema.org)

The product positions Kingswell as a **luxury boutique agency** with reach across **London & Kent**, not only a single neighbourhood.

---

## 2. Problem & solution

| Challenge | How the platform addresses it |
|-----------|-------------------------------|
| Agencies rely on Rightmove/Zoopla only | Own branded site with searchable portfolio |
| Content updates need a developer | Self-serve admin panel |
| Fake or generic chatbots invent listings | Gemini prompt is built from live MongoDB data only |
| Leads get lost in email | Enquiries stored in admin + optional email/CRM |
| Inconsistent branding | Design system (green/gold, Cinzel + DM Sans) |

---

## 3. Tech stack

### Core

| Layer | Technology | Version / notes |
|-------|------------|-----------------|
| Framework | **Next.js** (App Router) | ^15.1 |
| UI library | **React** | ^19 |
| Language | **TypeScript** | ^5.7 |
| Styling | **Tailwind CSS** | ^3.4 |
| Fonts | **Cinzel** (display) + **DM Sans** (body) | `next/font/google` |
| Database | **MongoDB Atlas** | `mongodb` ^7.2 |
| Auth | **iron-session** | Encrypted cookie sessions |
| Image CDN | **Cloudinary** | Upload + delivery |
| AI | **Google Gemini** (`@google/generative-ai`) | Default: `gemini-2.5-flash` |
| Icons | Lucide React | |
| Motion | Framer Motion | Selective UI motion |
| Hosting | **Vercel** | Git-based deploys |

### Supporting

- **Resend** (optional) — lead email notifications  
- **CRM webhooks** (Alto / Reapit / Street) — optional lead sync  
- **WhatsApp** deep links — floating CTA  
- Node.js **≥ 18.18** (Vercel recommended **20.x**)

---

## 4. System architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
│  Browser (public site)     │     Browser (admin staff)           │
└──────────────┬─────────────┴──────────────────┬─────────────────┘
               │                                │
               ▼                                ▼
┌──────────────────────────┐      ┌──────────────────────────────┐
│   Next.js App Router     │      │  /kingswell-admin + middleware│
│   (site) pages           │      │  iron-session cookie auth     │
│   + Chatbot / WhatsApp   │      │  CRUD UI                      │
└────────────┬─────────────┘      └──────────────┬───────────────┘
             │                                   │
             ▼                                   ▼
┌──────────────────────────┐      ┌──────────────────────────────┐
│  /api/chat  → Gemini     │      │  /api/admin/*                 │
│  /api/leads → Mongo+email│      │  content, leads, upload, auth │
└────────────┬─────────────┘      └──────────────┬───────────────┘
             │                                   │
             └────────────────┬──────────────────┘
                              ▼
               ┌──────────────────────────────┐
               │     MongoDB Atlas             │
               │  • content (CMS docs)         │
               │  • leads (form submissions)   │
               └──────────────┬───────────────┘
                              │
               ┌──────────────┴───────────────┐
               ▼                              ▼
        Cloudinary                      (optional)
        image hosting                   Resend / CRM
```

### Architectural principles

1. **Single Next.js app** — public site, admin, and APIs share one codebase and deploy.
2. **MongoDB as CMS** — content documents keyed by type; seedable from JSON.
3. **No JSON runtime fallback when DB is configured** — production truth is MongoDB.
4. **`force-dynamic` on key pages** — listings and homepage always read fresh content.
5. **Separation of publish rules** — `sold` / `let-agreed` stay in DB but are hidden from the public site and chatbot.

---

## 5. Repository structure

```
Kingswell/
├── content/                    # Seed JSON (site, properties, blog, etc.)
├── public/
│   ├── logo.png / logo-header.png
│   ├── images/                 # Areas, hero, local fallbacks
│   └── certificates/           # Partner logos (Rightmove, Zoopla, TDS, PRS)
├── scripts/
│   ├── seed-mongodb.ts         # Full content seed
│   ├── sync-branding-content.ts
│   └── sync-testimonials.ts
├── docs/
│   ├── KINGSWELL-SYSTEM-GUIDE.md   # Non-technical client guide
│   ├── ADMIN-PANEL.md
│   ├── VERCEL.md
│   └── PORTFOLIO-PROJECT-OVERVIEW.md  # This file
├── src/
│   ├── app/
│   │   ├── (site)/             # Public pages
│   │   ├── kingswell-admin/    # Admin pages
│   │   ├── api/                # REST-style route handlers
│   │   ├── layout.tsx          # Root layout + fonts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/             # UI (site + admin)
│   ├── lib/                    # Domain logic, DB, SEO, chat, auth
│   └── middleware.ts           # Admin route protection
├── .env.example
├── vercel.json
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 6. Routing map

### Public website (`src/app/(site)/`)

| Route | Purpose |
|-------|---------|
| `/` | Homepage (hero, search, services, properties, areas, reviews, CTAs) |
| `/about` | Agency story + team |
| `/valuation` | Free valuation form |
| `/landlords` | Lettings / landlord services + form |
| `/buyers` | Buyer guide |
| `/tenants` | Tenant guide |
| `/contact` | Contact details + enquiry form + map |
| `/properties/for-sale` | Sale listings + filters |
| `/properties/for-sale/[slug]` | Property detail |
| `/properties/to-rent` | Rental listings + filters |
| `/properties/to-rent/[slug]` | Rental detail |
| `/areas/[slug]` | Long-form area guides |
| `/blog` | Insights index |
| `/blog/[slug]` | Article |
| `/privacy`, `/terms` | Legal |

**Global UI (site layout):** Header, Footer, Partners strip, floating Chatbot, WhatsApp button, Schema.org JSON-LD.

### Admin (`/kingswell-admin`)

| Route | Purpose |
|-------|---------|
| `/kingswell-admin` | Login |
| `/kingswell-admin/dashboard` | Counts + shortcuts |
| `/kingswell-admin/leads` | All form enquiries |
| `/kingswell-admin/site` | Contact, tagline, hours, social |
| `/kingswell-admin/properties` | List / create / edit / delete |
| `/kingswell-admin/blog` | Articles |
| `/kingswell-admin/testimonials` | Google-style reviews |
| `/kingswell-admin/team` | Staff profiles |
| `/kingswell-admin/areas` | Area guide content |
| `/kingswell-admin/why-choose` | Homepage USP cards |

Admin pages are `noindex`.

### API routes

| Method | Endpoint | Auth | Role |
|--------|----------|------|------|
| `POST` | `/api/chat` | Public | Gemini chatbot |
| `POST` | `/api/leads` | Public | Lead capture |
| `POST` | `/api/admin/auth/login` | Public | Session create |
| `POST` | `/api/admin/auth/logout` | Session | Session destroy |
| `GET` / `PUT` | `/api/admin/content/[key]` | Admin | CMS read/write |
| `GET` / `DELETE` | `/api/admin/leads` | Admin | Enquiries |
| `POST` | `/api/admin/upload` | Admin | Image upload |

---

## 7. Database design

### Platform

- **MongoDB Atlas** (connection string via `MONGODB_URI`)
- Database name typically **`kingswell`** (from URI path)
- Driver: official `mongodb` Node SDK

### Collections

| Collection | Constant | Purpose |
|------------|----------|---------|
| `content` | `CONTENT_COLLECTION` | All CMS documents |
| `leads` | `LEADS_COLLECTION` | Form submissions |

### Content document pattern

Every CMS entity is stored as a **keyed document**:

```ts
{
  key: "properties" | "site" | "blog" | ...,  // ContentKey
  data: T,                                     // typed payload
  updatedAt: Date
}
```

**Content keys:**

| Key | `data` shape |
|-----|----------------|
| `site` | `SiteConfig` (single object) |
| `properties` | `Property[]` |
| `testimonials` | `Testimonial[]` |
| `team` | `TeamMember[]` |
| `areas` | `AreaGuide[]` |
| `coverage-areas` | `CoverageAreasContent` |
| `why-choose` | `WhyChooseItem[]` |
| `blog` | `BlogPost[]` |

Writes use `upsert`; reads throw if a key is missing (seed required).  
Cache invalidation: Next.js `revalidateTag("kingswell-content")` + path revalidation.

### Leads documents

Inserted as individual documents in `leads`, sorted by `receivedAt` descending in the admin UI.

---

## 8. Data models / schema

### Property

```ts
type PropertyType = "sale" | "let";

interface Property {
  id: string;
  slug: string;
  type: PropertyType;
  title: string;
  address: string;
  area: string;
  price: number;
  priceLabel: string;          // e.g. "£400,000" or "£1,200 pcm"
  bedrooms: number;
  bathrooms: number;
  receptionRooms: number;
  description: string;
  features: string[];
  images: string[];            // Cloudinary (or local) URLs
  floorplan?: string;
  epcRating?: string;
  epcImage?: string;
  lat: number;
  lng: number;
  featured?: boolean;
  status: "available" | "under-offer" | "let-agreed" | "sold";
}
```

**Publishing rule:** Public site + chatbot only include `available` and `under-offer`.

### Testimonial

```ts
interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;                // ISO date
  source?: "google";
  isNew?: boolean;
}
```

### Team member

```ts
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
```

### Area guide

```ts
interface AreaGuide {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  overview: string;
  schools: string[];
  transport: string[];
  lifestyle: string[];
  marketInsights: string;
  amenities: string[];
}
```

### Lead submission

```ts
type LeadFormType = "valuation" | "viewing" | "enquiry" | "landlord";

interface LeadSubmission {
  id: string;
  formType: LeadFormType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  address?: string;
  propertyType?: string;
  intent?: string;
  service?: string;
  propertyTitle?: string;
  receivedAt: string;
  source: string;              // default "kingswell-website"
}
```

### Site config (summary)

Agency name, slogan, tagline, phone, email, WhatsApp, registered address, opening hours, social links, optional **PRS membership** block (legal name, membership number, dates, certificate path, scheme URL).

### Blog post

`slug`, `title`, `excerpt`, `publishedAt`, `author`, `image`, `body`.

---

## 9. Content management flow

```
content/*.json  ──npm run seed──►  MongoDB content collection
                                         │
                    Admin UI ──PUT /api/admin/content/[key]──┤
                                         │
                                         ▼
                              Public pages (async getSite,
                              getProperties, …)
                                         │
                                         ▼
                              Chatbot system prompt
                              (published properties only)
```

- **Seed** replaces all content documents from JSON (destructive full reset).
- **Partial sync scripts** upsert branding or testimonials without wiping everything.
- Env overrides can adjust public phone/email/WhatsApp without editing CMS.

---

## 10. Admin module

### Authentication

1. Staff open `/kingswell-admin` and submit email + password.
2. Credentials compared to `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
3. **iron-session** sets an encrypted HTTP-only cookie (`kingswell_admin_session`).
4. Session TTL: **8 hours**.
5. **Middleware** guards `/kingswell-admin/*` and `/api/admin/*` (login API exempt).
6. Unauthenticated users are redirected / receive `401`.
7. Admin layout sets `robots: noindex`.

### Capabilities

| Module | Staff can |
|--------|-----------|
| Dashboard | See entity counts, jump to sections |
| Form Enquiries | View / filter / delete all website form responses |
| Site Settings | Brand name, tagline, contact, hours, social |
| Properties | Full CRUD, photo uploads, status, featured flag |
| Blog | Create / edit / remove articles |
| Testimonials | Manage Google-style reviews (carousel on homepage) |
| Team | Photos, roles, bios |
| Area Guides | SEO-friendly area content |
| Why Choose | Homepage selling points |

### Uploads

- Endpoint: `POST /api/admin/upload`
- Allowed: JPEG, PNG, WebP, GIF · max **5MB**
- Prefer **Cloudinary** (`kingswell/{folder}/…`); else write under `public/images/`
- Middleware body limit raised to **15MB** for larger payloads

---

## 11. Public website features

### Homepage journey

1. Full-bleed UK residential hero + primary CTAs (valuation / call)
2. Property search bar (buy/rent, location, price, bedrooms)
3. Quick links (for sale / to rent / areas)
4. “What we do” service cards
5. London & Kent coverage preview
6. Latest published properties
7. Why Choose Kingswell
8. Areas We Cover (image cards)
9. Google reviews carousel (fixed-height cards, read-more, loop arrows)
10. Final valuation CTA
11. Industry partners strip (Rightmove, Zoopla, TDS, Property Redress)

### Listings

- Filterable sale and rent indexes
- Detail pages: gallery, features, map coordinates, enquiry/viewing form
- Mortgage calculator (where applicable)
- Similar properties

### Trust & compliance

- Partner logos section
- PRS membership data available in site config / certificates assets
- Privacy & Terms pages

### Engagement

- Floating **WhatsApp** button
- Floating **AI chatbot**
- Multiple lead forms (valuation, contact, landlord, property viewing)

---

## 12. Lead capture & CRM

### Flow

1. User submits `LeadForm` (`valuation` | `viewing` | `enquiry` | `landlord`).
2. `POST /api/leads` validates type and calls `saveLead()` → MongoDB `leads`.
3. Optional **Resend** email to `LEADS_EMAIL`.
4. Optional **CRM webhook** (`CRM_WEBHOOK_URL` + provider header).
5. Admin sees every submission under **Form Enquiries**.

### Why this matters

Agency staff get a **single inbox inside the CMS**, not only email, with filter-by-type and delete-when-handled.

---

## 13. AI chatbot (Gemini)

### UX

- Floating chat widget (bottom-right), portal-rendered above WhatsApp
- Welcome message; conversation sent as message history to `/api/chat`

### Backend

| Aspect | Detail |
|--------|--------|
| Model | `GEMINI_MODEL` or default **`gemini-2.5-flash`** |
| Auth | `GEMINI_API_KEY` |
| Prompt | Built dynamically via `buildChatSystemPrompt()` |
| Data sources | Site config, coverage areas, **published** properties |
| Guardrails | Must not invent listings; redirect to valuation/contact/WhatsApp |
| Limits | History capped (~20 messages); Gemini role mapping (`user` / `model`) |
| Errors | Friendly handling for missing key, quota (429), bad model (404) |

### Design insight

The chatbot is a **RAG-lite** pattern: instead of vector search, the system prompt is refreshed from MongoDB on each request so answers stay aligned with live inventory.

---

## 14. Image storage

| Environment | Behaviour |
|-------------|-----------|
| Cloudinary configured | Uploads to cloud; URLs stored in MongoDB |
| Not configured | Files saved under `public/images/{folder}/` |
| Next.js `images` | Allows `res.cloudinary.com`, Unsplash, Google user content |

**Portfolio note:** Image *URLs* live in MongoDB; binary assets live on CDN/disk. If the CDN account is disabled, listings still exist but images fail with HTTP 401 — a real-world ops lesson from this project.

---

## 15. SEO & performance

### SEO

- Shared `createMetadata()` — titles, descriptions, keywords, Open Graph, Twitter cards, canonical URLs
- JSON-LD: **RealEstateAgent**, **WebSite** (+ SearchAction), property schemas on detail pages
- Dynamic **sitemap.xml** (static pages + properties + areas + blog)
- **robots.txt** — allow public site; disallow admin + API
- Local SEO signals: London & Kent areas, registered office address in schema

### Performance / rendering

- App Router with selective **`force-dynamic`** for content freshness
- Next.js Image optimisation
- Fonts via `next/font` (Cinzel + DM Sans, `display: swap`)
- `prefers-reduced-motion` respected in CSS

---

## 16. Security

| Control | Implementation |
|---------|----------------|
| Admin auth | Env-based credentials + encrypted iron-session cookie |
| Route protection | Middleware on admin pages + admin APIs |
| Upload limits | Type whitelist + 5MB size cap |
| Secrets | `.env.local` / Vercel env (never committed) |
| Admin SEO | `noindex` |
| Chatbot | No write access; read-only prompt context |
| Public APIs | Lead + chat only; no content mutation without session |

---

## 17. Environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Primary database |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` | Admin login |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL |
| `NEXT_PUBLIC_PHONE` / `EMAIL` / `WHATSAPP` | Contact overrides |
| `LEADS_EMAIL` / `RESEND_API_KEY` | Lead emails |
| `CRM_PROVIDER` / `CRM_API_KEY` / `CRM_WEBHOOK_URL` | CRM sync |
| `NEXT_PUBLIC_CLOUDINARY_*` / `CLOUDINARY_API_*` | Image uploads |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | Chatbot |
| Optional Google Maps / reviews / Instagram | Enhancements |

See `.env.example` for the full template.

---

## 18. Scripts & tooling

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` / `start` | Production build & serve |
| `npm run seed` | Wipe + seed MongoDB from `content/*.json` |
| `npm run sync:branding` | Upsert site / why-choose / coverage-areas |
| `npm run sync:testimonials` | Upsert Google reviews only |
| `npm run lint` | ESLint |

---

## 19. Deployment (Vercel)

1. Connect GitHub repo to Vercel  
2. Build: `npm run build` (configured in `vercel.json`)  
3. Set all production env vars (especially `MONGODB_URI`, admin secrets, Cloudinary, Gemini, `NEXT_PUBLIC_SITE_URL`)  
4. Run `npm run seed` once against production MongoDB  
5. Attach custom domain + SSL  

**Hosting model:** Serverless / edge-friendly Next.js on Vercel with Atlas as the stateful layer.

---

## 20. Design system

| Token | Value / usage |
|-------|----------------|
| Primary green | `#05261e` — header, footer, dark bands |
| Gold accent | `#c5a059` — CTAs, dividers, highlights |
| Display type | Cinzel — headings, brand moments |
| Body type | DM Sans — UI copy |
| Buttons | Primary gold, outline, white, equal-height CTA pairs |
| Layout | Full-bleed heroes, section padding scale, mobile-first |

Design goals: **premium UK residential** positioning (not generic international villa stock), clear conversion hierarchy, polished mobile spacing and tap targets.

---

## 21. My role & highlights (portfolio framing)

Use this section on your personal site as talking points:

### What I built

- End-to-end **Next.js 15** estate-agency platform with **App Router** and TypeScript  
- Custom **MongoDB CMS** (content + leads) without a third-party CMS  
- Full **admin panel** with auth middleware, CRUD, and media uploads  
- **Lead pipeline** from website forms → database (+ email/CRM hooks)  
- **Gemini-powered chatbot** grounded in live listings and agency facts  
- SEO foundations: metadata, Schema.org, sitemap, robots  
- Brand-led UI for a London/Kent luxury agency  

### Engineering themes

- Clear separation of **public**, **admin**, and **API** surfaces  
- **Publish rules** (status-based visibility) shared by web + AI  
- Seed/sync scripts for content operations  
- Production deployment on **Vercel + MongoDB Atlas + Cloudinary**  

### Outcomes (qualitative)

- Non-technical staff can manage listings without code  
- Enquiries are visible in-panel, not only in email  
- Chat answers stay accurate to current stock  
- Site is launch-ready for SEO and local discovery  

---

## 22. Future improvements

| Area | Idea |
|------|------|
| Media | Migrate image hosting to **Vercel Blob** (native on Vercel) or harden CDN ops |
| Auth | Hash admin passwords (bcrypt already in deps but unused) |
| Feeds | Wire Rightmove / Zoopla property feed env vars |
| Chat | Optional vector search if listing volume grows |
| Analytics | Conversion tracking on valuation CTA |
| Admin | Coverage-areas editor UI (currently JSON + sync script) |
| i18n | Not required for current UK market |

---

## Quick facts card (for portfolio grid)

| Field | Value |
|-------|--------|
| **Name** | Kingswell Estate Agents Platform |
| **Stack** | Next.js 15, React 19, TypeScript, Tailwind, MongoDB, Gemini, Cloudinary, Vercel |
| **Type** | Full-stack CMS + marketing site + AI assistant |
| **Auth** | iron-session admin |
| **DB** | MongoDB (`content`, `leads`) |
| **AI** | Google Gemini 2.5 Flash (context-grounded) |
| **Domain** | Real-estate / PropTech |

---

*Document generated for portfolio use — Kingswell Estate Agents codebase.*  
*Related non-technical guide: [`docs/KINGSWELL-SYSTEM-GUIDE.md`](./KINGSWELL-SYSTEM-GUIDE.md)*
