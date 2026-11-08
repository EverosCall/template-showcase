/**
 * ====================================================================
 * ATELIER KRONA — CONTACT & SHOWROOM LOGIC (2026 EDITION)
 * ====================================================================
 * Features:
 * - Real-time form validation
 * - Dynamic subject & product prefill from URL
 * - Animated submission feedback & Toast integration
 * - One-click Copy Address & Showroom GPS coordinates
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const productSelect = document.getElementById("contact-product");
  const subjectInput = document.getElementById("contact-subject");
  const successAlert = document.getElementById("contact-success-alert");

  // 1. Populate Products dynamically
  if (productSelect && typeof CATALOG_DATA !== "undefined") {
    (CATALOG_DATA.products || []).forEach(p => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = `${p.name} (${p.price} €)`;
      productSelect.appendChild(option);
    });
  }

  // 2. URL parameters prefill
  const urlParams = new URLSearchParams(window.location.search);
  const subjectParam = urlParams.get("sujet");
  const productParam = urlParams.get("product");

  if (subjectParam && subjectInput) {
    if (subjectParam.includes("devis")) {
      subjectInput.value = "Demande d'étude & devis sur-mesure";
    } else if (subjectParam.includes("echantillon")) {
      subjectInput.value = "Commande de coffret d'échantillons";
    } else if (subjectParam.includes("pro") || subjectParam.includes("partenariat")) {
      subjectInput.value = "Partenariat Professionnel / B2B";
    } else {
      subjectInput.value = subjectParam;
    }
  }

  if (productParam && productSelect) {
    productSelect.value = productParam;
  }

  // 3. Form Validation and Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameField = document.getElementById("contact-name");
    const emailField = document.getElementById("contact-email");
    const messageField = document.getElementById("contact-message");

    // Name check
    if (!nameField.value.trim()) {
      showError(nameField, "Veuillez renseigner votre nom complet.");
      isValid = false;
    } else {
      clearError(nameField);
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
      showError(emailField, "Veuillez renseigner une adresse email valide.");
      isValid = false;
    } else {
      clearError(emailField);
    }

    // Message check
    if (!messageField.value.trim() || messageField.value.trim().length < 8) {
      showError(messageField, "Votre message doit contenir au moins 8 caractères.");
      isValid = false;
    } else {
      clearError(messageField);
    }

    if (!isValid) return;

    // Simulate sending
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmission sécurisée...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (successAlert) {
        successAlert.style.display = "block";
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (typeof Toast !== "undefined") {
        Toast.show("Message transmis avec succès", "Notre atelier vous recontacte sous 24h ouvrées.", "success");
      }
    }, 900);
  });

  // Copy Address to clipboard button
  document.querySelectorAll("[data-copy-address]").forEach(btn => {
    btn.addEventListener("click", () => {
      const address = "18 Rue des Métiers d'Art, 75011 Paris, France";
      navigator.clipboard.writeText(address).then(() => {
        if (typeof Toast !== "undefined") {
          Toast.show("Adresse copiée dans le presse-papier", address, "info");
        }
      });
    });
  });

  function showError(field, msg) {
    const group = field.closest(".form-group");
    if (!group) return;
    group.classList.add("has-error");
    field.style.borderColor = "var(--primitive-red-500)";
    let errEl = group.querySelector(".form-error");
    if (!errEl) {
      errEl = document.createElement("div");
      errEl.className = "form-error";
      errEl.style.color = "var(--primitive-red-500)";
      errEl.style.fontSize = "12px";
      errEl.style.marginTop = "4px";
      group.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function clearError(field) {
    const group = field.closest(".form-group");
    if (!group) return;
    group.classList.remove("has-error");
    field.style.borderColor = "";
    const errEl = group.querySelector(".form-error");
    if (errEl) errEl.remove();
  }
});
