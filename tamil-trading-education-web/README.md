# Tamil Trading Education — Website

Production-ready Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion website
for Tamil Trading Education, a Forex Trading Education & Trading Community based in Tenkasi
District, Tamil Nadu.

## Tech Stack

- **Next.js 14** (App Router, Server Components, `next/image`, `next/font`)
- **TypeScript**
- **Tailwind CSS** — custom navy / gold / electric-blue fintech design system
- **Framer Motion** — scroll reveals, animated counters, page transitions, hover effects
- **Lucide React** — icon set
- **TradingView Widgets** — live ticker tape, advanced chart, market overview, economic
  calendar, forex heat map, crypto market, top gainers/losers (all embedded via TradingView's
  official public embed scripts — no API key or paid plan required)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs fully out of the box —
lead forms validate and log to the console until you optionally connect real email delivery
(see step 3 in the checklist below).

## Deploying

The fastest path is [Vercel](https://vercel.com/new) (built by the Next.js team):

1. Push this folder to a GitHub repository.
2. Import the repo in Vercel — it will auto-detect Next.js and deploy with zero config.
3. Point your domain (e.g. `tamiltradingeducation.com`) at the Vercel project.

Any Node.js host that supports Next.js (Netlify, Railway, your own server via `npm run build && npm start`) will also work.

## Before You Go Live — Checklist

1. **Real contact details.** Every phone number, WhatsApp/Telegram link, email address and
   social handle lives in one place: `lib/data.ts` → the `site` object. Update it once and it
   propagates across the whole site (header, footer, contact page, WhatsApp button, JSON-LD).

2. **Images.** This project was generated in a sandbox without live internet access, so all
   photography (`lib/images.ts`) uses hotlinked Unsplash placeholder URLs — real, royalty-free
   photos, but **please verify each URL still resolves** before shipping, and feel free to swap
   any of them for your own licensed photography. Every image reference lives in that one file.

3. **Lead forms — now wired.** `components/forms/ContactForm.tsx` and `EnrollmentForm.tsx`
   post to `/api/contact` and `/api/enroll`, which send a formatted notification email via
   [Resend](https://resend.com) using `lib/email.ts`. To activate real delivery:
   - `npm install` (already includes the `resend` package)
   - Copy `.env.example` to `.env.local`
   - Create a free Resend account, grab an API key, and set `RESEND_API_KEY`
   - Set `LEAD_NOTIFICATION_EMAIL` to where leads should land
   - Until you verify your own sending domain in Resend, `RESEND_FROM_EMAIL` can stay as
     the sandbox address in `.env.example`

   Without any of this configured, the forms still work end-to-end in development — they
   validate input and log the lead to the server console instead of emailing it, so nothing
   breaks if you skip this step for now.

4. **Google Map.** The contact page embeds a map centered on Kadayam, Tenkasi (`lib/data.ts` →
   `mapEmbedQuery`) and links out to your provided Google Maps share link
   (`site.mapUrl`). If you have an exact place-ID or lat/long, swap the embed query for
   pixel-accurate pin placement.

5. **Domain & SEO.** Set `site.domain` in `lib/data.ts` to your real production domain — it
   feeds canonical URLs, Open Graph tags, the sitemap (`/sitemap.xml`) and structured data
   (Organization, Course, FAQ, Breadcrumb JSON-LD).

6. **Favicon / OG image — already generated.** `app/icon.tsx` and `app/opengraph-image.tsx`
   render a branded gold "T" favicon and a full social-share card entirely in code (via
   Next.js's built-in `ImageResponse`), so there's nothing to upload. Feel free to replace
   either with your real logo once you have one — just swap the JSX inside those two files.

7. **GST & legal copy.** GST number and registered address are pulled from `lib/data.ts` as
   well — double check them against your certificate before launch.

## Project Structure

```
app/                    Routes (App Router) — one folder per page
  page.tsx              Home
  about/                About Us
  courses/               Forex Courses (+ enrollment form)
  market-analysis/       Live Market Analysis (all TradingView widgets)
  vip-community/         VIP Community
  copy-trading/          Copy Trading
  broker-assistance/     Broker Account Assistance
  testimonials/          Testimonials
  blog/                  Blog index + [slug] detail pages
  faq/                   FAQ (accordion)
  contact/               Contact (form + map)
  privacy-policy/        Privacy Policy
  terms/                 Terms & Conditions
  risk-disclaimer/       Risk Disclaimer
  api/contact, api/enroll  Form submission handlers
  sitemap.ts, robots.ts  SEO
components/
  layout/                Header, Footer, WhatsApp button, PageHero
  home/                  Home-page-only sections
  market/                TradingView widget wrappers
  forms/                 Contact & enrollment forms
  shared/                Reveal, AnimatedCounter, SectionHeading, FAQAccordion
lib/
  data.ts                All site content (single source of truth)
  images.ts              All image URLs (single source of truth)
  seo.ts                 Metadata + JSON-LD helpers
types/                   Shared TypeScript interfaces
```

## Notes

- All animations respect `prefers-reduced-motion`.
- TradingView widgets are client components that inject the official embed `<script>` tags at
  runtime — they need no npm package and no API key, but they do need the visitor's browser to
  reach `s3.tradingview.com`.
- Educational/legal copy (Terms, Privacy, Risk Disclaimer) is a solid starting point but is not
  a substitute for review by a qualified legal professional in your jurisdiction.
