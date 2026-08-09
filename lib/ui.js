// Shared markup components ("Header", "Footer", "Hero", "ImpactCategoryGrid",
// "MetroSelector", forms, etc.) — plain functions returning HTML strings.
// Kept dependency-free on purpose so the whole site builds with `node build.js`
// and no package installs.

const site = require("../data/site");
const metros = require("../data/metros");
const impactCategories = require("../data/impactCategories");
const { icon } = require("./icons");

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function skipLink() {
  return `<a class="skip-link" href="#main">Skip to content</a>`;
}

function header(activeHref = "") {
  const navLinks = site.nav
    .map((item) => {
      const isActive = activeHref === item.href;
      return `<a href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
    })
    .join("\n");

  return `
<header class="site-header">
  <div class="site-header-row">
    <a class="brand" href="/" aria-label="${esc(site.org.name)} home">
      <span class="brand-mark"><img src="${site.brand.logo}" alt="" width="46" height="46" /></span>
      <span class="brand-text">
        <strong>${esc(site.org.name)}</strong>
        <small>${esc(site.org.fullName)}</small>
      </span>
    </a>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
      ${icon("menu", { className: "icon nav-toggle-open" })}
      ${icon("close", { className: "icon nav-toggle-close" })}
      <span>Menu</span>
    </button>

    <div class="header-actions">
      <a class="button small ghost" href="${site.secondaryActions.donate.href}">${site.secondaryActions.donate.label}</a>
      <a class="button small primary" href="${site.primaryActions.findHelp.href}">${site.primaryActions.findHelp.label}</a>
    </div>
  </div>

  <nav class="nav-links" id="primary-nav" aria-label="Primary">
    ${navLinks}
    <a class="nav-partner" href="${site.primaryActions.partner.href}">${site.primaryActions.partner.label}</a>
  </nav>
</header>`;
}

function footer() {
  const columns = site.footerColumns
    .map(
      (col) => `
    <div class="footer-col">
      <h3>${esc(col.heading)}</h3>
      <ul>
        ${col.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("\n")}
      </ul>
    </div>`
    )
    .join("\n");

  return `
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="${esc(site.org.name)} home">
        <span class="brand-mark"><img src="${site.brand.logo}" alt="" width="46" height="46" /></span>
        <span class="brand-text">
          <strong>${esc(site.org.name)}</strong>
          <small>${esc(site.org.fullName)}</small>
        </span>
      </a>
      <p>${esc(site.org.shortMission)}</p>
      <div class="footer-contact">
        <a href="mailto:${site.contact.email}">${icon("mail", { size: 18 })}<span>${esc(site.contact.email)}</span></a>
        <a href="tel:${site.contact.phone.replace(/[^\d+]/g, "")}">${icon("phone", { size: 18 })}<span>${esc(site.contact.phone)}</span></a>
      </div>
    </div>
    <div class="footer-cols">
      ${columns}
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(site.org.name)}. All rights reserved.</p>
    <p class="footer-legal">${esc(site.org.legalStatus)}. A licensed national housing platform, architected to scale across 150+ metros.</p>
  </div>
</footer>`;
}

function eyebrow(text) {
  return `<p class="eyebrow">${esc(text)}</p>`;
}

function sectionHeading({ label, title, lede, level = "h2", align = "left" }) {
  return `
<div class="section-heading align-${align}">
  ${label ? eyebrow(label) : ""}
  <${level}>${title}</${level}>
  ${lede ? `<p>${lede}</p>` : ""}
</div>`;
}

function primaryActions({ style = "row", context = "" } = {}) {
  return `
<div class="hero-actions ${style}" aria-label="Primary actions${context ? " — " + context : ""}">
  <a class="button primary" href="${site.primaryActions.findHelp.href}">
    ${site.primaryActions.findHelp.label}
    ${icon("arrow", { size: 18 })}
  </a>
  <a class="button secondary" href="${site.primaryActions.partner.href}">
    ${site.primaryActions.partner.label}
    ${icon("arrow", { size: 18 })}
  </a>
</div>`;
}

function badge(text, tone = "neutral") {
  return `<span class="badge badge-${tone}">${esc(text)}</span>`;
}

function impactCategoryCard(cat, opts = {}) {
  const { compact = false } = opts;
  return `
<article class="impact-card">
  <span class="impact-icon">${icon(cat.icon, { size: 26 })}</span>
  <h3><a href="/impact/${cat.slug}/">${esc(cat.name)}</a></h3>
  <p>${esc(cat.summary)}</p>
  ${
    compact
      ? ""
      : `<ul class="impact-initiatives">
    ${cat.exampleInitiatives.slice(0, 3).map((i) => `<li>${esc(i)}</li>`).join("\n")}
  </ul>`
  }
  <a class="card-link" href="/impact/${cat.slug}/">Explore this pathway ${icon("arrow", { size: 16 })}</a>
</article>`;
}

function impactCategoryGrid(cats = impactCategories, opts = {}) {
  return `<div class="impact-grid">${cats.map((c) => impactCategoryCard(c, opts)).join("\n")}</div>`;
}

function phaseBadgeClass(phase) {
  if (phase === 1) return "badge-green";
  if (phase === 2) return "badge-blue";
  return "badge-neutral";
}

function metroCard(metro) {
  return `
<article class="metro-card-tile">
  <span class="badge ${phaseBadgeClass(metro.phase)}">${esc(metro.launchStatus)}</span>
  <h3><a href="/metros/${metro.slug}/">${esc(metro.name)}</a></h3>
  <p>${esc(metro.summary)}</p>
  <ul class="metro-focus">
    ${metro.focusAreas.map((f) => `<li>${esc(f)}</li>`).join("\n")}
  </ul>
  <a class="card-link" href="/metros/${metro.slug}/">View ${esc(metro.name)} hub ${icon("arrow", { size: 16 })}</a>
</article>`;
}

function metroGrid(list = metros) {
  return `<div class="metro-grid">${list.map(metroCard).join("\n")}</div>`;
}

// Interactive metro selector (tabs). Hydrated by assets/js/main.js — the
// markup itself is fully readable and linkable without JS (progressive
// enhancement, good for SEO and no-JS accessibility).
function metroSelector(list = metros) {
  const tabs = list
    .map(
      (m, i) => `<button class="metro-tab${i === 0 ? " is-active" : ""}" type="button" role="tab" id="metro-tab-${m.slug}" aria-selected="${i === 0}" aria-controls="metro-panel-${m.slug}" data-metro-tab="${m.slug}">${esc(m.name)}</button>`
    )
    .join("\n");

  const panels = list
    .map(
      (m, i) => `
  <div class="metro-panel${i === 0 ? " is-active" : ""}" id="metro-panel-${m.slug}" role="tabpanel" aria-labelledby="metro-tab-${m.slug}" data-metro-panel="${m.slug}" ${i === 0 ? "" : "hidden"}>
    <div class="metro-panel-inner">
      <div>
        <span class="badge ${phaseBadgeClass(m.phase)}">${esc(m.launchStatus)}</span>
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.summary)}</p>
        <a class="card-link" href="/metros/${m.slug}/">Visit the ${esc(m.name)} hub ${icon("arrow", { size: 16 })}</a>
      </div>
      <ul>
        <li>${icon("check", { size: 16 })} Local resource directory</li>
        <li>${icon("check", { size: 16 })} Partner and volunteer pathways</li>
        <li>${icon("check", { size: 16 })} Impact data and reporting</li>
      </ul>
    </div>
  </div>`
    )
    .join("\n");

  return `
