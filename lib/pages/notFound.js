const ui = require("../ui");

module.exports = function notFound() {
  return `
<section class="section" style="text-align:center;padding-top:5rem;padding-bottom:5rem">
  ${ui.eyebrow("404")}
  <h1>We couldn't find that page.</h1>
  <p class="lede" style="margin-inline:auto">
    The page you're looking for may have moved. Try the Find Help or Partner pathways below, or
    head back to the homepage.
  </p>
  ${ui.primaryActions({ style: "centered", context: "404 page" })}
</section>
`;
};
