/**
 * ====================================================================
 * ATELIER KRONA — SCRIPT GLOBAL (APP.JS)
 * ====================================================================
 * Gère les comportements globaux du site vitrine :
 * - Navigation sticky et défilement fluide
 * - Menu mobile latéral
 * - URLs propres sans .html (avec support local double-clic)
 * - Liens actifs automatiques dans le menu
 * - Système universel de notifications Toast
 * - Traduction FR / EN via Google Translate (bouton pill réactif)
 * - Rendu dynamique des coordonnées et textes de config.js
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initAnnouncementBar();
  initCleanUrls();
  highlightActiveNavLink();
  initGlobalConfig();
  initGoogleTranslate();
});

/**
 * --------------------------------------------------------------------
 * 1. HEADER STICKY & EFFET DE SCROLL
 * --------------------------------------------------------------------
 */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * --------------------------------------------------------------------
 * 2. MENU MOBILE RESPONSIVE
 * --------------------------------------------------------------------
 */
function initMobileNav() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav-close");

  if (!mobileToggle || !mobileNav) return;

  const openNav = () => {
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeNav = () => {
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  mobileToggle.addEventListener("click", openNav);
  if (mobileClose) mobileClose.addEventListener("click", closeNav);

  // Fermeture par clic en dehors
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) closeNav();
  });

  // Fermeture lors du clic sur un lien interne
  mobileNav.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeNav);
  });
}

/**
 * --------------------------------------------------------------------
 * 3. BANNIÈRE D'ANNONCE SUPÉRIEURE
 * --------------------------------------------------------------------
 */
function initAnnouncementBar() {
  const bar = document.querySelector(".announcement-bar");
  const closeBtn = document.querySelector(".announcement-close");
  if (!bar) return;

  if (sessionStorage.getItem("krona_announcement_closed") === "true") {
    bar.style.display = "none";
    return;
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      bar.style.display = "none";
      sessionStorage.setItem("krona_announcement_closed", "true");
    });
  }
}

/**
 * --------------------------------------------------------------------
 * 4. GESTION DES URLS PROPRES SANS .HTML
 * --------------------------------------------------------------------
 * - Sur serveur web (HTTP / HTTPS / Netlify / Vercel / Apache) :
 *   Nettoie visuellement l'URL en retirant .html de la barre d'adresse
 * - En local direct (file:// en double-cliquant sur les fichiers) :
 *   Redirige automatiquement les clics sans casser la navigation locale
 */
function initCleanUrls() {
  // 1. Nettoyage de la barre d'adresse sur serveur web
  if (window.location.protocol !== "file:") {
    const path = window.location.pathname;
    const search = window.location.search || "";
    const hash = window.location.hash || "";

    if (path.endsWith("/index.html")) {
      const cleanPath = path.replace(/index\.html$/, "");
      window.history.replaceState(null, "", (cleanPath || "/") + search + hash);
    } else if (path.endsWith(".html")) {
      const cleanPath = path.replace(/\.html$/, "");
      window.history.replaceState(null, "", cleanPath + search + hash);
    }
  }

  // 2. Gestion de la navigation locale (Live Server 127.0.0.1 / localhost ou double-clic file://)
  // Live Server est un serveur basique qui ne comprend pas la réécriture d'URL.
  // Ce gestionnaire intercepte les clics sur les liens sans .html pour charger
  // directement le fichier .html correspondant tout en gardant l'URL propre affichée.
  const isLocalDev = window.location.protocol === "file:" || 
                     window.location.hostname === "localhost" || 
                     window.location.hostname === "127.0.0.1";

  if (isLocalDev) {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignorer liens externes, ancres, emails, tel ou déjà pourvus d'extension
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.includes(".html") ||
        href.includes(".css") ||
        href.includes(".js")
      ) {
        return;
      }

      // Découper l'URL (ex: "about?id=2" -> "about" et "?id=2")
      const parts = href.split("?");
      let targetPage = parts[0].replace(/^\.\//, "").replace(/^\//, "");
      const query = parts[1] ? "?" + parts[1] : "";

      if (targetPage === "" || targetPage === "index") {
        targetPage = "index.html";
      } else {
        targetPage = targetPage + ".html";
      }

      e.preventDefault();

      // En mode file://, on navigue vers le fichier .html
      if (window.location.protocol === "file:") {
        window.location.href = targetPage + query;
      } else {
        // En mode Live Server (HTTP localhost), on navigue vers la page .html
        // et dès le chargement, la ligne 126 retirera le .html de la barre d'adresse !
        window.location.href = targetPage + query;
      }
    });
  }
}

