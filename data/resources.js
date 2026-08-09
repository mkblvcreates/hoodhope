// Local resource directory — flattened from each metro's `resources` list
// in content/metros/*.json. Resources are edited inside a metro's CMS entry
// (/admin/ → "Metros" → pick a metro → "Local Resources" list) so an editor
// never has to think about a separate collection. Coordinates are
// best-estimate geocoding for the interactive map and should be
// spot-checked against each organization's official listing before being
// treated as authoritative — see PRODUCTION-CHECKLIST.md.

const metros = require("./metros");

const resources = [];
metros.forEach((metro) => {
  (metro.resources || []).forEach((r) => {
    resources.push({ ...r, metro: metro.slug });
  });
});

module.exports = resources;
