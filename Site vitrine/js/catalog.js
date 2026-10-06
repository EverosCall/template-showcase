/**
 * ====================================================================
 * ATELIER KRONA — MOTEUR DE CATALOGUE (CATALOG.JS)
 * ====================================================================
 * Gère l'affichage, la recherche, le filtrage, le tri des produits,
 * les URL propres et les libellés multilingues FR / EN.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const catalogGrid = document.getElementById("catalog-grid");
  if (!catalogGrid) return; // Seulement exécuté sur la page catalogue

  // Éléments du DOM
  const searchInput = document.getElementById("catalog-search");
  const categoryContainer = document.getElementById("category-filters");
  const sortSelect = document.getElementById("catalog-sort");
  const badgeSelect = document.getElementById("catalog-badge-filter");
  const productCountEl = document.getElementById("catalog-count");
  const emptyStateEl = document.getElementById("catalog-empty");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  // État initial des filtres
  const urlParams = new URLSearchParams(window.location.search);
  const state = {
    category: urlParams.get("cat") || "all",
    search: urlParams.get("q") || "",
    badge: urlParams.get("badge") || "all",
    sort: "featured"
  };

  if (searchInput && state.search) {
    searchInput.value = state.search;
  }

  // 1. Initialiser les boutons de catégories
  initCategoryPills();

  // 2. Écouter les événements utilisateurs
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderCatalog();
    });
  }

  if (badgeSelect) {
    badgeSelect.addEventListener("change", (e) => {
      state.badge = e.target.value;
      renderCatalog();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      state.category = "all";
      state.search = "";
      state.badge = "all";
      state.sort = "featured";

      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "featured";
      if (badgeSelect) badgeSelect.value = "all";

      updateCategoryActivePill();
      renderCatalog();
    });
  }

  // 3. Rendu initial
  renderCatalog();

  /**
   * Création dynamique des filtres de catégories avec compteurs
   */
  function initCategoryPills() {
    if (!categoryContainer) return;

    categoryContainer.innerHTML = "";

    CATALOG_DATA.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `category-pill-btn ${cat.id === state.category ? "active" : ""}`;
      btn.dataset.category = cat.id;

      // Calculer le nombre réel de produits
      const count = cat.id === "all" 
        ? CATALOG_DATA.products.length 
        : CATALOG_DATA.products.filter(p => p.category === cat.id).length;

      btn.innerHTML = `
        <span>${cat.name}</span>
        <span class="category-count">(${count})</span>
      `;

      btn.addEventListener("click", () => {
        state.category = cat.id;
        updateCategoryActivePill();
        renderCatalog();
      });

      categoryContainer.appendChild(btn);
    });
  }

  function updateCategoryActivePill() {
    if (!categoryContainer) return;
    categoryContainer.querySelectorAll(".category-pill-btn").forEach(btn => {
      if (btn.dataset.category === state.category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  /**
   * Filtrage, tri et affichage de la grille de produits
   */
  function renderCatalog() {
    let filtered = [...CATALOG_DATA.products];

    // Filtre par catégorie
    if (state.category !== "all") {
      filtered = filtered.filter(p => p.category === state.category);
    }

    // Filtre par badge (Promotions, Nouveautés, etc.)
    if (state.badge === "promo") {
      filtered = filtered.filter(p => p.oldPrice && p.oldPrice > p.price);
    } else if (state.badge === "new") {
      filtered = filtered.filter(p => p.isNew || p.badge === "Nouveau");
    } else if (state.badge === "popular") {
      filtered = filtered.filter(p => p.isPopular || p.badge === "Populaire");
    }

    // Filtre par recherche texte
    if (state.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(state.search) ||
        p.shortDescription.toLowerCase().includes(state.search) ||
        p.categoryName.toLowerCase().includes(state.search)
      );
    }

    // Tri des produits
    if (state.sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // "featured" par défaut
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    // Détection de la langue courante
    const isEn = typeof window.getSiteLang === "function" && window.getSiteLang() === "en";

    // Mise à jour compteur bilingue
    if (productCountEl) {
      const count = filtered.length;
      if (isEn) {
        productCountEl.textContent = `${count} product${count > 1 ? "s" : ""} found`;
      } else {
        const s = count > 1 ? "s" : "";
        productCountEl.textContent = `${count} produit${s} trouvé${s}`;
      }
    }

    // Gestion de l'état vide
    if (filtered.length === 0) {
      catalogGrid.innerHTML = "";
      if (emptyStateEl) emptyStateEl.style.display = "block";
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = "none";
    }

    // Rendu des cartes produits
    catalogGrid.innerHTML = filtered.map(product => renderProductCard(product, isEn)).join("");

    // Si le site est en anglais, notifier Google Translate pour les nouveaux éléments
    if (isEn) {
      setTimeout(() => {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) combo.dispatchEvent(new Event("change"));
      }, 100);
    }
  }

  /**
   * Générateur de carte produit HTML réutilisable
   */
  function renderProductCard(product, isEn = false) {
    const currency = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.brand.currency) || "€";
    
    // Décoration badge
    let badgeHtml = "";
    if (product.badge) {
      const badgeClass = product.badge === "Promo" ? "badge-mint" : "badge-white";
      badgeHtml = `<span class="badge ${badgeClass} product-card__badge">${product.badge}</span>`;
    }

    // Prix barré éventuel
    const oldPriceHtml = product.oldPrice 
      ? `<span class="product-card__old-price">${product.oldPrice} ${currency}</span>` 
      : "";

    // Lien d'achat externe configuré
    const buyUrl = (product.externalPurchase && product.externalPurchase.url) || "contact";
    const buyPlatform = (product.externalPurchase && product.externalPurchase.platform) || "Acheter";

    // Libellés selon la langue
    const detailsLabel = isEn ? "Details" : "Fiche";
    const buyLabel = isEn ? "Buy" : "Acheter";

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card__media">
          ${badgeHtml}
          <a href="produit?id=${product.id}" aria-label="Découvrir ${product.name}">
            <img class="product-card__img" src="${product.image}" alt="${product.name}" loading="lazy">
          </a>
        </div>
        <div class="product-card__content">
          <span class="product-card__category">${product.categoryName}</span>
          <h3 class="product-card__title">
            <a href="produit?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-card__desc">${product.shortDescription}</p>
          <div class="product-card__footer">
            <div class="product-card__price-box">
              <span class="product-card__price">${product.price} ${currency}</span>
              ${oldPriceHtml}
            </div>
            <div class="product-card__actions">
              <a href="produit?id=${product.id}" class="btn btn-ghost btn-sm" title="${detailsLabel}">
                ${detailsLabel}
              </a>
              <a href="${buyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="${buyLabel} sur ${buyPlatform}">
                ${buyLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }
});
