const site = require("../../data/site");
const formSchema = require("../../data/formSchema");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function contact() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Contact" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("We'd like to hear from you")}
    <h1>Contact H.O.O.D. Hope.</h1>
    <p class="hero-lede">
      For resident support, use the Find Help pathway. For partnership, funding, or media
      questions, reach out below or start a Partner Inquiry.
    </p>
  </div>
  <aside class="hero-panel" aria-label="Direct contact">
    <div>
      <span class="panel-kicker">Direct contact</span>
      <strong>${site.contact.email}</strong>
    </div>
    <ul class="list-check">
      <li>${icon("mail", { size: 18 })} ${site.contact.email}</li>
      <li>${icon("phone", { size: 18 })} ${site.contact.phone}</li>
      <li>${icon("pin", { size: 18 })} ${site.contact.mailingAddress}</li>
    </ul>
    <p class="text-muted" style="font-size:0.82rem">${site.contact.hoursNote}</p>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Send a message", title: "General Contact Form" })}
  ${ui.renderForm({
    id: "contact-form",
    schema: formSchema.contact,
    action: "/api/contact", // placeholder endpoint — see PRODUCTION-CHECKLIST.md
    submitLabel: "Send Message",
  })}
</section>

<section class="section">
  ${ui.sectionHeading({ label: "Looking for something specific?", title: "Quick links." })}
  <div class="value-grid">
    <article class="value-card">
      <h3>Need support?</h3>
      <p>Use the <a class="card-link" href="/find-help/">Find Help pathway ${icon("arrow", { size: 14 })}</a> for the fastest response.</p>
    </article>
    <article class="value-card">
      <h3>Exploring a partnership?</h3>
      <p>Start a <a class="card-link" href="/partners/">Partner Inquiry ${icon("arrow", { size: 14 })}</a> so the right team can follow up.</p>
    </article>
  </div>
</section>
`;
};
