#!/usr/bin/env node
/**
 * H.O.O.D HOPE static site generator.
 *
 * No frameworks, no npm install required — just Node's standard library.
 * Run with: node build.js
 *
 * This reads content from /data, renders it through /lib templates, and
 * writes plain HTML files to the routes below (clean URLs via
 * <route>/index.html). Add a metro or impact category by editing the
 * corresponding file in /data — no template or navigation changes needed.
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const site = require("./data/site");
const metros = require("./data/metros");
const impactCategories = require("./data/impactCategories");

const { page } = require("./lib/layout");
const home = require("./lib/pages/home");
const modelPage = require("./lib/pages/model");
const findHelp = require("./lib/pages/findHelp");
const { impactIndex, impactCategoryPage } = require("./lib/pages/impact");
const { metrosIndex, metroDetail, metroResources } = require("./lib/pages/metros");
const partnersPage = require("./lib/pages/partners");
const donatePage = require("./lib/pages/donate");
const volunteerPage = require("./lib/pages/volunteer");
const reportsPage = require("./lib/pages/reports");
const aboutPage = require("./lib/pages/about");
const contactPage = require("./lib/pages/contact");
const submitResource = require("./lib/pages/submitResource");
const notFoundPage = require("./lib/pages/notFound");

function writeFile(relativePath, contents) {
  const fullPath = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, contents, "utf8");
  console.log("wrote", relativePath);
}

function render(routePath, meta, contentFn) {
  const html = page(meta)(contentFn());
  writeFile(path.join(routePath, "index.html"), html);
}

const builtRoutes = [];
function track(routePath, priority = "0.6") {
  builtRoutes.push({ routePath, priority });
}

// ---- Home -----------------------------------------------------------------
render(
  "",
  {
    title: `${site.org.name} — ${site.org.fullName}`,
    description: site.org.shortMission,
    path: "/",
    activeNav: "/",
  },
  home
);
track("/", "1.0");

// ---- Our Model (5-Stage Continuum, WEL9, Licensing Framework) -------------
render(
  "model",
  {
    title: "Our Model — The 5-Stage Path to Homeownership",
    description:
      "H.O.O.D. Hope's proprietary Continuum of Care model: the 5-Stage Path to Homeownership, the WEL9 wellness methodology, the licensing framework, and the St. Louis Flagship pilot's real market data, budget, and ROI.",
    path: "/model/",
    activeNav: "/model/",
  },
  modelPage
);
track("/model/", "0.95");

// ---- Find Help --------------------------------------------------------------
render(
  "find-help",
  {
    title: "Find Help",
    description:
      "Start the H.O.O.D HOPE Find Help pathway — tell us what you need and where you're located, and get routed to the right local support.",
    path: "/find-help/",
    activeNav: "/find-help/",
  },
  findHelp
);
track("/find-help/", "0.9");

// ---- Impact -----------------------------------------------------------------
render(
  "impact",
  {
    title: "Impact Areas",
    description:
      "Explore H.O.O.D HOPE's six shared impact categories: housing stability, health and wellness, food and nutrition, education and opportunity, transportation and daily living, and community connection.",
    path: "/impact/",
    activeNav: "/impact/",
  },
  impactIndex
);
track("/impact/", "0.8");

impactCategories.forEach((cat) => {
  render(
    path.join("impact", cat.slug),
    {
      title: cat.name,
      description: cat.summary,
      path: `/impact/${cat.slug}/`,
      activeNav: "/impact/",
    },
    () => impactCategoryPage(cat)
  );
  track(`/impact/${cat.slug}/`, "0.7");
});

// ---- Metros -----------------------------------------------------------------
render(
  "metros",
  {
    title: "Metro Hubs",
    description:
      "H.O.O.D HOPE's five launch metros: Kansas City, St. Louis, Wichita, Dallas, and Detroit — with more metros to come.",
    path: "/metros/",
    activeNav: "/metros/",
  },
  metrosIndex
);
track("/metros/", "0.8");

metros.forEach((metro) => {
  render(
    path.join("metros", metro.slug),
    {
      title: `${metro.name} Metro Hub`,
      description: metro.summary,
      path: `/metros/${metro.slug}/`,
      activeNav: "/metros/",
    },
    () => metroDetail(metro)
  );
  track(`/metros/${metro.slug}/`, "0.7");

  render(
    path.join("metros", metro.slug, "resources"),
    {
      title: `${metro.name} Resource Directory`,
      description: `Real, verified local resources in ${metro.name} — housing, health, food, and community organizations — filterable by category, with last-verified metadata and an interactive map on every listing.`,
      path: `/metros/${metro.slug}/resources/`,
      activeNav: "/metros/",
      includeMap: true,
    },
    () => metroResources(metro)
  );
  track(`/metros/${metro.slug}/resources/`, "0.6");
});

// ---- Partners -----------------------------------------------------------------
render(
  "partners",
  {
    title: "Partner With Us",
    description:
      "Healthcare organizations, employers, foundations, churches, government agencies, and researchers: partner with H.O.O.D HOPE to build a connected community impact ecosystem.",
    path: "/partners/",
    activeNav: "/partners/",
  },
  partnersPage
);
track("/partners/", "0.9");

// ---- Submit Resource --------------------------------------------------------
render(
  "submit-resource",
  {
    title: "Submit a Resource",
    description:
      "Service providers and community organizations: submit your organization for inclusion in the H.O.O.D. Hope resource directory.",
    path: "/submit-resource/",
    activeNav: "/partners/",
  },
  submitResource
);
track("/submit-resource/", "0.6");

// ---- Donate -----------------------------------------------------------------
render(
  "donate",
  {
    title: "Donate",
    description: "Support H.O.O.D HOPE's connected pathway toward housing, health, education, and long-term community independence.",
    path: "/donate/",
    activeNav: "/donate/",
  },
  donatePage
);
track("/donate/", "0.7");

// ---- Volunteer -----------------------------------------------------------------
render(
  "volunteer",
  {
    title: "Volunteer",
    description: "Sign up to volunteer with H.O.O.D HOPE across Kansas City, St. Louis, Wichita, Dallas, and Detroit.",
    path: "/volunteer/",
    activeNav: "/volunteer/",
  },
  volunteerPage
);
track("/volunteer/", "0.7");

// ---- Reports -----------------------------------------------------------------
render(
  "reports",
  {
    title: "Reports & Financial Transparency",
    description: "H.O.O.D HOPE annual reports, research notes, and financial transparency information.",
    path: "/reports/",
    activeNav: "/reports/",
  },
  reportsPage
);
track("/reports/", "0.6");

// ---- About -----------------------------------------------------------------
render(
  "about",
  {
    title: "About",
    description: "H.O.O.D HOPE's mission, model, leadership, and the communities we serve.",
    path: "/about/",
    activeNav: "/about/",
  },
  aboutPage
);
track("/about/", "0.7");

// ---- Contact -----------------------------------------------------------------
render(
  "contact",
  {
    title: "Contact",
    description: "Get in touch with H.O.O.D HOPE.",
    path: "/contact/",
    activeNav: "/contact/",
  },
  contactPage
);
track("/contact/", "0.5");

// ---- 404 -----------------------------------------------------------------
writeFile(
  "404.html",
  page({
    title: "Page Not Found",
    description: "The page you're looking for could not be found.",
    path: "/404.html",
    noindex: true,
  })(notFoundPage())
);

// ---- sitemap.xml + robots.txt -----------------------------------------------
const urlset = builtRoutes
  .map(
    (r) => `  <url>
    <loc>${site.siteUrl}${r.routePath}</loc>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

writeFile(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`
);

writeFile(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${site.siteUrl}/sitemap.xml
`
);

console.log(`\nBuilt ${builtRoutes.length} pages + 404, sitemap.xml, robots.txt.`);