/**
 * --------------------------------------------------------------------
 * 5. MISE EN VALEUR DU LIEN ACTIF DU MENU
 * --------------------------------------------------------------------
 */
function highlightActiveNavLink() {
  // Récupérer le nom de la page courante normalisé
  let current = window.location.pathname.split("/").pop() || "index";
  current = current.replace(/\.html$/, "").trim();
  if (current === "" || current === "index") current = "index";
  if (current === "about") current = "a-propos";

  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    let linkPath = href.split("?")[0].split("/").pop() || "index";
    linkPath = linkPath.replace(/\.html$/, "").trim();
    if (linkPath === "" || linkPath === "." || linkPath === "index") linkPath = "index";
    if (linkPath === "about") linkPath = "a-propos";

    if (linkPath === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * --------------------------------------------------------------------
 * 6. SYSTÈME UNIVERSEL DE NOTIFICATIONS TOAST
 * --------------------------------------------------------------------
 */
window.showToast = function(message, duration = 3500) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/**
 * --------------------------------------------------------------------
 * 7. UTILITAIRE DE DÉTECTION DE LANGUE DU SITE
 * --------------------------------------------------------------------
 */
window.getSiteLang = function() {
  try {
    const saved = localStorage.getItem("site_lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch (e) {}

  const c = document.cookie.match(/googtrans=([^;]+)/);
  if (c && c[1] && c[1].includes("/en")) return "en";
  if (document.documentElement.classList.contains("translated-ltr")) return "en";

  return "fr";
};

/**
 * --------------------------------------------------------------------
 * 8. INJECTION DE CONFIG GLOBALE (config.js)
 * --------------------------------------------------------------------
 */
function initGlobalConfig() {
  if (typeof SITE_CONFIG === "undefined") return;

  document.querySelectorAll("[data-config='brand.name']").forEach(el => {
    el.textContent = SITE_CONFIG.brand.name;
  });

  document.querySelectorAll("[data-config='contact.email']").forEach(el => {
    el.textContent = SITE_CONFIG.contact.email;
    if (el.tagName === "A") el.setAttribute("href", `mailto:${SITE_CONFIG.contact.email}`);
  });

  document.querySelectorAll("[data-config='contact.phone']").forEach(el => {
    el.textContent = SITE_CONFIG.contact.phone;
    if (el.tagName === "A") el.setAttribute("href", `tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`);
  });

  // Newsletter du footer avec message bilingue
  const newsletterForm = document.querySelector(".footer-newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input[type='email']");
      if (input && input.value) {
        const isEn = window.getSiteLang() === "en";
        const msg = isEn
          ? "Thank you for subscribing to our newsletter."
          : "Merci pour votre inscription à notre lettre d'information.";
        window.showToast(msg);
        input.value = "";
      }
    });
  }
}

/**
 * --------------------------------------------------------------------
 * 9. SYSTÈME DE TRADUCTION GOOGLE TRANSLATE FR <-> EN
 * --------------------------------------------------------------------
 * Fonctionne avec un seul bouton bascule sans aucun menu déroulant.
 * - Bascule instantanément en anglais (EN)
 * - Rétablit proprement le français (FR) sans aucun reste d'anglais
 * - Mémorise le choix du visiteur d'une page à l'autre
 */
function initGoogleTranslate() {
  const globeSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>`;

  // Met à jour l'apparence des boutons de langue (desktop et mobile)
  const updateButtons = (isEn) => {
    document.querySelectorAll(".lang-pill-btn").forEach(btn => {
      btn.classList.toggle("is-en", isEn);
      const isMobile = btn.id === "mobile-lang-toggle-btn";

      if (isMobile) {
        btn.innerHTML = `${globeSVG}<span class="lang-text">${isEn ? "Passer en Français (FR)" : "Switch to English (EN)"}</span>`;
      } else {
        const label = isEn ? "EN" : "FR";
        btn.innerHTML = `${globeSVG}<span class="lang-text">${label}</span>`;
      }
    });
  };

  // Enregistre les cookies Google Translate sur tous les chemins et domaines
  const setTransCookie = (val) => {
    const domains = ["", location.hostname, "." + location.hostname];
    const path = "/";
    domains.forEach(d => {
      const dStr = d ? "; domain=" + d : "";
      document.cookie = `googtrans=${val}; path=${path}${dStr}; max-age=31536000`;
    });
  };

  // Supprime les cookies pour restaurer le français
  const clearTransCookie = () => {
    const domains = ["", location.hostname, "." + location.hostname];
    const path = "/";
    domains.forEach(d => {
      const dStr = d ? "; domain=" + d : "";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${dStr}`;
      document.cookie = `googtrans=/fr/fr; path=${path}${dStr}`;
    });
  };

  // Déclenche le menu Google Translate
  const triggerGoogleCombo = (targetLang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;

    if (targetLang === "en") {
      combo.value = "en";
      combo.dispatchEvent(new Event("change"));
      return true;
    } else {
      // Pour revenir au français original
      combo.selectedIndex = 0;
      combo.value = "";
      combo.dispatchEvent(new Event("change"));
      return true;
    }
  };

  // Basculement de langue
  const toggleLanguage = () => {
    const current = window.getSiteLang();

    if (current === "en") {
      // 1. Passage vers le Français (Restitution propre)
      clearTransCookie();
      try {
        localStorage.setItem("site_lang", "fr");
      } catch (e) {}

      triggerGoogleCombo("fr");
      updateButtons(false);

      // Fermeture de l'éventuelle bannière Google
      try {
        const banner = document.querySelector(".goog-te-banner-frame");
        if (banner && banner.contentDocument) {
          const closeBtn = banner.contentDocument.querySelector(".goog-close-link") ||
                           banner.contentDocument.querySelector("[id*='restore']");
          if (closeBtn) closeBtn.click();
        }
      } catch (e) {}

      // Rechargement propre pour garantir 100% de textes en français d'origine
      setTimeout(() => {
        window.location.reload();
      }, 100);

    } else {
      // 2. Passage vers l'Anglais
      setTransCookie("/fr/en");
      try {
        localStorage.setItem("site_lang", "en");
      } catch (e) {}

      updateButtons(true);
      const done = triggerGoogleCombo("en");

      if (!done) {
        window.showToast("Loading English translation…", 2000);
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (triggerGoogleCombo("en") || attempts > 15) {
            clearInterval(interval);
            if (attempts > 15 && !document.querySelector(".goog-te-combo")) {
              window.location.reload();
            }
          }
        }, 150);
      }
    }
  };

  // Attacher l'écouteur aux boutons
  document.querySelectorAll(".lang-pill-btn").forEach(btn => {
    btn.addEventListener("click", toggleLanguage);
  });

  // Injecter le script officiel Google Translate
  if (!document.getElementById("google-translate-script")) {
    if (!document.getElementById("google_translate_element")) {
      const div = document.createElement("div");
      div.id = "google_translate_element";
      document.body.appendChild(div);
    }

    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: "fr",
          includedLanguages: "en,fr",
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, "google_translate_element");

        // Si l'utilisateur avait sélectionné l'anglais, synchroniser le select
        if (window.getSiteLang() === "en") {
          setTimeout(() => {
            const combo = document.querySelector(".goog-te-combo");
            if (combo && combo.value !== "en") {
              combo.value = "en";
              combo.dispatchEvent(new Event("change"));
            }
          }, 300);
        }
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  }

  // Synchronisation immédiate de l'affichage des boutons
  const isEn = window.getSiteLang() === "en";
  updateButtons(isEn);

  if (isEn) {
    setTransCookie("/fr/en");
  }
}
