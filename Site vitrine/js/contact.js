/**
 * ====================================================================
 * ATELIER KRONA — FORMULAIRE DE CONTACT (CONTACT.JS)
 * ====================================================================
 * Validation en temps réel, messages adaptés FR / EN, pré-remplissage
 * automatique depuis l'URL et simulation d'envoi.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const productSelect = document.getElementById("contact-product");
  const subjectInput = document.getElementById("contact-subject");
  const successAlert = document.getElementById("contact-success-alert");

  // Dictionnaire de messages multilingues pour le formulaire
  const i18n = {
    fr: {
      nameRequired: "Veuillez renseigner votre nom complet.",
      emailRequired: "Veuillez renseigner une adresse email valide.",
      msgLength: "Votre message doit contenir au moins 10 caractères.",
      sending: "Envoi en cours...",
      successToast: "Votre message a bien été transmis à l'équipe."
    },
    en: {
      nameRequired: "Please enter your full name.",
      emailRequired: "Please enter a valid email address.",
      msgLength: "Your message must contain at least 10 characters.",
      sending: "Sending in progress...",
      successToast: "Your message has been successfully sent to our team."
    }
  };

  const getLang = () => (typeof window.getSiteLang === "function" ? window.getSiteLang() : "fr");

  // 1. Peupler dynamiquement la liste des produits dans le select
  if (productSelect && typeof CATALOG_DATA !== "undefined") {
    CATALOG_DATA.products.forEach(p => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = `${p.name} (${p.categoryName})`;
      productSelect.appendChild(option);
    });
  }

  // 2. Pré-remplissage selon les paramètres d'URL (?sujet=... ou ?product=...)
  const urlParams = new URLSearchParams(window.location.search);
  const subjectParam = urlParams.get("sujet");
  const productParam = urlParams.get("product");

  if (subjectParam && subjectInput) {
    if (subjectParam.includes("question-")) {
      subjectInput.value = "Information sur un produit";
    } else if (subjectParam.includes("devis")) {
      subjectInput.value = "Demande de devis & Pro";
    } else {
      subjectInput.value = subjectParam;
    }
  }

  if (productParam && productSelect) {
    productSelect.value = productParam;
  }

  // 3. Validation et Soumission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const lang = getLang();
    const t = i18n[lang] || i18n.fr;
    let isValid = true;

    // Nom complet
    const nameField = document.getElementById("contact-name");
    if (!nameField.value.trim()) {
      showError(nameField, t.nameRequired);
      isValid = false;
    } else {
      clearError(nameField);
    }

    // Email
    const emailField = document.getElementById("contact-email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
      showError(emailField, t.emailRequired);
      isValid = false;
    } else {
      clearError(emailField);
    }

    // Message
    const messageField = document.getElementById("contact-message");
    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      showError(messageField, t.msgLength);
      isValid = false;
    } else {
      clearError(messageField);
    }

    if (!isValid) return;

    // Simulation d'envoi réussi
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>${t.sending}</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (successAlert) {
        successAlert.classList.add("is-visible");
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (typeof window.showToast === "function") {
        window.showToast(t.successToast);
      }
    }, 800);
  });

  function showError(field, msg) {
    const group = field.closest(".form-group");
    if (!group) return;
    group.classList.add("has-error");
    let errEl = group.querySelector(".form-error");
    if (!errEl) {
      errEl = document.createElement("div");
      errEl.className = "form-error";
      group.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function clearError(field) {
    const group = field.closest(".form-group");
    if (!group) return;
    group.classList.remove("has-error");
  }
});