<div class="metro-selector" data-metro-selector>
  <div class="metro-tabs" role="tablist" aria-label="Launch metro areas">
    ${tabs}
  </div>
  <div class="metro-panels">
    ${panels}
  </div>
</div>`;
}

function statGrid(stats) {
  return `
<div class="metric-grid" aria-label="Site priorities">
  ${stats
    .map(
      (s) => `<div><span>${esc(s.value)}</span><small>${esc(s.label)}</small></div>`
    )
    .join("\n")}
</div>`;
}

function breadcrumbs(items) {
  const list = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      return isLast
        ? `<li aria-current="page">${esc(item.label)}</li>`
        : `<li><a href="${item.href}">${esc(item.label)}</a></li>`;
    })
    .join("\n");
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${list}</ol></nav>`;
}

// ---- Forms ---------------------------------------------------------------

function optionsForField(field, ctx) {
  if (field.optionsFrom === "metros") {
    return metros.map((m) => `<option value="${esc(m.slug)}">${esc(m.name)}</option>`).join("");
  }
  if (field.optionsFrom === "metrosWithMulti") {
    return (
      `<option value="multi-metro">Multi-metro / National</option>` +
      metros.map((m) => `<option value="${esc(m.slug)}">${esc(m.name)}</option>`).join("")
    );
  }
  if (field.optionsFrom === "impactCategories") {
    return impactCategories.map((c) => `<option value="${esc(c.slug)}">${esc(c.name)}</option>`).join("");
  }
  if (field.options) {
    return field.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  }
  return "";
}

