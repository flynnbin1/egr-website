/* ==========================================================================
   EGR Solar — Lead Survey Funnel
   Static, dependency-free quiz. Mobile-first, full-screen steps,
   image-card answers, auto-advance, progress bar, contact captured last.
   ========================================================================== */

/* ----- CONFIG --------------------------------------------------------------
   PASTE YOUR GOHIGHLEVEL INBOUND WEBHOOK URL BELOW.
   In GHL: Automation → Workflows → new Workflow → trigger "Inbound Webhook"
   → copy the URL. Until this is set, submissions are simulated locally
   (payload is logged to the console) and NO data leaves the browser.
--------------------------------------------------------------------------- */
const CONFIG = {
  GHL_WEBHOOK_URL: "", // <-- e.g. "https://services.leadconnectorhq.com/hooks/xxxx/webhook-trigger/yyyy"
  SOURCE: "egr-survey-funnel",
};

/* ----- Icons (inline stroke SVG) ------------------------------------------ */
const I = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  home:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>',
  rent:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M2 21h20"/><path d="M8 8h.01M8 12h.01M8 16h.01"/></svg>',
  sun:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M10 10l-2 4h4l-2 4" stroke-width="1.6"/></svg>',
  ev:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M2 20h14"/><path d="M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V11l-2-2"/><path d="M6 9h6"/></svg>',
  euro:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6.5A7 7 0 1 0 18 17.5"/><path d="M3 10h9M3 14h8"/></svg>',
  bolt:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z"/></svg>',
  house_up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M12 20v-5"/><path d="M9.5 13.5L12 11l2.5 2.5"/></svg>',
  leaf:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z"/><path d="M4 20c3-4 6-6 10-7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
  doc:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M9 13h6M9 17h6"/></svg>',
  badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14l-1 7 4-2 4 2-1-7"/><path d="M12 6v3l2 1" stroke-width="1.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  star:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 2 6a2 2 0 0 1 2-2z"/></svg>',
  lock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>',
};

// Counties EGR serves — matched exactly to the live GHL survey, alphabetical.
const COUNTIES = [
  "Carlow", "Clare", "Cork", "Dublin", "Galway", "Kerry", "Kildare",
  "Kilkenny", "Laois", "Limerick", "Offaly", "Tipperary", "Waterford",
  "Wexford", "Wicklow",
];

/* ----- Step definitions ---------------------------------------------------- */
const STEPS = [
  {
    type: "welcome",
    key: "owns_home",
    kicker: "Free solar quote · takes 30 seconds",
    headline: "Get your free <span style='color:var(--green)'>solar</span> quote in 30 seconds",
    help: "Answer a few quick questions and we'll build your no-obligation quote — SEAI grant & 0% VAT fully handled.",
    question: "Do you own your home?",
    layout: "2",
    options: [
      { value: "Yes", label: "Yes", icon: I.home },
      { value: "No", label: "No", icon: I.rent },
    ],
  },
  {
    type: "choice",
    key: "product_interest",
    question: "What are you looking for?",
    options: [
      { value: "Solar", label: "Solar panels", icon: I.sun },
      { value: "Solar & Battery", label: "Solar + battery storage", icon: I.battery },
      { value: "EV Charger", label: "EV charger", icon: I.ev },
    ],
  },
  {
    type: "choice",
    key: "motivation",
    question: "What matters most to you?",
    options: [
      { value: "Saving money", label: "Cutting my bills", icon: I.euro },
      { value: "Energy independence", label: "Energy independence", icon: I.bolt },
      { value: "Property value", label: "Adding home value", icon: I.house_up },
      { value: "Environment", label: "Going greener", icon: I.leaf },
    ],
  },
  {
    type: "choice",
    key: "annual_spend",
    question: "Roughly what do you spend on electricity a year?",
    help: "A ballpark is fine — it helps us size your system.",
    options: [
      { value: "Under €1k", label: "Under €1,000", icon: I.euro },
      { value: "€1k–€1.5k", label: "€1,000 – €1,500", icon: I.euro },
      { value: "€1.5k–€2k", label: "€1,500 – €2,000", icon: I.euro },
      { value: "€2k+", label: "€2,000+", icon: I.euro },
    ],
  },
  {
    type: "choice",
    key: "timeframe",
    question: "When are you hoping to get installed?",
    options: [
      { value: "ASAP", label: "As soon as possible", icon: I.bolt },
      { value: "Next 6 weeks", label: "Within 6 weeks", icon: I.clock },
      { value: "3–6 months", label: "In 3–6 months", icon: I.calendar },
      { value: "Just researching", label: "Just researching for now", icon: I.search },
    ],
  },
  {
    type: "choice",
    key: "seai_grant",
    question: "Where are you with the SEAI grant?",
    help: "No worries if you're not sure — we handle the whole application for you.",
    options: [
      { value: "Haven't looked", label: "Haven't looked into it yet", icon: I.search },
      { value: "Think eligible", label: "I think I'm eligible", icon: I.badge },
      { value: "Applied", label: "I've applied", icon: I.doc },
      { value: "Approved/received", label: "Approved or already received", icon: I.check },
    ],
  },
  {
    type: "text",
    key: "county",
    question: "Which county are you in?",
    help: "We install across Munster & South Leinster.",
    field: { control: "select", label: "County", placeholder: "Choose your county", options: COUNTIES, required: true },
  },
  {
    type: "text",
    key: "eircode",
    question: "What's your Eircode?",
    help: "This helps us check your roof and size your quote accurately.",
    field: { control: "input", type: "text", label: "Eircode", placeholder: "e.g. T12 GH6E", required: true, minlen: 4, autocomplete: "postal-code" },
  },
  {
    type: "contact",
    key: "contact",
    question: "Where should we send your quote?",
    help: "We'll get your free quote ready and call you back — usually within the hour.",
    fields: [
      { key: "full_name", label: "Full name", type: "text", placeholder: "Your name", required: true, autocomplete: "name" },
      { key: "phone", label: "Mobile number", type: "tel", placeholder: "08X XXX XXXX", required: true, autocomplete: "tel" },
      { key: "email", label: "Email", type: "email", placeholder: "you@email.com", required: true, autocomplete: "email" },
    ],
    submitLabel: "Get my free quote",
  },
  { type: "thankyou" },
];

