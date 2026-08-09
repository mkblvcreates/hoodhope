// Metro hub collection — loaded live from content/metros/*.json, a CMS
// folder collection (/admin/ → "Metros"). To add a new metro: click "New
// Metro" in the CMS (or drop a new .json file in that folder) and re-run
// `node build.js` — zero navigation or template changes required. This is
// exactly the HUD non-negotiable: expand without redesigning the site.
//
// Real rollout phases from the brochure:
//   Phase 1 — St. Louis Flagship (active)
//   Phase 2 — Regional Expansion (Wichita, next)
//   Phase 3 — National Platform (150+ metros; Kansas City, Dallas, and
//             Detroit are named target metros on our public roadmap)

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../content/metros");

const metros = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
  .sort((a, b) => a.phase - b.phase || a.name.localeCompare(b.name));

module.exports = metros;
