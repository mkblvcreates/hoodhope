const site = require("../../data/site");
const leadership = require("../../data/leadership");
const ui = require("../ui");
const { icon } = require("../icons");

module.exports = function about() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "About" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("Our story")}
    <h1>A national housing platform, built like an institution from day one.</h1>
    <p class="hero-lede">${site.org.mission}</p>
  </div>
</section>

<section class="section section-tint">
  <div class="split">
    <div>
      ${ui.eyebrow("Our model")}
      <h2>Not a partnership. A scalable operating system.</h2>
    </div>
    <div>
      <p class="lede">${site.org.model}</p>
      <p class="callout mt-lg">“${site.org.modelQuote}”</p>
      <a class="card-link mt-lg" href="/model/">See the full 5-Stage Path to Homeownership ${icon("arrow", { size: 14 })}</a>
    </div>
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: "How we work", title: "Calm, competent, and evidence-based." })}
  <div class="value-grid">
    ${site.org.toneWords
      .map(
        (word) => `
    <article class="value-card">
      <h3>${word}</h3>
      <p>Every part of this site — and every license we grant — is built to reflect this.</p>
    </article>`
      )
      .join("\n")}
  </div>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({
    label: "Executive leadership",
    title: leadership.kicker,
    lede: "Board roster and additional leadership bios will be added as they're confirmed.",
  })}
  <div class="leadership-grid">
    ${leadership.team
      .map(
        (person) => `
    <article class="leadership-card">
      <span class="leadership-avatar">${person.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")}</span>
      <h3 style="margin-bottom:0.1rem">${person.name}</h3>
      <span class="role">${person.title}</span>
      <ul class="list-check">
        ${person.bullets.map((b) => `<li>${icon("check", { size: 15 })} ${b}</li>`).join("\n")}
      </ul>
    </article>`
      )
      .join("\n")}
  </div>
</section>

<section class="section">
  ${ui.sectionHeading({ label: "HUD alignment", title: "Built on Continuum of Care language HUD partners already know." })}
  <p class="lede">${site.org.hud.note}</p>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Who we serve", title: "Built for the whole community." })}
  <div class="audience-grid">
    ${[
      "Residents & families",
      "Older adults",
      "Veterans",
      "Volunteers",
      "Healthcare organizations",
      "Employers",
      "Foundations & funders",
      "Researchers",
      "Churches & faith partners",
      "Government agencies & courts",
      "Local nonprofit operators",
      "Donors & investors",
    ]
      .map((a) => `<div class="audience-card">${icon("people", { size: 16 })} ${a}</div>`)
      .join("\n")}
  </div>
</section>

${ui.ctaBand({
  label: "Get in touch",
  title: "Want to learn more about how H.O.O.D. Hope works?",
  body: "Reach out directly, or start a partner inquiry if you're exploring a formal collaboration or license.",
})}
`;
};
