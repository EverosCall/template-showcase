/**
 * ====================================================================
 * ATELIER KRONA — FICHE PRODUIT DÉTAILLÉE (2026 EDITION)
 * ====================================================================
 * Features:
 * - Interactive multi-angle gallery with instant thumbnail switch
 * - Dynamic color & size swatches with live price calculation
 * - Quantity stepper [- 1 +]
 * - Direct Add to Cart integration with CartManager
 * - Sticky mobile action bar for mobile conversion
 * - Dynamic related products recommendation
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CATALOG_DATA === "undefined") return;

  const detailContainer = document.getElementById("product-detail-view");
  if (!detailContainer) return; // Only runs on product detail page

  // 1. Get Product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "prod-001";
  const product = CATALOG_DATA.products.find(p => p.id === productId) || CATALOG_DATA.products[0];

  if (!product) return;

  // Set document title
  document.title = `${product.name} — Atelier Krona`;

  // Local selection state
  let currentPrice = product.price;
  let currentColor = product.variants?.colors?.[0]?.name || "Noir Minéral";
  let currentSize = product.variants?.sizes?.[0]?.name || "Format Standard";
  let sizePriceDiff = 0;
  let quantity = 1;

  // Render Page
  renderDetail();
  renderRelatedProducts();

  function renderDetail() {
    // Breadcrumbs
    const breadcrumbCat = document.getElementById("breadcrumb-category");
    const breadcrumbProd = document.getElementById("breadcrumb-product");
    if (breadcrumbCat) {
      breadcrumbCat.textContent = product.categoryName;
      breadcrumbCat.href = `produits?cat=${product.category}`;
    }
    if (breadcrumbProd) {
      breadcrumbProd.textContent = product.name;
    }

    const galleryImages = product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

    const colors = product.variants?.colors || [];
    const sizes = product.variants?.sizes || [];

    detailContainer.innerHTML = `
      <div class="product-detail-grid">
        <!-- Left: Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-img">
            <img id="detail-active-img" src="${galleryImages[0]}" alt="${product.name}">
          </div>
          ${galleryImages.length > 1 ? `
            <div class="detail-thumbs">
              ${galleryImages.map((src, idx) => `
                <div class="detail-thumb ${idx === 0 ? "active" : ""}" data-src="${src}">
                  <img src="${src}" alt="${product.name} angle ${idx + 1}">
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>

        <!-- Right: Information & Customization -->
        <div class="detail-info">
          <div class="detail-meta-row">
            <span class="badge badge-mint">${product.categoryName}</span>
            <span class="badge-live-pulse">${product.status || "En stock à l'atelier"}</span>
          </div>

          <h1 class="detail-title">${product.name}</h1>

          <!-- Reviews Rating -->
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <div style="display: flex; color: var(--color-primary);">
              ${Array.from({ length: 5 }, () => `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              `).join("")}
            </div>
            <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${product.rating}</span>
            <span style="font-size: 13px; color: var(--text-muted);">(${product.reviewsCount} avis vérifiés)</span>
          </div>

          <!-- Price Row -->
          <div class="detail-price-row">
            <span class="detail-price" id="detail-price-val">${(currentPrice + sizePriceDiff).toLocaleString()} €</span>
            ${product.oldPrice ? `<span class="detail-price-old">${product.oldPrice} €</span>` : ""}
          </div>

          <p class="detail-desc">${product.fullDescription || product.shortDescription}</p>

          <!-- Color Swatches -->
          ${colors.length > 0 ? `
            <div class="variant-block">
              <div class="variant-label">
                <span>Finition & Teinte</span>
                <span id="label-selected-color">${colors[0].name}</span>
              </div>
              <div class="swatch-group">
                ${colors.map((c, idx) => `
                  <button type="button" class="color-swatch-btn ${idx === 0 ? "active" : ""}" 
                          style="background-color: ${c.hex};" 
                          data-color-name="${c.name}" 
                          aria-label="${c.name}"></button>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Size / Format -->
          ${sizes.length > 0 ? `
            <div class="variant-block">
              <div class="variant-label">
                <span>Dimension & Format</span>
                <span id="label-selected-size">${sizes[0].name}</span>
              </div>
              <div class="swatch-group">
                ${sizes.map((s, idx) => `
                  <button type="button" class="size-pill-btn ${idx === 0 ? "active" : ""}" 
                          data-size-name="${s.name}" 
                          data-diff="${s.priceDiff || 0}">
                    ${s.name} ${s.priceDiff ? `(+${s.priceDiff} €)` : ""}
                  </button>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Actions Strip -->
          <div class="detail-actions-strip">
            <!-- Stepper -->
            <div class="quantity-stepper">
              <button type="button" id="qty-minus" aria-label="Diminuer la quantité">−</button>
              <span id="qty-val">1</span>
              <button type="button" id="qty-plus" aria-label="Augmenter la quantité">+</button>
            </div>

            <!-- Add to Cart Button -->
            <button type="button" class="btn btn-primary btn-full btn-lg" id="detail-add-cart-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Ajouter au panier • <span id="btn-price-val">${(currentPrice + sizePriceDiff).toLocaleString()} €</span>
            </button>
          </div>

          <!-- Benefits & Accordion Specs -->
          <div class="accordion-group">
            <div class="accordion-item is-open">
              <button type="button" class="accordion-header">
                <span>Spécifications & Matériaux d'exception</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="accordion-content">
                <div class="accordion-inner">
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                    ${(product.specifications || []).map(s => `
                      <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
                        <span style="color: var(--text-muted); font-size: 13px;">${s.label}</span>
                        <strong style="color: var(--text-primary); font-size: 13px;">${s.value}</strong>
                      </li>
                    `).join("")}
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <button type="button" class="accordion-header">
                <span>Livraison Blanche & Garantie 5 Ans</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="accordion-content">
                <div class="accordion-inner">
                  <p>Toutes nos pièces sont expédiées sous caisse de transport renforcée et assurée à 100% de leur valeur. La livraison avec installation dans la pièce de votre choix est disponible sur demande. Chaque création bénéficie de notre garantie atelier de 5 ans couvrant structure et finitions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Mobile Bar -->
      <div class="sticky-mobile-bar">
        <div>
          <div style="font-size: 12px; color: var(--text-muted);">${product.name}</div>
          <div style="font-size: 18px; font-weight: 800; color: var(--color-primary);" id="sticky-mobile-price">
            ${(currentPrice + sizePriceDiff).toLocaleString()} €
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="sticky-mobile-add-btn">
          Ajouter au panier
        </button>
      </div>
    `;

    // Bind Gallery Thumbnails
    detailContainer.querySelectorAll(".detail-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        detailContainer.querySelectorAll(".detail-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        const activeImg = document.getElementById("detail-active-img");
        if (activeImg) activeImg.src = thumb.dataset.src;
      });
    });

    // Bind Color Swatches
    detailContainer.querySelectorAll(".color-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        detailContainer.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentColor = btn.dataset.colorName;
        const label = document.getElementById("label-selected-color");
        if (label) label.textContent = currentColor;
      });
    });

    // Bind Size Buttons
    detailContainer.querySelectorAll(".size-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        detailContainer.querySelectorAll(".size-pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentSize = btn.dataset.sizeName;
        sizePriceDiff = parseInt(btn.dataset.diff, 10) || 0;
        const label = document.getElementById("label-selected-size");
        if (label) label.textContent = currentSize;
        updatePriceDisplay();
      });
    });

    // Quantity Stepper
    const qtyVal = document.getElementById("qty-val");
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");

    if (qtyMinus && qtyPlus && qtyVal) {
      qtyMinus.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          qtyVal.textContent = quantity;
          updatePriceDisplay();
        }
      });
      qtyPlus.addEventListener("click", () => {
        quantity++;
        qtyVal.textContent = quantity;
        updatePriceDisplay();
      });
    }

    // Add to Cart
    const addBtn = document.getElementById("detail-add-cart-btn");
    const stickyAddBtn = document.getElementById("sticky-mobile-add-btn");

    const handleAddToCart = () => {
      const finalUnit = currentPrice + sizePriceDiff;
      CartManager.addItem(product.id, {
        color: currentColor,
        size: currentSize,
        price: finalUnit,
        quantity: quantity
      });
    };

    if (addBtn) addBtn.addEventListener("click", handleAddToCart);
    if (stickyAddBtn) stickyAddBtn.addEventListener("click", handleAddToCart);

    // Accordions Toggle
    detailContainer.querySelectorAll(".accordion-header").forEach(hdr => {
      hdr.addEventListener("click", () => {
        const item = hdr.closest(".accordion-item");
        item.classList.toggle("is-open");
      });
    });
  }

  function updatePriceDisplay() {
    const unitPrice = currentPrice + sizePriceDiff;
    const total = unitPrice * quantity;
    const priceVal = document.getElementById("detail-price-val");
    const btnPriceVal = document.getElementById("btn-price-val");
    const stickyPriceVal = document.getElementById("sticky-mobile-price");

    if (priceVal) priceVal.textContent = `${unitPrice.toLocaleString()} €`;
    if (btnPriceVal) btnPriceVal.textContent = `${total.toLocaleString()} €`;
    if (stickyPriceVal) stickyPriceVal.textContent = `${total.toLocaleString()} €`;
  }

  function renderRelatedProducts() {
    const relatedContainer = document.getElementById("related-products-grid");
    if (!relatedContainer) return;

    const related = CATALOG_DATA.products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 3);

    const fallback = related.length >= 3 
      ? related 
      : CATALOG_DATA.products.filter(p => p.id !== product.id).slice(0, 3);

    relatedContainer.innerHTML = fallback.map(p => `
      <article class="product-card">
        <div class="product-card__thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-card__overlay">
            <button type="button" class="btn btn-white btn-sm" data-quick-view="${p.id}">Aperçu</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="CartManager.addItem('${p.id}')">Ajouter</button>
          </div>
        </div>
        <div class="product-card__body">
          <div class="product-card__cat">${p.categoryName}</div>
          <h3 class="product-card__title"><a href="produit?id=${p.id}">${p.name}</a></h3>
          <div class="product-card__footer">
            <span class="product-card__price">${p.price.toLocaleString()} €</span>
            <a href="produit?id=${p.id}" class="btn btn-ghost btn-sm">Découvrir →</a>
          </div>
        </div>
      </article>
    `).join("");
  }
});
