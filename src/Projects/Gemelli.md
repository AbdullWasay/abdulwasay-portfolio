# Gemelli Marketplace — Complete Technical Documentation

**Production URL:** [https://gemelli.store](https://gemelli.store)  
**Type:** Full-stack multi-vendor e-commerce marketplace  
**Market:** Republic of Moldova (MDL currency, trilingual EN/RO/RU)  
**Architecture:** Monolithic Next.js application with serverless API routes, PostgreSQL database, and third-party payment/logistics integrations

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Database & Data Model](#4-database--data-model)
5. [Authentication & Security](#5-authentication--security)
6. [Payment Systems](#6-payment-systems)
7. [Shipping & Logistics](#7-shipping--logistics)
8. [AI Features](#8-ai-features)
9. [Subscription & Monetization](#9-subscription--monetization)
10. [Advertising Platform](#10-advertising-platform)
11. [Seller Module](#11-seller-module)
12. [Buyer / Customer Module](#12-buyer--customer-module)
13. [Admin Platform](#13-admin-platform)
14. [CMS & Internationalization](#14-cms--internationalization)
15. [Seller REST API v1](#15-seller-rest-api-v1)
16. [Affiliate Program](#16-affiliate-program)
17. [Support & Notifications](#17-support--notifications)
18. [Background Jobs & Cron](#18-background-jobs--cron)
19. [External API Integrations](#19-external-api-integrations)
20. [Frontend Architecture](#20-frontend-architecture)
21. [Testing & Quality](#21-testing--quality)
22. [Deployment & Environment](#22-deployment--environment)
23. [Key Technical Decisions](#23-key-technical-decisions)

---

## 1. Executive Summary

**Gemelli Marketplace** is a production-grade, multi-vendor e-commerce platform built for the Moldovan market. It connects independent local and international sellers with buyers through a unified storefront, while providing sellers with AI-powered tooling, subscription tiers, advertising, logistics integrations, and a REST API for ERP/WMS sync.

### Core capabilities

| Domain | Highlights |
|--------|------------|
| **Commerce** | Multi-seller cart, inventory, coupons, wishlist, reviews, returns |
| **Payments** | Paynet (3D Secure card), Cash on Delivery, Gemelli Balance wallet |
| **Logistics** | Nova Post + FAN Courier with smart routing and AWB webhooks |
| **AI** | Google Gemini for SEO, moderation, KYC, support chat, CMS translation |
| **Monetization** | 5-tier seller subscriptions, CPC advertising, commission + T+14 payouts |
| **Integrations** | Seller API v1, webhooks, Meta/Google/TikTok marketing APIs |
| **Localization** | Full trilingual UI and content (English, Romanian, Russian) |

### User roles

- **USER (Buyer)** — Browse, checkout, orders, wallet, affiliate earnings
- **SELLER** — Product catalog, fulfillment, ads, subscriptions, API keys
- **ADMIN** — Moderation, financials, CMS, platform settings, KYC approval

---

## 2. Technology Stack

### Core framework

| Layer | Technology | Version / Notes |
|-------|------------|-----------------|
| **Runtime** | Node.js | Server-side JavaScript runtime |
| **Framework** | Next.js (App Router) | 15.1.x — SSR, SSG, API Routes, middleware |
| **Language** | TypeScript | 5.8.x — strict typing across frontend and backend |
| **UI Library** | React | 18.3.x |
| **Styling** | Tailwind CSS | 3.4.x + custom design tokens |
| **Component libraries** | Ant Design, Radix UI, Lucide React | Admin tables/forms + accessible primitives |
| **State management** | Redux Toolkit + RTK Query | 2.5.x — cached API layer with tag invalidation |
| **Persistence** | redux-persist | Auth/session hydration |
| **Forms** | React Hook Form + Zod | Validation schemas |
| **Charts** | Recharts | Dashboard analytics |
| **Drag & drop** | @dnd-kit | CMS reordering, banner management |
| **Rich text** | react-quill-new | CMS content editing |
| **3D** | Three.js | Product 3D model viewer |
| **PDF/Export** | jsPDF, ExcelJS, html2canvas | Invoices, payout exports |
| **Testing** | Vitest | Unit/integration tests for payments, wallet, shipping |

### Backend & data

| Layer | Technology | Notes |
|-------|------------|-------|
| **Database** | PostgreSQL (Neon) | Serverless Postgres with connection pooling |
| **ORM** | Prisma | 6.16.x — schema migrations, type-safe queries |
| **Auth tokens** | jsonwebtoken (JWT) | Bearer token API authentication |
| **OAuth** | NextAuth.js | Google, Facebook, Apple providers |
| **2FA** | speakeasy (TOTP) + Mailtrap OTP | Email or authenticator app |
| **Password hashing** | bcryptjs | Secure credential storage |
| **File storage** | AWS S3 (@aws-sdk/client-s3) | Product images, KYC documents |
| **Email** | Mailtrap API | Transactional email + 2FA codes |
| **AI** | @google/generative-ai (Gemini) | Content, moderation, translation |
| **Background removal** | Remove.bg API | Product image studio tool |
| **Payments** | Paynet (Setecom + Merchant API) | Primary production gateway (Moldova) |
| **Legacy payments** | Stripe (optional/disabled) | Not required for production build |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting, serverless functions, cron triggers |
| **Neon PostgreSQL** | Managed database with branch/pool support |
| **AWS S3** | Object storage (eu-north-1) |
| **Mailtrap** | Email delivery |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser / Mobile Web)                   │
│  Next.js App Router · React · Redux · Ant Design · Tailwind             │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Vercel Serverless)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────────┐  │
│  │ App Pages   │  │ API Routes   │  │ Middleware / Auth Guards      │  │
│  │ (SSR/SSG)   │  │ /api/*       │  │ JWT verify · Role checks      │  │
│  └─────────────┘  └──────────────┘  └─────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Domain Services (src/lib/*)                                      │  │
│  │ paynet · wallet · shipping · ai · moderation · advertising · …  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└───────────┬──────────────┬──────────────┬──────────────┬───────────────┘
            │              │              │              │
            ▼              ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐
     │ Neon     │   │ AWS S3   │   │ Paynet   │   │ Gemini AI    │
     │ Postgres │   │ Storage  │   │ Gateway  │   │ Remove.bg    │
     └──────────┘   └──────────┘   └──────────┘   └──────────────┘
            │              │              │              │
            ▼              ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐
     │ Mailtrap │   │ Nova Post│   │ FAN      │   │ Meta OAuth   │
     │ Email    │   │ Courier  │   │ Courier  │   │ (Social Sync)│
     └──────────┘   └──────────┘   └──────────┘   └──────────────┘
```

### Request flow (checkout example)

1. Buyer adds items from multiple sellers to cart (`/api/cart`)
2. Checkout page requests shipping quote (`/api/shipping/quote`) — smart routing compares Nova Post vs FAN Courier
3. Optional coupon validation (`/api/coupons/validate`) and Gemelli Balance split
4. Paynet payment initiated (`/api/paynet/create-payment`) — order created in `PENDING` state
5. Buyer redirected to Paynet Setecom (3D Secure)
6. Paynet callback (`/api/paynet/callback`) + return URL (`/api/paynet/return`) confirm payment
7. Inventory decremented, seller notifications sent, cart cleared
8. Buyer lands on `/order-success?payment_method=paynet&order_id=…`

### Code organization

```
src/
├── app/                    # Next.js App Router
│   ├── (common)/           # Public storefront pages
│   ├── (dashboard)/        # Role-based dashboard (admin/seller/buyer)
│   ├── (auth)/             # Login, signup flows
│   ├── api/                # 175+ REST API route handlers
│   └── layout.tsx          # Root layout, providers, metadata
├── components/             # React UI components
├── lib/                    # Business logic (payments, AI, shipping, etc.)
├── redux/                  # RTK Query APIs and slices
├── constants/              # Shared constants
├── types/                  # TypeScript definitions
└── nextAuth/               # NextAuth configuration
prisma/
└── schema.prisma           # Database schema (40+ models)
docs/                       # Internal documentation
scripts/                    # Seed, migration, verification scripts
```

---

## 4. Database & Data Model

**ORM:** Prisma · **Database:** PostgreSQL · **Schema file:** `prisma/schema.prisma`

### Entity relationship overview

```
User ──┬── Product ── ProductImage
       ├── Cart ── CartItem
       ├── Order ── OrderItem
       ├── Store
       ├── Subscription ── SubscriptionPlan
       ├── Campaign (Advertising)
       ├── WalletTransaction
       ├── SellerApiKey / SellerWebhookEndpoint
       └── AffiliateClick / AffiliateCommission

StaticPage · Faq · HomeBanner · Translation  (CMS/i18n)
PlatformSetting · Coupon · Notification · Ticket
```

### Major models (40+ total)

#### Identity & accounts
| Model | Purpose |
|-------|---------|
| `User` | Central identity; roles (`ADMIN`, `SELLER`, `USER`); KYC status; 2FA; IBAN; commission rate; Gemelli Balance + Ad Balance |
| `Store` | Seller storefront profile |
| `Address` | Shipping/billing addresses |

#### Catalog
| Model | Purpose |
|-------|---------|
| `Product` | Full product with pricing, inventory, SEO, moderation status, trilingual fields, 3D model URL |
| `ProductImage` | S3-hosted images with primary flag |
| `Category` | Trilingual category taxonomy |
| `Review` | Customer product reviews |
| `BloggerReview` | Influencer video reviews (plan-gated) |
| `WishlistItem` | Buyer favorites |

#### Orders & fulfillment
| Model | Purpose |
|-------|---------|
| `Cart` / `CartItem` | One cart per user; unique by product + size + color |
| `Order` | Multi-seller order with Paynet fields, shipping allocation, affiliate, coupon, balance split |
| `OrderItem` | Line items with per-seller fulfillment status |
| `ReturnRequest` | Return lifecycle with AWB tracking |
| `OrderNotification` | Seller notification tracking |

#### Payments & finance
| Model | Purpose |
|-------|---------|
| `WalletTransaction` | Gemelli Balance ledger (refunds, checkout debits, affiliate credits) |
| `PaymentRefund` | Refund pipeline to balance or original payment |
| `SellerPayout` / `WeeklyPayoutRun` | T+14 seller settlement |
| `SellerIbanChange` | IBAN change audit trail |
| `SubscriptionPayment` | Paynet-backed subscription charges |
| `AdWalletPayment` | Ad balance top-ups via Paynet |

#### Subscriptions
| Model | Purpose |
|-------|---------|
| `SubscriptionPlan` | Tier definitions synced from code catalog |
| `Subscription` | Active seller subscription with billing cycle |

#### Advertising
| Model | Purpose |
|-------|---------|
| `Campaign` | Seller ad campaigns (CPC, budgets, placements) |
| `AdPlacementSlot` | Configurable homepage/category ad slots |
| `AdAnalytics` | Impressions, clicks, conversions |
| `AdAttribution` | Order-level ad revenue attribution |
| `AdTransaction` | Ad wallet ledger |

#### Seller growth & API
| Model | Purpose |
|-------|---------|
| `SellerIntegration` | Marketing API config (Meta/Google/TikTok), inventory sync URL |
| `SellerApiKey` | REST API v1 keys (SHA-256 hashed) |
| `SellerWebhookEndpoint` / `SellerWebhookDelivery` | Outbound webhooks with HMAC signing |
| `SellerRewardCredit` / `SellerMilestoneGrant` / `SellerAchievement` | Gamified milestones |
| `SellerProductBoost` / `SellerFeaturedProduct` | Reward-based visibility boosts |

#### Platform & CMS
| Model | Purpose |
|-------|---------|
| `StaticPage` | CMS legal/info pages (trilingual) |
| `Faq` | FAQ entries with categories |
| `HomeBanner` | Homepage carousel banners |
| `Translation` | Key/value i18n strings (en/ro/ru) |
| `PlatformSetting` | Runtime JSON config (API keys, ad pricing, checkout toggles) |
| `Coupon` | Discount codes |
| `Broadcast` | Admin email broadcasts |
| `Notification` / `NotificationSettings` / `NotificationTemplate` | Multi-channel notifications |
| `Ticket` / `TicketMessage` | Support tickets (human + AI-escalated) |
| `AiTool` / `AiUsage` / `AiConfig` | AI tool registry and usage metering |
| `FraudAlert` | Anti-fraud alerts for high-tier sellers |
| `AffiliateClick` / `AffiliateCommission` | Referral tracking and payouts |

---

## 5. Authentication & Security

### Authentication methods

#### 1. Email + password (JWT)
- **Signup:** `/api/auth/signup` — separate buyer and seller registration flows
- **Login:** `/api/auth/login` — bcrypt password verification → JWT access token
- **Token:** Bearer JWT in `Authorization` header; verified via `src/lib/auth-utils.ts`
- **Secret:** `JWT_SECRET` environment variable
- **Client storage:** Redux auth slice with redux-persist

#### 2. Two-Factor Authentication (2FA)
- **Methods:** `EMAIL` (6-digit OTP via Mailtrap) or `AUTHENTICATOR` (TOTP via speakeasy)
- **Setup:** `/api/user/2fa/setup`
- **Verify at login:** `/api/auth/verify-2fa`, `/api/auth/resend-2fa`
- **Disable:** `/api/user/2fa/disable`
- **UI:** Dashboard → Settings → Security & Privacy

#### 3. OAuth (NextAuth.js)
- **Providers:** Google, Facebook, Apple
- **Route:** `/api/auth/[...nextauth]`
- **Config:** `src/nextAuth/authOptions.ts`
- **Additional:** Direct Google route at `/api/auth/google`

### Authorization model

| Role | Access |
|------|--------|
| `USER` | Storefront, buyer dashboard, wallet, affiliate |
| `SELLER` | Seller dashboard (gated until KYC approved), products, orders, ads |
| `ADMIN` | Full platform admin, moderation, financials, CMS |

**Seller access gates:**
- `UserStatus`: `PENDING_APPROVAL` → locked dashboard until admin approves
- `KYCStatus`: `NOT_SUBMITTED` / `PENDING` / `VERIFIED` / `REJECTED`
- Enforced by `src/lib/seller/sellerAccess.ts` and `DashboardRoleGuard.tsx`

### Security features
- bcrypt password hashing
- JWT expiration and 401 auto-logout (RTK Query base API interceptor)
- API key hashing (SHA-256) for Seller API v1
- HMAC-SHA256 webhook signature verification
- Paynet callback secret validation
- Cron endpoints secured with `CRON_SECRET` Bearer token
- IBAN change audit trail with security checks
- Account suspension and self-deactivation lifecycle

---

## 6. Payment Systems

### 6.1 Paynet (Primary — Production)

**Provider:** Paynet Moldova · **Currency:** MDL · **Protocol:** Setecom form POST + Merchant REST API

| Component | Path / File |
|-----------|-------------|
| Configuration | `src/lib/paynet/config.ts` |
| Setecom form builder | `src/lib/paynet/client.ts` |
| Create payment | `POST /api/paynet/create-payment` |
| IPN callback | `GET/POST /api/paynet/callback` |
| Return redirect | `GET /api/paynet/return` |
| Payment completion | `src/lib/paynet/completePayment.ts` |
| Fee calculation | `src/lib/paynet/fees.ts` |
| External ID allocation | `src/lib/paynet/allocateExternalId.ts` |

**Key production requirements:**
- `PAYNET_MODE=live`
- `PAYNET_SALE_AREA_CODE` — routes to gemelli.store merchant (not oplata.md default)
- Live API: `https://ecom-api.paynet.md`
- Setecom URL: `https://paynet.md/Acquiring/setecom`
- Callback URL: `https://gemelli.store/api/paynet/callback`

**Checkout flow:**
1. Order created with `paynetExternalId` (invoice number)
2. Setecom HTML form auto-submitted to Paynet
3. Buyer completes 3D Secure on Paynet
4. Callback + return URL poll payment status
5. Order marked `PAID`, inventory decremented, notifications sent

**Also used for:**
- Subscription upgrades/renewals (`completeSubscriptionPayment.ts`)
- Ad wallet top-ups (`completeAdWalletPayment.ts`)

### 6.2 Gemelli Balance (Virtual Wallet)

**Non-withdrawable store credit** valid for 12 months.

| Feature | Implementation |
|---------|----------------|
| Ledger | `WalletTransaction` model + `src/lib/wallet/gemelliBalance.ts` |
| Checkout split | `src/lib/wallet/checkoutBalance.ts` — partial balance + card/COD |
| Instant refund | `src/lib/wallet/instantRefund.ts` — credit on return AWB pickup |
| Original payment refund | `src/lib/wallet/originalPaymentRefund.ts` — on warehouse receipt |
| Return flow | `src/lib/wallet/returnRefundFlow.ts` |
| Buyer UI | `/gemelli-balance`, `/dashboard/wallet` |

**Transaction types:** `REFUND_CREDIT`, `CHECKOUT_DEBIT`, `PRICE_ADJUSTMENT`, `ADMIN_CREDIT`, `AFFILIATE_COMMISSION`, `AFFILIATE_CLAWBACK`

### 6.3 Cash on Delivery (COD)
- Selected at checkout as delivery + payment method
- Courier collects payment on delivery (Nova Post 2.5% COD fee, FAN Courier 15 MDL fixed)
- Order placed immediately; `paymentStatus` updated on delivery confirmation

### 6.4 Card BIN Routing
- `src/lib/payments/binRouting.ts` — routes by card BIN prefix to Paynet, maib, or Victoriabank display labels
- Stored on order as `paymentGatewayRoute`

### 6.5 Seller Payouts (T+14 Settlement)
- **Schedule:** Weekly Monday payouts for orders delivered 14+ days ago
- **Engine:** `src/lib/payouts/t14Settlement.ts`
- **Deductions:** Platform commission (6.5%–12.5% by plan), Paynet processing fees, free-shipping seller cover, COD fees
- **Admin:** `/dashboard/platform-settings/financials`, export to Excel/CSV
- **Cron:** `/api/cron/weekly-jobs`

### 6.6 Stripe (Legacy — Disabled)
- Optional; not required for Vercel production build
- Routes return `410 Gone` when `STRIPE_SECRET_KEY` is unset
- Paynet is the sole active payment gateway

---

## 7. Shipping & Logistics

### Couriers integrated

| Courier | API Service | Features |
|---------|-------------|----------|
| **Nova Post** | `src/lib/shipping/novaPostService.ts` | Parcel creation, tracking, COD (2.5% fee) |
| **FAN Courier** | `src/lib/shipping/fanCourierService.ts` | AWB creation, webhook status updates, return AWB |

### Smart routing engine
- **File:** `src/lib/shipping/smartRouting.ts`
- Compares Nova Post vs FAN Courier by: weight, volumetric weight, destination, COD requirement, category rules
- **Quote API:** `POST /api/shipping/quote`
- **Unified endpoint:** `POST /api/shipping`

### Pricing & rules
- **File:** `src/lib/shipping/pricing.ts`
- Delivery methods: office pickup, address delivery
- Platform free-shipping threshold (configurable via `PlatformSetting`)
- Per-seller free-shipping threshold override
- Per-order allocation of courier cost, COD fee, and seller free-shipping subsidy across `OrderItem` rows

### FAN Courier webhooks
- **Route:** `POST /api/shipping/fan-courier/webhook`
- Updates AWB status, syncs return parcel pickup (triggers instant Gemelli Balance refund)

### Seller logistics dashboard
- `/dashboard/orders-logistics` — AWB creation, tracking, handover SLA
- **SLA enforcement:** `src/lib/orders/enforceSellerHandoverSla.ts` (cron)

---

## 8. AI Features

**Primary AI provider:** Google Gemini (`@google/generative-ai`)  
**Secondary:** Remove.bg (background removal)  
**Config:** `GEMINI_API_KEY` (env or admin Platform Settings override)

### 8.1 AI infrastructure

| Module | Purpose |
|--------|---------|
| `src/lib/ai/geminiModels.ts` | API key resolution, model fallback chain (`gemini-2.5-flash`) |
| `src/lib/ai/planFeatureGate.ts` | Subscription-tier gating |
| `src/lib/subscription/aiPlanEnforcement.ts` | Credit limits and feature flags |
| `AiUsage` model | Per-user monthly usage metering |
| Admin AI Control | `/dashboard/platform-settings/ai-control` |

### 8.2 Seller AI tools (Dashboard)

| Tool | Route | API | Description |
|------|-------|-----|-------------|
| **Description Generator** | `/dashboard/ai-tools/description-generator` | `POST /api/ai/generate-description` | AI product descriptions from keywords/images |
| **Title Generator** | `/dashboard/ai-tools/title-generator` | `POST /api/ai/generate-title` | SEO-optimized product titles |
| **Background Removal** | `/dashboard/ai-tools/background-removal` | `POST /api/ai/remove-bg` | Remove.bg integration for product photos |
| **SEO Generator** | — | `POST /api/ai/generate-seo` | Meta title, description, tags |
| **Batch Processing** | Plan Features hub | `POST /api/ai/batch-processing` | Bulk AI on up to 20 products (BUSINESS+) |
| **Social Sync** | Plan Features hub | `POST /api/ai/social-sync` | Import products from Instagram/TikTok/Facebook |
| **Store Migration** | Plan Features hub | `POST /api/ai/store-migration` | Scrape/import from external store URL |
| **Inventory Sync** | Plan Features hub | `POST /api/ai/inventory-sync` | Pull stock from remote URL (PRO: 30-min cron) |
| **Marketing Integrations** | Plan Features hub | `/api/ai/marketing-integrations` | Meta/Google/TikTok Ads API config |
| **Auto Invoicing** | Plan Features hub | `/api/ai/invoices/[orderId]` | AI-generated PDF invoices |
| **Consultant Reports** | Plan Features hub | `/api/ai/consultant-report` | Weekly AI performance reports (email) |
| **Natural Search** | Storefront | `POST /api/ai/natural-search` | NLP product search |
| **Image Search** | Storefront | `POST /api/ai/image-search` | Visual similarity search |
| **Price Suggestion** | Product form | `POST /api/products/suggest-price` | AI pricing recommendations |

### 8.3 Platform AI (automated)

| Feature | File | Trigger |
|---------|------|---------|
| **Product translation** | `src/lib/ai/productTranslationService.ts` | On product save → EN/RO/RU |
| **CMS translation** | `src/lib/ai/cmsTranslationService.ts` | On CMS/FAQ/footer save |
| **Banner translation** | `src/lib/ai/bannerTranslationService.ts` | On banner save |
| **Full product automation** | `src/lib/ai/fullProductAutomation.ts` | Auto SEO + description on new products (PRO) |
| **AI moderation** | `src/lib/moderation/aiModeration.ts` | Gemini vision + text on product publish |
| **Review moderation** | `src/lib/moderation/reviewModeration.ts` | Automated review screening |
| **KYC review** | `src/lib/kyc/aiSellerKycReview.ts` | Document verification assist |
| **Support chat** | `src/lib/support/handleSupportChat.ts` | Intent classification, FAQ matching, order lookup |
| **Ad suggestions** | `src/lib/advertising/smartSuggestions.ts` | Campaign recommendations |
| **Anti-fraud screening** | `src/lib/antiFraud/screenPaidOrder.ts` | High-value order pattern detection (PRO) |

### 8.4 AI plan gating

Credits and features are gated by subscription tier (see Section 9). Example limits:

| Tier | AI Content | AI Studio (Remove BG) | Advanced Features |
|------|------------|----------------------|-------------------|
| START | 5/month | 5/month | Basic Social Sync only |
| GROWTH | Unlimited copywriter | Unlimited Remove BG | — |
| BUSINESS | Unlimited | Unlimited | Batch, scraper, invoicing, analytics |
| PRO_PARTNER | Full automation | Unlimited | Marketing API, inventory sync, consultant, anti-fraud |
| FOUNDING_PARTNER | Lifetime PRO | Unlimited | All PRO features |

---

## 9. Subscription & Monetization

### Subscription tiers

**Catalog:** `src/lib/subscription/planCatalog.ts`

| Tier | Monthly (MDL) | Commission | Max Products | Key unlocks |
|------|---------------|------------|--------------|-------------|
| **START** | Free | 12.5% | 30 | Basic AI, Mini/Basic Boost |
| **GROWTH** | Paid | 11% | 100 | Unlimited AI copywriter + Remove BG |
| **BUSINESS** | Paid | 9.5% | Unlimited | Batch AI, scraper, invoicing, Standard Boost |
| **PRO_PARTNER** | Paid | 7.5% | Unlimited | Full automation, marketing API, anti-fraud, consultant |
| **FOUNDING_PARTNER** | Lifetime | 6.5% | Unlimited | All PRO features permanently |

**Billing:** Monthly or annual (2 months free on annual)

**Payment:** Paynet via `/api/subscriptions/create-payment` and `/api/subscriptions/renew`

**Enforcement:** `src/lib/subscription/planAccess.ts`, `subscriptionLimitService.ts`

**Renewal cron:** `/api/cron/check-subscriptions` — expiry notifications, auto-renewal attempts

### Revenue streams

1. **Seller commission** — 6.5%–12.5% per sale (plan-dependent)
2. **Subscription fees** — Monthly/annual plan charges
3. **Advertising** — CPC campaigns, homepage banners, boost packages
4. **Paynet processing** — Pass-through (buyer pays exact amount, no markup)

---

## 10. Advertising Platform

### Architecture

| Component | File |
|-----------|------|
| Campaign service | `src/lib/advertising/advertisingService.ts` |
| CPC billing | `src/lib/advertising/cpcBilling.ts` |
| Click attribution | `src/lib/advertising/attributionService.ts` |
| Smart suggestions | `src/lib/advertising/smartSuggestions.ts` |
| Pricing config | `src/lib/advertising/adPricingConfig.ts` |
| Slot capacity | `src/lib/advertising/campaignSlotCapacity.ts` |
| Click cookies | `src/lib/advertising/adCookies.ts` |

### Campaign types (plan-gated)

- `PRODUCT_BOOST` — Visibility boost in search/category
- `SPONSORED_PRODUCT` — Sponsored placement
- `HOMEPAGE_BANNER` — Homepage carousel slot
- `CATEGORY_BANNER` — Category page banner
- `PROMO_BOOST` — Promotional boost package

### Boost packages
`MINI_BOOST`, `BASIC_BOOST`, `STANDARD_BOOST`, `PREMIUM_BOOST` — configurable pricing in admin

### CPC billing rules
- Click deduplication (same user/session)
- Daily and total budget caps
- Self-click blocking (seller cannot click own ads)
- Conversion attribution linked to orders
- Reversal on refunded/cancelled orders

### Seller UI
- `/dashboard/advertising` — Campaign dashboard, ROAS, trends
- `/dashboard/advertising/create-campaign` — Campaign builder
- Ad wallet top-up via Paynet (`/api/advertising/topup`)

### Admin UI
- `/dashboard/platform-settings/ad-requests` — Approval workflow + calendar
- `/dashboard/platform-settings/ad-config/placements` — Slot configuration
- `/dashboard/platform-settings/ad-config/boost-packages` — Pricing
- `/dashboard/platform-settings/ad-config/plan-rules` — Plan-based ad credits

---

## 11. Seller Module

### Onboarding pipeline

1. **Signup** — `/signup-seller` → account created with `role: SELLER`, `status: PENDING_APPROVAL`
2. **Complete store** — `/signup-seller/complete-store` → store profile
3. **KYC submission** — `/api/user/me/kyc/submit` → document upload to S3, AI-assisted review
4. **Admin approval** — `/dashboard/sellers` → approve/reject
5. **Subscription** — Choose plan, Paynet payment if paid tier
6. **Full access** — Products, orders, ads unlocked

### Product management

| Feature | Route / API |
|---------|-------------|
| Product list | `/dashboard/product-management` |
| Add product | `/dashboard/product-management/add-product` |
| Edit product | `/dashboard/product-management/edit-product/[id]` |
| Bulk import | `POST /api/products/bulk-import` |
| URL import | `src/lib/products/urlProductImport.ts` |
| SKU check | `GET /api/products/check-sku` |
| Per-product translation | `POST /api/products/[id]/translate` |
| 3D model viewer | `/dashboard/product-management/try-3d` |
| Analytics | `/dashboard/product-management/analytics/[id]` |
| AI moderation on publish | Automatic via `aiModeration.ts` |

### Order fulfillment

| Feature | Route |
|---------|-------|
| Order list | `/dashboard/orders` |
| Order detail | `/dashboard/orders/[orderId]` |
| Logistics / AWB | `/dashboard/orders-logistics` |
| Dashboard stats | `/dashboard/quick-stats` |
| Rewards / milestones | `/dashboard/rewards` |

### Seller settings

| Section | Path |
|---------|------|
| Account | `/dashboard/settings/account` |
| Addresses | `/dashboard/settings/addresses` |
| Financial (IBAN) | `/dashboard/settings/financial` |
| Sales targets | `/dashboard/settings/sales` |
| KYC verification | `/dashboard/settings/verification` |
| Notifications | `/dashboard/settings/notifications` |
| Security & 2FA | `/dashboard/settings/security-and-privacy` |
| AI & referrals | `/dashboard/settings/ai-and-referrals` |
| Subscriptions | `/dashboard/settings/subscriptions-and-plans` |

### Seller milestones & rewards

**Config:** `src/lib/sellerRewards/milestoneConfig.ts`  
**Admin:** `/dashboard/platform-settings/seller-milestones`

Milestones include: first sale, sales thresholds (1K/10K MDL), whale orders → rewards like Product Boost, Featured Product placement, listing capacity increases.

### Integrations dashboard

- `/dashboard/integrations` — API key management, webhook endpoints
- `/dashboard/integrations/docs` — In-app API reference

---

## 12. Buyer / Customer Module

### Storefront pages

| Page | Path | Features |
|------|------|----------|
| Homepage | `/` | Banners, categories, sponsored products |
| Product catalog | `/all-product` | Filters, search, AI natural search |
| Product detail | `/product/[id]` | Reviews, affiliate share, 3D viewer, add to cart |
| Cart | `/view-cart` | Multi-seller cart, quantity updates |
| Checkout | `/checkout` | Paynet, COD, balance, coupons, shipping quotes |
| Order success | `/order-success` | Confirmation, cart invalidation |
| Orders | `/orders`, `/order-details/[id]` | History, tracking, returns |
| Wishlist | `/wishlist` | Saved products |
| Wallet | `/gemelli-balance`, `/my-wallet` | Balance + transaction history |
| Help | `/help` | FAQ + AI support chat |
| CMS pages | `/[slug]` | About, policies, terms (trilingual) |
| Become seller | `/become-seller` | Seller onboarding CTA |

### Checkout features

- Multi-seller cart with per-seller shipping cost allocation
- Delivery method selection (office / address)
- Smart courier routing (Nova Post vs FAN Courier)
- Coupon code validation
- Gemelli Balance partial or full payment
- Paynet 3D Secure card payment (MDL, no buyer surcharge)
- Cash on Delivery option
- Terms acceptance gate before payment
- Affiliate cookie attribution (30-day window)

### Returns & refunds

- Return request from order detail
- **Instant Refund** → Gemelli Balance credited on courier pickup
- **Original payment refund** → Processed on warehouse receipt
- Return AWB via FAN Courier webhook integration

### Buyer dashboard

- `/dashboard/orders` — Order history
- `/dashboard/wallet` — Gemelli Balance
- `/dashboard/affiliate` — Referral link, earnings, stats
- `/dashboard/notifications` — In-app notifications
- `/dashboard/settings/*` — Account, addresses

---

## 13. Admin Platform

### Operations dashboard

| Module | Path | Capabilities |
|--------|------|--------------|
| Dashboard | `/dashboard` | Platform KPIs, charts |
| Moderation | `/dashboard/moderation` | Product approval queue (AI + manual) |
| Sellers | `/dashboard/sellers` | KYC review, approve/suspend, commission |
| Customers | `/dashboard/customers` | User management, order history |
| Orders | `/dashboard/orders` | All platform orders |
| Reviews | `/dashboard/reviews` | Review moderation |
| Blogger reviews | `/dashboard/blogger-reviews` | Video review approval |
| Support tickets | `/dashboard/support-tickets` | Human ticket management |
| Notification engine | `/dashboard/notification-engine` | Template management |
| Inventory alerts | `/dashboard/inventory-alerts` | Low-stock management |

### Platform settings

| Setting | Path |
|---------|------|
| Homepage banners | `/dashboard/platform-settings/banners` |
| Ad request approval | `/dashboard/platform-settings/ad-requests` |
| API keys (couriers, Gemini) | `/dashboard/platform-settings/api-keys` |
| Coupons / vouchers | `/dashboard/platform-settings/vouchers` |
| Email broadcasts | `/dashboard/platform-settings/broadcast` |
| Financials & payouts | `/dashboard/platform-settings/financials` |
| AI control & usage | `/dashboard/platform-settings/ai-control` |
| Checkout availability | `/dashboard/platform-settings/checkout-availability` |
| Content management | `/dashboard/content-management` |
| Ad config (boosts, placements, plan rules) | `/dashboard/platform-settings/ad-config/*` |
| Seller milestones | `/dashboard/platform-settings/seller-milestones` |

### Admin API surface

47+ routes under `/api/admin/` covering all admin operations with JWT + `Role.ADMIN` verification.

---

## 14. CMS & Internationalization

### Languages

- **Supported:** English (`en`), Romanian (`ro`), Russian (`ru`)
- **Default locale:** Romanian (`ro`)
- **Switcher:** Header language selector → persisted in `localStorage`

### i18n architecture

| Layer | Implementation |
|-------|----------------|
| Runtime hook | `src/lib/useLanguage.tsx` — `LanguageProvider`, `useTranslate()` |
| Database | `Translation` model — key/value per language |
| API | `GET /api/translations` — bulk fetch on app load |
| Static fallbacks | `src/lib/i18n/*.ts` — 18+ domain-specific fallback files |
| Guards | `src/lib/i18n/translationGuards.ts` — stale/placeholder detection |

### Localized content models

- **Products:** `nameRo`, `nameRu`, `descriptionRo`, `descriptionRu`, SEO fields
- **CMS pages:** `StaticPage` with `titleEn/Ro/Ru`, `contentEn/Ro/Ru`
- **FAQs:** Trilingual Q&A with category taxonomy
- **Banners:** Localized titles and CTA buttons
- **Categories:** Trilingual names and slugs
- **Footer:** Copyright, operator, disclaimer via CMS + AI translation

### CMS admin

- **UI:** `/dashboard/content-management`
- **Sections:** Static pages, FAQs, homepage banners, platform footer
- **AI translation on save:** Gemini auto-generates RO/RU from English admin input
- **Retry translation:** Per-field EN/RO/RU badges with manual retry button
- **API:** `/api/admin/cms`, `/api/admin/faqs`, `/api/admin/banners`

### SEO

- `metadataBase` from `getSiteUrl()` in root layout
- Dynamic sitemap: `src/app/sitemap.ts`
- Robots.txt: `src/app/robots.ts`
- Per-product SEO fields (AI-generated)

---

## 15. Seller REST API v1

**Documentation:** `docs/seller-api.md` · **In-app docs:** `/dashboard/integrations/docs`

### Authentication

```
Authorization: Bearer gem_sk_live_<secret>
# or
X-Api-Key: gem_sk_live_<secret>
```

- Keys stored as SHA-256 hashes in `SellerApiKey`
- Scoped per seller — no cross-tenant access
- Scopes: `products:read`, `products:write`, `orders:read`, `orders:write`, `webhooks:manage`

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1` | API discovery (no auth) |
| `GET/POST` | `/api/v1/products` | List / create products |
| `GET/PATCH/DELETE` | `/api/v1/products/:id` | Product CRUD |
| `PATCH` | `/api/v1/products/:id/inventory` | Update stock |
| `PATCH` | `/api/v1/products/:id/price` | Update price |
| `GET` | `/api/v1/orders` | List seller orders |
| `GET` | `/api/v1/orders/:id` | Order detail |
| `PATCH` | `/api/v1/orders/:id/status` | Update fulfillment status |

### Webhooks (outbound)

- **Events:** `order.created`, `order.cancelled`, `order.updated`, `product.updated`
- **Signing:** HMAC-SHA256 with `gem_whsec_` secrets
- **Delivery log:** `SellerWebhookDelivery` model with retry tracking
- **Library:** `src/lib/seller-api/webhooks.ts`

---

## 16. Affiliate Program

### Configuration
- **Commission rate:** 1% of order subtotal
- **Attribution window:** 30 days (cookie-based)
- **Config:** `src/lib/affiliate/affiliateConfig.ts`

### Flow

1. Affiliate shares product link with `?aff=<userId>` parameter
2. Click tracked → `AffiliateClick` record (`/api/affiliate/track`)
3. Cookie set: `gemelli_affiliate_id` (30-day expiry)
4. At checkout, `affiliateId` attached to `Order`
5. On payment confirmation → `AffiliateCommission` created → credited to affiliate's Gemelli Balance
6. On order void/refund → `AFFILIATE_CLAWBACK` wallet transaction

### UI
- **Share button:** On product pages (`AffiliateShareButton.tsx`)
- **Dashboard:** `/dashboard/affiliate` — stats, referral link, earnings
- **Available to:** Both buyers and sellers

---

## 17. Support & Notifications

### AI support chat
- **Route:** `POST /api/support/chat`
- **Engine:** `src/lib/support/handleSupportChat.ts`
- **Capabilities:** Intent classification (ORDER, FAQ, SENSITIVE, CLARIFY), FAQ matching, order lookup
- **Escalation:** Creates human `Ticket` with `source: AI` when needed
- **UI:** `/help`

### Support tickets
- **Model:** `Ticket` + `TicketMessage`
- **Sources:** `HUMAN`, `AI`
- **SLA:** `slaDueAt` tracking
- **Admin:** `/dashboard/support-tickets`

### Notification system

| Channel | Implementation |
|---------|----------------|
| **Email** | Mailtrap API via `src/lib/email/sendEmail.ts` |
| **In-app** | `Notification` model + dashboard bell |
| **Platform** | Toast notifications (react-toastify, sonner) |

**Template engine:** `src/lib/notifications/templateEngine.ts` — DB-first templates with static fallbacks

**Notification types:** Order confirmation, seller new order, low stock, subscription expiry, payout, KYC status, ticket replies, campaign updates, consultant reports

**Settings:** Per-user `NotificationSettings` — email/SMS/platform toggles

---

## 18. Background Jobs & Cron

All cron endpoints require: `Authorization: Bearer ${CRON_SECRET}`

| Endpoint | Schedule | Purpose |
|----------|----------|---------|
| `/api/cron/weekly-jobs` | Weekly (Monday) | Stale Paynet cleanup, balance expiry, COD heal, seller handover SLA, **weekly payouts**, inventory sync, consultant reports |
| `/api/cron/check-subscriptions` | Daily | Subscription expiry notifications, auto-renewals |
| `/api/cron/check-low-stock` | On-demand | Low stock alerts to sellers |
| `/api/cron/check-stock` | Daily / weekly | Stock level notifications |
| `/api/cron/inventory-sync` | Scheduled | Remote inventory pull for enabled sellers |
| `/api/cron/consultant-reports` | Weekly | AI consultant email reports |
| `/api/cron/cleanup-notifications` | Scheduled | Delete read notifications older than 30 days |

---

## 19. External API Integrations

| Service | Purpose | Env Variables | Key Files |
|---------|---------|---------------|-----------|
| **Paynet** | Card payments (MDL) | `PAYNET_*` | `src/lib/paynet/*` |
| **Google Gemini** | AI content, moderation, translation | `GEMINI_API_KEY` | `src/lib/ai/geminiModels.ts` |
| **Remove.bg** | Background removal | `REMOVE_BG_API_KEY` | `/api/ai/remove-bg` |
| **AWS S3** | File storage | `AWS_*` | `src/lib/s3-utils.ts` |
| **Mailtrap** | Transactional email | `MAILTRAP_*` | `src/lib/email/sendEmail.ts` |
| **Nova Post** | Shipping | `NOVA_POST_API_KEY` | `novaPostService.ts` |
| **FAN Courier** | Shipping + webhooks | `FAN_COURIER_API_KEY` | `fanCourierService.ts` |
| **Google OAuth** | Sign-in | `GOOGLE_CLIENT_*` | NextAuth |
| **Facebook OAuth** | Sign-in | `FACEBOOK_*` | NextAuth |
| **Apple OAuth** | Sign-in | `APPLE_*` | NextAuth |
| **Meta OAuth** | Social Sync import | `META_APP_*` | `/api/ai/social-sync/oauth/meta` |
| **Meta Pixel** | Analytics (optional) | `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Client-side |
| **Google Analytics** | Analytics | gtag config | `src/lib/analytics/gtag.ts` |
| **Google Maps** | Order map modal (optional) | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Order details |
| **Neon PostgreSQL** | Database | `DATABASE_URL` | Prisma |
| **Stripe** | Legacy (disabled) | Optional | `src/lib/stripe.ts` |

---

## 20. Frontend Architecture

### State management (Redux Toolkit)

```
redux/
├── api/
│   ├── baseApi.ts          # RTK Query base with JWT injection + 401 logout
│   ├── adminApi.ts         # Admin endpoints
│   └── publicApi.ts        # Public settings, CMS pages
├── features/
│   ├── auth/               # Auth slice + authApi
│   ├── products/           # Product queries
│   ├── cart/               # Cart state
│   ├── orders/             # Order queries
│   ├── shipping/           # Shipping quotes
│   ├── subscriptions/      # Plan management
│   └── user/               # Profile, wallet, settings
└── store.ts                # configureStore + persist
```

**Pattern:** RTK Query for all API calls with tag-based cache invalidation (`providesTags` / `invalidatesTags`)

### UI component structure

```
components/
├── shared/          # Footer, Header, Button, CookieConsent
├── pages/           # Page-level components (Checkout, ProductDetail, Dashboard)
├── ui/              # Reusable UI primitives
└── affiliate/       # Affiliate capture + share
```

### Routing (App Router)

| Group | Purpose |
|-------|---------|
| `(common)` | Public storefront |
| `(dashboard)` | Authenticated dashboard (role-aware sidebar) |
| `(auth)` | Login, signup, password reset |
| `(standalone)` | Coming soon landing page |
| `api/` | REST API route handlers |

### Design system
- **Fonts:** Poppins (body), Montserrat (footer nav — Cyrillic support)
- **Primary color:** `#005BFF`
- **Background:** `#ECF7FF` (footer), white cards
- **Responsive:** Mobile-first with Tailwind breakpoints

---

## 21. Testing & Quality

### Test framework
**Vitest** — run via `npm test`, `npm run test:paynet`, `npm run test:wallet`

### Test coverage areas

| Area | Test files |
|------|------------|
| Paynet config & client | `src/lib/paynet/paynet.test.ts`, `paynet.integration.test.ts` |
| Wallet & refunds | `src/lib/wallet/*.test.ts` |
| Shipping routing | `scripts/test-shipping-routing.ts` |
| BIN routing | `src/lib/payments/binRouting.test.ts` |
| Affiliate | `src/lib/affiliate/*.test.ts` |
| Payout settlement | `src/lib/payouts/t14Settlement.test.ts` |
| Product compliance | `src/lib/moderation/productCompliance.test.ts` |
| Footer/contact | `src/constants/footerContact.test.ts` |

### Verification scripts
- `scripts/verify-paynet-e2e.ts` — End-to-end Paynet flow verification
- `scripts/test-paynet-sale-area.ts` — Sale area routing validation

### Health checks
- `GET /api/health/db` — Database connectivity
- `GET /api/health/orders-schema` — Schema validation

---

## 22. Deployment & Environment

### Hosting
- **Platform:** Vercel (serverless Next.js)
- **Database:** Neon PostgreSQL (pooled connection for serverless)
- **Storage:** AWS S3 (eu-north-1)
- **Domain:** gemelli.store

### Required production environment variables

```bash
# Database
DATABASE_URL=postgresql://...@...-pooler...neon.tech/...

# App URLs
NEXT_PUBLIC_BASE_URL=https://gemelli.store
NEXT_PUBLIC_APP_URL=https://gemelli.store
NEXTAUTH_URL=https://gemelli.store

# Auth
NEXTAUTH_SECRET=<secret>
JWT_SECRET=<secret>

# Paynet (live)
PAYNET_MODE=live
PAYNET_MERCHANT_CODE=<live>
PAYNET_SECRET_KEY=<live>
PAYNET_SALE_AREA_CODE=<gemelli-store-code>
PAYNET_API_USER=<live>
PAYNET_API_PASSWORD=<live>
PAYNET_API_BASE_URL=https://ecom-api.paynet.md
PAYNET_SETECOM_URL=https://paynet.md/Acquiring/setecom

# Email
MAILTRAP_API_TOKEN=<token>
MAILTRAP_SENDER_EMAIL=no-reply@gemelli.store

# Storage
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=eu-north-1
AWS_S3_BUCKET_NAME=gemelli-store

# AI
GEMINI_API_KEY=<key>
REMOVE_BG_API_KEY=<key>

# Couriers
FAN_COURIER_API_KEY=<key>
NOVA_POST_API_KEY=<key>

# Cron
CRON_SECRET=<random-secret>

# OAuth (optional)
GOOGLE_CLIENT_SECRET=<secret>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<id>
```

### Build command
```bash
npm run build   # prisma generate && next build
```

### Stripe
Not required — legacy integration disabled when `STRIPE_SECRET_KEY` is unset.

---

## 23. Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router monolith** | Single deploy unit; API routes co-located with UI; Vercel-optimized |
| **Paynet over Stripe** | Moldova-native payment gateway; MDL support; 3D Secure; local merchant accounts |
| **Gemelli Balance wallet** | Instant refunds improve buyer trust; reduces chargeback friction |
| **Smart courier routing** | Cost optimization between Nova Post and FAN Courier per parcel |
| **Gemini for AI** | Cost-effective multimodal AI for text, vision (moderation), and translation |
| **Trilingual by default** | Moldova market requires RO + RU + EN; AI translation reduces CMS overhead |
| **Subscription-gated AI** | Monetization aligned with seller value (more AI = higher tier) |
| **T+14 seller payouts** | Industry-standard hold period for returns/disputes before settlement |
| **Seller API v1** | Enables ERP/1C/WMS integration for professional sellers |
| **RTK Query** | Normalized server state cache with automatic refetch on mutations |
| **PlatformSetting key/value store** | Runtime config without redeploy (API keys, checkout toggles, ad pricing) |
| **Lazy Stripe init** | Legacy code preserved but build-safe without Stripe credentials |

---

## Appendix: API Route Index (175+ endpoints)

<details>
<summary>Click to expand full API route categories</summary>

### Auth
`/api/auth/login`, `/api/auth/signup`, `/api/auth/verify-2fa`, `/api/auth/resend-2fa`, `/api/auth/google`, `/api/auth/[...nextauth]`

### Commerce
`/api/cart`, `/api/products`, `/api/products/[id]`, `/api/products/bulk-import`, `/api/orders`, `/api/reviews`, `/api/coupons/validate`, `/api/returns`

### Checkout & Payments
`/api/checkout`, `/api/checkout/availability`, `/api/paynet/create-payment`, `/api/paynet/callback`, `/api/paynet/return`

### Shipping
`/api/shipping`, `/api/shipping/quote`, `/api/shipping/fan-courier/webhook`

### AI
`/api/ai/generate-description`, `/api/ai/generate-title`, `/api/ai/generate-seo`, `/api/ai/remove-bg`, `/api/ai/batch-processing`, `/api/ai/natural-search`, `/api/ai/image-search`, `/api/ai/social-sync`, `/api/ai/store-migration`, `/api/ai/inventory-sync`, `/api/ai/marketing-integrations`, `/api/ai/consultant-report`, `/api/ai/invoices/[orderId]`

### Subscriptions
`/api/subscriptions`, `/api/subscriptions/create-payment`, `/api/subscriptions/renew`, `/api/subscription-plans/[id]`

### Advertising
`/api/advertising/campaigns`, `/api/advertising/track`, `/api/advertising/topup`, `/api/advertising/settings`

### Admin (47+ routes)
`/api/admin/dashboard`, `/api/admin/sellers`, `/api/admin/orders`, `/api/admin/moderation`, `/api/admin/cms`, `/api/admin/faqs`, `/api/admin/banners`, `/api/admin/coupons`, `/api/admin/financials`, `/api/admin/advertising`, `/api/admin/platform-settings`, `/api/admin/ai/config`, `/api/admin/notifications`, ...

### Seller API v1
`/api/v1`, `/api/v1/products`, `/api/v1/products/[id]`, `/api/v1/products/[id]/inventory`, `/api/v1/products/[id]/price`, `/api/v1/orders`, `/api/v1/orders/[id]`, `/api/v1/orders/[id]/status`

### User
`/api/user/me`, `/api/user/me/wallet`, `/api/user/me/addresses`, `/api/user/me/wishlist`, `/api/user/me/store`, `/api/user/2fa/setup`, `/api/user/2fa/verify`, `/api/user/2fa/disable`

### Platform
`/api/translations`, `/api/cms/pages`, `/api/platform-settings/public`, `/api/categories`, `/api/home/banners`, `/api/support/chat`, `/api/tickets`, `/api/affiliate/track`, `/api/affiliate/stats`

### Cron
`/api/cron/weekly-jobs`, `/api/cron/check-subscriptions`, `/api/cron/check-stock`, `/api/cron/check-low-stock`, `/api/cron/inventory-sync`, `/api/cron/consultant-reports`, `/api/cron/cleanup-notifications`

### Health
`/api/health/db`, `/api/health/orders-schema`

</details>

---

*This document reflects the Gemelli Marketplace codebase as of the current staging branch. For internal operational guides, see also: `docs/payments-refunds-and-gemelli-balance.md`, `docs/seller-api.md`, `docs/subscription-billing-ai-tools-and-payouts.md`.*