function formField(field, formId) {
  const id = `${formId}-${field.name}`;
  const req = field.required ? " *" : "";
  const reqAttr = field.required ? " required" : "";
  const ariaReq = field.required ? ' aria-required="true"' : "";

  if (field.type === "select") {
    return `
<div class="form-field">
  <label for="${id}">${esc(field.label)}${req}</label>
  <select id="${id}" name="${field.name}"${reqAttr}${ariaReq}>
    <option value="">Select an option</option>
    ${optionsForField(field)}
  </select>
</div>`;
  }
  if (field.type === "textarea") {
    return `
<div class="form-field form-field-wide">
  <label for="${id}">${esc(field.label)}${req}</label>
  <textarea id="${id}" name="${field.name}" rows="4"${reqAttr}${ariaReq}></textarea>
</div>`;
  }
  if (field.type === "checkbox") {
    return `
<div class="form-field form-field-checkbox form-field-wide">
  <input type="checkbox" id="${id}" name="${field.name}"${reqAttr}${ariaReq} />
  <label for="${id}">${esc(field.label)}</label>
</div>`;
  }
  return `
<div class="form-field">
  <label for="${id}">${esc(field.label)}${req}</label>
  <input type="${field.type}" id="${id}" name="${field.name}"${field.autocomplete ? ` autocomplete="${field.autocomplete}"` : ""}${reqAttr}${ariaReq} />
</div>`;
}

// Renders a full progressive-enhancement form.
// - Works with a plain HTML POST to `action` if JavaScript is unavailable.
// - assets/js/main.js intercepts submit, validates, and shows an accessible
//   success/error state via fetch() when an endpoint is connected.
function renderForm({ id, schema, action = "#", method = "POST", submitLabel = "Submit", note }) {
  const fields = schema.fields.map((f) => formField(f, id)).join("\n");
  return `
<form class="site-form" id="${id}" data-site-form action="${action}" method="${method}" novalidate>
  <div class="form-grid">
    ${fields}
  </div>
  <div class="form-footer">
    <button class="button primary" type="submit">${esc(submitLabel)}</button>
    <p class="form-status" role="status" aria-live="polite" data-form-status></p>
  </div>
  ${note ? `<p class="form-note">${note}</p>` : ""}
</form>`;
}

