# EGR Solar — Brand Kit

Single source of truth for the egr.ie rebuild. All pages read from this file.
Eco Green Resources Ltd (EGR Solar) — egr.ie — Tipperary-based residential solar specialist.

---

## Logo & brand assets

Logos live in `/images/brand/`, real photography in `/images/real/`. Reference these files — never recreate or invent a logo.

All logos are the same horizontal lockup: emblem (leaf-circle + plug + orange spiral) followed by the "EGR.ie" wordmark with "ECO GREEN RESOURCES" tagline beneath.

| Asset | File | Use |
|-------|------|-----|
| **Horizontal logo — PRIMARY (transparent PNG, 500×500)** | `images/brand/egr-png-trans-logo.png` | **Default logo everywhere.** Transparent background, highest-quality raster — sits cleanly on white, off-white and tinted surface sections. Use this in the nav header. |
| Horizontal logo — WHITE knockout (transparent PNG, 500×500) | `images/brand/egr-png-trans-logo-white.png` | White version for dark/forest backgrounds — footer, dark bands, photo overlays. All visible pixels are white; transparency preserved. ⚠️ **Placeholder** — auto-generated white-out of the primary logo (no green/amber, flattens the emblem detail). Replace with a real designer-made white version from EGR. |
| Horizontal logo (PNG, white bg, 500×500) | `images/brand/egr-png-logo.png` | Same logo on a solid white plate. Use only where you explicitly want a white block behind it. |
| Horizontal logo (JPG, white bg, 500×500) | `images/brand/egr-jpg-logo.jpg` | Flat JPEG on white — for contexts that need a JPG (e.g. some email/third-party tools). No transparency. |
| Horizontal logo (transparent PNG, 397×124) | `images/brand/egrie_logo_legacy.png` | Older, smaller transparent version. Superseded by `egr-png-trans-logo.png`; keep as a lightweight fallback only. |
| Stacked logo (SVG) | `images/brand/egr-svg-logo.svg` | Stacked emblem-above-wordmark, on white. Use where you'd prefer an `.svg` reference (it resizes via the container). See caveat below — it's a raster-in-SVG, not true vector. |
| Stacked logo (JPG) | `images/brand/egr-fb-logo.jpg` | Stacked lockup as a flat JPG — social avatar, footer mark, anywhere width is tight. White background. |
| Brand install photo | `images/real/clip11-egr-brand.png` | Real proof imagery — hero/section background. White Irish semi-d with black roof panels, blue sky; "Eco Green Resources" logo lockup overlaid bottom-left. |

The emblem: a green leaf-and-circle motif wrapping a plug and an orange spiral (sun/coil) — eco + electric. The greens and amber in the logo are the source of the colour palette below.

Logo usage rules:
- Default to `egr-png-trans-logo.png` (transparent, 500×500). Its transparency means no white box on off-white or tinted sections.
- Maintain clear space around the logo equal to the height of the "E" in EGR.
- The full-colour logos use a green wordmark and don't read on dark/forest backgrounds. On dark/forest sections use the white knockout `egr-png-trans-logo-white.png` (or place a colour logo inside a white container).
- Prefer the horizontal logo everywhere; fall back to the stacked version only where width is constrained.
- `clip11-egr-brand.png` already has the logo burned in — don't overlay the logo again on top of it.
- Always include `alt="EGR Solar — Eco Green Resources"` on the logo.

> Caveat on `egr-svg-logo.svg`: despite the `.svg` extension, the file is a raster PNG embedded inside an SVG wrapper — not true vector paths. It scales via its container but will soften if blown up large. For crisp edges at any size, prefer `egr-png-trans-logo.png` at its native 500×500, or request a genuine vector (path-based) logo from the client.
>
> Still not supplied by the client: a true vector logo, and a proper designer-made white version (the current `egr-png-trans-logo-white.png` is an auto-generated placeholder). Worth requesting both.

---

## Brand personality

Warm, local, plain-spoken, trustworthy. A Tipperary solar specialist, not a corporate
utility. Confident but never hypey. "The team that quotes you is the team that installs."
Positioning: the fast, local, residential solar specialist for Munster and South Leinster.

