const partnerTypes = require("../../data/partners");
const formSchema = require("../../data/formSchema");
const model = require("../../data/model");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function partners() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Partners" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("For organizations and institutions")}
    <h1>Build the connected ecosystem communities already need.</h1>
    <p class="hero-lede">
      H.O.O.D. Hope is built to work with cities, counties, courts, healthcare systems,
      foundations, corporations, and government agencies — not as a small local charity, but as
      a licensed national housing platform built for long-term, institutional-scale collaboration.
    </p>
  </div>
  <aside class="hero-panel" aria-label="Why partner with us">
    <div>
      <span class="panel-kicker">Why partner with us</span>
      <strong>A licensed operating system, not a one-off program</strong>
    </div>
    <ul class="list-check">
      <li>${icon("check", { size: 18 })} Guardrails, licenses, and protected IP built for scale</li>
      <li>${icon("check", { size: 18 })} Built for institutional-scale reporting</li>
      <li>${icon("check", { size: 18 })} Replicable across 150+ metros</li>
    </ul>
  </aside>
</section>

<section class="section-navy section">
  ${ui.sectionHeading({ label: model.funding.eyebrow, title: "St. Louis Flagship — Funding Request" })}
  <div class="stat-strip">
    <div><span>${model.funding.ask}</span><small>${model.funding.askLabel}</small></div>
    <div><span>${model.funding.localMatch}</span><small>${model.funding.localMatchLabel}</small></div>
    <div><span>${model.funding.familiesServed}</span><small>Families Served — Direct Impact</small></div>
    <div><span>${model.funding.totalBudget}</span><small>Total 36-Month Pilot Budget</small></div>
  </div>
  <p class="mt-lg" style="color:rgba(255,255,255,0.8)">${model.callToAction.title}</p>
  <div class="partner-grid mt-lg">
    ${model.callToAction.tracks
      .map(
        (t) => `
    <article class="instrument-card" style="border-top-color:var(--gold)">
      <h3>${t.name}</h3>
      <p style="color:rgba(255,255,255,0.78)">${t.description}</p>
    </article>`
      )
      .join("\n")}
  </div>
  <div class="mt-lg">
    <a class="button primary" href="/model/">See the full budget, ROI &amp; licensing framework ${icon("arrow", { size: 18 })}</a>
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Partner categories", title: "Ways to work with H.O.O.D. Hope." })}
  <div class="partner-grid">
    ${partnerTypes
      .map(
        (p) => `
    <article class="partner-card">
      <h3>${p.type}</h3>
      <p class="text-muted" style="font-size:0.85rem;font-weight:700;margin-bottom:0.4rem">${p.audience}</p>
      <p>${p.description}</p>
    </article>`
      )
      .join("\n")}
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: model.licensing.eyebrow, title: model.licensing.title })}
  <div class="instrument-grid">
    ${model.licensing.instruments
      .map(
        (ins) => `
    <div class="instrument-card" style="border-top-color:var(--navy);background:var(--surface-soft)">
      <span class="instrument-icon" style="background:var(--navy);color:#fff">${icon(ins.icon, { size: 20 })}</span>
      <h3 style="color:var(--ink)">${ins.name}</h3>
      <span class="instrument-tag" style="color:var(--gold-dark)">${ins.tag}</span>
      <ul>${ins.points.map((pt) => `<li style="color:var(--muted)">${pt}</li>`).join("")}</ul>
    </div>`
      )
      .join("\n")}
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Start a conversation",
    title: "Partner Inquiry",
    lede: formSchema.partnerInquiry.endpointNote,
  })}
  ${ui.renderForm({
    id: "partner-inquiry-form",
    schema: formSchema.partnerInquiry,
    action: "/api/partner-inquiry", // placeholder endpoint — see PRODUCTION-CHECKLIST.md
    submitLabel: "Start Partner Inquiry",
    note: "Every inquiry is reviewed by our partnerships team. We aim to respond promptly, though response times are still being formalized as we scale.",
  })}
</section>
`;
};
