# H.O.O.D. Hope — Production Website

The website for H.O.O.D. Hope's Sustainable Wellness Housing Program — a national housing
platform built to be credible with grantmakers and HUD-aligned government partners, trustworthy
to referral agencies, compelling to donors and volunteers, and clear about the model to everyone
else. Branding, tone, and program content are sourced directly from the organization's national
brochure (5-Stage Path to Homeownership, the WEL9 wellness methodology, the licensing framework,
and the St. Louis Flagship pilot's real market data, budget, and ROI).

## Why this is a static site with a Git-based CMS, not Next.js + a hosted CMS

The original handoff recommended Next.js. This build environment's package registry (npmjs.org)
isn't reachable, so a framework install wasn't possible here. Instead this is a **dependency-free
static site generator** (`node build.js`) paired with **Decap CMS**, a free, open-source, Git-based
content manager that needs no database and no custom backend — just a Git repository and (for the
easiest setup) a free Netlify account for login/identity.

This is a legitimate, HUD-appropriate production architecture: no vendor lock-in, no monthly CMS
fee, content lives in plain JSON files an editor never has to touch directly, and any developer
(or Claude, again) can pick this up later with zero framework lock-in.

## Non-technical content editing (the CMS)

Visit `/admin/` on the deployed site to add or edit:

- **Metros** — add a new metro with zero code changes (folder collection)
- **Wellness Pillars (WEL9)** — add or edit a pillar
- **Local Resources & Initiatives** — nested inside each metro's entry
- **Leadership**, **Partner Types**, **Reports & Financials**, **Organization Settings**, and the
  full **Our Model** brochure content (5-Stage Continuum, licensing framework, funding, ROI)

One-time setup required before `/admin/` works for real editors — see **PRODUCTION-CHECKLIST.md**.
Until then, anyone can still edit the JSON files in `/content` directly and re-run `node build.js`.

## Requirements

Node.js only — no `npm install` needed. The site itself uses zero external packages. (Decap CMS
and Leaflet/OpenStreetMap load from CDN in the browser, not from this build.)

## How to build

```bash
node build.js
```

Regenerates every HTML page from `/content` (CMS-editable) and `/data` (code-level structure)
through the templates in `/lib`. Run this after any content or code change.

## How to preview locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Project structure

```
content/                 CMS-editable content (what /admin/ writes to)
  site.json               Org identity, mission, contact, social
  model.json               5-Stage Continuum, WEL9, licensing, funding, ROI — from the brochure
  leadership.json          Executive team bios
  partners.json            Partner type descriptions
  reports.json              Annual reports + financial transparency + research notes
  metros/                  One JSON file per metro (initiatives + local resources nested inside)
  wellness-pillars/         One JSON file per WEL9 pillar

data/                     Code-level loaders — read /content, shaped for the templates
  site.js, model.js, leadership.js, partners.js, reports.js   → thin passthroughs of /content
  metros.js, impactCategories.js                              → read every file in a /content folder
  resources.js                                                → flattens resources out of every metro
  formSchema.js                                                → form field definitions (code-level)

lib/                      Templates (dependency-free "components")
  ui.js                    Header, Footer, Hero, wellness wheel, metro selector, forms, etc.
  layout.js                 Page shell: <head>, meta tags, JSON-LD, Leaflet include when needed
  icons.js                   Inline SVG icon set
  pages/                     One file per route

assets/
  css/styles.css            Full design system — navy/gold/cream brand, Playfair Display +
                             Poppins, WCAG AA contrast-checked
  js/main.js                 Mobile nav, metro tabs, 5-stage stepper, WEL9 wheel, resource
                             filters + live map, donation presets, form validation
  img/logo-mark.png          Real logo, extracted from the brochure
  img/hero-community.jpg     Real hero image, extracted from the brochure

admin/
  index.html, config.yml    Decap CMS — see PRODUCTION-CHECKLIST.md for setup

<route>/index.html         Generated output (clean URLs, e.g. /model/)
sitemap.xml, robots.txt     Generated SEO files
PRODUCTION-CHECKLIST.md      What must be connected/verified before public launch
```

## Routes built

```
/                    /model/                              /metros/
/find-help/          /impact/                              /metros/st-louis/
/partners/           /impact/economic-stability/            /metros/st-louis/resources/  (live map)
/donate/             /impact/education-access/              /metros/wichita/(...)
/volunteer/          /impact/health-care-access/            /metros/kansas-city/(...)
/reports/            /impact/neighborhood-environment/      /metros/dallas/(...)
/about/              /impact/social-community-context/      /metros/detroit/(...)
/contact/
/admin/               (Content Manager / CMS)
/404.html
```

## Interactive components

- **5-Stage Path to Homeownership** — accordion stepper (homepage teaser + full version on `/model/`)
- **WEL9 wellness wheel** — clickable SVG pie chart mapped to the Social Determinants of Health
- **Metro selector tabs**, **mobile nav**, **donation amount presets**
- **Resource directory** — category/status filters, list ↔ map toggle
- **Live resource map** — Leaflet + OpenStreetMap (no API key required), real geocoded pins for
  every verified St. Louis and Wichita resource
- **Forms** — Find Help, Partner Inquiry, Volunteer, Donate, Contact — client-side validation,
  accessible error states, `aria-live` success messaging

## Real, verified local resources

St. Louis and Wichita resource directories are populated with real, publicly verifiable
organizations (public housing authorities, HUD-approved housing counseling agencies, federally
qualified health centers, Feeding America food banks, and 211 helplines) gathered via web
research, each with a `lastVerified` date. Map pin coordinates are best-estimate geocoding — spot
check against each organization's official listing before treating this as a finished public
resource (see PRODUCTION-CHECKLIST.md). Kansas City, Dallas, and Detroit are Phase 3 target
metros with no active H.O.O.D. Hope license yet, so their directories intentionally show only the
universal 211 helpline until each metro launches — this matches the brochure's real phased
rollout instead of overclaiming readiness.
