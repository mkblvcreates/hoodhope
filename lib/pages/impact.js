const impactCategories = require("../../data/impactCategories");
const metros = require("../../data/metros");
const ui = require("../ui");
const { icon } = require("../icons");

function impactIndex() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Impact Areas" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("The WEL9 Methodology")}
    <h1>Five wellness pillars. One connected pathway.</h1>
    <p class="hero-lede">
      Every initiative H.O.O.D. Hope licenses — in every metro — rolls up into one of five
      wellness pillars, mapped directly to the Social Determinants of Health. That consistency
      is what lets the model scale to new cities without losing what makes it work locally.
    </p>
    ${ui.primaryActions({ context: "impact areas" })}
  </div>
</section>

<section class="section section-tint">
  ${ui.impactCategoryGrid(impactCategories)}
</section>
`;
}

function impactCategoryPage(cat) {
  const relatedMetros = metros.filter((m) => m.focusAreas.includes(cat.name));
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Impact Areas", href: "/impact/" }, { label: cat.name }])}

<section class="hero section">
  <div class="hero-copy">
    <span class="impact-icon">${icon(cat.icon, { size: 28 })}</span>
    ${ui.eyebrow("Impact category")}
    <h1>${cat.name}</h1>
    <p class="hero-lede">${cat.description}</p>
    ${ui.primaryActions({ context: cat.name })}
  </div>
  <aside class="hero-panel" aria-label="Who this serves">
    <div>
      <span class="panel-kicker">Who this serves</span>
      <strong>${cat.servedAudiences.join(", ")}</strong>
    </div>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Example initiatives", title: "What this looks like in practice." })}
  <ul class="list-check">
    ${cat.exampleInitiatives.map((i) => `<li>${icon("check", { size: 18 })} ${i}</li>`).join("\n")}
  </ul>
</section>

${
  relatedMetros.length
    ? `
<section class="section">
  ${ui.sectionHeading({
    label: "Where this is active",
    title: "Metros currently building this pathway.",
  })}
  ${ui.metroGrid(relatedMetros)}
</section>`
    : ""
}

${ui.ctaBand({
  label: "Get connected",
  title: `Need support with ${cat.name.toLowerCase()}, or want to help build this pathway?`,
  body: "Residents can start the Find Help pathway. Organizations, funders, and civic partners can start a Partner inquiry.",
})}
`;
}

module.exports = { impactIndex, impactCategoryPage };
