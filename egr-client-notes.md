# EGR — Client call notes

_Call with Bernard O'Connor (owner) & Zoe Kinahan (senior manager). Requirements record only — no site changes made from this file._

## Confirmed facts (brand rule = no fabrication)
- 2,000+ systems installed — confirmed current
- 5.0 stars from ~93 Google reviews — confirmed
- Installing since 2017 — confirmed
- Service counties (Bernard's list): Cork, Limerick, Tipperary, Clare, Kerry,
  Waterford, Wexford, Kilkenny, Carlow, Wicklow, Kildare, Laois, Offaly.
  Kildare + Laois = strong existing-customer areas. Confirm current county set
  against this (Dublin was "early days" — verify it stays).

## Suppliers / brands (CORRECTED — confirmed list)
- Confirmed current suppliers, ONLY these 5:
  1. Maxeon  (correct spelling — NOT "Maxion")
  2. Jinko Solar
  3. Sigenergy
  4. Tongwei / TW Solar
  5. SAJ
- REMOVED from the site: Solis, Dyness, myenergi, Sofar, EO.
- DONE: brand/manufacturer prose updated to the 5 across solar-pv, residential,
  battery-storage, ev-charging (panels = Maxeon/TW/Jinko; battery & inverter =
  SAJ/Sigenergy).
- DONE: "Brands we install" logo strip added to why-egr and solar-pv only
  (NOT the footer) — 5 placeholder slots awaiting real logo files for the 5
  brands (drop into images/brands/).
- OPEN QUESTION for EGR: which EV charger brand do they actually fit? The 5
  confirmed suppliers are panel/inverter/battery brands; the EV page currently
  uses SAJ/Sigenergy as a placeholder + "other brands on request" — needs
  confirming (likely myenergi or EO if they still fit those).

## Build changes requested
- BUMP THE LOGO larger / more prominent in the header — Bernard brand-building,
  wants EGR.ie instantly recognisable.
- PUSH GROUND-MOUNT SYSTEMS more prominently — demand shifting to ground-mount;
  Bernard supplying real ground-mount install photos.

## Finance / "spread the cost" section (Bernard wants this)
- Promote payment-spreading HARD but NEVER use the word "finance" — frame as
  "spread the cost".
- Savings-model framing (his example): ~€10k system over 5 yrs ≈ €200/mo;
  generates ~€2,176/yr value; net "cost" ~€300/yr for 5 yrs, then pure saving.
  Benefit framing, not loan/interest terms.
- Belongs on Grant & Finance page (to build). Partner: Finance Ireland (up to
  10yr); commercial uses SBCI-subsidised loan model.

## Assets EGR is supplying (real photos — replace AI stand-ins)
- Real install photos incl. ground-mount (from their WordPress media library)
- Team headshots: Bernard, Zoe, Paul, Patrick, Kerrie, Adam, Claire → fill the
  5 empty why-egr team slots with REAL photos (no AI faces)
- Manufacturer logos for the 5 confirmed suppliers (Maxeon, Jinko Solar,
  Sigenergy, Tongwei / TW Solar, SAJ); Finance Ireland; SEAI / Safe Electric badges

## Still outstanding from EGR (launch blockers)
- Real tracking IDs (GTM/GA4/Google Ads/Meta Pixel) + confirm nothing already
  firing pre-consent
- GHL form: background transparent + post-submit redirect to /thank-you.html
  (their GoHighLevel builder — cross-origin, we can't change it)
- Legal sign-off: reg number, registered address, data retention, processors
  (GHL/SEAI/finance partner/BER), any data leaving EEA
- Public email confirm, real WhatsApp number, Google reviews URL
- Decision: do they want Grant & Finance + About pages for launch?

## Hosting / deploy
- Hosting moving Catherine → Keith (their IT). Deploy/DNS via Keith. Site on
  GitHub Pages preview now, destined for production.