// WEL9 / Social Determinants of Health wheel — an interactive SVG pie
// chart. Clicking a wedge or a list item (assets/js/main.js) highlights the
// matching pillar and reveals its description below. Degrades gracefully
// without JS: every wedge/list item is still a real link-free but readable
// element, and the descriptions are also written out in full further down
// the page.
function wellnessWheel(categories) {
  const cx = 110;
  const cy = 110;
  const r = 100;
  const n = categories.length;
  const slice = 360 / n;

  function point(angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  const wedges = categories
    .map((cat, i) => {
      const start = i * slice;
      const end = start + slice;
      const [x1, y1] = point(start);
      const [x2, y2] = point(end);
      const largeArc = slice > 180 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
      return `<path class="wellness-wheel-seg" d="${d}" fill="${cat.wheelColor}" data-wheel-seg="${cat.slug}" tabindex="0" role="button" aria-label="${esc(cat.name)}"><title>${esc(cat.name)}</title></path>`;
    })
    .join("\n");

  const svg = `
<svg class="wellness-wheel" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${wedges}
  <circle cx="${cx}" cy="${cy}" r="46" fill="var(--cream)" stroke="var(--line-strong)" />
  <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)" font-family="var(--font-sans)">Social</text>
  <text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)" font-family="var(--font-sans)">Determinants</text>
  <text x="${cx}" y="${cy + 24}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)" font-family="var(--font-sans)">of Health</text>
</svg>`;

  const list = categories
    .map(
      (cat, i) => `
<button type="button" class="wellness-pillar-btn${i === 0 ? " is-active" : ""}" data-wellness-btn="${cat.slug}">
  <span class="dot" style="background:${cat.wheelColor}"></span>
  <span>${esc(cat.name)}</span>
</button>`
    )
    .join("\n");

  const details = categories
    .map(
      (cat, i) => `
<div class="wellness-detail" data-wellness-detail="${cat.slug}" ${i === 0 ? "" : "hidden"}>
  <h3>${esc(cat.name)}</h3>
  <p>${esc(cat.description)}</p>
  <div class="tag-row">${cat.sdohFactors.map((f) => `<span>${esc(f)}</span>`).join("")}</div>
  <a class="card-link" href="/impact/${cat.slug}/">Explore ${esc(cat.name)} ${icon("arrow", { size: 14 })}</a>
</div>`
    )
    .join("\n");

  return `
<div class="wellness-wheel-split" data-wellness-wheel>
  <div>
    <div class="wellness-wheel-wrap">${svg}</div>
    <div class="wellness-pillar-list">${list}</div>
  </div>
  <div>${details}</div>
</div>`;
}

function reportsPreview(reports) {
  return `
<div class="report-row">
  <article>
    <span>Resource Library</span>
    <strong>Local guides and trusted contacts</strong>
    <p>Verified, metro-specific resources — with last-verified dates on every listing.</p>
  </article>
  <article>
    <span>Annual Reports</span>
    <strong>Progress, funding, and outcomes</strong>
    <p>${esc(reports.annualReports[0].status)}: ${esc(reports.annualReports[0].summary)}</p>
  </article>
  <article>
    <span>Financial Transparency</span>
    <strong>Public accountability by design</strong>
    <p>${esc(reports.financialTransparency.intro)}</p>
  </article>
</div>`;
}

function pathwaySteps(steps) {
  return `
<div class="pathway-grid">
  ${steps
    .map(
      (s, i) => `
  <article class="pathway-card">
    <span>0${i + 1}</span>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.body)}</p>
  </article>`
    )
    .join("\n")}
</div>`;
}

function ctaBand({ label, title, body, style = "closing-cta" } = {}) {
  return `
<section class="section ${style}">
  ${label ? eyebrow(label) : ""}
  <h2>${title}</h2>
  <p>${body}</p>
  ${primaryActions({ style: "centered" })}
</section>`;
}

module.exports = {
  esc,
  skipLink,
  header,
  footer,
  eyebrow,
  sectionHeading,
  primaryActions,
  badge,
  impactCategoryCard,
  impactCategoryGrid,
  wellnessWheel,
  metroCard,
  metroGrid,
  metroSelector,
  statGrid,
  breadcrumbs,
  formField,
  renderForm,
  reportsPreview,
  pathwaySteps,
  ctaBand,
};
