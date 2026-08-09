# Production Launch Checklist

The site is fully built, navigable, accessible, brochure-accurate, and includes a working CMS.
These are the remaining items before it should be treated as a live public/donor/grant-facing site.

## 1. Deploy + connect the CMS (highest priority — this unlocks everything else)

- [ ] Push this folder to a Git repository (GitHub is simplest and free)
- [ ] Deploy the repo to Netlify, Vercel, or Cloudflare Pages (all work with zero config — this
      is plain static HTML/CSS/JS, no build command needed)
- [ ] **For the easiest CMS login (no OAuth app to build):** deploy to Netlify, then in the
      Netlify dashboard go to Site settings → Identity → Enable Identity, then Site settings →
      Identity → Services → Enable Git Gateway. Invite editors under Identity → Invite users —
      they set a password and log in directly at `yoursite.com/admin/`.
- [ ] In `admin/config.yml`, replace nothing else if using Git Gateway (it's already configured
      for it) — just confirm the `branch:` matches your repo's default branch.
- [ ] After every CMS save, re-run `node build.js` and redeploy (or wire a Netlify build hook so
      this happens automatically — ask your host/developer to set `node build.js` as the build
      command with publish directory `.`)
- [ ] Alternative to Git Gateway: switch `backend.name` to `github` and set up a GitHub OAuth app
      (more setup, more control) — Decap CMS docs cover this if you outgrow Git Gateway

## 2. Contact & identity (content/site.json, editable via /admin/)

- [ ] Real email address, phone number, and mailing address (currently placeholders)
- [ ] Confirm legal status wording and EIN for the financial transparency section
- [ ] Confirm founding year
- [ ] Add real social media links
- [ ] Set the real production domain (currently `hoodhope.org`, confirmed from the brochure) —
      used in canonical URLs, Open Graph tags, and `sitemap.xml`

## 3. Forms — currently simulated, not connected (assets/js/main.js + data/formSchema.js)

Every form validates client-side and shows a success message, but **does not send data
anywhere yet**. Before launch, connect each to a real provider:

- [ ] Find Help (`/find-help/`) → CRM or case management workflow
- [ ] Partner Inquiry (`/partners/`) → CRM, routed by partner type and metro
- [ ] Volunteer (`/volunteer/`) → volunteer management platform
- [ ] Contact (`/contact/`) → routed inbox or CRM queue
- [ ] Donate (`/donate/`) → real donation platform (Stripe, Donorbox, Givebutter, or Every.org) —
      the current campaign context ($2,847,500 St. Louis Flagship ask) is real and should carry
      through to whatever platform is connected

## 4. Resource directory & map (content/metros/*.json, editable via /admin/)

- [ ] St. Louis and Wichita resources are real organizations (housing authority, HUD-approved
      counseling, FQHC, food bank, 211) gathered via web research — spot-check each address,
      phone number, and map coordinate against the organization's own site before treating this
      as finished public support information
- [ ] Map pin coordinates are best-estimate geocoding, not from a verified geocoding API — replace
      with precise coordinates if exact pin placement matters (e.g. via Google Maps "share
      location" or a geocoding service)
- [ ] The Urban League of Kansas (Wichita) entry is missing a confirmed street address — add once
      available
- [ ] Kansas City, Dallas, and Detroit intentionally show only the 211 helpline — populate their
      directories once H.O.O.D. Hope licenses a local operator in each metro

## 5. Leadership & board (content/leadership.json, editable via /admin/)

- [ ] Executive team (Nigel Johnson, Ernest Gauss, Joshua Kimbrough-El) is populated from the
      brochure — add headshots if available (currently a monogram placeholder)
- [ ] Add full board roster as it's finalized

## 6. Financial transparency & reports (content/reports.json + content/model.json)

- [ ] The St. Louis Flagship budget allocation ($6.12M total, 5 categories) and ROI projections
      on `/reports/` and `/model/` are real pro forma figures from the funding prospectus, clearly
      labeled as such — replace with audited actuals once available
- [ ] Add the first annual report (PDF) and link it
- [ ] Add the Form 990 link once available

## 7. Analytics & tracking

- [ ] Add an analytics tag (e.g. GA4 or Plausible) in `lib/layout.js` `<head>`
- [ ] Set up conversion tracking on the four primary actions: Find Help, Partner, Donate,
      Volunteer

## 8. Multilingual

- [ ] `content/site.json` → `data/site.js` has a `languages` array ready for a Spanish translation
      pass; translated content and `/es/` routes are not yet built (Phase 2/3 per the roadmap)

## Already done

- Real brand system extracted from the brochure: navy (#1B2B4B) / gold (#C9A227) / cream
  (#F8F6F1), Playfair Display + Poppins, real logo and hero photography
- Full storytelling rebuild around the actual brochure content: 5-Stage Path to Homeownership,
  WEL9 methodology mapped to the Social Determinants of Health, the licensing framework, the real
  St. Louis Flagship partner (Vision for Children at Risk) and market data, and an honest 3-phase
  rollout status (St. Louis = active flagship, Wichita = next, Kansas City/Dallas/Detroit =
  roadmap) instead of overclaiming five simultaneous active launches
- Interactive 5-stage stepper, WEL9 wheel, metro selector, live Leaflet resource map with
  category filtering, donation presets, accessible forms
- Real, sourced local resources for St. Louis and Wichita with `lastVerified` dates
- A working, non-technical CMS (Decap) covering every content collection on the site
- Mobile-first, responsive across all breakpoints
- WCAG AA color-contrast checked across every text/background pairing, including the new navy/gold
  system
- Skip link, semantic headings, labeled form fields, visible focus states, `aria-live` form
  status, `aria-current` navigation state, accessible tab pattern for the metro selector and
  5-stage stepper
- Unique SEO metadata (title, description, canonical, Open Graph, Twitter card) on every page,
  JSON-LD organization schema, `sitemap.xml` and `robots.txt` generated automatically
- Fast load: no frameworks, no build step, minimal external requests (Google Fonts, Leaflet/OSM
  tiles only on pages that need them)
