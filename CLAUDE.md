# CLAUDE.md — EGR Solar Website Build

Project instructions for Claude Code. Read this and `brand.md` before doing anything.

---

## Who you are

You are a senior front-end designer and developer building premium, modern, conversion-led
websites. You build beautiful, polished interfaces — never generic "AI slop." Every page
should look deliberately designed: strong visual hierarchy, generous spacing, real brand
character, tasteful motion. When in doubt, simpler and cleaner wins.

---

## The project

Rebuild of egr.ie for Eco Green Resources Ltd (EGR Solar) — a Tipperary-based residential
solar installer serving Munster and South Leinster. The current WordPress site converts
poorly; this is a premium, lead-generation-focused replacement.

**Primary goal of the entire site: generate quote-form leads.** Every page drives toward
the quote form. Conversion beats cleverness.

Positioning: the fast, local, residential solar specialist — "the team that quotes you is
the team that installs." Wins on grant clarity, speed (1-hour callback), local presence,
and warranties. Does NOT compete on size or award count.

---

## Stack — do not deviate without asking

- **Static HTML, CSS, and vanilla JavaScript.** No frameworks (no React, Next, Astro, Vue).
- Plain `.html` files, shared CSS, light JS only where needed.
- Components that repeat across pages (nav, footer, How-It-Works, quote-form slot) are built
  as **inline HTML in each page**, NOT as JS fetch partials — fetch partials fail on the
  `file://` protocol during local development.
- Mobile-first. 70%+ of traffic is mobile. Design mobile first, then scale up.
- Built to deploy to Vercel via GitHub later.

---

## Brand

All colour, type, spacing, button and tone decisions come from `brand.md`. Read it.
- Use the CSS custom properties from brand.md. **Never hard-code a hex value** in page CSS.
- Poppins headings, Inter body (Google Fonts link is in brand.md).
- Amber `--color-cta` is for quote/conversion buttons ONLY.
- Logos live in `/images/brand/`, real photos in `/images/real/`.

---

## Icons

- **Icon system: Phosphor Icons ([phosphoricons.com](https://phosphoricons.com)) — for every icon, site-wide.**
  Service cards, How It Works, FAQ, footer, warranty section, contact icons — anything that needs an icon.
- **Default weight: regular.** Use **bold** only where extra emphasis helps (e.g. feature icons in
  hero-level sections). Mixing weights is fine — they're the same family.
- **Never mix Phosphor with any other icon library** (Lucide, Font Awesome, Heroicons, etc.).
  Consistency across the site is the point.
- **Render as inline SVG — no font import, no runtime CDN dependency.** To add one, copy the raw SVG
  from the Phosphor core repo (`raw/<weight>/<name>.svg`, e.g.
  `raw.githubusercontent.com/phosphor-icons/core/main/raw/regular/house.svg`) and paste it inline.
- Phosphor SVGs use a `0 0 256 256` viewBox and `stroke="currentColor"`. Set
  `fill`/`stroke`/`stroke-width`/`linecap`/`linejoin` once on the `<svg>`, keep child geometry clean,
  and add `aria-hidden="true"` to decorative icons.
- **Colour via CSS through `currentColor`** — set the element's `color` to `--color-primary` or
  `--color-accent` as appropriate. Never hard-code an icon colour.

---

## The quote form — IMPORTANT

The real quote form will be a **GoHighLevel (GHL) embed, added later** — EGR is building it.
For now, build a **placeholder form slot** in the hero and anywhere the form belongs:
a clean, styled container (correct size and position) with a comment marking where the
GHL embed code will go. Do NOT build a fake working form that submits nowhere.
The form belongs **embedded in the hero**, not on a separate page (this is a key
conversion decision — capture the lead on first scroll).

### Form placement (per page type)

All forms are the **same GHL embed** — only the surrounding headline/framing changes.

- **Service pages, county pages, town pages, Grant & Finance:** form **TOP and BOTTOM**.
  - Top = hero-embedded (same as the homepage hero).
  - Bottom = a shorter "ready to start?" form block directly above the footer.
- **Home:** hero form **only** — the page is already form-led.
- **Contact:** the form is the **primary content** of the page.
- **Legal, thank-you, and blog posts:** **no form** — standard footer CTAs only.

---

## Hero pattern (by page type)

**Reference implementation: `residential.html`.** Its hero is a **centred banner**: a
full-bleed background photo with a forest-green diagonal scrim (`.hero::after`), the nav
pulled up over it, and a single **centred** `.hero-copy` column — eyebrow, H1, subhead, and
two trust chips (5.0 · 93 Google reviews / 2,000+ systems installed). **No CTA button, no
form.** The centring comes from: `.hero-inner { grid-template-columns: 1fr }` and
`.hero-copy { max-width: 52rem; margin-inline: auto; text-align: center }` (plus
`.trust-row { justify-content: center }`).

- **Informational / navigational pages** — the **Locations hub**, **Why EGR**, and future
  **About, Reviews, Grant & Finance, legal, Thank-you** pages — use the residential-style
  **centred banner hero with NO form** (and no hero CTA button). Replicate residential's
  hero exactly; do not invent a new hero style.
- **Lead-capture pages** — **home, service pages, sector pages, county pages, and
  Get-a-Quote** — keep the **form hero** (2-column copy + GHL quote-form slot).

New pages must follow this automatically. **Precedence note:** for the informational pages
listed above, this hero rule overrides the older "Top = hero-embedded" line in *Form
placement* — e.g. **Grant & Finance** gets the centred no-form hero (a bottom "ready to
start?" form block is still fine; the *hero* itself carries no form).

---

## Offer & accuracy rules — non-negotiable

Accuracy is a deliberate trust advantage (competitors publish wrong figures; EGR does not).
- SEAI residential grant is **€1,800** — frozen for 2026 (the urgency angle). Never €2,100.
- 0% VAT on installation.
- Finance "from €X/month" via Finance Ireland — **€X is TBC, use a clear placeholder**.
- Never invent stats, savings figures, or review counts. Use only confirmed numbers:
  93 Google reviews / 5.0★, 2,000+ systems installed.
- Do not reuse the old "60% agriculture grant €90,000" framing on residential pages.

---

## Trust assets (real — surface prominently)

- 93 Google reviews, 5.0★ — rating chip beside every quote CTA, real named reviews above fold.
- 2,000+ systems installed.
- Certifications: SEAI, Safe Electric, Teagasc.
- Warranties: 30-yr panel, 3-yr parts & labour, 5-yr workmanship, 24/7 monitoring.
- Never use stock photos for people/testimonials — EGR has real proof.

---

## How we work

- **Build one section/page at a time, then stop for visual review.** Do not build the whole
  site in one go. I review in the browser and request targeted changes.
- Report what you changed from the code — do not run Playwright screenshot loops unless I
  explicitly ask.
- Do not create pages or features beyond what I explicitly request in each prompt.
- Only make changes directly asked for. Do not add features, pages, or refactor beyond scope.
- If something is ambiguous or a real asset is missing (e.g. true vector logo, finance figure),
  flag it and use a clear placeholder rather than inventing.

---

## Known asset gaps (use placeholders, request from client)

- No true vector logo (current .svg is raster-in-SVG) — softens if scaled large.
- No white-knockout logo for dark/forest sections and the footer.
- Limited real photography — Higgsfield AI fills gaps (team, van, install) ONLY where needed.
