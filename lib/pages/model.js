const model = require("../../data/model");
const impactCategories = require("../../data/impactCategories");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function modelPage() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Our Model" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow(model.continuum.eyebrow)}
    <h1>${model.continuum.title}</h1>
    <p class="hero-lede">${model.continuum.intro}</p>
  </div>
</section>

<section class="section">
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
        <span class="stage-toggle-icon">${icon("arrow", { size: 16 })}</span>
      </span>
      <span class="stage-body">
        <span class="stage-body-inner" style="display:block">${s.description} ${s.detail}</span>
      </span>
    </button>`
      )
      .join("\n")}
  </div>
  <p class="callout mt-lg">"${model.continuum.closingQuote}"</p>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: model.wellness.eyebrow,
    title: model.wellness.title,
    lede: model.wellness.sdohNote,
  })}
  <p class="badge badge-gold">${model.wellness.methodologyName}</p>
  ${ui.wellnessWheel(impactCategories)}
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
</section>

<section class="section-navy section mt-lg">
  ${ui.sectionHeading({ label: model.licensing.eyebrow, title: model.licensing.title })}
  <div class="instrument-grid">
    ${model.licensing.instruments
      .map(
        (ins) => `
    <div class="instrument-card">
      <span class="instrument-icon">${icon(ins.icon, { size: 20 })}</span>
      <h3>${ins.name}</h3>
      <span class="instrument-tag">${ins.tag}</span>
      <ul>${ins.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
    </div>`
      )
      .join("\n")}
  </div>
  <p class="callout mt-lg" style="background:rgba(255,255,255,0.08);border-left-color:var(--gold);color:#fff">${model.licensing.closingLine}</p>
</section>

<section class="section">
  ${ui.sectionHeading({ label: model.flagshipPartner.eyebrow, title: model.flagshipPartner.name })}
  <p class="lede">${model.flagshipPartner.blurb}</p>
  <div class="stat-strip">
    ${model.flagshipPartner.stats
      .map((s) => `<div><span>${s.value}</span><small>${s.label}</small></div>`)
      .join("\n")}
  </div>
  <p class="mt-lg"><a class="card-link" href="${model.flagshipPartner.website}" target="_blank" rel="noopener">Visit ${model.flagshipPartner.name} ${icon("arrow", { size: 14 })}</a> &nbsp;·&nbsp; ${model.flagshipPartner.phone}</p>
</section>

<section class="section investor-gate-prompt" id="investor-gate-prompt">
  <div class="investor-gate-card">
    <span class="badge badge-gold">Confidential Materials</span>
    <h2>Investor &amp; Partner Financial Details</h2>
    <p class="lede">The sections below contain proprietary financial projections, budget allocations, ROI metrics, and national scalability plans. Access requires acknowledgment of confidentiality.</p>
    <div class="investor-gate-agreement">
      <label class="investor-gate-check">
        <input type="checkbox" id="investor-gate-agree" />
        <span>I acknowledge that the financial information below is confidential and proprietary to H.O.O.D. Hope, Inc. I agree not to distribute, reproduce, or share these materials without prior written consent.</span>
      </label>
      <button type="button" class="button primary" id="investor-gate-btn" disabled>View Financial Details</button>
    </div>
  </div>
</section>

<div class="investor-gated-content" id="investor-gated-content" hidden>

<section class="section section-tint">
  ${ui.sectionHeading({ label: model.marketOpportunity.eyebrow, title: model.marketOpportunity.title })}
  <div class="stat-strip">
    <div><span>${model.marketOpportunity.nationalContext.value}</span><small>${model.marketOpportunity.nationalContext.label}</small></div>
    <div><span>${model.marketOpportunity.localCrisis.value}</span><small>${model.marketOpportunity.localCrisis.label}</small></div>
    <div><span>${model.marketOpportunity.supplyGap.value}</span><small>${model.marketOpportunity.supplyGap.label}</small></div>
    <div><span>${model.marketOpportunity.focusAreas.value}</span><small>${model.marketOpportunity.focusAreas.label}</small></div>
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: model.projectedImpact.eyebrow, title: model.projectedImpact.title })}
  <div class="stat-strip">
    ${model.projectedImpact.stats
      .map((s) => `<div><span>${s.value}</span><small>${s.label}</small></div>`)
      .join("\n")}
  </div>
  <p class="callout mt-lg">"${model.projectedImpact.closingQuote}"</p>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: model.funding.eyebrow,
    title: model.funding.title,
    lede: `Total funding required: ${model.funding.ask} for ${model.funding.askLabel}. Committed local match: ${model.funding.localMatch} (${model.funding.localMatchLabel}).`,
  })}
  <p class="text-muted" style="font-weight:700">Total 36-month pilot budget: ${model.funding.totalBudget}</p>
  <div class="budget-bars">
    ${model.funding.budgetAllocation
      .map(
        (b) => `
    <div class="budget-row">
      <div class="budget-row-top">
        <strong>${b.label} <span class="text-muted" style="font-weight:400">— ${b.note}</span></strong>
        <span>${b.pct}% · ${b.amount}</span>
      </div>
      <div class="budget-track"><div class="budget-fill" style="width:${b.pct}%"></div></div>
    </div>`
      )
      .join("\n")}
  </div>
  <p class="budget-note mt-lg">${model.funding.note}</p>
</section>

<section class="section">
  ${ui.sectionHeading({ label: model.roi.eyebrow, title: model.roi.title })}
  <div class="roi-grid">
    ${model.roi.metrics
      .map(
        (m) => `
    <div class="roi-card">
      <span class="roi-value">${m.value}</span>
      <span class="roi-detail">${m.detail}</span>
      <h3>${m.label}</h3>
      <p class="text-muted">${m.note}</p>
    </div>`
      )
      .join("\n")}
  </div>
  <p class="text-muted mt-lg" style="text-align:center;font-weight:700">${model.roi.closingLine}</p>
</section>

<section class="section-navy section">
  ${ui.sectionHeading({ label: model.scalability.eyebrow, title: model.scalability.title })}
  <div class="phase-list">
    ${model.scalability.phases
      .map(
        (p) => `
    <div class="phase-card" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.16)">
      <span class="phase-number" style="color:var(--gold)">Phase ${p.phase} — ${p.status}</span>
      <div>
        <h3 style="color:#fff">${p.name}</h3>
        <p style="color:rgba(255,255,255,0.78)">${p.description}</p>
      </div>
    </div>`
      )
      .join("\n")}
  </div>

  <div class="split mt-lg" style="align-items:start">
    <div>
      <h3 style="color:#fff">${model.scalability.assetFlow.title}</h3>
      <p style="color:rgba(255,255,255,0.78)">${model.scalability.assetFlow.note}</p>
    </div>
    <div class="asset-flow">
      ${model.scalability.assetFlow.steps.map((s) => `<div class="asset-flow-step">${s}</div>`).join("\n")}
    </div>
  </div>
</section>

</div>

${ui.ctaBand({
  label: model.callToAction.closingLine,
  title: model.callToAction.title,
  body: model.callToAction.tracks.map((t) => `${t.name}: ${t.description}`).join(" "),
})}
`;
};
