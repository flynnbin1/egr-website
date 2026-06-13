# EGR Solar — Site Architecture

The structural blueprint for the egr.ie rebuild. Read alongside CLAUDE.md and brand.md.
Static HTML/CSS/JS, lead-generation focused. Primary goal: quote-form leads.

Structural model: **SPV Energy (spvenergy.ie)** — hero-embedded form, county location
pages, grant + reviews above the fold. Beaten on the levers SPV leaves open: a 1-hour
callback (vs their 2–4 hours) and county pages not hard-coded to one town.
Form mechanic: **Project Solar (UK)** — multi-step, eircode-first, qualifies as it captures.
Homepage section layout + visual warmth: **Solure** (uploaded reference).

Shop: confirmed removed — site is cleanly lead-gen, single conversion action (get a quote).

---

## 1. Sitemap (new site)

Main nav: Home · Residential · Commercial · Agricultural · Locations · Grant & Finance ·
Why EGR · Reviews · About · Contact   [+ Get a Quote button, amber]

```
Home
├── Residential                         ← primary money page
│   ├── Solar PV                         ← supporting product page (SEO)
│   ├── Battery Storage                  ← supporting product page (SEO)
│   └── EV Charging                      ← supporting product page (SEO)
├── Commercial
├── Agricultural                         ← TAMS 60% grant lives HERE only
├── Locations                            ← net-new; the SEO differentiator
│   ├── Tipperary (hub)
│   │   ├── Clonmel
│   │   ├── Thurles
│   │   ├── Nenagh
│   │   └── Cashel
│   ├── Cork (hub)
│   │   ├── Mallow
│   │   └── Fermoy
│   ├── Limerick (hub)
│   ├── Kildare (hub)
│   │   ├── Naas
│   │   └── Newbridge
│   └── Suburban Leinster / Dublin (hub)
│       └── [towns TBC]
├── Grant & Finance                      ← merges seai-grant + funding + finance-ireland
├── Why EGR
├── Reviews & Case Studies
├── About
├── News / Blog                          ← migrate 13 existing posts
└── Contact

Funnel + legal (not in main nav):
├── Get a Quote / Thank-you              ← sets the 1-hour callback expectation
├── Privacy Policy
├── Cookie Policy
└── Copyright Notice
```

**County/town list is provisional — confirm with Zoe & Bernard.** Build as a repeatable
template regardless, so towns can be added/removed without structural change.

---

## 2. URL structure

Clean, hierarchical, SEO-friendly. Lowercase, hyphenated, trailing slash to match current.

| Page | New URL |
|------|---------|
| Home | `/` |
| Residential | `/residential/` |
| Solar PV | `/residential/solar-pv/` |
| Battery Storage | `/residential/battery-storage/` |
| EV Charging | `/residential/ev-charging/` |
| Commercial | `/commercial/` |
| Agricultural | `/agricultural/` |
| Locations hub | `/locations/` |
| County hub | `/locations/tipperary/` |
| Town page | `/locations/tipperary/clonmel/` |
| Grant & Finance | `/grant-and-finance/` |
| Why EGR | `/why-egr/` |
| Reviews | `/reviews/` |
| About | `/about/` |
| Blog index | `/news/` |
| Blog post | `/news/<existing-slug>/` |
| Contact | `/contact/` |
| Get a Quote | `/get-a-quote/` |
| Thank-you | `/thank-you/` |

Note: product pages nested under `/residential/` for topical SEO. If EGR wants them
top-level later, the template doesn't change — only the path.

---

## 3. Template strategy (for batch builds)

Pages fall into three groups:

**Unique pages (hand-built, one at a time):**
Home, Residential, Commercial, Agricultural, Grant & Finance, Why EGR, Reviews, About,
Contact, Get-a-Quote/Thank-you.

**Product template ×3** (Solar PV, Battery, EV) — one master template, three instances.

**Location templates ×2 — the batch-generated layer:**
- County-hub template (one per county)
- Town-page template (one per town)
Generated via a Python script from a data file (county/town + local copy), the same way
the Haven sub-service pages were built — reliable within token limits, consistent output.
Each town page: localised H1/intro, the shared quote form, grant + reviews, internal links
up to its county hub and across to Residential.

