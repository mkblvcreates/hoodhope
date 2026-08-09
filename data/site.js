// Global site data: organization identity, navigation, contact, footer.
//
// The editable text below (org fields, contact, social) is loaded live from
// content/site.json — the file the CMS (/admin/) writes to. Navigation,
// footer link structure, and brand asset paths stay in code since changing
// them is a structural/design decision, not a content edit.
//
// Non-technical edits: use /admin/ → "Organization Settings", or edit
// content/site.json directly, then re-run `node build.js`.

const cms = require("../content/site.json");

module.exports = {
  org: {
    ...cms.org,
    hud: { note: cms.org.hudNote },
  },

  primaryActions: {
    findHelp: { label: "Find Help", href: "/find-help/" },
    partner: { label: "Partner With Us", href: "/partners/" },
  },

  secondaryActions: {
    donate: { label: "Invest / Donate", href: "/donate/" },
    volunteer: { label: "Volunteer", href: "/volunteer/" },
  },

  nav: [
    { label: "Find Help", href: "/find-help/" },
    { label: "Our Model", href: "/model/" },
    { label: "Wellness Pillars", href: "/impact/" },
    { label: "Metros", href: "/metros/" },
    { label: "Partners", href: "/partners/" },
    { label: "Reports", href: "/reports/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  footerColumns: [
    {
      heading: "Get Support",
      links: [
        { label: "Find Help", href: "/find-help/" },
        { label: "Wellness Pillars", href: "/impact/" },
        { label: "Metro Hubs", href: "/metros/" },
      ],
    },
    {
      heading: "Get Involved",
      links: [
        { label: "Partner With Us", href: "/partners/" },
        { label: "Volunteer", href: "/volunteer/" },
        { label: "Invest / Donate", href: "/donate/" },
      ],
    },
    {
      heading: "About H.O.O.D. Hope",
      links: [
        { label: "Our Model", href: "/model/" },
        { label: "Our Story", href: "/about/" },
        { label: "Reports & Financials", href: "/reports/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
  ],

  contact: cms.contact,
  social: cms.social,

  siteUrl: "https://hoodhope.org",
  languages: [
    { code: "en", label: "English", default: true },
    { code: "es", label: "Español", default: false }, // structural placeholder for multilingual rollout
  ],

  brand: {
    logo: "/assets/img/logo-mark.png",
    heroImage: "/assets/img/hero-community.jpg",
    colors: {
      navy: "#1B2B4B",
      gold: "#C9A227",
      cream: "#F8F6F1",
    },
  },
};
