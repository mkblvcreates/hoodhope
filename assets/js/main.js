/* H.O.O.D HOPE — site interactivity.
   Everything here is progressive enhancement: the HTML works without JS
   (forms POST, metro panels are all present and linkable), JS just makes
   it nicer. No external dependencies / CDN scripts. */

(function () {
  "use strict";

  /* ---- Footer year (safety net if a page is served from a static cache) */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Mobile nav toggle ------------------------------------------------ */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close mobile nav when a link is chosen
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function () {
        if (window.innerWidth < 780) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---- Metro selector (tabs) -------------------------------------------- */
  document.querySelectorAll("[data-metro-selector]").forEach((root) => {
    var tabs = root.querySelectorAll("[data-metro-tab]");
    var panels = root.querySelectorAll("[data-metro-panel]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-metro-tab");

        tabs.forEach((t) => {
          var active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });

        panels.forEach((p) => {
          var match = p.getAttribute("data-metro-panel") === target;
          p.classList.toggle("is-active", match);
          if (match) {
            p.removeAttribute("hidden");
          } else {
            p.setAttribute("hidden", "");
          }
        });
      });
    });
  });

  /* ---- 5-Stage Continuum stepper (accordion) ----------------------------- */
  document.querySelectorAll("[data-stage-stepper]").forEach((root) => {
    var tiles = root.querySelectorAll("[data-stage-toggle]");
    tiles.forEach((tile) => {
      tile.addEventListener("click", function () {
        var isOpen = tile.getAttribute("aria-expanded") === "true";
        tiles.forEach((t) => t.setAttribute("aria-expanded", "false"));
        tile.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });
    });
  });

  /* ---- WEL9 / SDOH wellness wheel ---------------------------------------- */
  document.querySelectorAll("[data-wellness-wheel]").forEach((root) => {
    var segments = root.querySelectorAll("[data-wheel-seg]");
    var buttons = root.querySelectorAll("[data-wellness-btn]");
    var details = root.querySelectorAll("[data-wellness-detail]");

    function activate(slug) {
      segments.forEach((s) => s.classList.toggle("is-active", s.getAttribute("data-wheel-seg") === slug));
      buttons.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-wellness-btn") === slug));
      details.forEach((d) => {
        if (d.getAttribute("data-wellness-detail") === slug) {
          d.removeAttribute("hidden");
        } else {
          d.setAttribute("hidden", "");
        }
      });
    }

    segments.forEach((seg) => {
      seg.addEventListener("click", () => activate(seg.getAttribute("data-wheel-seg")));
      seg.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate(seg.getAttribute("data-wheel-seg"));
        }
      });
    });
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => activate(btn.getAttribute("data-wellness-btn")));
    });
  });

  /* ---- Resource directory filter (metro resource pages) ----------------- */
  var toolbar = document.querySelector("[data-resource-toolbar]");
  var resourceMapEl = document.querySelector("[data-resource-map]");
  var leafletMap = null;
  var leafletMarkers = [];

  function initResourceMap() {
    if (leafletMap || !resourceMapEl || typeof L === "undefined") return;
    var points = [];
    try {
      points = JSON.parse(resourceMapEl.getAttribute("data-map-points") || "[]");
    } catch (e) {
      points = [];
    }
    if (!points.length) return;

    leafletMap = L.map(resourceMapEl.id).setView([points[0].lat, points[0].lng], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(leafletMap);

    var bounds = [];
    points.forEach(function (p) {
      var marker = L.marker([p.lat, p.lng]).addTo(leafletMap);
      marker.bindPopup("<strong>" + p.title + "</strong>" + (p.address ? "<br>" + p.address : ""));
      marker.on("click", function () {
        var card = document.getElementById(p.id);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      leafletMarkers.push({ marker: marker, category: p.category });
      bounds.push([p.lat, p.lng]);
    });
    if (bounds.length > 1) leafletMap.fitBounds(bounds, { padding: [24, 24] });
  }

  var viewToggleButtons = document.querySelectorAll("[data-view-toggle]");
  if (viewToggleButtons.length) {
    var resourceListEl = document.querySelector("[data-resource-list]");
    viewToggleButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        var view = btn.getAttribute("data-view-toggle");
        viewToggleButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        if (view === "map") {
          if (resourceListEl) resourceListEl.setAttribute("hidden", "");
          if (resourceMapEl) resourceMapEl.removeAttribute("hidden");
          initResourceMap();
          if (leafletMap) window.setTimeout(() => leafletMap.invalidateSize(), 50);
        } else {
          if (resourceListEl) resourceListEl.removeAttribute("hidden");
          if (resourceMapEl) resourceMapEl.setAttribute("hidden", "");
        }
      });
    });
  }

  if (toolbar) {
    var categorySelect = toolbar.querySelector("[data-filter-category]");
    var languageSelect = toolbar.querySelector("[data-filter-verified]");
    var searchInput = toolbar.querySelector("[data-filter-search]");
    var cards = document.querySelectorAll("[data-resource-card]");
    var emptyState = document.querySelector("[data-resource-empty]");

    function applyFilters() {
      var category = categorySelect ? categorySelect.value : "";
      var verifiedOnly = languageSelect ? languageSelect.value : "";
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var visibleCount = 0;

      cards.forEach((card) => {
        var matchesCategory = !category || card.getAttribute("data-category") === category;
        var matchesVerified = !verifiedOnly || card.getAttribute("data-verified") === verifiedOnly;
        var matchesSearch = !query || card.textContent.toLowerCase().indexOf(query) !== -1;
        var visible = matchesCategory && matchesVerified && matchesSearch;
        card.style.display = visible ? "" : "none";
        if (visible) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? "block" : "none";
      }

      if (leafletMap) {
        leafletMarkers.forEach((entry) => {
          var matchesCategory = !category || entry.category === category;
          if (matchesCategory) {
            if (!leafletMap.hasLayer(entry.marker)) entry.marker.addTo(leafletMap);
          } else if (leafletMap.hasLayer(entry.marker)) {
            leafletMap.removeLayer(entry.marker);
          }
        });
      }
    }

    if (categorySelect) categorySelect.addEventListener("change", applyFilters);
    if (languageSelect) languageSelect.addEventListener("change", applyFilters);
    if (searchInput) searchInput.addEventListener("input", applyFilters);
  }

  /* ---- Investor gate (Our Model page) ------------------------------------ */
  var gateCheckbox = document.getElementById("investor-gate-agree");
  var gateBtn = document.getElementById("investor-gate-btn");
  var gatePrompt = document.getElementById("investor-gate-prompt");
  var gatedContent = document.getElementById("investor-gated-content");

  if (gateCheckbox && gateBtn && gatePrompt && gatedContent) {
    if (sessionStorage.getItem("hh-investor-agreed") === "1") {
      gatePrompt.setAttribute("hidden", "");
      gatedContent.removeAttribute("hidden");
    }

    gateCheckbox.addEventListener("change", function () {
      gateBtn.disabled = !gateCheckbox.checked;
    });

    gateBtn.addEventListener("click", function () {
      if (!gateCheckbox.checked) return;
      sessionStorage.setItem("hh-investor-agreed", "1");
      gatePrompt.setAttribute("hidden", "");
      gatedContent.removeAttribute("hidden");
      gatedContent.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---- Donation amount presets ------------------------------------------- */
  document.querySelectorAll("[data-amount-presets]").forEach((group) => {
    var buttons = group.querySelectorAll("button");
    var amountInput = document.getElementById(group.getAttribute("data-amount-presets"));

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        if (amountInput) {
          amountInput.value = btn.getAttribute("data-amount") || "";
          amountInput.focus();
        }
      });
    });
  });

  /* ---- Forms: validation + accessible submit handling -------------------
     Production note: forms currently simulate a successful submission
     locally (no backend is connected yet). Replace the `simulateSubmit`
     branch in handleSubmit() with a real fetch() call to your form
     provider, CRM, or backend API route before launch. See
     PRODUCTION-CHECKLIST.md for provider recommendations per form. */
  document.querySelectorAll("[data-site-form]").forEach((form) => {
    var status = form.querySelector("[data-form-status]");

    function setFieldError(field, message) {
      var wrap = field.closest(".form-field");
      if (!wrap) return;
      wrap.classList.add("has-error");
      var existing = wrap.querySelector(".field-error");
      if (existing) existing.remove();
      if (message) {
        var err = document.createElement("span");
        err.className = "field-error";
        err.textContent = message;
        wrap.appendChild(err);
      }
    }

    function clearFieldError(field) {
      var wrap = field.closest(".form-field");
      if (!wrap) return;
      wrap.classList.remove("has-error");
      var existing = wrap.querySelector(".field-error");
      if (existing) existing.remove();
    }

    function validate() {
      var valid = true;
      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach((field) => {
        var isCheckbox = field.type === "checkbox";
        var filled = isCheckbox ? field.checked : String(field.value || "").trim().length > 0;
        var emailInvalid =
          field.type === "email" && filled && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        if (!filled) {
          setFieldError(field, isCheckbox ? "Please check this box to continue." : "This field is required.");
          valid = false;
          firstInvalid = firstInvalid || field;
        } else if (emailInvalid) {
          setFieldError(field, "Please enter a valid email address.");
          valid = false;
          firstInvalid = firstInvalid || field;
        } else {
          clearFieldError(field);
        }
      });
      return { valid: valid, firstInvalid: firstInvalid };
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = validate();

      if (!result.valid) {
        if (status) {
          status.dataset.state = "error";
          status.textContent = "Please fix the highlighted fields and try again.";
        }
        if (result.firstInvalid) result.firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }
      if (status) {
        status.dataset.state = "";
        status.textContent = "";
      }

      // Simulated submission — no backend is connected in this build.
      // Swap this timeout for a real fetch(form.action, { method, body })
      // call once a form provider / API route is wired up.
      window.setTimeout(function () {
        if (status) {
          status.dataset.state = "success";
          status.textContent =
            "Thank you — your message has been received. This is a placeholder confirmation until a live form backend is connected.";
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText;
        }
      }, 500);
    });

    // Clear individual field errors as the visitor fixes them
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", function () {
        if (field.hasAttribute("required")) clearFieldError(field);
      });
      field.addEventListener("change", function () {
        if (field.hasAttribute("required")) clearFieldError(field);
      });
    });
  });
})();
