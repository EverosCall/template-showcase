/**
 * ====================================================================
 * TEMPLATE SHOWCASE — CONFIGURATION CENTRALE (JS/CONFIG.JS)
 * ====================================================================
 * 
 * 💡 GUIDE RAPIDE DU TEMPLATE :
 * Ce fichier est le tableau de bord unique pour personnaliser tout votre site !
 * Modifiez les valeurs ci-dessous : elles se propagent automatiquement
 * sur l'ensemble des 8 pages (Header, Logo, Coordonnées, Footer, Panier).
 * 
 * SOMMAIRE :
 * 1. IDENTITÉ DE MARQUE (Nom, Logos, Slogan, Devise)
 * 2. COORDONNÉES DE CONTACT (Email, Téléphone, Adresse, Horaires)
 * 3. SYSTÈME DE COMMANDE & CHECKOUT (Stripe, WhatsApp, Email, Démo)
 * 4. FORMULAIRES & WEBHOOKS (Formspree, Basin, Resend, Make)
 * 5. CANAUX DE VENTE & RÉSEAUX SOCIAUX (Shopify, Amazon, Instagram...)
 * 6. ÉLÉMENTS DE RÉASSURANCE & GARANTIES
 * 7. MENU DE NAVIGATION
 * ====================================================================
 */

const SITE_CONFIG = {

  /* ====================================================================
   * 1. IDENTITÉ DE MARQUE
   * ====================================================================
   */
  brand: {
    // Nom officiel de la marque / entreprise
    name: "ATELIER KRONA",

    // Texte principal affiché dans le logo (ex: "KRONA")
    logoText: "KRONA",

    // Sous-titre du logo (ex: "STUDIO & ATELIER")
    logoSubtitle: "STUDIO & ATELIER",

    // Slogan de la marque
    tagline: "Design intemporel, matières brutes & finitions d'exception",

    // Courte description pour le pied de page et les métadonnées SEO
    shortDescription: "Atelier d'ébénisterie d'art et créateur de mobilier architectural d'exception. Conception raisonnée et production numérotée à Paris.",

    // Année de fondation
    foundedYear: 2021,

    // Emplacement géographique résumé
    location: "Paris — Bastille",

    // Symbole monétaire utilisé dans toute l'interface
    currency: "€",
    currencyPosition: "after" // "after" (ex: 450 €) ou "before" (ex: € 450)
  },


  /* ====================================================================
   * 2. COORDONNÉES DE CONTACT & SHOWROOM
   * ====================================================================
   */
  contact: {
    // Adresse email principale de contact
    email: "contact@atelier-krona.fr",

    // Numéro de téléphone (affiché et cliquable au format tel:)
    phone: "+33 (0)1 84 72 90 15",

    // Adresse physique du showroom ou de l'atelier
    address: {
      street: "18 Rue des Métiers d'Art",
      city: "75011 Paris",
      country: "France",
      coordinates: "48.8566, 2.3522" // Latitude, Longitude GPS
    },

    // Horaires d'ouverture
    hours: [
      { days: "Lundi — Vendredi", time: "09h30 - 18h30" },
      { days: "Samedi (Sur rendez-vous)", time: "10h00 - 16h00" },
      { days: "Dimanche", time: "Fermé" }
    ],

    // Délai de réponse annoncé
    responseDelayNotice: "Notre bureau d'études vous répond sous 24 à 48 heures ouvrées."
  },


  /* ====================================================================
   * 3. SYSTÈME DE COMMANDE & CHECKOUT DU PANIER
   * ====================================================================
   * Choisissez le mode d'encaissement qui correspond à votre activité :
   * - "stripe"   : Redirige vers votre lien Stripe Payment Link officiel.
   * - "whatsapp" : Ouvre WhatsApp avec le récapitulatif complet des articles.
   * - "email"    : Ouvre un mailto: pré-rempli avec la commande.
   * - "demo"     : Affiche une notification de confirmation interactive.
   */
  checkout: {
    mode: "stripe", // "stripe" | "whatsapp" | "email" | "demo"

    // Lien de paiement Stripe (Ex: "https://buy.stripe.com/...")
    stripePaymentLink: "https://buy.stripe.com/demo",

    // Numéro WhatsApp international pour recevoir les commandes (sans espaces ni tirets)
    whatsappNumber: "+33184729015",

    // Adresse email pour recevoir les bons de commande
    orderEmail: "commandes@atelier-krona.fr",

    // Seuil de gratuité des frais de port (en euros)
    freeShippingThreshold: 150,

    // Code promo actif dans le panier (ex: KRONA10 pour -10%)
    promoCodes: {
      "KRONA10": { discountPercent: 10, label: "Remise d'inauguration (-10%)" },
      "PRIVILEGE": { discountPercent: 15, label: "Remise Club Privilège (-15%)" }
    }
  },


  /* ====================================================================
   * 4. FORMULAIRES & WEBHOOKS (CONTACT & SHOWROOM)
   * ====================================================================
   * Pour recevoir les messages du formulaire de contact directement par email,
   * collez simplement l'URL de votre endpoint (Formspree, Basin, Make, Zapier...).
   * Laissez vide "" pour activer la simulation interactive locale.
   */
  forms: {
    contactWebhookUrl: "" // Ex: "https://formspree.io/f/mon_id"
  },


  /* ====================================================================
   * 5. CANAUX DE VENTE EXTERNES & RÉSEAUX SOCIAUX
   * ====================================================================
   */
  externalChannels: [
    {
      id: "official-store",
      name: "Boutique Officielle",
      description: "Livraison blanche & certificat d'authenticité",
      url: "produits",
      badge: "Direct Atelier"
    },
    {
      id: "prescripteurs",
      name: "Espace Prescription B2B",
      description: "Pour architectes d'intérieur & hôtellerie",
      url: "services",
      badge: "Professionnels"
    }
  ],

  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@atelier.krona" },
    { name: "Pinterest", url: "https://pinterest.com", handle: "atelier_krona" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "atelier-krona" }
  ],


  /* ====================================================================
   * 6. ÉLÉMENTS DE RÉASSURANCE & GARANTIES
   * ====================================================================
   */
  guarantees: [
    {
      title: "Garantie 5 Ans",
      description: "Structure et mécanismes garantis, réparabilité garantie à vie."
    },
    {
      title: "Livraison Blanche",
      description: "Transport spécialisé sur rendez-vous avec déballage inclus."
    },
    {
      title: "Certificat Signé",
      description: "Chaque création porte un numéro unique gravé au laser."
    },
    {
      title: "Finitions Sur-Mesure",
      description: "Plus de 40 combinaisons de teintes et matières disponibles."
    }
  ],


  /* ====================================================================
   * 7. MENU DE NAVIGATION
   * ====================================================================
   */
  navigation: [
    { label: "Accueil", href: "./" },
    { label: "Catalogue", href: "produits" },
    { label: "La Maison", href: "about" },
    { label: "Sur-Mesure", href: "services" },
    { label: "Formules", href: "tarifs" },
    { label: "FAQ", href: "faq" },
    { label: "Showroom", href: "contact" }
  ]
};

// Exportation globale
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
