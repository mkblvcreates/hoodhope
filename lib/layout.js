const site = require("../data/site");
const { skipLink, header, footer } = require("./ui");

function jsonLd(meta) {
  const base = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.org.name,
    alternateName: site.org.fullName,
    url: site.siteUrl,
    description: site.org.shortMission,
    email: site.contact.email,
    telephone: site.contact.phone,
  };
  return `<script type="application/ld+json">${JSON.stringify(meta.jsonLd || base)}</script>`;
}

function page({
  title,
  description,
  path = "/",
  activeNav = "",
  bodyClass = "",
  jsonLd: jsonLdOverride,
  noindex = false,
  includeMap = false,
}) {
  return function wrap(contentHtml) {
    const fullTitle = title.includes(site.org.name) ? title : `${title} | ${site.org.name}`;
    const canonical = `${site.siteUrl}${path}`;

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fullTitle}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  ${noindex ? '<meta name="robots" content="noindex,follow" />' : '<meta name="robots" content="index,follow" />'}

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${site.org.name}" />
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${fullTitle}" />
  <meta name="twitter:description" content="${description}" />

  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="/assets/css/styles.css" />
  ${includeMap ? '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />' : ""}
  ${jsonLd({ jsonLd: jsonLdOverride })}
</head>
<body class="${bodyClass}">
  ${skipLink()}
  ${header(activeNav)}
  <main id="main">
    ${contentHtml}
  </main>
  ${footer()}
  ${includeMap ? '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>' : ""}
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
  };
}

module.exports = { page };
