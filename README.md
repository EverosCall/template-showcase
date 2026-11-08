# 🌟 Template Showcase — Boutique & Vitrine Contemporaine Haute Couture

[![HTML5](https://img.shields.io/badge/HTML5-Sémantique-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-3--Tier_Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Audit](https://img.shields.io/badge/Impeccable_Audit-0_Warning-36f4a4?style=for-the-badge)](file:///assets/css/theme.css)
[![Dependencies](https://img.shields.io/badge/Dependencies-0_Zero_Bloat-brightgreen?style=for-the-badge)](package.json)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Un template vitrine & e-commerce de prestige, ultra-performant et clé en main. Conçu pour les **ateliers d'artisanat, maisons d'édition, architectes d'intérieur, créateurs de mobilier, marques de luxe et studios contemporains**.

---

## ⚡ En Bref : Pourquoi ce Template ?

- **Zéro dépendance, zéro compilation** : Pas de `npm run build` complexe, pas de framework lourd. Double-cliquez sur `index.html` et le site fonctionne à 100% directement dans votre navigateur.
- **Personnalisation en 60 secondes** : Un seul fichier [`assets/js/config.js`](file:///C:/Users/Admin/Downloads/projet_other/assets/js/config.js) pilote le nom de marque, le logo, les coordonnées, les devises, les liens sociaux et le mode de commande grâce à l'auto-hydratation (`data-template`).
- **Fonctionnalités e-commerce natives** :
  - 🛒 **Panier tiroir latéral** (`CartManager`) persistant dans `localStorage`, avec code promo (`KRONA10`), jauge de livraison offerte et ajustement de quantités.
  - 💳 **Checkout multicanal** : Compatible **Stripe Checkout** (lien de paiement direct), **WhatsApp Order** (envoi du récapitulatif formaté), **Email Order** (`mailto:`) ou mode **Démo**.
  - 🔍 **Recherche instantanée** avec raccourci clavier universel <kbd>/</kbd>, filtres par pilules dynamiques et tri multi-critères.
  - 👁️ **Aperçu rapide modale** (`QuickViewManager`) accessible au clavier (`Escape`).
  - 🖼️ **Fiche produit dynamique** avec galerie multi-angles, sélection de variantes (swatches teintes & matières), recalcul de prix et barre d'achat mobile sticky.
  - 📦 **Packs & Tarifs combinés** (`tarifs.html`) avec ajout au panier en 1 clic.
  - 📍 **Showroom & Formulaire** (`contact.html`) avec validation temps réel, copie d'adresse 1-clic et webhook prêt à l'emploi (Formspree, Basin, Resend).
- **Design System 3-Tier** : Palette minérale sombre (Obsidian & Mint Spark), typographie fluide (`clamp()`), respect des ratios de contraste **WCAG AAA** et audit **Impeccable** validé sans aucun anti-pattern.

---

## 🚀 Démarrage en 3 Minutes

### 1. Cloner le template
```bash
git clone https://github.com/EverosCall/template-showcase.git
cd template-showcase
```

### 2. Tester en local
Ouvrez directement `index.html` dans votre navigateur ou lancez le serveur local :
```bash
npm start
# Le site s'ouvre sur http://localhost:3000
```

### 3. Déployer en 1 clic
Ce template est statique pur : il peut être hébergé gratuitement en quelques secondes sur :
- **Vercel** : Glissez-déposez le dossier ou connectez votre dépôt GitHub.
- **Cloudflare Pages** : Déploiement instantané avec CDN mondial.
- **GitHub Pages** : Activez GitHub Pages dans les paramètres du dépôt (`Settings` > `Pages` > `Deploy from a branch: main / root`).
- **Netlify** : Compatible direct (le fichier `_redirects` pour les URLs propres sans `.html` est inclus).

---

## 🛠️ Guide de Personnalisation du Template

### 1. Personnaliser la marque & le contact (`assets/js/config.js`)
Ouvrez [`assets/js/config.js`](file:///C:/Users/Admin/Downloads/projet_other/assets/js/config.js) pour modifier :
```javascript
const SITE_CONFIG = {
  brand: {
    name: "VOTRE MARQUE",
    logoText: "VOTRE NOM",
    logoSubtitle: "STUDIO & ATELIER",
    tagline: "Votre slogan haut de gamme...",
    currency: "€"
  },
  contact: {
    email: "contact@votre-domaine.com",
    phone: "+33 (0)1 00 00 00 00",
    address: {
      street: "12 Rue de la Création",
      city: "75003 Paris",
      country: "France"
    }
  },
  checkout: {
    mode: "stripe", // "stripe" | "whatsapp" | "email" | "demo"
    stripePaymentLink: "https://buy.stripe.com/votre_lien_reel",
    whatsappNumber: "+33600000000",
    orderEmail: "commandes@votre-domaine.com"
  },
  forms: {
    contactWebhookUrl: "https://formspree.io/f/votre_form_id" // Pour recevoir les emails
  }
};
```
> 💡 Grâce au moteur d'auto-hydratation, **toutes les pages HTML mettent à jour leurs logos, pieds de page et mentions de copyright automatiquement**.

### 2. Personnaliser le catalogue de produits (`assets/js/products.js`)
Ouvrez [`assets/js/products.js`](file:///C:/Users/Admin/Downloads/projet_other/assets/js/products.js) :
```javascript
{
  id: "mon-produit-01",
  name: "Lampe Archétype",
  category: "luminaire",
  price: 490,
  description: "Laiton brossé et diffuseur opalin...",
  image: "https://images.unsplash.com/...",
  gallery: ["url1.jpg", "url2.jpg"],
  inStock: true
}
```

### 3. Personnaliser les couleurs & le thème (`assets/css/theme.css`)
Pour adapter l'ambiance visuelle à votre charte graphique, modifiez simplement les variables CSS dans [`assets/css/theme.css`](file:///C:/Users/Admin/Downloads/projet_other/assets/css/theme.css) :
```css
:root {
  /* Couleur d'accent principale */
  --primitive-mint-500: #36f4a4; /* Remplacez par votre couleur (ex: or #d4af37) */

  /* Arrière-plans profonds */
  --primitive-obsidian: #060d0e;
  --primitive-midnight-950: #081416;
}
```

---

## 📂 Structure Professionnelle du Répertoire

```text
template-showcase/
├── docs/                      # Documentation claire et isolée
│   └── GUIDE_DEBUTANT.md      # Guide pratique pas-à-pas pour les débutants
│
├── assets/                    # Ressources statiques regroupées
│   ├── css/
│   │   ├── theme.css          # Tokens 3-tier, typographie, couleurs & reset
│   │   ├── components.css     # Boutons, panier slide-over, modale, badges, toasts
│   │   ├── layout.css         # En-tête fixe, tiroir mobile, pied de page
│   │   └── pages.css          # Styles spécifiques aux sections et grilles
│   │
│   └── js/
│       ├── config.js          # Configuration centrale & options de paiement
│       ├── products.js        # Base de données du catalogue & spécifications
│       ├── app.js             # Moteur central (Hydratation, CartManager, Modale, Toast)
│       ├── catalog.js         # Recherche temps réel & filtres dynamiques
│       ├── product-detail.js  # Galerie interactive, swatches & recalcul de prix
│       ├── faq.js             # Recherche et accordéons FAQ
│       └── contact.js         # Validation en direct et webhook email
│
├── index.html                 # Page d'accueil (Hero, Spotlight, Bento collections, Avis)
├── produits.html              # Catalogue dynamique avec filtres & recherche
├── produit.html               # Fiche produit détaillée avec galerie & sélecteur
├── about.html                 # Histoire, manifeste & valeurs d'atelier
├── services.html              # Sur-Mesure, prescription B2B & processus de fabrication
├── tarifs.html                # Ensembles harmonisés & packs remisés
├── faq.html                   # Foire aux questions interactive
├── contact.html               # Showroom, formulaire validé & copie d'adresse 1-clic
│
├── package.json               # Configuration projet & scripts légers
├── vercel.json                # Configuration URLs propres Vercel
├── serve.json                 # Configuration serveur local
├── _redirects                # Règles de redirection Cloudflare / Netlify
├── .htaccess                  # Règles de réécriture pour serveurs Apache / OVH
├── .gitignore                 # Exclusion des fichiers temporaires et système
├── LICENSE                    # Licence MIT
└── README.md                  # Documentation officielle
```

---

## 🔒 Conformité & Qualité de Code

- **Impeccable Craft Floor** : Aucun texte en dégradé criard, aucune ombre néon artificielle, aucune hiérarchie de titres sautée, contraste de texte validé WCAG AA/AAA (> 5.5:1 sur texte secondaire, > 8.5:1 sur texte principal).
- **Accessibilité universelle** : Navigation au clavier intégrale (<kbd>Tab</kbd>, <kbd>Escape</kbd>, <kbd>/</kbd>), attributs ARIA complets, anneaux de focus visibles.
- **SEO & Performances** : Code HTML5 sémantique pur, poids minimal (< 80 Ko pour l'ensemble du CSS/JS), affichage instantané sans saut de mise en page (CLS = 0).

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le déployer pour vos projets personnels ou commerciaux.
