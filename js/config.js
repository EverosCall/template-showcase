/**
 * ====================================================================
 * CONFIGURATION CENTRALE DU SITE VITRINE (CONFIG.JS)
 * ====================================================================
 * 
 * 💡 GUIDE DÉBUTANT :
 * Vous pouvez personnaliser tout votre site ici en quelques minutes !
 * Modifiez simplement les textes entre guillemets "..." ci-dessous.
 * 
 * SOMMAIRE RAPIDE :
 * 1. INFORMATIONS DE CONTACT (Email, Téléphone, Adresse, Horaires)
 * 2. IDENTITÉ DE LA MARQUE & TITRES (Nom, Slogan, Description)
 * 3. IMAGES & LOGOS DU SITE (Logo, Favicon, Bannière)
 * 4. BOUTONS & LIENS D'ACHAT EXTERNES (Shopify, Amazon, Etsy...)
 * 5. TEXTES DU MENU DE NAVIGATION (Liens propres sans .html)
 * 6. TRADUCTIONS FR / EN (Français & Anglais)
 * ====================================================================
 */

const SITE_CONFIG = {

  /* ====================================================================
   * 1. INFORMATIONS DE CONTACT
   * ====================================================================
   * Modifiez ici vos coordonnées officielles. Elles s'affichent
   * automatiquement sur la page de contact et dans le pied de page.
   */
  contact: {
    // CONTACT : Votre adresse email de contact
    email: "bonjour@atelier-krona.fr",

    // CONTACT : Votre numéro de téléphone
    phone: "+33 (0)1 84 72 90 15",

    // CONTACT : Adresse physique ou atelier
    address: {
      street: "18 Rue des Métiers d'Art",
      city: "75011 Paris",
      country: "France",
      coordinates: "48.8566, 2.3522" // Coordonnées GPS (optionnel)
    },

    // CONTACT : Horaires d'ouverture
    hours: [
      { days: "Lundi — Vendredi", time: "09h30 - 18h30" },
      { days: "Samedi (Sur rendez-vous)", time: "10h00 - 16h00" },
      { days: "Dimanche", time: "Fermé" }
    ],

    // CONTACT : Délai de réponse annoncé aux clients
    responseDelayNotice: "Notre équipe vous répond sous 24 à 48 heures ouvrées."
  },


  /* ====================================================================
   * 2. IDENTITÉ DE LA MARQUE & TITRES DU SITE
   * ====================================================================
   * Modifiez ici le nom de votre marque, le slogan et la description.
   */
  brand: {
    // TITRE : Nom principal de votre marque
    name: "ATELIER KRONA",

    // TITRE : Slogan de la marque
    tagline: "Design intemporel, matières brutes & finitions d'exception",

    // TEXTE : Courte description de l'entreprise
    shortDescription: "Créateur d'objets du quotidien et pièces d'artisanat contemporain. Découvrez notre collection et commandez auprès de nos points de vente officiels.",

    // Année de fondation
    foundedYear: 2021,

    // Emplacement géographique
    location: "Paris — Copenhague",

    // TITRE DU LOGO : Texte affiché dans le logo si aucune image n'est utilisée
    logoText: "KRONA",
    logoSubtitle: "STUDIO & ATELIER",

    // Devise monétaire utilisée sur le site
    currency: "€",
    currencyPosition: "after" // "after" (ex: 450 €) ou "before" (ex: € 450)
  },


  /* ====================================================================
   * 3. IMAGES & BANNIÈRES DU SITE
   * ====================================================================
   * Modifiez ici la bannière d'annonce supérieure et les visuels clés.
   */
  announcement: {
    enabled: true, // Mettez "false" pour masquer la bannière supérieure

    // TEXTE : Message de la barre d'annonce
    text: "✨ Nouvelle collection en édition limitée disponible auprès de nos revendeurs certifiés.",

    // BADGE : Petit badge à gauche du message
    badge: "NOUVEAUTÉ",

    // BOUTON / LIEN : Texte et destination du lien de la bannière
    linkText: "Explorer le catalogue →",
    linkUrl: "produits"
  },


  /* ====================================================================
   * 4. BOUTONS & LIENS D'ACHAT EXTERNES
   * ====================================================================
   * Modifiez ici les liens vers vos canaux d'achat officiels :
   * Shopify, Amazon, Etsy, points de vente physiques, etc.
   */
  externalChannels: [
    {
      id: "official-store",
      name: "Boutique Officielle Shopify",
      description: "Livraison rapide & catalogue complet",
      url: "https://shopify.com", // LIEN : Remplacez par le lien de votre boutique
      badge: "Recommandé"
    },
    {
      id: "amazon",
      name: "Boutique Officielle Amazon",
      description: "Livraison Prime 24h & avis vérifiés",
      url: "https://amazon.fr", // LIEN : Remplacez par votre lien Amazon
      badge: "Prime"
    },
    {
      id: "etsy",
      name: "Atelier Artisanal Etsy",
      description: "Pièces uniques & créations sur-mesure",
      url: "https://etsy.com", // LIEN : Remplacez par votre lien Etsy
      badge: "Artisans"
    },
    {
      id: "retailers",
      name: "Réseau de concept stores",
      description: "Plus de 45 points de vente en Europe",
      url: "contact#points-de-vente", // LIEN vers vos revendeurs
      badge: "Physique"
    }
  ],

  // Réseaux sociaux
  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@atelier.krona" },
    { name: "Pinterest", url: "https://pinterest.com", handle: "atelier_krona" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "atelier-krona" },
    { name: "YouTube", url: "https://youtube.com", handle: "Atelier Krona" }
  ],

  // Éléments de rassurance (Garanties affichées sur l'accueil)
  guarantees: [
    {
      title: "Matériaux Nobles",
      description: "Bois certifiés FSC, acier brossé et céramiques façonnées à la main."
    },
    {
      title: "Garantie 5 à 10 Ans",
      description: "Toutes nos pièces sont conçues pour durer et réparables à vie."
    },
    {
      title: "Expédition Sécurisée",
      description: "Achat sécurisé auprès de nos plateformes partenaires certifiées."
    },
    {
      title: "Éditions Numérotées",
      description: "Certificat d'authenticité signé fourni avec chaque objet."
    }
  ],


  /* ====================================================================
   * 5. TEXTES DU MENU DE NAVIGATION (URLS PROPRES)
   * ====================================================================
   * Liens du menu principal. Remarquez l'absence de ".html" !
   */
  navigation: [
    { label: "Accueil", href: "./" },
    { label: "Catalogue", href: "produits" },
    { label: "À Propos", href: "about" },
    { label: "Services", href: "services" },
    { label: "Tarifs & Packs", href: "tarifs" },
    { label: "FAQ", href: "faq" },
    { label: "Contact", href: "contact" }
  ],


  /* ====================================================================
   * 6. TRADUCTIONS FR / EN (Textes du site en Français et Anglais)
   * ====================================================================
   * Le site utilise Google Translate pour traduire automatiquement l'ensemble
   * des pages. Vous pouvez également retrouver ici les termes clés du site.
   */
  translations: {
    fr: {
      navHome: "Accueil",
      navCatalog: "Catalogue",
      navAbout: "À Propos",
      navServices: "Services",
      navPricing: "Tarifs & Packs",
      navFaq: "FAQ",
      navContact: "Contact",
      btnViewProducts: "Voir les Produits",
      btnContactUs: "Nous Contacter",
      btnOrder: "Commander",
      btnDetails: "Fiche",
      langSwitch: "FR / EN"
    },
    en: {
      navHome: "Home",
      navCatalog: "Catalog",
      navAbout: "About Us",
      navServices: "Services",
      navPricing: "Pricing & Packs",
      navFaq: "FAQ",
      navContact: "Contact",
      btnViewProducts: "View Products",
      btnContactUs: "Contact Us",
      btnOrder: "Buy Now",
      btnDetails: "Details",
      langSwitch: "EN / FR"
    }
  }
};

// Exportation globale pour les scripts
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
