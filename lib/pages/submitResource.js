const formSchema = require("../../data/formSchema");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function submitResource() {
  return `
${ui.breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Partners", href: "/partners/" },
  { label: "Submit a Resource" },
])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("For service providers and community organizations")}
    <h1>Get listed in the resource directory.</h1>
    <p class="hero-lede">
      If your organization provides housing, health, food, education, or community services in one
      of our active metros, submit your information below. Our team will verify the listing and add
      it to the searchable resource directory for residents and case managers.
    </p>
  </div>
  <aside class="hero-panel" aria-label="What happens next">
    <div>
      <span class="panel-kicker">After you submit</span>
      <strong>Our team reviews every submission before it goes live</strong>
    </div>
    <ul class="list-check">
      <li>${icon("check", { size: 18 })} We verify your contact info and services</li>
      <li>${icon("check", { size: 18 })} Listings include a "Last Verified" date for transparency</li>
      <li>${icon("check", { size: 18 })} You can request updates or removal any time</li>
    </ul>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Resource submission form",
    title: "Tell us about your organization.",
    lede: formSchema.resourceSubmission.endpointNote,
  })}
  ${ui.renderForm({
    id: "resource-submission-form",
    schema: formSchema.resourceSubmission,
    action: "/api/submit-resource",
    submitLabel: "Submit for Review",
    note: "By submitting, you authorize H.O.O.D. Hope to contact you regarding this listing. We do not sell or share your information.",
  })}
</section>

<section class="section">
  ${ui.sectionHeading({
    label: "Already listed?",
    title: "Need to update or remove your listing?",
    lede: "Contact us at info@hoodhope.org with your organization name and metro, and we'll update or remove your listing within 48 hours.",
  })}
</section>
`;
};