const ANSWERABLE = STEPS.filter((s) => s.type !== "thankyou").length;

/* ----- State --------------------------------------------------------------- */
const STORE_KEY = "egr_survey_state";
let index = 0;
const answers = {};

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && saved.answers) Object.assign(answers, saved.answers);
    if (typeof saved.index === "number" && saved.index > 0 && saved.index < STEPS.length - 1) {
      index = saved.index; // resume where they left off (not the thank-you screen)
    }
  } catch (e) { /* ignore corrupt state */ }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ answers, index })); } catch (e) {}
}
function clearState() {
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
}

/* ----- DOM refs ------------------------------------------------------------ */
const stage = document.getElementById("stage");
const backBtn = document.getElementById("backBtn");
const progressFill = document.getElementById("progressFill");
const progressBar = document.querySelector(".progress");
const progressLabel = document.getElementById("progressLabel");

/* ----- Rendering ----------------------------------------------------------- */
function optionCard(step, opt) {
  const icon = opt.icon ? `<span class="option__icon" aria-hidden="true">${opt.icon}</span>` : "";
  return `
    <button class="option${answers[step.key] === opt.value ? " is-selected" : ""}" type="button" data-value="${opt.value}">
      ${icon}
      <span class="option__label">${opt.label}</span>
      <span class="option__tick" aria-hidden="true">${I.check}</span>
    </button>`;
}

