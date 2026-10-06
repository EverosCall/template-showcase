# 📘 Guide Débutant — Modifier votre Site Vitrine sans Coder

Bienvenue ! Ce guide a été spécialement conçu pour vous si **vous ne connaissez presque rien au code**.
Tout le site a été organisé pour être facile à personnaliser en quelques minutes.

---

## 🧭 Sommaire

1. [Démarrage en 1 clic](#1-démarrage-en-1-clic)
2. [Où modifier les Images et Photos](#2-où-modifier-les-images-et-photos)
3. [Où modifier les Titres, Textes et Paragraphes](#3-où-modifier-les-titres-textes-et-paragraphes)
4. [Où modifier les Boutons et Liens d'Achat](#4-où-modifier-les-boutons-et-liens-dachat)
5. [Comment fonctionne la Traduction FR / EN](#5-comment-fonctionne-la-traduction-fr--en)
6. [Comment fonctionnent les URLs propres (sans .html)](#6-comment-fonctionnent-les-urls-propres-sans-html)
7. [Ajouter ou modifier un Produit (`js/products.js`)](#7-ajouter-ou-modifier-un-produit)
8. [Coordonnées & Contact (`js/config.js`)](#8-coordonnées--contact)
9. [Mise en ligne du site](#9-mise-en-ligne-du-site)

---

## 1. Démarrage en 1 clic

Pour voir votre site :
- **Double-cliquez simplement sur `index.html`** pour l'ouvrir dans votre navigateur web habituel (Google Chrome, Safari, Edge, Firefox).
- La navigation fonctionne directement, même en local sur votre ordinateur !

Pour modifier les fichiers :
- Ouvrez le dossier dans un éditeur de texte comme **VS Code**, **Notepad++** ou même le Bloc-notes.

---

## 2. Où modifier les Images et Photos

Toutes les images du site sont identifiées dans le code par le commentaire :
```html
<!-- IMAGE : remplacez l'URL src="https://..." ci-dessous -->
<img src="https://images.unsplash.com/photo-..." alt="Description de l'image">
```

### 📍 Emplacements des images :

| Image | Fichier où la trouver | Mot-clé pour chercher (`Ctrl+F`) |
| :--- | :--- | :--- |
| **Photo principale (Hero)** | `index.html` | `IMAGE HERO` |
| **Photos des produits** | `js/products.js` | `"image":` et `"gallery":` |
| **Photo de l'Atelier / Histoire** | `about.html` ou `a-propos.html` | `IMAGE PRINCIPALE DE L'ATELIER` |
| **Portraits de l'équipe** | `about.html` ou `a-propos.html` | `PHOTO MEMBRE` |
| **Photos des avis clients** | `index.html` | `IMAGE AVATAR` |

> 💡 **Astuce débutant** : Vous pouvez utiliser un lien web direct (ex: Unsplash, Imgur, votre serveur) ou placer vos images dans un dossier `images/` et écrire `src="images/ma-photo.jpg"`.

---

## 3. Où modifier les Titres, Textes et Paragraphes

Dans chaque page HTML, nous avons ajouté des repères simples. Ouvrez la page et faites `Ctrl + F` :
- `<!-- TITRE` : pour trouver les grands titres `<h1>`, `<h2>`, `<h3>`
- `<!-- TEXTE` : pour trouver les paragraphes et descriptions
- `<!-- SOUS-TITRE` : pour trouver les textes sous les titres

### Exemple dans le code :
```html
<!-- TITRE PRINCIPAL : modifiez ce texte -->
<h1 class="hero-title">
  Matières brutes, lignes pures & <span class="mint">durabilité absolue.</span>
</h1>

<!-- DESCRIPTION : modifiez ce texte -->
<p class="hero-subtitle">
  Atelier Krona conçoit du mobilier, des luminaires et des objets acoustiques...
</p>
```

Modifiez simplement le texte entre les balises `>Votre texte ici<`.

---

## 4. Où modifier les Boutons et Liens d'Achat

Tous les boutons sont signalés par :
```html
<!-- BOUTON : modifiez le texte et le lien ci-dessous -->
<a href="produits" class="btn btn-primary">
  <span>Mon Bouton</span>
</a>
```

### Liens vers vos boutiques officielles (Shopify, Amazon, Etsy) :
Ouvrez le fichier **`js/config.js`** pour modifier en un seul endroit :
```javascript
externalChannels: [
  { name: "Boutique Officielle Shopify", url: "https://votre-boutique.com" },
  { name: "Boutique Officielle Amazon",  url: "https://amazon.fr/..." },
  { name: "Atelier Artisanal Etsy",      url: "https://etsy.com/..." }
]
```

---

## 5. Comment fonctionne la Traduction FR / EN

Le site intègre **Google Translate** avec un bouton interactif **FR / EN** :

1. **Bouton unique et fluide** :
   - Cliquez sur **FR / EN** dans l'en-tête (ou dans le menu mobile).
   - Le site bascule instantanément en anglais (**EN**) avec un style vert électrique.
   - Cliquez à nouveau pour rétablir le français (**FR**) d'origine.
2. **Tous les textes sont traduits** :
   - Menus, boutons, bannières, titres, descriptions, formulaires, messages d'erreurs et notifications Toast.
3. **Mémorisation automatique** :
   - Si un visiteur choisit l'anglais, le site reste en anglais lorsqu'il change de page !

---

## 6. Comment fonctionnent les URLs propres (sans .html)

Vous n'avez plus d'adresses laides comme `/contact.html` ou `/produits.html`.

### Vos nouvelles adresses :
- Accueil : `/`
- Catalogue : `/produits`
- Fiche produit : `/produit?id=prod-001`
- À Propos : `/about` (et `/a-propos`)
- Services : `/services`
- Tarifs : `/tarifs`
- FAQ : `/faq`
- Contact : `/contact`

### Fichiers de configuration inclus :
- **`.htaccess`** : pour les hébergeurs classiques Apache / OVH / Hostinger / cPanel
- **`_redirects`** : pour Netlify et Cloudflare Pages
- **`vercel.json`** : pour Vercel
- **Compatibilité double-clic** : si vous testez le site en local sans serveur web, les liens continuent de fonctionner sans aucune erreur 404.

---

## 7. Ajouter ou modifier un Produit

Ouvrez le fichier **`js/products.js`**. Chaque produit est présenté comme ceci :

```javascript
{
  id: "prod-001",
  slug: "lampe-krona-arch",
  name: "Lampe Sculpturale Krona Arch", // Le nom du produit
  category: "luminaire",                // La catégorie
  price: 289,                           // Le prix en euros
  oldPrice: 349,                        // Prix barré (en promo, facultatif)
  badge: "Promo",                       // Badge ("Promo", "Nouveau", "Populaire")
  shortDescription: "Description courte pour la carte...",
  image: "URL_DE_VOTRE_IMAGE_PRINCIPALE",
  gallery: [
    "URL_PHOTO_1",
    "URL_PHOTO_2"
  ],
  externalPurchase: {
    platform: "Shopify",
    url: "https://votre-boutique.com/produit",
    buttonText: "Acheter sur Shopify"
  }
}
```

Pour ajouter un produit : copiez-collez un bloc existant, changez son `id` (ex: `prod-009`) et remplissez vos informations !

---

## 8. Coordonnées & Contact (`js/config.js`)

Pour changer le nom de votre marque, votre email ou votre numéro de téléphone :
Ouvrez **`js/config.js`** :

```javascript
brand: {
  name: "VOTRE MARQUE",
  tagline: "Votre slogan ici...",
  currency: "€"
},
contact: {
  email: "contact@votresite.fr",
  phone: "+33 (0)1 23 45 67 89",
  address: {
    street: "10 Rue du Commerce",
    city: "75001 Paris"
  }
}
```

---

## 9. Mise en ligne du site

Ce site fonctionne **sans base de données et sans Python**. Vous pouvez l'héberger gratuitement en 2 minutes :

1. **Option Netlify (Le plus simple)** :
   - Allez sur [netlify.com/drop](https://app.netlify.com/drop)
   - Glissez-déposez le dossier de votre site.
   - Votre site est en ligne avec les URLs propres activées !
2. **Option Vercel** :
   - Connectez votre dossier et cliquez sur *Deploy*.
3. **Option OVH / Hostinger** :
   - Transférez tous les fichiers (y compris le fichier caché `.htaccess`) dans le dossier `public_html` ou `www` via FileZilla (FTP).

