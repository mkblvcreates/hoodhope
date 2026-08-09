// The WEL9 Methodology's wellness pillars — loaded live from
// content/wellness-pillars/*.json, a CMS folder collection
// (/admin/ → "Wellness Pillars"). To add a pillar: click "New Wellness
// Pillar" in the CMS (or drop a new .json file in that folder) and
// re-run `node build.js` — no template or navigation changes needed.

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../content/wellness-pillars");

const pillars = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
  .sort((a, b) => (a.order || 0) - (b.order || 0));

module.exports = pillars;
