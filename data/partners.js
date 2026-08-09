// Partner type collection — loaded live from content/partners.json, the
// file the CMS (/admin/ → "Partner Types") edits. "Vision for Children at
// Risk" (St. Louis) is the one confirmed, named local implementer today —
// see content/model.json `flagshipPartner`.

module.exports = require("../content/partners.json").types;
