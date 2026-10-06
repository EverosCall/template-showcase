/**
 * ====================================================================
 * ATELIER KRONA — FICHE PRODUIT DÉTAILLÉE (PRODUCT-DETAIL.JS)
 * ====================================================================
 * Gère l'affichage dynamique du produit, la galerie photo, la sélection
 * des variantes (couleurs & formats) et le bouton d'achat externe.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const detailContainer = document.getElementById("product-detail-view");
  if (!detailContainer) return; // Seulement exécuté sur la page produit

  // 1. Récupérer l'ID du produit depuis l'URL (?id=prod-001)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "prod-001";

  const product = CATALOG_DATA.products.find(p => p.id === productId) || CATALOG_DATA.products[0];
  if (!product) return;

  const currency = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.brand.currency) || "€";

  // Mise à jour du titre de la page pour le SEO
  document.title = `${product.name} — ${typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.brand.name : "Atelier Krona"}`;

  // État local de la sélection de variantes
  let activePrice = product.price;
  let selectedColor = product.variants?.colors?.[0]?.name || "";
  let selectedSize = product.variants?.sizes?.[0]?.name || "";

  // 2. Rendu de la vue produit
  renderProductView();
  renderSimilarProducts();

  function renderProductView() {
    // Breadcrumb
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    const breadcrumbProduct = document.getElementById("breadcrumb-product");
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = product.categoryName;
      breadcrumbCategory.href = `produits?cat=${product.category}`;
    }
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.name;
    }

    // Galerie photo
    const galleryHtml = `
      <div class="product-gallery">
        <div class="gallery-main">
          <img id="main-product-image" src="${product.image}" alt="${product.name}">
        </div>
        ${product.gallery && product.gallery.length > 1 ? `
          <div class="gallery-thumbnails">
            ${product.gallery.map((imgUrl, index) => `
              <div class="thumbnail-item ${index === 0 ? "active" : ""}" data-src="${imgUrl}">
                <img src="${imgUrl}" alt="${product.name} vue ${index + 1}">
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;

    // Badges & Note
    const badgeHtml = product.badge 
      ? `<span class="badge ${product.badge === "Promo" ? "badge-mint" : "badge-white"}">${product.badge}</span>` 
      : "";

    const statusBadge = `
      <span class="badge badge-status">
        ${product.status || "En stock chez nos partenaires"}
      </span>
    `;

    // Étoiles de notation
    const starsHtml = Array.from({ length: 5 }, (_, i) => 
      `<svg width="15" height="15" viewBox="0 0 24 24" fill="${i < Math.floor(product.rating) ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`
    ).join("");

    // Variantes Couleurs
    let colorsHtml = "";
    if (product.variants?.colors?.length > 0) {
      colorsHtml = `
        <div class="variant-section">
          <div class="variant-label">
            <span>Finition & Teinte :</span>
            <span class="selected-value" id="selected-color-label">${product.variants.colors[0].name}</span>
          </div>
          <div class="color-swatches">
            ${product.variants.colors.map((c, i) => `
              <button type="button" 
                      class="color-swatch ${i === 0 ? "active" : ""}" 
                      style="--swatch-color: ${c.hex};" 
                      data-color-name="${c.name}" 
                      aria-label="${c.name}">
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Variantes Tailles / Formats
    let sizesHtml = "";
    if (product.variants?.sizes?.length > 0) {
      sizesHtml = `
        <div class="variant-section">
          <div class="variant-label">
            <span>Format / Modèle :</span>
            <span class="selected-value" id="selected-size-label">${product.variants.sizes[0].name}</span>
          </div>
          <div class="size-options">
            ${product.variants.sizes.map((s, i) => `
              <button type="button" 
                      class="size-pill-btn ${i === 0 ? "active" : ""}" 
                      data-size-name="${s.name}" 
                      data-price-diff="${s.priceDiff || 0}">
                ${s.name} ${s.priceDiff ? `(+${s.priceDiff} ${currency})` : ""}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Caractéristiques techniques
    const specsHtml = product.specifications?.length > 0 ? `
      <div class="accordion-item is-open" style="margin-top: 24px;">
        <button class="accordion-trigger" type="button">
          <span>Spécifications & Caractéristiques</span>
          <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="accordion-content">
          <table class="specs-table">
            <tbody>
              ${product.specifications.map(s => `
                <tr>
                  <td>${s.label}</td>
                  <td>${s.value}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    ` : "";

    // Avantages / Points forts
    const benefitsHtml = product.benefits?.length > 0 ? `
      <div class="card" style="margin-top: 20px;">
        <h4 style="font-size: 15px; margin-bottom: 12px; color: var(--color-pure-white);">Points forts de la pièce</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${product.benefits.map(b => `
            <li style="display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--color-sage-gray);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-shopify-mint)" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${b}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : "";

    // Boutons d'achat externe configurables
    const primaryBuy = product.externalPurchase || {
      platform: "Boutique Officielle",
      url: "https://shopify.com",
      buttonText: "Commander sur notre boutique officielle"
    };

    const secondaryBuy = primaryBuy.secondaryUrl ? `
      <a href="${primaryBuy.secondaryUrl}" ${primaryBuy.secondaryUrl.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-ghost btn-full">
        ${primaryBuy.secondaryText || "Voir un point de vente"}
      </a>
    ` : "";

    // Assemblage final du layout produit
    detailContainer.innerHTML = `
      <div class="product-detail-layout">
        <!-- Colonne Gauche : Galerie -->
        ${galleryHtml}

        <!-- Colonne Droite : Informations & Achat Externe -->
        <div class="product-info-panel">
          <div class="product-header-badges">
            ${badgeHtml}
            ${statusBadge}
          </div>

          <h1 class="product-detail-title">${product.name}</h1>

          <div class="product-rating-row">
            <div class="rating-stars">${starsHtml}</div>
            <span>${product.rating} / 5</span>
            <span>•</span>
            <span>${product.reviewsCount} retours d'expérience</span>
          </div>

          <div class="product-price-box">
            <span class="current-price" id="display-price">${product.price} ${currency}</span>
            ${product.oldPrice ? `<span class="original-price">${product.oldPrice} ${currency}</span>` : ""}
          </div>

          <p class="lead" style="font-size: 16px; margin-bottom: 24px;">
            ${product.shortDescription}
          </p>

          <!-- Variantes -->
          ${colorsHtml}
          ${sizesHtml}

          <!-- BLOC D'ACTION EXTERNE (Conversion Showcase) -->
          <div class="purchase-action-box">
            <div class="purchase-channel-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-shopify-mint)" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Vente sécurisée opérée via nos distributeurs et plateformes partenaires officielles.</span>
            </div>

            <div class="purchase-buttons-stack">
              <a href="${primaryBuy.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg btn-full" id="primary-buy-button">
                <span>${primaryBuy.buttonText}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
              ${secondaryBuy}
            </div>

            <div style="margin-top: 14px; text-align: center;">
              <a href="contact?sujet=question-${product.slug}" class="link-mint" style="font-size: 13px;">
                Une question sur cette pièce ? Écrivez à nos créateurs
              </a>
            </div>
          </div>

          <!-- Description Détaillée -->
          <div style="margin-top: 16px;">
            <h3 style="font-size: 18px; margin-bottom: 12px; color: var(--color-pure-white);">Description détaillée</h3>
            <div style="font-size: 15px; color: var(--color-sage-gray); white-space: pre-line; line-height: 1.6;">
              ${product.fullDescription}
            </div>
          </div>

          ${specsHtml}
          ${benefitsHtml}
        </div>
      </div>
    `;

    // 3. Activer les écouteurs d'événements
    setupGalleryListeners();
    setupVariantListeners();
    setupAccordionListeners();
  }

  /**
   * Écouteurs pour la galerie d'images
   */
  function setupGalleryListeners() {
    const mainImg = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-item");

    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", () => {
        thumbnails.forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        if (mainImg) {
          mainImg.src = thumb.dataset.src;
        }
      });
    });
  }

  /**
   * Écouteurs pour le choix des variantes
   */
  function setupVariantListeners() {
    // Swatches Couleurs
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const colorLabel = document.getElementById("selected-color-label");

    colorSwatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        colorSwatches.forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        selectedColor = swatch.dataset.colorName;
        if (colorLabel) colorLabel.textContent = selectedColor;
      });
    });

    // Boutons Tailles
    const sizePills = document.querySelectorAll(".size-pill-btn");
    const sizeLabel = document.getElementById("selected-size-label");
    const displayPrice = document.getElementById("display-price");

    sizePills.forEach(pill => {
      pill.addEventListener("click", () => {
        sizePills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        selectedSize = pill.dataset.sizeName;
        if (sizeLabel) sizeLabel.textContent = selectedSize;

        // Recalcul du prix
        const diff = parseFloat(pill.dataset.priceDiff || 0);
        activePrice = product.price + diff;
        if (displayPrice) {
          displayPrice.textContent = `${activePrice} ${currency}`;
        }
      });
    });
  }

  /**
   * Accordéon des caractéristiques
   */
  function setupAccordionListeners() {
    const triggers = detailContainer.querySelectorAll(".accordion-trigger");
    triggers.forEach(trig => {
      trig.addEventListener("click", () => {
        const item = trig.closest(".accordion-item");
        item.classList.toggle("is-open");
      });
    });
  }

  /**
   * Rendu des produits similaires recommandés
   */
  function renderSimilarProducts() {
    const similarContainer = document.getElementById("similar-products-grid");
    if (!similarContainer) return;

    // Sélectionner des produits de la même catégorie ou d'autres produits
    const similars = CATALOG_DATA.products
      .filter(p => p.id !== product.id)
      .slice(0, 3);

    const isEn = typeof window.getSiteLang === "function" && window.getSiteLang() === "en";
    const viewLabel = isEn ? "View" : "Découvrir";

    similarContainer.innerHTML = similars.map(p => `
      <article class="product-card">
        <div class="product-card__media">
          <a href="produit?id=${p.id}">
            <img class="product-card__img" src="${p.image}" alt="${p.name}" loading="lazy">
          </a>
        </div>
        <div class="product-card__content">
          <span class="product-card__category">${p.categoryName}</span>
          <h4 class="product-card__title">
            <a href="produit?id=${p.id}">${p.name}</a>
          </h4>
          <div class="product-card__footer">
            <span class="product-card__price">${p.price} ${currency}</span>
            <a href="produit?id=${p.id}" class="btn btn-ghost btn-sm">${viewLabel}</a>
          </div>
        </div>
      </article>
    `).join("");
  }
});
