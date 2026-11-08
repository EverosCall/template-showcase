# Atelier Krona — Template Vitrine & E-Commerce Haute Couture (Édition 2026)

Bienvenue dans la documentation officielle du template **Atelier Krona**, intégralement refondu et sublimé grâce aux compétences de pointe : **UI/UX Pro Max**, **Design-System 3-Tier Tokens**, **Banner-Design**, **Brand Identity** et **21st UI Standards**.

Ce template haut de gamme associe une esthétique **Liquid Glass & Glassmorphism** (Midnight Forest & Mint Spark) à une ergonomie e-commerce fluide et moderne, tout en restant 100% sans backend et directement consultable en local par double-clic ou hébergeable en 1 clic.

---

## 🌟 Nouveautés & Points Forts de la Refonte 2026

- **Tiroir Panier Interactif (`CartManager`)** :
  - Tiroir latéral glissant avec sauvegarde automatique dans `localStorage`.
  - Compteur d'articles dynamique synchronisé dans le header et le menu mobile.
  - Ajustement des quantités `[- 1 +]`, suppression d'articles et calcul instantané du sous-total.
  - Jauge visuelle de livraison offerte (seuil dynamique à 150 €).
  - Bouton de passage de commande avec redirection sécurisée.

- **Fenêtre Modale d'Aperçu Rapide (`QuickViewManager`)** :
  - Bouton « Aperçu rapide » sur les fiches produits.
  - Affichage instantané en verre dépoli (glassmorphism) avec sélecteur de variantes et ajout au panier direct.

- **Moteur de Recherche & Filtrage en Temps Réel** :
  - Recherche instantanée avec raccourci clavier universel `/`.
  - Bouton d'effacement rapide `✕`.
  - Filtres thématiques par pilules avec compteurs dynamiques réels.
  - Tri par pertinence, prix croissant/décroissant et note client.

- **Bento Grid Asymétrique sur la Page d'Accueil** :
  - 4 panneaux interactifs mettant en valeur l'artisanat, les matières nobles, l'acoustique pure et l'engagement réparable.

- **Architecture de Design System 3-Tier (`css/theme.css`)** :
  - **Primitifs** : Nuancier minéral, Midnight 950/900, Electric Mint, Or brossé.
  - **Sémantiques** : Surfaces de verre (`--glass-bg`, `--glass-border`, `--glass-blur`), typographie fluide (`clamp()`).
  - **Composants** : Boutons pills 9999px, cartes à reflets, badges pulsatifs en direct, accordéons CSS Grid fluides.

- **Système de Notifications Toast Fluides** :
  - Alertes discrètes et animées (ajout panier, copie d'adresse showroom, validation formulaire).

- **Accessibilité & Finitions WCAG AAA (`ui-ux-pro-max`)** :
  - Ratio de contraste > 7:1 sur les titres et > 12:1 sur les textes.
  - Anneaux de focus visibles pour la navigation au clavier (`:focus-visible`).
  - Cibles tactiles minimales de 44×44px sur mobile.
  - Icônes SVG intégrées (zéro emoji comme icône).
  - Aucune barre de défilement horizontale sur tous formats (320px à 4K).

---

## 📁 Architecture des Fichiers

```text
projet_other/
│
├── index.html            # Accueil (Hero Banner, Bento Grid, Produits Phares, Témoignages, Club)
├── produits.html         # Catalogue interactif (Recherche temps réel, Pilules, Tri, Grille)
├── produit.html          # Fiche produit détaillée (Galerie, Swatches couleur/taille, Stepper, Panier)
├── about.html            # La Maison (Manifeste, Piliers d'artisanat, Équipe fondatrice)
├── services.html         # Sur-Mesure, Hôtellerie, Prescription B2B & Processus
├── tarifs.html           # Ensembles harmonisés, Packs remisés & Chiffrage personnalisé
├── faq.html              # FAQ interactive (Recherche dynamique & Accordéons animés)
├── contact.html          # Showroom, Formulaire validé en direct & Copie d'adresse 1-clic
│
├── css/
│   ├── theme.css         # Tokens 3-Tier, Typographie clamp, Reset, Fond Mesh
│   ├── components.css    # Boutons, Cartes Glass, Badges, Panier, Modale, Toasts, Accordéons
│   ├── layout.css        # Header sticky, Navigation, Tiroir mobile, Footer complet
│   └── pages.css         # Styles Hero banner, Catalogue, Fiche produit, Bento grid
│
├── js/
│   ├── config.js         # Données centrales (coordonnées, horaires, devises)
│   ├── products.js       # Base catalogue (produits, variantes, spécifications, FAQ)
│   ├── app.js            # Moteur interactif (CartManager, QuickView, Toast, Sticky header)
│   ├── catalog.js        # Moteur de filtrage et recherche instantanée
│   ├── product-detail.js # Gestion galerie, swatches, calcul de prix et sticky mobile
│   ├── faq.js            # Moteur de recherche et accordéons fluides
│   └── contact.js        # Validation en temps réel et copie presse-papier
│
├── GUIDE_DEBUTANT.md     # Guide pratique pas-à-pas pour les débutants
└── README.md             # Documentation technique
```

---

## 🚀 Lancement & Test Local

1. **En local direct** : Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur préféré.
2. **Via serveur local** :
   ```bash
   npm start
   # ou
   npx serve . -l 3000
   ```
