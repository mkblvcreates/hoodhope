const site = require("../../data/site");
const metros = require("../../data/metros");
const impactCategories = require("../../data/impactCategories");
const formSchema = require("../../data/formSchema");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function findHelp() {
  const activeMetros = metros.filter((m) => m.phase <= 2);

  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Find Help" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("For residents, families, and individuals")}
    <h1>You don't have to explain your situation to five different offices.</h1>
    <p class="hero-lede">
      Tell us what you need and where you're located. We'll route you toward a practical next
      step — a partner to contact, a resource to review, or a request we can help submit.
    </p>
  </div>
  <aside class="hero-panel" aria-label="Who this is for">
    <div>
      <span class="panel-kicker">Built for</span>
      <strong>Families, older adults, veterans, and anyone navigating a hard season</strong>
    </div>
    <ul class="list-check">
      <li>${icon("check", { size: 18 })} No wrong door — we route you either way</li>
      <li>${icon("check", { size: 18 })} Available in our active metros — St. Louis and Wichita</li>
      <li>${icon("check", { size: 18 })} Your information stays confidential</li>
    </ul>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "How it works",
    title: "Three simple steps.",
  })}
  ${ui.pathwaySteps([
    { title: "Tell us what you need", body: "Choose the category that best matches your situation — housing, health, food, education, transportation, or community connection." },
    { title: "Select your metro", body: "Resources and next steps are filtered to your local area." },
    { title: "Get a guided next step", body: "We connect you with the right local partner or resource as quickly as possible." },
  ])}
</section>

<section class="section">
  ${ui.sectionHeading({
    label: "Browse the resource directory",
    title: "Find verified local resources in your metro.",
    lede: "Each metro has a searchable directory of housing, health, food, education, and community organizations — verified with last-checked dates on every listing.",
  })}
  <div class="pathway-grid">
    ${activeMetros
      .map(
        (m) => `
    <article class="pathway-card">
      <span class="badge ${m.phase === 1 ? "badge-green" : "badge-blue"}">${m.launchStatus}</span>
      <h3>${m.name} Resources</h3>
      <p>${m.resources ? m.resources.length : 0} verified organizations across housing, health, food, education, and community support.</p>
      <a class="card-link" href="/metros/${m.slug}/resources/">Browse ${m.name} directory ${icon("arrow", { size: 14 })}</a>
    </article>`
      )
      .join("\n")}
    <article class="pathway-card">
      <span class="badge badge-neutral">Nationwide</span>
      <h3>Not in an active metro?</h3>
      <p>Dial <strong>2-1-1</strong> for free, confidential help finding local resources anywhere in the U.S., or submit the request form below.</p>
      <a class="card-link" href="https://211.org/" target="_blank" rel="noopener">Visit 211.org ${icon("arrow", { size: 14 })}</a>
    </article>
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Start here",
    title: "Request support",
    lede: "This form is a placeholder for a secure intake workflow. " + formSchema.findHelp.endpointNote,
  })}
  ${ui.renderForm({
    id: "find-help-form",
    schema: formSchema.findHelp,
    action: "/api/find-help",
    submitLabel: "Submit Request",
    note: "By submitting, you agree to be contacted about your request. We do not sell or share your information.",
  })}
</section>

<section class="section">
  ${ui.sectionHeading({
    label: "Browse by category",
    title: "Not sure where to start? Explore an impact area.",
  })}
  ${ui.impactCategoryGrid(impactCategories, { compact: true })}
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "In crisis right now?",
    title: "If you or someone else is in immediate danger, call 911.",
  })}
  <p class="lede">
    For non-emergency help finding local resources today, you can also dial
    <strong>2-1-1</strong> to reach a free, confidential community helpline available nationwide,
    including every H.O.O.D. Hope metro.
  </p>
</section>
`;
};
