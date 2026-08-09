const formSchema = require("../../data/formSchema");
const model = require("../../data/model");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function donate() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Donate" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("Support the work")}
    <h1>Invest in a housing platform, not a single program.</h1>
    <p class="hero-lede">
      Your gift helps fund the ${model.funding.askLabel} — moving 115 families through the
      5-Stage Path to Homeownership — and helps build the licensing infrastructure that lets this
      model scale to Wichita and, eventually, 150+ metros nationally.
    </p>
  </div>
  <aside class="hero-panel" aria-label="Where donations go">
    <div>
      <span class="panel-kicker">Current campaign</span>
      <strong>${model.funding.ask} — St. Louis Flagship Pilot</strong>
    </div>
    <a class="card-link" href="/model/">See the full budget &amp; ROI breakdown ${icon("arrow", { size: 14 })}</a>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Give today",
    title: "Choose an amount",
    lede: "This is a placeholder donation experience. " + formSchema.donation.endpointNote,
  })}

  <div class="site-form">
    <div class="amount-presets" data-amount-presets="donate-amount">
      <button type="button" data-amount="25">$25</button>
      <button type="button" data-amount="50">$50</button>
      <button type="button" data-amount="100" class="is-active">$100</button>
      <button type="button" data-amount="250">$250</button>
      <button type="button" data-amount="Other">Other</button>
    </div>

    ${ui.renderForm({
      id: "donate-form",
      schema: formSchema.donation,
      action: "/api/donate", // placeholder — replace with donation platform integration
      submitLabel: "Continue to Donate",
      note: "H.O.O.D. Hope has not yet connected a live payment processor to this site. This form demonstrates the intended donor experience; connect Stripe, Donorbox, Givebutter, or Every.org before accepting real gifts.",
    })}
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: "Other ways to give", title: "Beyond a one-time gift." })}
  <div class="value-grid">
    <article class="value-card">
      <h3>${icon("people", { size: 20 })} Monthly giving</h3>
      <p>Recurring support helps us plan coordinated programming rather than react gift to gift.</p>
    </article>
    <article class="value-card">
      <h3>${icon("shield", { size: 20 })} Institutional &amp; foundation gifts</h3>
      <p>For grants and larger institutional gifts, start a Partner Inquiry so our team can follow up directly.</p>
    </article>
  </div>
</section>
`;
};