function render() {
  const step = STEPS[index];
  updateChrome();
  let html = "";

  if (step.type === "welcome") {
    html = `
      <section class="step step--animate">
        <div class="welcome__hero">
          <img src="assets/hero-solar-home.jpg" alt="Irish home fitted with rooftop solar panels by EGR" />
          <span class="welcome__hero-badge">${I.shield}<span>SEAI approved installer</span></span>
        </div>
        <span class="kicker">${I.bolt}${step.kicker}</span>
        <h1 class="step__q">${step.headline}</h1>
        <p class="step__help">${step.help}</p>
        <h2 class="step__q" style="font-size:clamp(1.15rem,4.5vw,1.4rem);margin-top:1.5rem">${step.question}</h2>
        <div class="options options--2">
          ${step.options.map((o) => optionCard(step, o)).join("")}
        </div>
        <ul class="trust">
          <li><span class="star">${I.star}</span> 5.0 · 93 reviews</li>
          <li>${I.check} 2,000+ installed</li>
          <li>${I.check} 0% VAT handled</li>
        </ul>
      </section>`;
  }

  else if (step.type === "choice") {
    html = `
      <section class="step step--animate">
        <h1 class="step__q">${step.question}</h1>
        ${step.help ? `<p class="step__help">${step.help}</p>` : ""}
        <div class="options options--${step.layout || "1"}">
          ${step.options.map((o) => optionCard(step, o)).join("")}
        </div>
      </section>`;
  }

  else if (step.type === "text") {
    const f = step.field;
    const val = answers[step.key] || "";
    let control;
    if (f.control === "select") {
      control = `<select class="field__input" id="f_${step.key}" ${f.required ? "required" : ""}>
        <option value="" ${!val ? "selected" : ""} disabled>${f.placeholder}</option>
        ${f.options.map((o) => `<option value="${o}" ${val === o ? "selected" : ""}>${o}</option>`).join("")}
      </select>`;
    } else {
      control = `<input class="field__input" id="f_${step.key}" type="${f.type || "text"}"
        placeholder="${f.placeholder}" value="${val}" ${f.autocomplete ? `autocomplete="${f.autocomplete}"` : ""}
        inputmode="${f.type === "tel" ? "tel" : "text"}" />`;
    }
    html = `
      <section class="step step--animate">
        <h1 class="step__q">${step.question}</h1>
        ${step.help ? `<p class="step__help">${step.help}</p>` : ""}
        <div class="field">
          <label class="field__label" for="f_${step.key}">${f.label}</label>
          ${control}
          <p class="field__error" id="e_${step.key}">Please enter your ${f.label.toLowerCase()}.</p>
        </div>
        <div class="step__actions">
          <button class="btn btn--primary" id="continueBtn" type="button">Continue</button>
        </div>
      </section>`;
  }

  else if (step.type === "contact") {
    html = `
      <section class="step step--animate">
        <h1 class="step__q">${step.question}</h1>
        ${step.help ? `<p class="step__help">${step.help}</p>` : ""}
        <form id="contactForm" novalidate>
          ${step.fields.map((f) => `
            <div class="field">
              <label class="field__label" for="f_${f.key}">${f.label}</label>
              <input class="field__input" id="f_${f.key}" name="${f.key}" type="${f.type}"
                placeholder="${f.placeholder}" value="${answers[f.key] || ""}"
                autocomplete="${f.autocomplete}" inputmode="${f.type === "tel" ? "tel" : f.type === "email" ? "email" : "text"}" />
              <p class="field__error" id="e_${f.key}"></p>
            </div>`).join("")}
          <div class="hp" aria-hidden="true">
            <label>Leave this field empty<input type="text" id="f_website" tabindex="-1" autocomplete="off" /></label>
          </div>
          <div class="step__actions">
            <button class="btn btn--primary" id="submitBtn" type="submit">${step.submitLabel}</button>
          </div>
          <p class="reassure">${I.phone}<span>We'll call you back, usually within the hour. Your details are only used for your quote.</span></p>
          <p class="legal">By submitting, you agree to be contacted by EGR about your enquiry. See our <a href="https://egr.ie/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
        </form>
      </section>`;
  }

  else if (step.type === "thankyou") {
    const name = (answers.full_name || "").split(" ")[0];
    html = `
      <section class="step step--animate thanks">
        <div class="thanks__check">${I.check}</div>
        <h1 class="step__q">Thanks${name ? ", " + name : ""} — you're all set!</h1>
        <p class="step__help">Your free solar quote is on its way. An EGR advisor will call you back, usually within the hour.</p>
        <ol class="thanks__next">
          <li><span class="num">1</span><span>We review your answers and prepare your tailored quote.</span></li>
          <li><span class="num">2</span><span>We call you to confirm details and answer any questions.</span></li>
          <li><span class="num">3</span><span>You get your SEAI grant &amp; 0% VAT fully handled — no paperwork.</span></li>
        </ol>
        <ul class="trust" style="justify-content:center;margin-top:1.5rem">
          <li><span class="star">${I.star}</span> 5.0 from 93 Google reviews</li>
        </ul>
      </section>`;
  }

  stage.innerHTML = html;
  bindStep();
  // move keyboard focus to the step heading for screen-reader users
  const h = stage.querySelector("h1");
  if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  stage.scrollTop = 0;
  window.scrollTo({ top: 0 });
}

function updateChrome() {
  const step = STEPS[index];
  backBtn.hidden = index === 0 || step.type === "thankyou";
  const pct = step.type === "thankyou" ? 100 : Math.round((index / ANSWERABLE) * 100);
  progressFill.style.width = pct + "%";
  progressBar.setAttribute("aria-valuenow", String(pct));
  progressLabel.textContent = step.type === "thankyou"
    ? "Complete"
    : `Step ${index + 1} of ${ANSWERABLE}`;
}

