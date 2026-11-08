/**
 * ====================================================================
 * ATELIER KRONA — GLOBAL RUNTIME & INTERACTIVE ENGINE (2026 EDITION)
 * ====================================================================
 * Features:
 * - Cart Drawer Manager (localStorage, live count, item quantity, free shipping progress)
 * - Quick-View Modal Manager (Interactive preview & quick checkout)
 * - Toast Notification System (stackable, animated, accessible)
 * - Sticky Blur Header & Mobile Drawer
 * - Clean URLs & Active Navigation
 * - FR / EN Translation Integration
 * ====================================================================
 */

// ====================================================================
// 1. TOAST NOTIFICATION SYSTEM
// ====================================================================
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      this.container.setAttribute("aria-live", "polite");
      document.body.appendChild(this.container);
    }
  },

  show(title, description = "", type = "success", duration = 3500) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const iconSvg = type === "success" 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      <div class="toast__icon">${iconSvg}</div>
      <div class="toast__content">
        <div class="toast__title">${title}</div>
        ${description ? `<div class="toast__desc">${description}</div>` : ""}
      </div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-leave");
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
};

// ====================================================================
// 2. CART MANAGER (LOCALSTORAGE + SLIDE-IN DRAWER)
// ====================================================================
const CartManager = {
  STORAGE_KEY: "krona_cart_items_v2",
  FREE_SHIPPING_THRESHOLD: 150, // 150 € for free shipping
  items: [],

  init() {
    this.loadCart();
    this.injectCartDrawer();
    this.bindEvents();
    this.updateUI();
  },

  loadCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      this.items = data ? JSON.parse(data) : [];
    } catch (e) {
      this.items = [];
    }
  },

  saveCart() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {}
    this.updateUI();
  },

  addItem(productId, options = {}) {
    if (typeof CATALOG_DATA === "undefined") return;
    const product = CATALOG_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const color = options.color || (product.variants?.colors?.[0]?.name) || "Standard";
    const size = options.size || (product.variants?.sizes?.[0]?.name) || "Standard";
    const price = options.price || product.price;
    const quantity = options.quantity || 1;

    // Check if item with same options exists
    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: price,
        image: product.image,
        color: color,
        size: size,
        quantity: quantity
      });
    }

    this.saveCart();
    Toast.show("Ajouté au panier", `${product.name} (${color})`, "success");
    this.openDrawer();
  },

  removeItem(index) {
    if (this.items[index]) {
      const name = this.items[index].name;
      this.items.splice(index, 1);
      this.saveCart();
      Toast.show("Article retiré", name, "info");
    }
  },

  updateQuantity(index, delta) {
    if (!this.items[index]) return;
    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.removeItem(index);
    } else {
      this.saveCart();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  injectCartDrawer() {
    if (document.getElementById("cart-drawer-root")) return;

    const drawerHtml = `
      <div id="cart-drawer-root" class="cart-drawer-overlay" aria-hidden="true">
        <aside class="cart-drawer" role="dialog" aria-label="Panier d'achats">
          <div class="cart-drawer__header">
            <h3 class="cart-drawer__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Votre Panier
              <span id="cart-drawer-count-badge" class="badge badge-mint" style="margin-left: 8px;">0</span>
            </h3>
            <button type="button" class="cart-drawer__close" id="cart-drawer-close" aria-label="Fermer le panier">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- Free Shipping Progress -->
          <div class="shipping-meter">
            <div class="shipping-meter__text" id="shipping-meter-text">
              Livraison offerte dès 150 €
            </div>
            <div class="shipping-meter__bar">
              <div class="shipping-meter__fill" id="shipping-meter-fill" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Items Body -->
          <div class="cart-drawer__body" id="cart-drawer-items">
            <!-- Dynamic Items -->
          </div>

          <!-- Footer & Checkout -->
          <div class="cart-drawer__footer" id="cart-drawer-footer">
            <div class="cart-drawer__row">
              <span>Sous-total</span>
              <span id="cart-subtotal-price">0 €</span>
            </div>
            <div class="cart-drawer__row">
              <span>Livraison estimée</span>
              <span id="cart-shipping-price" class="mint">Calcul en cours</span>
            </div>
            <div class="cart-drawer__row total">
              <span>Total TTC</span>
              <span id="cart-total-price">0 €</span>
            </div>

            <button type="button" class="btn btn-primary btn-full btn-lg" id="cart-checkout-btn">
              Valider la commande
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>

            <p style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 10px;">
              Paiement 100% sécurisé — Expédition 24/48h avec suivi
            </p>
          </div>
        </aside>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", drawerHtml);
  },

  bindEvents() {
    // Open cart triggers
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest(".open-cart-trigger");
      if (openBtn) {
        e.preventDefault();
        this.openDrawer();
      }

      // Close cart
      if (e.target.closest("#cart-drawer-close") || e.target.id === "cart-drawer-root") {
        this.closeDrawer();
      }

      // Stepper delta
      const stepperBtn = e.target.closest(".cart-stepper-btn");
      if (stepperBtn) {
        const index = parseInt(stepperBtn.dataset.index, 10);
        const delta = parseInt(stepperBtn.dataset.delta, 10);
        this.updateQuantity(index, delta);
      }

      // Remove item
      const removeBtn = e.target.closest(".cart-remove-btn");
      if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index, 10);
        this.removeItem(index);
      }

      // Checkout handler (Multiple template modes: Stripe, WhatsApp, Email, Demo)
      const checkoutBtn = e.target.closest("#cart-checkout-btn");
      if (checkoutBtn) {
        if (this.items.length === 0) {
          Toast.show("Panier vide", "Ajoutez un article avant de commander", "warning");
          return;
        }

        const checkoutConfig = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.checkout) ? SITE_CONFIG.checkout : {};
        const mode = checkoutConfig.mode || "demo";
        const totalFormatted = this.getTotal() + " €";

        if (mode === "stripe" && checkoutConfig.stripePaymentLink) {
          Toast.show("Redirection Stripe...", "Connexion sécurisée au terminal de paiement", "success");
          setTimeout(() => {
            window.open(checkoutConfig.stripePaymentLink, "_blank");
          }, 900);
        } else if (mode === "whatsapp" && checkoutConfig.whatsappNumber) {
          const summary = this.items.map(i => `- ${i.quantity}x ${i.name} (${i.color || "Standard"}) : ${i.price * i.quantity} €`).join("\n");
          const msg = encodeURIComponent(`Bonjour, je souhaite commander sur votre boutique :\n\n${summary}\n\nTotal : ${totalFormatted}`);
          const url = `https://wa.me/${checkoutConfig.whatsappNumber.replace(/[^+\d]/g, "")}?text=${msg}`;
          Toast.show("Ouverture WhatsApp...", "Envoi de votre panier en cours", "success");
          setTimeout(() => {
            window.open(url, "_blank");
          }, 900);
        } else if (mode === "email" && checkoutConfig.orderEmail) {
          const summary = this.items.map(i => `- ${i.quantity}x ${i.name} (${i.color || "Standard"}) : ${i.price * i.quantity} €`).join("\n");
          const subject = encodeURIComponent(`Nouvelle commande (${totalFormatted})`);
          const body = encodeURIComponent(`Bonjour,\n\nVoici ma sélection de commande :\n\n${summary}\n\nTotal : ${totalFormatted}\n\nMerci de m'indiquer la marche à suivre.`);
          window.location.href = `mailto:${checkoutConfig.orderEmail}?subject=${subject}&body=${body}`;
        } else {
          Toast.show("Commande enregistrée", `Simulation : Total de ${totalFormatted}. Mode démo actif.`, "info");
        }
      }
    });

    // Escape key closes drawer
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeDrawer();
    });
  },

  openDrawer() {
    const root = document.getElementById("cart-drawer-root");
    if (root) {
      root.classList.add("is-active");
      root.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  },

  closeDrawer() {
    const root = document.getElementById("cart-drawer-root");
    if (root) {
      root.classList.remove("is-active");
      root.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  },

  updateUI() {
    const count = this.getCount();
    const total = this.getTotal();

    // Update Header Badges
    document.querySelectorAll(".cart-badge-count").forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
      badge.classList.add("pop");
      setTimeout(() => badge.classList.remove("pop"), 300);
    });

    const badgeCountDrawer = document.getElementById("cart-drawer-count-badge");
    if (badgeCountDrawer) badgeCountDrawer.textContent = count;

    // Free Shipping Meter
    const meterText = document.getElementById("shipping-meter-text");
    const meterFill = document.getElementById("shipping-meter-fill");
    if (meterText && meterFill) {
      if (total >= this.FREE_SHIPPING_THRESHOLD) {
        meterText.innerHTML = `✨ <strong>Félicitations !</strong> Livraison offerte pour cette commande.`;
        meterFill.style.width = "100%";
      } else {
        const remaining = (this.FREE_SHIPPING_THRESHOLD - total).toFixed(0);
        const percent = Math.min(100, (total / this.FREE_SHIPPING_THRESHOLD) * 100);
        meterText.innerHTML = `Plus que <strong>${remaining} €</strong> pour bénéficier de la <strong>livraison offerte</strong>.`;
        meterFill.style.width = `${percent}%`;
      }
    }

    // Render Items
    const itemsContainer = document.getElementById("cart-drawer-items");
    const footer = document.getElementById("cart-drawer-footer");
    if (!itemsContainer) return;

    if (this.items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4>Votre panier est vide</h4>
          <p>Explorez notre collection et découvrez nos pièces façonnées à la main.</p>
          <a href="produits" class="btn btn-outline-mint btn-sm" onclick="CartManager.closeDrawer()">Explorer le catalogue</a>
        </div>
      `;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    itemsContainer.innerHTML = this.items.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item__thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <div class="cart-item__variant">${item.color} — ${item.size}</div>
          <div class="quantity-stepper">
            <button type="button" class="cart-stepper-btn" data-index="${index}" data-delta="-1" aria-label="Moins">−</button>
            <span>${item.quantity}</span>
            <button type="button" class="cart-stepper-btn" data-index="${index}" data-delta="1" aria-label="Plus">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div class="cart-item__price">${(item.price * item.quantity).toLocaleString()} €</div>
          <button type="button" class="cart-remove-btn" data-index="${index}" aria-label="Supprimer cet article">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join("");

    // Totals
    const subtotalEl = document.getElementById("cart-subtotal-price");
    const shippingEl = document.getElementById("cart-shipping-price");
    const totalEl = document.getElementById("cart-total-price");

    if (subtotalEl) subtotalEl.textContent = `${total.toLocaleString()} €`;
    if (shippingEl) {
      shippingEl.textContent = total >= this.FREE_SHIPPING_THRESHOLD ? "Offerte (0 €)" : "15 €";
    }
    if (totalEl) {
      const finalPrice = total >= this.FREE_SHIPPING_THRESHOLD ? total : total + 15;
      totalEl.textContent = `${finalPrice.toLocaleString()} €`;
    }
  }
};

// ====================================================================
// 3. QUICK VIEW MODAL MANAGER
// ====================================================================
const QuickViewManager = {
  init() {
    this.injectModal();
    this.bindEvents();
  },

  injectModal() {
    if (document.getElementById("quick-view-overlay")) return;

    const modalHtml = `
      <div id="quick-view-overlay" class="modal-overlay" aria-hidden="true">
        <div class="modal-window" role="dialog" aria-modal="true" aria-label="Aperçu rapide du produit">
          <button type="button" class="modal-close" id="quick-view-close" aria-label="Fermer l'aperçu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div id="quick-view-content" style="padding: 32px;">
            <!-- Dynamic Content -->
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  },

  bindEvents() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-quick-view]");
      if (trigger) {
        e.preventDefault();
        const productId = trigger.dataset.quickView;
        this.open(productId);
      }

      if (e.target.closest("#quick-view-close") || e.target.id === "quick-view-overlay") {
        this.close();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  },

  open(productId) {
    if (typeof CATALOG_DATA === "undefined") return;
    const product = CATALOG_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const content = document.getElementById("quick-view-content");
    if (!content) return;

    const colors = product.variants?.colors || [{ name: "Noir Minéral", hex: "#121415" }];
    const sizes = product.variants?.sizes || [{ name: "Standard", priceDiff: 0 }];

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; align-items: center;">
        <div style="border-radius: 16px; overflow: hidden; aspect-ratio: 1/1; background: #030a0c;">
          <img id="qv-main-img" src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <span class="badge badge-mint" style="margin-bottom: 10px;">${product.categoryName}</span>
          <h3 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; margin-bottom: 8px;">${product.name}</h3>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary); margin-bottom: 16px;">
            <span id="qv-price">${product.price.toLocaleString()}</span> €
          </div>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
            ${product.shortDescription}
          </p>

          <div style="margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">
              Finition : <span id="qv-color-label" style="color: var(--color-primary);">${colors[0].name}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              ${colors.map((c, i) => `
                <button type="button" class="color-swatch-btn ${i === 0 ? "active" : ""}" 
                        style="background-color: ${c.hex};" 
                        data-qv-color="${c.name}" aria-label="${c.name}"></button>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-primary btn-full" id="qv-add-cart-btn" data-id="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Ajouter au panier
            </button>
            <a href="produit?id=${product.id}" class="btn btn-ghost">Détails</a>
          </div>
        </div>
      </div>
    `;

    // Bind swatch click inside quick view
    let selectedColor = colors[0].name;
    content.querySelectorAll("[data-qv-color]").forEach(btn => {
      btn.addEventListener("click", () => {
        content.querySelectorAll("[data-qv-color]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = btn.dataset.qvColor;
        document.getElementById("qv-color-label").textContent = selectedColor;
      });
    });

    // Bind Add to Cart
    const addBtn = document.getElementById("qv-add-cart-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        CartManager.addItem(product.id, { color: selectedColor, price: product.price, quantity: 1 });
        this.close();
      });
    }

    const overlay = document.getElementById("quick-view-overlay");
    if (overlay) {
      overlay.classList.add("is-active");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  },

  close() {
    const overlay = document.getElementById("quick-view-overlay");
    if (overlay) {
      overlay.classList.remove("is-active");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }
};

// ====================================================================
// 4. TEMPLATE AUTO-HYDRATION (Propagates js/config.js to DOM)
// ====================================================================
function hydrateTemplate() {
  if (typeof SITE_CONFIG === "undefined") return;

  // Texts
  document.querySelectorAll("[data-template='brand.name']").forEach(el => {
    if (SITE_CONFIG.brand?.name) el.textContent = SITE_CONFIG.brand.name;
  });
  document.querySelectorAll("[data-template='brand.logoText']").forEach(el => {
    if (SITE_CONFIG.brand?.logoText) el.textContent = SITE_CONFIG.brand.logoText;
  });
  document.querySelectorAll("[data-template='brand.logoSubtitle']").forEach(el => {
    if (SITE_CONFIG.brand?.logoSubtitle) el.textContent = SITE_CONFIG.brand.logoSubtitle;
  });
  document.querySelectorAll("[data-template='brand.tagline']").forEach(el => {
    if (SITE_CONFIG.brand?.tagline) el.textContent = SITE_CONFIG.brand.tagline;
  });
  document.querySelectorAll("[data-template='brand.shortDescription']").forEach(el => {
    if (SITE_CONFIG.brand?.shortDescription) el.textContent = SITE_CONFIG.brand.shortDescription;
  });
  document.querySelectorAll("[data-template='contact.email']").forEach(el => {
    if (SITE_CONFIG.contact?.email) {
      el.textContent = SITE_CONFIG.contact.email;
      if (el.tagName === "A") el.href = `mailto:${SITE_CONFIG.contact.email}`;
    }
  });
  document.querySelectorAll("[data-template='contact.phone']").forEach(el => {
    if (SITE_CONFIG.contact?.phone) {
      el.textContent = SITE_CONFIG.contact.phone;
      if (el.tagName === "A") el.href = `tel:${SITE_CONFIG.contact.phone.replace(/[^+\d]/g, "")}`;
    }
  });
  document.querySelectorAll("[data-template='contact.address']").forEach(el => {
    if (SITE_CONFIG.contact?.address) {
      el.textContent = `${SITE_CONFIG.contact.address.street}, ${SITE_CONFIG.contact.address.city}`;
    }
  });
  document.querySelectorAll("[data-template='year']").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// ====================================================================
// 5. GLOBAL EVENT LISTENERS & NAVIGATION
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Auto-hydrate template values from SITE_CONFIG
  hydrateTemplate();

  // Init Core Engines
  Toast.init();
  CartManager.init();
  QuickViewManager.init();

  // Sticky Header
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Drawer
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav-close");

  if (mobileToggle && mobileNav) {
    const openMobile = () => {
      mobileNav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const closeMobile = () => {
      mobileNav.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    mobileToggle.addEventListener("click", openMobile);
    if (mobileClose) mobileClose.addEventListener("click", closeMobile);
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) closeMobile();
    });
  }

  // Newsletter form submission
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        Toast.show("Bienvenue au Club Atelier", "Votre invitation et code de bienvenue 10% ont été envoyés.", "success");
        input.value = "";
      }
    });
  });

  // Highlight Active Link
  const currentPath = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "").split("/").pop() || "index";
  document.querySelectorAll(".nav-link, .mobile-nav__link").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.replace(/\.html$/, "").replace(/^\.\//, "");
    if (cleanHref === currentPath || (currentPath === "index" && (cleanHref === "" || cleanHref === "./" || cleanHref === "index"))) {
      link.classList.add("active");
    }
  });

  // Local file:// protocol compatibility (auto-resolves clean URLs without server)
  if (window.location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.endsWith(".html")) {
        if (href === "./" || href === "") {
          link.setAttribute("href", "index.html");
        } else if (href.includes("?")) {
          const [path, query] = href.split("?");
          link.setAttribute("href", `${path}.html?${query}`);
        } else {
          link.setAttribute("href", `${href}.html`);
        }
      }
    });
  }

  // Top Announcement Bar Dismiss
  const announceClose = document.querySelector(".announcement-close");
  const announceBar = document.querySelector(".announcement-bar");
  if (announceClose && announceBar) {
    if (sessionStorage.getItem("krona_announce_closed") === "true") {
      announceBar.style.display = "none";
    }
    announceClose.addEventListener("click", () => {
      announceBar.style.display = "none";
      sessionStorage.setItem("krona_announce_closed", "true");
    });
  }
});
