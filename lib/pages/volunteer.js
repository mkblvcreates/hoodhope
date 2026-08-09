const formSchema = require("../../data/formSchema");
const metros = require("../../data/metros");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function volunteer() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Volunteer" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("Give your time")}
    <h1>Volunteers make the connected pathway real.</h1>
    <p class="hero-lede">
      From neighborhood events to partner coordination, volunteers help H.O.O.D. Hope stay
      community-centered as we grow. Tell us where you are and what you're interested in — we'll
      match you to opportunities as they open in your metro.
    </p>
  </div>
  <aside class="hero-panel" aria-label="Volunteer at a glance">
    <div>
      <span class="panel-kicker">Available now</span>
      <strong>${metros.filter((m) => m.phase < 3).map((m) => m.name).join(", ")}</strong>
      <p class="text-muted" style="margin-top:0.5rem;font-size:0.85rem">More metros open as H.O.O.D. Hope licenses new local operators.</p>
    </div>
    <ul class="list-check">
      <li>${icon("check", { size: 18 })} Flexible, metro-based opportunities</li>
      <li>${icon("check", { size: 18 })} Matched to your interest area</li>
      <li>${icon("check", { size: 18 })} No experience required to start</li>
    </ul>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Sign up",
    title: "Volunteer Interest Form",
    lede: formSchema.volunteer.endpointNote,
  })}
  ${ui.renderForm({
    id: "volunteer-form",
    schema: formSchema.volunteer,
    action: "/api/volunteer", // placeholder endpoint — see PRODUCTION-CHECKLIST.md
    submitLabel: "Sign Up to Volunteer",
    note: "We'll reach out with opportunities that match your metro and interests as our volunteer program formalizes.",
  })}
</section>
`;
};
