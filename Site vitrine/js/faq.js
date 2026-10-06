/**
 * ====================================================================
 * ATELIER KRONA — FAQ INTERACTIVE (FAQ.JS)
 * ====================================================================
 * Gère le déploiement des accordéons, la recherche instantanée,
 * le filtrage thématique et les textes bilingues FR / EN.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const faqContainer = document.getElementById("faq-container");
  if (!faqContainer) return; // Seulement exécuté sur la page FAQ

  const searchInput = document.getElementById("faq-search");
  const categoryFilters = document.getElementById("faq-category-filters");
  let activeCategory = "all";

  const isEn = () => (typeof window.getSiteLang === "function" && window.getSiteLang() === "en");

  // 1. Initialiser les filtres thématiques
  initFaqFilters();

  // 2. Rendu initial
  renderFaq();

  // 3. Écouteur de recherche
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderFaq();
    });
  }

  function initFaqFilters() {
    if (!categoryFilters) return;

    const allLabel = isEn() ? "All questions" : "Toutes les questions";

    categoryFilters.innerHTML = `
      <button type="button" class="category-pill-btn active" data-cat="all">${allLabel}</button>
      ${CATALOG_DATA.faq.map(group => `
        <button type="button" class="category-pill-btn" data-cat="${group.category}">
          ${group.category}
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

    CATALOG_DATA.faq.forEach((group, groupIdx) => {
      if (activeCategory !== "all" && group.category !== activeCategory) {
        return;
      }

      // Filtrer les questions selon la recherche
      const matchingItems = group.items.filter(item => 
        !searchTerm || 
        item.q.toLowerCase().includes(searchTerm) || 
        item.a.toLowerCase().includes(searchTerm)
      );

      if (matchingItems.length === 0) return;

      html += `
        <div class="faq-group" style="margin-bottom: 40px;">
          <h3 style="font-size: 20px; color: var(--color-pure-white); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--color-spruce-border);">
            ${group.category}
          </h3>
          <div class="accordion">
            ${matchingItems.map((item, itemIdx) => {
              const isOpen = groupIdx === 0 && itemIdx === 0 && !searchTerm;
              return `
                <div class="accordion-item ${isOpen ? "is-open" : ""}">
                  <button type="button" class="accordion-trigger" aria-expanded="${isOpen}">
                    <span>${item.q}</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div class="accordion-content">
                    <p>${item.a}</p>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });

    if (!html) {
      const emptyTitle = isEn() ? "No answers found" : "Aucune réponse trouvée";
      const emptySubtitle = isEn() 
        ? "Try another keyword or reach out directly to our team."
        : "Essayez un autre mot-clé ou contactez directement notre équipe.";

      faqContainer.innerHTML = `
        <div class="empty-state">
          <p style="font-size: 18px; color: var(--color-pure-white); margin-bottom: 8px;">${emptyTitle}</p>
          <p style="font-size: 14px; color: var(--color-sage-gray);">${emptySubtitle}</p>
        </div>
      `;
      return;
    }

    faqContainer.innerHTML = html;

    // Attacher les écouteurs sur les accordéons
    faqContainer.querySelectorAll(".accordion-trigger").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".accordion-item");
        const isOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", !isOpen);
      });
    });

    // Si la langue est anglaise, notifier Google Translate pour traduire le contenu injecté
    if (isEn()) {
      setTimeout(() => {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) combo.dispatchEvent(new Event("change"));
      }, 100);
    }
  }
});
