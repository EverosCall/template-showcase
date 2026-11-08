# 📘 Guide Débutant — Personnaliser votre Template sans Coder

Bienvenue ! Ce guide pas-à-pas a été conçu pour vous si **vous ne connaissez presque rien au code**.
Tout le template a été organisé pour être personnalisable en quelques minutes depuis un seul fichier.

---

## 🧭 Sommaire

1. [Démarrage en 1 clic](#1-démarrage-en-1-clic)
2. [Personnaliser votre Marque & Coordonnées (`assets/js/config.js`)](#2-personnaliser-votre-marque--coordonnées)
3. [Choisir votre Système de Vente / Checkout](#3-choisir-votre-système-de-vente--checkout)
4. [Ajouter ou modifier un Produit (`assets/js/products.js`)](#4-ajouter-ou-modifier-un-produit)
5. [Où modifier les Images et Photos](#5-où-modifier-les-images-et-photos)
6. [Où modifier les Titres, Textes et Boutons](#6-où-modifier-les-titres-textes-et-boutons)
7. [Comment fonctionnent les URLs propres (sans .html)](#7-comment-fonctionnent-les-urls-propres-sans-html)
8. [Mise en ligne du site en 2 minutes](#8-mise-en-ligne-du-site-en-2-minutes)

---

## 1. Démarrage en 1 clic

Pour voir votre site immédiatement :
- **Double-cliquez simplement sur `index.html`** pour l'ouvrir dans votre navigateur web habituel (Google Chrome, Safari, Edge, Firefox).
- Le panier, la recherche et la navigation fonctionnent directement, même en local sur votre ordinateur sans serveur !

Pour modifier les fichiers :
- Ouvrez le dossier dans un éditeur de code gratuit comme **VS Code** (recommandé), **Notepad++** ou le Bloc-notes.

---

## 2. Personnaliser votre Marque & Coordonnées

Ouvrez le fichier **`assets/js/config.js`** : c'est le **centre de contrôle unique** de votre template.
Grâce au moteur d'auto-hydratation, **toutes les pages HTML mettent à jour leurs logos, coordonnées et copyright automatiquement** !

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
      street: "18 Rue de la Création",
      city: "75011 Paris",
      country: "France"
    }
  }
};
```

---

## 3. Choisir votre Système de Vente / Checkout

Toujours dans **`assets/js/config.js`**, choisissez comment vos clients passent commande :

```javascript
checkout: {
  // 4 modes au choix : "stripe" | "whatsapp" | "email" | "demo"
  mode: "stripe", 

  // Option 1 : Stripe (collez votre lien Stripe Payment Link)
  stripePaymentLink: "https://buy.stripe.com/mon_lien_direct",

  // Option 2 : WhatsApp (ouvre WhatsApp avec le panier pré-rempli)
  whatsappNumber: "+33600000000",

  // Option 3 : Email (ouvre un mailto: avec le récapitulatif du panier)
  orderEmail: "commandes@mon-domaine.com",

  // Seuil de gratuité des frais de port (en euros)
  freeShippingThreshold: 150
}
```

---

## 4. Ajouter ou modifier un Produit

Ouvrez le fichier **`assets/js/products.js`**. Chaque produit est présenté comme ceci :

```javascript
{
  id: "prod-001",
  slug: "lampe-sculpturale-arch",
  name: "Lampe Sculpturale Krona Arch",
  category: "luminaire",                // "luminaire", "mobilier", "audio", "accessoires"
  price: 289,                           // Prix en euros
  oldPrice: 349,                        // Prix barré (facultatif)
  badge: "Promo",                       // "Promo", "Nouveau", "Édition Limitée"
  image: "https://images.unsplash.com/photo-...",
  gallery: [
    "https://images.unsplash.com/photo-1...",
    "https://images.unsplash.com/photo-2..."
  ]
}
```

Pour ajouter un produit : copiez-collez un bloc existant, changez son `id` (ex: `prod-009`) et remplissez vos informations. Le catalogue, les filtres et la recherche se mettent à jour automatiquement !

---

## 5. Où modifier les Images et Photos

Toutes les images du site sont identifiées dans le code HTML par des balises claires :
```html
<img src="https://images.unsplash.com/photo-..." alt="Description de l'image">
```

### 📍 Emplacements des images :

| Image | Fichier où la trouver |
| :--- | :--- |
| **Photo principale (Hero)** | `index.html` |
| **Photos des produits** | `assets/js/products.js` |
| **Photo de l'Atelier / Histoire** | `about.html` |
| **Portraits de l'équipe** | `about.html` |
| **Photos des avis clients** | `index.html` |

> 💡 **Astuce débutant** : Vous pouvez utiliser un lien web direct (Unsplash, Cloudinary) ou créer un dossier `assets/img/` et écrire `src="assets/img/ma-photo.jpg"`.

---

## 6. Où modifier les Titres, Textes et Boutons

Dans chaque page HTML, les textes sont modifiables directement entre les balises `>Votre texte ici<` :
```html
<h1 class="hero-title">
  Matières brutes, lignes pures & durabilité absolue.
</h1>
<p class="hero-subtitle">
  Description de votre atelier...
</p>
```

---

## 7. Comment fonctionnent les URLs propres (sans .html)

Vous bénéficiez d'adresses épurées et professionnelles sans extension `.html` :
- Accueil : `/`
- Catalogue : `/produits`
- Fiche produit : `/produit?id=prod-001`
- La Maison : `/about`
- Sur-Mesure : `/services`
- Formules : `/tarifs`
- FAQ : `/faq`
- Showroom & Contact : `/contact`

Toutes les règles de réécriture sont pré-incluses pour :
- **`.htaccess`** : pour les hébergeurs classiques Apache / OVH / Hostinger / cPanel.
- **`_redirects`** : pour Netlify et Cloudflare Pages.
- **`vercel.json`** : pour Vercel.

---

## 8. Mise en ligne du site en 2 minutes

Ce site fonctionne **sans base de données et sans serveur complexe**. Vous pouvez l'héberger gratuitement :

1. **Option Vercel (Recommandé)** :
   - Connectez votre dépôt GitHub à [vercel.com](https://vercel.com) et cliquez sur *Deploy*.
2. **Option Netlify** :
   - Glissez-déposez le dossier de votre site sur [netlify.com/drop](https://app.netlify.com/drop).
3. **Option GitHub Pages** :
   - Dans votre dépôt GitHub : `Settings` > `Pages` > `Branch: main / root` > `Save`.
4. **Option OVH / Hostinger / Apache** :
   - Transférez tous les fichiers (y compris le fichier `.htaccess`) dans le dossier `public_html` via FTP (FileZilla).
