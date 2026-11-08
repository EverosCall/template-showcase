/**
 * ====================================================================
 * ATELIER KRONA — CATALOGUE & SEARCH ENGINE (2026 EDITION)
 * ====================================================================
 * Features:
 * - Real-time client-side search with debounce
 * - Dynamic category tabs with accurate item counters
 * - Sorting (Price asc/desc, Newest, Rating)
 * - Quick-View modal trigger & Add to Cart on cards
 * - Filter state persistence in URL parameters
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const catalogGrid = document.getElementById("catalog-grid");
  if (!catalogGrid) return; // Only runs on catalogue page

  const searchInput = document.getElementById("catalog-search");
  const searchClearBtn = document.getElementById("search-clear-btn");
  const categoryContainer = document.getElementById("category-filters");
  const sortSelect = document.getElementById("catalog-sort");
  const productCountEl = document.getElementById("catalog-count");
  const emptyStateEl = document.getElementById("catalog-empty");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  // State from URL
  const urlParams = new URLSearchParams(window.location.search);
  const state = {
    category: urlParams.get("cat") || "all",
    search: urlParams.get("q") || "",
    sort: urlParams.get("sort") || "featured"
  };

  if (searchInput && state.search) {
    searchInput.value = state.search;
    if (searchClearBtn) searchClearBtn.style.display = "flex";
  }

  if (sortSelect && state.sort) {
    sortSelect.value = state.sort;
  }

  // 1. Init Category Filter Pills
  initCategoryPills();

  // 2. Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.toLowerCase().trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = state.search.length > 0 ? "flex" : "none";
      }
      renderCatalog();
    });

    // Keyboard shortcut '/' to focus search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      state.search = "";
      searchClearBtn.style.display = "none";
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderCatalog();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      state.category = "all";
      state.search = "";
      state.sort = "featured";
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "featured";
      if (searchClearBtn) searchClearBtn.style.display = "none";
      updateActiveCategoryPill();
      renderCatalog();
    });
  }

  // Initial Render
  renderCatalog();

  function initCategoryPills() {
    if (!categoryContainer) return;

    categoryContainer.innerHTML = CATALOG_DATA.categories.map(cat => {
      const count = cat.id === "all"
        ? CATALOG_DATA.products.length
        : CATALOG_DATA.products.filter(p => p.category === cat.id).length;

      const isActive = cat.id === state.category;

      return `
        <button type="button" class="category-pill-btn ${isActive ? "active" : ""}" data-cat="${cat.id}">
          <span>${cat.name}</span>
          <span class="pill-count">${count}</span>
        </button>
      `;
    }).join("");

    categoryContainer.querySelectorAll(".category-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.cat;
        updateActiveCategoryPill();
        renderCatalog();
      });
    });
  }

  function updateActiveCategoryPill() {
    if (!categoryContainer) return;
    categoryContainer.querySelectorAll(".category-pill-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === state.category);
    });
  }

  function renderCatalog() {
    let filtered = [...CATALOG_DATA.products];

    // Filter by Category
    if (state.category !== "all") {
      filtered = filtered.filter(p => p.category === state.category);
    }

    // Filter by Search Query
    if (state.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(state.search) ||
        p.shortDescription.toLowerCase().includes(state.search) ||
        p.categoryName.toLowerCase().includes(state.search)
      );
    }

    // Sort
    switch (state.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    // Update Counter
    if (productCountEl) {
      productCountEl.textContent = `${filtered.length} création${filtered.length > 1 ? "s" : ""}`;
    }

    // Empty State Handling
    if (filtered.length === 0) {
      catalogGrid.style.display = "none";
      if (emptyStateEl) emptyStateEl.style.display = "block";
      return;
    }

    catalogGrid.style.display = "grid";
    if (emptyStateEl) emptyStateEl.style.display = "none";

    // Render Cards
    catalogGrid.innerHTML = filtered.map(product => {
      const badgeHtml = product.badge
        ? `<span class="badge ${product.badge === "Promo" ? "badge-mint" : "badge-white"}">${product.badge}</span>`
        : "";

      return `
        <article class="product-card">
          <div class="product-card__thumb">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-card__badge-wrap">
              ${badgeHtml}
            </div>
            
            <div class="product-card__overlay">
              <button type="button" class="btn btn-white btn-sm" data-quick-view="${product.id}" aria-label="Aperçu rapide">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Aperçu
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="CartManager.addItem('${product.id}')" aria-label="Ajouter au panier">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Ajouter
              </button>
            </div>
          </div>

          <div class="product-card__body">
            <div class="product-card__cat">${product.categoryName}</div>
            <h3 class="product-card__title">
              <a href="produit?id=${product.id}">${product.name}</a>
            </h3>
            <p class="product-card__desc">${product.shortDescription}</p>

            <div class="product-card__footer">
              <div class="product-card__price-wrap">
                <span class="product-card__price">${product.price.toLocaleString()} €</span>
                ${product.oldPrice ? `<span class="product-card__price-old">${product.oldPrice} €</span>` : ""}
              </div>
              <a href="produit?id=${product.id}" class="btn btn-ghost btn-sm" aria-label="Voir la fiche">
                Découvrir →
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }
});
