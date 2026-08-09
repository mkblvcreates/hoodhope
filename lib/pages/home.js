const site = require("../../data/site");
const metros = require("../../data/metros");
const impactCategories = require("../../data/impactCategories");
const reports = require("../../data/reports");
const model = require("../../data/model");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function home() {
  const flagship = metros.find((m) => m.phase === 1);
  const next = metros.find((m) => m.phase === 2);

  return `
<section class="hero section hero-photo" style="--hero-image:url('${site.brand.heroImage}')">
  <div class="hero-copy">
    ${ui.eyebrow(site.org.platformTagline)}
    <h1>${site.org.programName}</h1>
    <p class="hero-lede">${site.org.tagline}</p>
    ${ui.primaryActions({ context: "homepage" })}
  </div>
</section>

<section class="section section-band-top">
  <div class="split">
    <div>
      ${ui.eyebrow("Redefining housing solutions")}
      <h2>${site.org.heroStatement}</h2>
    </div>
    <p class="lede">${site.org.heroSub}</p>
  </div>
</section>

<section class="section-navy section">
  ${ui.sectionHeading({ label: model.positioning.eyebrow, title: model.positioning.title })}
  <div class="pillar-row">
    ${model.positioning.pillars
      .map(
        (p) => `
    <div class="pillar-tile">
      <span class="pillar-icon">${icon(p.icon, { size: 20 })}</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    </div>`
      )
      .join("\n")}
  </div>
  <p class="callout mt-lg" style="background:rgba(255,255,255,0.08);border-left-color:var(--gold);color:#fff">
    “${model.positioning.quote}” — ${model.positioning.reach}
  </p>
</section>

<section class="section" id="model">
  ${ui.sectionHeading({
    label: model.continuum.eyebrow,
    title: model.continuum.title,
    lede: model.continuum.intro,
  })}
  <div class="stage-stepper stage-stepper-row" data-stage-stepper>
    ${model.continuum.stages
      .map(
        (s, i) => `
    ${i > 0 ? '<div class="stage-connector" aria-hidden="true"></div>' : ""}
    <button type="button" class="stage-tile" aria-expanded="${i === 0 ? "true" : "false"}" data-stage-toggle>
      <span class="stage-head">
        <span class="stage-number">${s.stage}</span>
        <span>
          <span class="stage-name">${s.name}</span>
          <span class="stage-focus">Focus: ${s.focus}</span>
        </span>
        <span class="stage-toggle-icon">${icon("arrow", { size: 16, className: "icon" })}</span>
      </span>
      <span class="stage-body">
        <span class="stage-body-inner" style="display:block">${s.description}</span>
      </span>
    </button>`
      )
      .join("\n")}
  </div>
  <div class="mt-lg">
    <a class="button primary" href="/model/">See the full model, WEL9 methodology &amp; licensing framework ${icon("arrow", { size: 18 })}</a>
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: model.wellness.eyebrow,
    title: model.wellness.title,
    lede: "The " + model.wellness.methodologyName + " — built on the same Social Determinants of Health framework used across housing and healthcare.",
  })}
  ${ui.impactCategoryGrid(impactCategories, { compact: true })}
</section>

<section class="section" id="find-help">
  ${ui.sectionHeading({
    label: "For residents and families",
    title: "Start with the need. Route to the right support.",
    lede: "A simple intake pathway that connects to the Continuum of Care case management workflow in an active metro.",
  })}
  ${ui.pathwaySteps([
    { title: "Tell us what you need", body: "Housing, health, food, education, or community connection support." },
    { title: "Select your metro", body: "Resources are filtered by our active metros: St. Louis and Wichita, with more launching soon." },
    { title: "Get a guided next step", body: "Receive a practical route: contact a partner, submit a request, or review verified local resources." },
  ])}
  <div class="mt-lg">
    <a class="button primary" href="/find-help/">Start the Find Help pathway ${icon("arrow", { size: 18 })}</a>
  </div>
</section>

<section class="section section-tint" id="metros">
  ${ui.sectionHeading({
    label: "From pilot to platform",
    title: "Launch locally. Scale to 150+ metros.",
    lede: `${flagship ? flagship.name : "St. Louis"} is the active flagship. ${next ? next.name : "Wichita"} is next. Every future metro shares the same licensing framework — no site redesign required.`,
  })}
  ${ui.metroSelector(metros)}
</section>

<section class="section" id="partner">
  ${ui.sectionHeading({
    label: "For organizations and institutions",
    title: "Partner with us to transform housing in America.",
    lede: "H.O.O.D. Hope is built to work with cities, counties, courts, healthcare systems, foundations, corporations, and government agencies — as a licensed national platform, not a single local program.",
  })}
  <div class="partner-grid">
    ${model.callToAction.tracks
      .map(
        (t) => `
    <article class="partner-card">
      <h3>${t.name}</h3>
      <p>${t.description}</p>
    </article>`
      )
      .join("\n")}
  </div>
  <div class="mt-lg">
    <a class="button secondary dark" href="/partners/">Start a Partner Inquiry ${icon("arrow", { size: 18 })}</a>
  </div>
</section>

<section class="section section-tint">
  <div class="split">
    <div>
      ${ui.eyebrow("Data and reports")}
      <h2>Credibility that grows into a public impact library.</h2>
    </div>
    <p class="lede">
      Real pilot budget figures, ROI projections, and market data from the St. Louis Flagship —
      published alongside our roadmap toward audited annual reporting.
    </p>
  </div>
  ${ui.reportsPreview(reports)}
</section>

${ui.ctaBand({
  label: model.callToAction.closingLine,
  title: model.callToAction.title,
  body: site.org.shortMission,
})}
`;
};
