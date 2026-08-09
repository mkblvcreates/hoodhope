const reports = require("../../data/reports");
const model = require("../../data/model");
const ui = require("../ui");

module.exports = function reportsPage() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Reports" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("Public accountability")}
    <h1>Reports, research, and financial transparency.</h1>
    <p class="hero-lede">
      We believe grantmakers, government partners, and donors should be able to see how
      H.O.O.D. Hope is structured and how resources are used — not just what we say we do.
    </p>
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Annual reports", title: "Organizational progress reports." })}
  <div class="report-row">
    ${reports.annualReports
      .map(
        (r) => `
    <article>
      <span>${r.year}</span>
      <strong>${r.title}</strong>
      <p>${r.summary}</p>
      <span class="badge badge-gold" style="margin-top:0.5rem">${r.status}</span>
    </article>`
      )
      .join("\n")}
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({
    label: model.funding.eyebrow,
    title: "St. Louis Flagship — Pilot Budget Allocation",
    lede: reports.financialTransparency.intro,
  })}
  <p class="text-muted" style="font-weight:700">Total 36-month pilot budget: ${model.funding.totalBudget} · Current funding ask: ${model.funding.ask}</p>
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
  <p class="callout mt-lg">${reports.financialTransparency.auditNote}</p>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: model.roi.eyebrow, title: "Return on Investment" })}
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
  <div class="mt-lg">
    <a class="card-link" href="/model/">See the full operating model &amp; national scalability plan →</a>
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: "Research notes", title: "Evidence-based learning." })}
  <div class="report-row">
    ${reports.researchNotes
      .map(
        (r) => `
    <article>
      <span>${r.status}</span>
      <strong>${r.title}</strong>
      <p>${r.summary}</p>
    </article>`
      )
      .join("\n")}
  </div>
</section>

${ui.ctaBand({
  label: "Questions about our finances or reporting",
  title: "Grantmakers and government partners: let's talk directly.",
  body: "Contact our team for organizational documents, budget narratives, or compliance information related to a specific opportunity.",
})}
`;
};
