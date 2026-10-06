# Template Vitrine Commercial pour la Vente de Produits

Bienvenue dans la documentation officielle du **Template de Site Vitrine Produit** (Édition *Midnight Greenhouse / Dark Shopify*).

Ce template professionnel a été spécialement conçu pour être **extrêmement facile à modifier par un débutant** sans aucune connaissance avancée en développement.

---

## 🌟 Points Forts du Template

- **100% Adapté aux Débutants** :
  - Chaque fichier HTML est balisé avec des commentaires clairs : `<!-- TITRE`, `<!-- TEXTE`, `<!-- IMAGE`, `<!-- BOUTON`, `<!-- LIEN`.
  - Un fichier central `js/config.js` permet de modifier toutes les coordonnées, bannières et liens d'achat au même endroit.
  - Un guide complet pour débutants est disponible dans [`GUIDE_DEBUTANT.md`](GUIDE_DEBUTANT.md).
- **Traduction FR / EN Intégrée (Google Translate)** :
  - Bouton interactif pill `FR / EN` fluide dans l'en-tête et le menu mobile.
  - Traduction automatique de tous les textes visibles (menus, boutons, titres, descriptions, formulaires, alertes).
  - Rétablissement propre et instantané du français d'origine.
  - Mémorisation du choix de langue d'une page à l'autre.
- **URLs Propres sans `.html`** :
  - Fini les URLs comme `/contact.html` ou `/index.html` : profitez de `/contact`, `/produits`, `/about` et `/`.
  - Fichiers de configuration inclus pour tous les hébergeurs : `.htaccess` (Apache / OVH / Hostinger), `_redirects` (Netlify / Cloudflare), `vercel.json` (Vercel).
  - Fonctionne aussi en double-cliquant sur les fichiers en local sans serveur web.
- **Direction Artistique "Midnight Greenhouse" (Shopify Dark)** :
  - Toile de fond profonde *Midnight Forest* (`#02090a`)
  - Cartes et panneaux *Deep Lichen* (`#061a1c`) avec bordures hairline discrètes (`#1e2c31`)
  - Boutons ovales signature en pilule (`border-radius: 9999px`)
  - Étincelle électrique *Shopify Mint* (`#36f4a4`) réservée aux moments interactifs (badges, filtres actifs, focus)
- **Zéro dépendance, zéro Python & zéro backend** :
  - Fonctionne immédiatement dans n'importe quel navigateur web.

---

## 📁 Architecture du Projet

```text
Site vitrine/
│
├── index.html            # Page d'accueil (Hero, Atouts, Produits phares, Savoir-faire, Avis)
├── produits.html         # Page catalogue avec recherche, filtres et tri
├── produit.html          # Fiche produit détaillée avec galerie, variantes et bouton d'achat
├── about.html            # Histoire de la marque, manifeste, valeurs, équipe (alias /about)
├── a-propos.html         # Page à propos (alias /a-propos)
├── services.html         # Services sur-mesure, livraison blanche, garantie et B2B
├── tarifs.html           # Tarifs indicatifs, formules et packs harmonisés
├── faq.html              # Questions fréquentes avec accordéons interactifs
├── contact.html          # Formulaire validé, coordonnées atelier et points de vente
│
├── .htaccess             # Configuration URLs propres pour Apache, OVH, Hostinger
├── _redirects            # Configuration URLs propres pour Netlify & Cloudflare Pages
├── vercel.json           # Configuration URLs propres pour Vercel
│
├── css/
│   ├── theme.css         # Tokens de design, variables CSS, typographie, reset
│   ├── components.css    # Boutons pills, cartes, badges, formulaires, accordéons, toasts
│   ├── layout.css        # Header sticky, barre d'annonce, menu mobile, footer, traduction
│   └── pages.css         # Styles spécifiques aux pages (Hero, Catalogue, Fiche produit)
│
├── js/
│   ├── config.js         # Configuration centralisée de la marque, coordonnées & traductions
│   ├── products.js       # Base de données des produits, catégories, FAQ et packs
│   ├── app.js            # Logique globale (Google Translate, clean URLs, sticky header, toasts)
│   ├── catalog.js        # Moteur de filtrage et recherche du catalogue (bilingue)
│   ├── product-detail.js # Gestion de la fiche produit, galerie et variantes
│   ├── faq.js            # Filtrage et accordéons de la FAQ (bilingue)
│   └── contact.js        # Validation du formulaire en temps réel (bilingue)
│
├── GUIDE_DEBUTANT.md     # Guide pratique pas-à-pas pour les personnes sans connaissances en code
└── README.md             # Documentation technique du projet
```

---

## 🛠️ Comment Personnaliser le Site

### 1. Consulter le Guide Débutant
Lisez le fichier [`GUIDE_DEBUTANT.md`](GUIDE_DEBUTANT.md) pour apprendre en 5 minutes :
- Comment changer une image ou photo
- Comment changer un titre ou texte
- Comment modifier un bouton ou un lien d'achat

### 2. Personnaliser la marque et les coordonnées (`js/config.js`)
Ouvrez le fichier `js/config.js` pour modifier :
- Le nom de votre marque : `SITE_CONFIG.brand.name`
- Le slogan : `SITE_CONFIG.brand.tagline`
- L'adresse email : `SITE_CONFIG.contact.email`
- Le téléphone : `SITE_CONFIG.contact.phone`
- Les liens d'achat (Shopify, Amazon, Etsy) : `SITE_CONFIG.externalChannels`

### 3. Ajouter ou modifier des produits (`js/products.js`)
Ouvrez `js/products.js`. Chaque produit contient des champs clairs : `name`, `price`, `image`, `gallery`, `externalPurchase.url`.

---

## 🚀 Déploiement en 1 Clic

1. **Test en local** : Double-cliquez simplement sur `index.html` pour l'ouvrir dans votre navigateur.
2. **Hébergement gratuit** :
   - **Netlify** : Glissez-déposez le dossier sur [Netlify Drop](https://app.netlify.com/drop).
   - **Vercel** : Importez votre dépôt et déployez en 1 clic.
   - **OVH / Hostinger** : Uploadez les fichiers via FTP dans le dossier `public_html` (le fichier `.htaccess` gère automatiquement les URLs propres sans `.html`).
