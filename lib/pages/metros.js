const metros = require("../../data/metros");
const impactCategories = require("../../data/impactCategories");
const resourcesData = require("../../data/resources");
const ui = require("../ui");
const { icon } = require("../icons");

function metrosIndex() {
  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Metros" }])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow("From pilot to national platform")}
    <h1>One flagship. One next metro. 150+ on the roadmap.</h1>
    <p class="hero-lede">
      H.O.O.D. Hope licenses metro by metro so every hub keeps local trust and a local nonprofit
      operator — while sharing one national model, one set of wellness pillars, and one site
      architecture that can add the next metro without a redesign.
    </p>
    ${ui.primaryActions({ context: "metros" })}
  </div>
</section>

<section class="section section-tint">
  ${ui.metroGrid(metros)}
</section>

<section class="section">
  ${ui.sectionHeading({
    label: "What's next",
    title: "Expanding beyond the first five.",
    lede: "Our route structure and content model are built so new metros can be added as data, not as a redesign — supporting national scale without rebuilding the platform.",
  })}
</section>
`;
}

function metroDetail(metro) {
  const initiativeCategories = [...new Set(metro.initiatives.map((i) => i.category))];
  const relatedCategories = impactCategories.filter((c) => metro.focusAreas.includes(c.name));

  return `
${ui.breadcrumbs([{ label: "Home", href: "/" }, { label: "Metros", href: "/metros/" }, { label: metro.name }])}

<section class="hero section">
  <div class="hero-copy">
    <span class="badge badge-blue">${metro.launchStatus}</span>
    ${ui.eyebrow("Metro hub")}
    <h1>${metro.name}</h1>
    <p class="hero-lede">${metro.summary}</p>
    <p class="lede">${metro.heroNote}</p>
    ${ui.primaryActions({ context: metro.name })}
  </div>
  <aside class="hero-panel" aria-label="${metro.name} focus areas">
    <div>
      <span class="panel-kicker">Local focus areas</span>
      <strong>${metro.focusAreas.join(", ")}</strong>
    </div>
    <a class="button secondary full" href="/metros/${metro.slug}/resources/">View ${metro.name} Resource Directory ${icon("arrow", { size: 16 })}</a>
  </aside>
</section>

<section class="section section-tint">
  ${ui.sectionHeading({ label: "Active pathways", title: `Initiatives underway in ${metro.name}.` })}
  <div class="pathway-grid">
    ${metro.initiatives
      .map(
        (i) => `
    <article class="pathway-card">
      <span class="badge ${i.status === "Active pathway" ? "badge-green" : "badge-gold"}">${i.status}</span>
      <h3>${i.title}</h3>
      <p>${i.description}</p>
      <p class="text-muted" style="font-size:0.85rem;margin-top:0.5rem">${i.category}</p>
    </article>`
      )
      .join("\n")}
  </div>
</section>

${
  relatedCategories.length
    ? `
<section class="section">
  ${ui.sectionHeading({ label: "Impact categories active here", title: "Explore the shared model behind these pathways." })}
  ${ui.impactCategoryGrid(relatedCategories, { compact: true })}
</section>`
    : ""
}

${ui.ctaBand({
  label: `${metro.name}`,
  title: `Need help in ${metro.name}, or want to partner here?`,
  body: `Residents can start the Find Help pathway. Organizations can start a Partner inquiry and select ${metro.name} as their metro of interest.`,
})}
`;
}

function metroResources(metro) {
  const metroResourceList = resourcesData.filter((r) => r.metro === metro.slug);

  const categoryOptions = [...new Set(metroResourceList.map((r) => r.category))]
    .map((slug) => {
      const cat = impactCategories.find((c) => c.slug === slug);
      return `<option value="${slug}">${cat ? cat.name : slug}</option>`;
    })
    .join("");

  const mappable = metroResourceList.filter((r) => typeof r.lat === "number" && typeof r.lng === "number");
  const hasMap = mappable.length > 0;

  const cards = metroResourceList
    .map((r, i) => {
      const catName = (impactCategories.find((c) => c.slug === r.category) || {}).name || r.category;
      return `
<article class="resource-card" id="resource-${i}" data-resource-card data-category="${r.category}" data-verified="${r.verified ? "verified" : "sample"}"${typeof r.lat === "number" ? ` data-lat="${r.lat}" data-lng="${r.lng}"` : ""}>
  <div class="resource-card-top">
    <h3>${r.title}</h3>
    <span class="badge ${r.verified ? "badge-green" : "badge-gold"}">${r.verified ? "Verified" : "Sample — pending verification"}</span>
  </div>
  <p>${r.note}</p>
  <div class="resource-meta">
    <span>${icon("home", { size: 15 })} ${catName}</span>
    ${r.phone ? `<span>${icon("phone", { size: 15 })} ${r.phone}</span>` : ""}
    ${r.address ? `<span>${icon("pin", { size: 15 })} ${r.address}</span>` : ""}
    <span>${icon("doc", { size: 15 })} ${r.language}</span>
    ${r.lastVerified ? `<span>Last verified ${r.lastVerified}</span>` : `<span>Not yet verified</span>`}
  </div>
  ${r.website ? `<a class="card-link" href="${r.website}" target="_blank" rel="noopener">Visit resource ${icon("arrow", { size: 14 })}</a>` : ""}
</article>`;
    })
    .join("\n");

  const mapData = mappable.map((r, i) => ({
    id: `resource-${metroResourceList.indexOf(r)}`,
    title: r.title,
    lat: r.lat,
    lng: r.lng,
    address: r.address || "",
    category: r.category,
  }));

  return `
${ui.breadcrumbs([
  { label: "Home", href: "/" },
  { label: "Metros", href: "/metros/" },
  { label: metro.name, href: `/metros/${metro.slug}/` },
  { label: "Resources" },
])}

<section class="hero section">
  <div class="hero-copy">
    ${ui.eyebrow(`${metro.name} resource directory`)}
    <h1>Real, verified local resources.</h1>
    <p class="hero-lede">
      Housing, health, food, and community resources gathered from official public sources —
      housing authorities, HUD-approved counseling agencies, federally qualified health centers,
      and food banks. Entries marked "Sample — pending verification" are placeholders that still
      need a confirmed local source.
    </p>
  </div>
</section>

<section class="section section-tint">
  <div class="resource-toolbar" data-resource-toolbar>
    <div>
      <label for="filter-category-${metro.slug}">Filter by category</label>
      <select id="filter-category-${metro.slug}" data-filter-category>
        <option value="">All categories</option>
        ${categoryOptions}
      </select>
    </div>
    <div>
      <label for="filter-verified-${metro.slug}">Filter by status</label>
      <select id="filter-verified-${metro.slug}" data-filter-verified>
        <option value="">All statuses</option>
        <option value="verified">Verified only</option>
        <option value="sample">Sample / pending only</option>
      </select>
    </div>
  </div>

  ${
    hasMap
      ? `
  <div class="view-toggle" role="tablist" aria-label="Directory view">
    <button type="button" class="is-active" data-view-toggle="list">List</button>
    <button type="button" data-view-toggle="map">Map</button>
  </div>
  <div class="resource-map" id="resource-map-${metro.slug}" data-resource-map data-map-points='${JSON.stringify(mapData)}' hidden></div>
  <p class="map-fallback-note">Map pin locations are best-estimate geocoding — confirm the exact address before visiting. Powered by OpenStreetMap contributors.</p>`
      : ""
  }

  <div class="resource-list" data-resource-list>
    ${cards}
  </div>
  <p class="resource-empty" data-resource-empty style="display:none">No resources match these filters yet.</p>
</section>

${ui.ctaBand({
  label: "Help us verify this directory",
  title: `Are you a service provider in ${metro.name}?`,
  body: "If you'd like your organization listed as a verified local resource, start a partner inquiry and select this metro.",
})}
`;
}

module.exports = { metrosIndex, metroDetail, metroResources };