Wins on: grant clarity, speed (1-hour callback), local presence, warranties.
Does NOT compete on: size (vs utilities) or award count (vs Activ8).

---

## Colour palette

Derived from the EGR logo, tuned for web contrast/accessibility.

| Token | Hex | Use |
|-------|-----|-----|
| Primary green | `#2E7D00` | Brand, headings, primary buttons, links |
| Lime accent | `#78A800` | Highlights, icons, gradient partner, eyebrow text |
| Deep forest | `#1F5400` | Footer, dark sections, depth, gradient base |
| CTA amber | `#F4A024` | Quote buttons ONLY — the one "click me" colour |
| Neutral dark | `#1A1A1A` | Body text |
| Off-white | `#F7F9F4` | Section backgrounds, surface tint |
| White | `#FFFFFF` | Base background, cards |

### CSS custom properties (paste into :root)

```css
:root {
  --color-primary:   #2E7D00;
  --color-accent:    #78A800;
  --color-forest:    #1F5400;
  --color-cta:       #F4A024;
  --color-text:      #1A1A1A;
  --color-surface:   #F7F9F4;
  --color-white:     #FFFFFF;

  /* tints / states */
  --color-primary-hover: #266800;
  --color-cta-hover:     #E08E10;
  --color-text-muted:    #5A5F54;
  --color-border:        #E2E6DC;
}
```

Rules:
- Amber `--color-cta` is reserved for quote/conversion buttons only. Never use it for body or decoration.
- Greens carry the brand everywhere else. Forest for dark sections and the footer.
- Every value must use a custom property — no hard-coded hex anywhere in page CSS.

---

## Typography

Headings: **Poppins** (geometric, rounded — echoes the EGR logo wordmark)
Body: **Inter** (screen-legible workhorse)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
```

Hierarchy:
- H1 — Poppins 700, large, tight line-height. Hero headline.
- H2 — Poppins 600, section headings.
- H3 — Poppins 600, card titles.
- Eyebrow/label — Inter 600, uppercase, small, in lime accent (above section headings).
- Body — Inter 400, comfortable line-height (1.6).
- Headings darker (text/primary), body slightly lighter (muted) for contrast.

---

## Buttons

- Primary CTA: amber `--color-cta` background, dark text, rounded corners, subtle shadow.
  Hover: `--color-cta-hover`, slight scale (1.03) + lift over 300ms.
- Secondary: primary-green background, white text. Same hover transition.
- Tertiary/ghost: transparent, green border + green text.
- Consistent border-radius across the whole site (set once, reuse).

---

## Spacing & layout

- Generous section padding — breathing room over density (premium feel, not cramped).
- Consistent vertical rhythm between sections (set a section-padding token, reuse everywhere).
- Max content width with comfortable side gutters; full-bleed only for dark/forest bands.
- Mobile-first: 70%+ of traffic is mobile. Design mobile first, scale up.

---

## Imagery

- Real EGR install photos, team, van — preferred (warm, local, authentic).
- Higgsfield AI for gaps (team/van/install context) ONLY where real photos are missing.
- Never stock photos for testimonials/people — EGR has 93 real reviews, use real proof.

---

## Trust assets (real — use prominently)

- 93 Google reviews, 5.0★ — rating chip beside every quote CTA.
- 2,000+ systems installed.
- Certifications: SEAI, Safe Electric, Teagasc.
- Warranties: 30-yr panel, 3-yr parts & labour, 5-yr workmanship, 24/7 monitoring.

---

## The offer (accuracy is a trust advantage — never overstate)

- €1,800 SEAI residential grant — frozen for 2026 (first time ever; the urgency angle).
- 0% VAT on installation.
- Grant deducted up front + finance "from €X/month" via Finance Ireland. [€X = TBC]
- NEVER use €2,100 or outdated grant figures (competitors do — EGR's accuracy is a selling point).
- Delete/avoid the old "60% agriculture grant €90,000" framing on residential pages.