**Shared components (inline HTML in every page — NOT JS fetch partials):**
nav, footer, quote-form slot, trust bar, How-It-Works, final CTA banner.

**Form placement (per page type)** — all forms are the same GHL embed; only the
surrounding headline/framing differs:

| Page type | Top (hero) | Bottom (above footer) |
|-----------|-----------|------------------------|
| Service, county, town, Grant & Finance | ✅ hero-embedded (as homepage) | ✅ shorter "ready to start?" block |
| Home | ✅ hero form only | — (already form-led) |
| Contact | form **is** the primary content | — |
| Legal, thank-you, blog posts | — | — (standard footer CTAs only) |

---

## 4. Keep / Rebuild / Merge / Drop — all 40 current URLs

**KEEP & REBUILD (core content):**
Home · /about/ · /residential/ · /commercial-industrial/ · /agriculture/ · /solar-pv/ ·
/battery-storage-2/ · /ev-charging/ · /seai-grant/ · /contact/ · /news/ · 13 blog posts

**MERGE:**
/funding/ + /finance-ireland/ + /seai-grant/  →  one `/grant-and-finance/` page
(SEAI €1,800 + 0% VAT + Finance Ireland "from €X/month")

**REBUILD INTO FUNNEL:**
/site-survey/ → folded into the quote flow
/thank-you/ → rebuilt to set the 1-hour callback expectation

**KEEP (legal, low priority):**
/privacy-policy/ · /cookie-policy/ · /copyright-notice/

**KEEP (supporting content, fold in):**
/benefits-of-renewable-energy-in-ireland/ → fold into Residential or a blog post

**DROP ENTIRELY (drafts/tests — noindex + redirect, never go live):**
/our-team-new/ · /residential-new/ · /solar-pv-new/ · /battery-storage-new/ ·
/commercial-industrial-new/ · /contact-new/ · /new-home-test/ · /test-page/

**ADD (net-new):**
Locations hub + all county + town pages · Why EGR · Reviews & Case Studies ·
Get-a-Quote page

---

## 5. Redirect map (preserve SEO on launch — 301s)

| Old URL | → New URL |
|---------|-----------|
| /commercial-industrial/ | /commercial/ |
| /agriculture/ | /agricultural/ |
| /solar-pv/ | /residential/solar-pv/ |
| /battery-storage-2/ | /residential/battery-storage/ |
| /ev-charging/ | /residential/ev-charging/ |
| /seai-grant/ | /grant-and-finance/ |
| /funding/ | /grant-and-finance/ |
| /finance-ireland/ | /grant-and-finance/ |
| /site-survey/ | /get-a-quote/ |
| /benefits-of-renewable-energy-in-ireland/ | /news/ (or kept blog post) |
| /our-team-new/ | /about/ |
| /residential-new/ | /residential/ |
| /solar-pv-new/ | /residential/solar-pv/ |
| /battery-storage-new/ | /residential/battery-storage/ |
| /commercial-industrial-new/ | /commercial/ |
| /contact-new/ | /contact/ |
| /new-home-test/ | / |
| /test-page/ | / |
| /blog/<slug>/ | /news/<slug>/ (keep all 13, map each) |

Pages keeping same URL (no redirect needed): /, /about/, /residential/, /contact/,
/news/, /privacy-policy/, /cookie-policy/, /copyright-notice/, /thank-you/.

---

## 6. Build priority (per the competitive analysis)

1. Home (hero + quote form)
2. Get-a-Quote
3. Residential
4. Grant & Finance
5. 4–5 county pages (the differentiator — ship early)
6. Reviews
7. Then: product pages, town pages, Commercial, Agricultural, Why EGR, About, blog migration

The county location pages and the hero quote form are the two assets that most cleanly
beat the field. Ship those first.

---

## 7. Open items (confirm with Zoe & Bernard)

- County/town list — final set? (built as template either way)
- Finance "from €X/month" — real figure from Finance Ireland (placeholder until then)
- Heat pumps / biomass — still offered? (not in current crawl; may have narrowed to
  solar/battery/EV — confirm before deciding whether they need pages)
- GHL quote form — being built by EGR/Flowd; embed added later (placeholder slot for now)
