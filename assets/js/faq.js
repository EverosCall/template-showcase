/**
 * ====================================================================
 * ATELIER KRONA — FAQ INTERACTIVE ENGINE (2026 EDITION)
 * ====================================================================
 * Features:
 * - Real-time keyword filter across questions & answers
 * - Interactive theme category pills
 * - Smooth CSS-grid expandable accordions
 * - Keyboard accessible
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const faqContainer = document.getElementById("faq-container");
  if (!faqContainer) return; // Only runs on FAQ page

  const searchInput = document.getElementById("faq-search");
  const categoryFilters = document.getElementById("faq-category-filters");
  let activeCategory = "all";

  // 1. Init Category Filter Pills
  initFaqFilters();

  // 2. Initial Render
  renderFaq();

  // 3. Search Input Listener
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderFaq();
    });
  }

  function initFaqFilters() {
    if (!categoryFilters) return;

    categoryFilters.innerHTML = `
      <button type="button" class="category-pill-btn active" data-cat="all">
        <span>Toutes les questions</span>
      </button>
      ${(CATALOG_DATA.faq || []).map(group => `
        <button type="button" class="category-pill-btn" data-cat="${group.category}">
          <span>${group.category}</span>
        </button>
      `).join("")}
    `;

    categoryFilters.querySelectorAll(".category-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        categoryFilters.querySelectorAll(".category-pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        renderFaq();
      });
    });
  }

  function renderFaq() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let html = "";

    (CATALOG_DATA.faq || []).forEach((group, groupIdx) => {
      if (activeCategory !== "all" && group.category !== activeCategory) {
        return;
      }

      // Filter items
      const matchingItems = group.items.filter(item =>
        !searchTerm ||
        item.q.toLowerCase().includes(searchTerm) ||
        item.a.toLowerCase().includes(searchTerm)
      );

      if (matchingItems.length === 0) return;

      html += `
        <div class="faq-group" style="margin-bottom: 40px;">
          <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--primitive-white); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
            <span>${group.category}</span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary);">${matchingItems.length} question${matchingItems.length > 1 ? "s" : ""}</span>
          </h3>
          <div class="accordion-group">
            ${matchingItems.map((item, itemIdx) => {
              const isOpen = groupIdx === 0 && itemIdx === 0 && !searchTerm;
              return `
                <div class="accordion-item ${isOpen ? "is-open" : ""}">
                  <button type="button" class="accordion-header" aria-expanded="${isOpen}">
                    <span>${item.q}</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div class="accordion-content">
                    <div class="accordion-inner">
                      <p>${item.a}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });

    if (!html) {
      faqContainer.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 48px; max-width: 540px; margin: 40px auto;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px auto; color: var(--text-muted);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h4 style="font-size: 18px; font-weight: 700; color: var(--primitive-white); margin-bottom: 6px;">Aucune réponse trouvée</h4>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Essayez d'autres mots-clés ou posez directement votre question à notre atelier.</p>
          <a href="contact" class="btn btn-primary btn-sm">Contacter l'atelier</a>
        </div>
      `;
      return;
    }

    faqContainer.innerHTML = html;

    // Attach click listeners to headers
    faqContainer.querySelectorAll(".accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
        const isOpen = item.classList.contains("is-open");
        
        // Optional: close other items in the same group
        item.parentElement.querySelectorAll(".accordion-item").forEach(other => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherHdr = other.querySelector(".accordion-header");
            if (otherHdr) otherHdr.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", !isOpen);
        header.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }
});