/* ----- Step behaviour ------------------------------------------------------ */
function bindStep() {
  const step = STEPS[index];

  if (step.type === "welcome" || step.type === "choice") {
    stage.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        stage.querySelectorAll(".option").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        answers[step.key] = btn.dataset.value;
        saveState();
        // brief highlight, then auto-advance
        setTimeout(next, 260);
      });
    });
  }

  if (step.type === "text") {
    const input = document.getElementById("f_" + step.key);
    const err = document.getElementById("e_" + step.key);
    const cont = document.getElementById("continueBtn");
    const go = () => {
      const v = (input.value || "").trim();
      const f = step.field;
      const ok = v && (!f.minlen || v.length >= f.minlen);
      if (!ok) {
        input.classList.add("has-error");
        err.classList.add("show");
        input.focus();
        return;
      }
      answers[step.key] = v;
      saveState();
      next();
    };
    cont.addEventListener("click", go);
    input.addEventListener("input", () => { input.classList.remove("has-error"); err.classList.remove("show"); });
    if (input.tagName === "INPUT") {
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); go(); } });
    }
  }

  if (step.type === "contact") {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (e) => { e.preventDefault(); submitContact(step); });
  }
}

const VALIDATORS = {
  full_name: (v) => v.trim().length >= 2 && /[a-zA-Z]/.test(v),
  phone: (v) => (v.replace(/[^\d]/g, "").length >= 7),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
};
const ERRORS = {
  full_name: "Please enter your name.",
  phone: "Please enter a valid mobile number.",
  email: "Please enter a valid email address.",
};

function submitContact(step) {
  // honeypot — silently succeed for bots
  const hp = document.getElementById("f_website");
  if (hp && hp.value) { goThankYou(); return; }

  let valid = true;
  step.fields.forEach((f) => {
    const input = document.getElementById("f_" + f.key);
    const err = document.getElementById("e_" + f.key);
    const v = input.value || "";
    const ok = VALIDATORS[f.key] ? VALIDATORS[f.key](v) : v.trim().length > 0;
    if (!ok) {
      valid = false;
      input.classList.add("has-error");
      err.textContent = ERRORS[f.key] || "This field is required.";
      err.classList.add("show");
    } else {
      answers[f.key] = v.trim();
      input.classList.remove("has-error");
      err.classList.remove("show");
    }
    input.addEventListener("input", () => { input.classList.remove("has-error"); err.classList.remove("show"); }, { once: true });
  });
  if (!valid) {
    const firstErr = stage.querySelector(".field__input.has-error");
    if (firstErr) firstErr.focus();
    return;
  }
  saveState();
  sendLead();
}

function buildPayload() {
  return {
    source: CONFIG.SOURCE,
    owns_home: answers.owns_home || "",
    product_interest: answers.product_interest || "",
    motivation: answers.motivation || "",
    annual_spend: answers.annual_spend || "",
    timeframe: answers.timeframe || "",
    seai_grant: answers.seai_grant || "",
    county: answers.county || "",
    eircode: answers.eircode || "",
    full_name: answers.full_name || "",
    phone: answers.phone || "",
    email: answers.email || "",
    page_url: location.href,
    submitted_at: new Date().toISOString(),
  };
}

async function sendLead() {
  const btn = document.getElementById("submitBtn");
  const label = btn.textContent;
  btn.disabled = true;
  btn.innerHTML = '<span class="btn__spinner"></span> Sending…';
  const payload = buildPayload();

  if (!CONFIG.GHL_WEBHOOK_URL) {
    // No webhook wired yet — simulate so the flow is fully testable without
    // sending anything anywhere. Replace CONFIG.GHL_WEBHOOK_URL to go live.
    console.info("[EGR survey] No GHL_WEBHOOK_URL set — lead NOT sent. Payload:", payload);
    setTimeout(goThankYou, 700);
    return;
  }

  try {
    await fetch(CONFIG.GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // GHL inbound webhooks accept the POST; response may be opaque under CORS.
    // Delivery does not depend on reading the response.
    goThankYou();
  } catch (err) {
    console.error("[EGR survey] Lead POST failed:", err);
    btn.disabled = false;
    btn.textContent = label;
    let e = document.getElementById("e_email");
    if (e) { e.textContent = "Something went wrong sending your details. Please try again."; e.classList.add("show"); }
  }
}

function goThankYou() {
  index = STEPS.length - 1;
  clearState(); // lead captured — don't resume this session
  /* TODO(tracking): fire the GTM / Facebook Pixel conversion event HERE, on
     thank-you view, to mirror the current thank-you-page conversion. Left
     intentionally unimplemented — do not change tracking without sign-off.
     e.g. window.dataLayer && window.dataLayer.push({ event: "survey_lead" }); */
  render();
}

/* ----- Navigation ---------------------------------------------------------- */
function next() {
  if (index < STEPS.length - 1) { index++; saveState(); render(); }
}
function back() {
  if (index > 0) { index--; saveState(); render(); }
}
backBtn.addEventListener("click", back);

/* ----- Init ---------------------------------------------------------------- */
loadState();
render();
