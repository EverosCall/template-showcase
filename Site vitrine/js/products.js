/**
 * ====================================================================
 * BASE DE DONNÉES DES PRODUITS (PRODUCTS.JS)
 * ====================================================================
 * 
 * 💡 GUIDE DÉBUTANT : COMMENT MODIFIER OU AJOUTER UN PRODUIT
 * 
 * Chaque produit ci-dessous contient les informations suivantes à modifier :
 * - name : Le TITRE / NOM de votre création
 * - price : Le PRIX en euros (chiffre seul, ex: 289)
 * - shortDescription : La courte DESCRIPTION du produit
 * - image : Le lien URL vers l'IMAGE principale de la photo
 * - gallery : La liste des IMAGES supplémentaires
 * - externalPurchase.url : Le LIEN direct vers votre boutique Shopify, Amazon, etc.
 * ====================================================================
 */

const CATALOG_DATA = {
  // --- CATÉGORIES DE PRODUITS ---
  categories: [
    { id: "all", name: "Tous les produits", count: 8 },
    { id: "luminaire", name: "Luminaires & Lampes", count: 2, icon: "lamp" },
    { id: "mobilier", name: "Mobilier & Assises", count: 2, icon: "armchair" },
    { id: "audio", name: "Audio & Technologie", count: 2, icon: "headphones" },
    { id: "accessoires", name: "Accessoires & Bureau", count: 2, icon: "watch" }
  ],

  // --- PRODUITS DÉMONSTRATION ---
  products: [
    {
      id: "prod-001",
      slug: "lampe-sculpturale-krona-arch",
      name: "Lampe Sculpturale Krona Arch",
      category: "luminaire",
      categoryName: "Luminaires & Lampes",
      price: 289,
      oldPrice: 349, // Prix barré (en promotion)
      badge: "Promo", // "Promo", "Nouveau", "Populaire", "Édition Limitée"
      badgeColor: "mint", // "mint", "white", "slate"
      isFeatured: true, // Mis en avant sur l'accueil (Hero / Spotlight)
      isPopular: true,
      isNew: false,
      rating: 4.9,
      reviewsCount: 38,
      status: "En stock chez nos partenaires",
      deliveryInfo: "Expédition sous 24-48h par transporteur sécurisé",
      shortDescription: "Lampe de table à silhouette architecturale en aluminium anodisé mat et diffuseur opalin tactile à intensité variable.",
      fullDescription: `Inspirée des arches de l'architecture brutaliste nordique, la lampe Krona Arch allie la rigueur géométrique à la douceur d'une lumière d'ambiance feutrée. 

Chaque pièce est usinée au micromètre dans un bloc d'aluminium massif avant d'être micro-billée puis anodisée à chaud. Son variateur sensitif intégré au socle permet d'ajuster l'ambiance lumineuse d'un simple effleurement, de la veilleuse nocturne tamisée jusqu'à un éclairage de lecture précis.`,
      
      // Galerie d'images haute résolution
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80"
      ],

      // Variantes (Couleurs & Tailles/Formats)
      variants: {
        colors: [
          { name: "Noir Minéral", hex: "#121415", selected: true },
          { name: "Gris Titane", hex: "#4b5358", selected: false },
          { name: "Vert Forêt", hex: "#0c2c24", selected: false }
        ],
        sizes: [
          { name: "Format Bureau (38 cm)", priceDiff: 0, selected: true },
          { name: "Format Grand Salon (56 cm)", priceDiff: 80, selected: false }
        ]
      },

      // Caractéristiques techniques détaillées
      specifications: [
        { label: "Matériaux", value: "Aluminium aéronautique anodisé, verre borosilicate opalin" },
        { label: "Dimensions", value: "Hauteur : 38 cm | Diamètre base : 16 cm | Poids : 2.4 kg" },
        { label: "Éclairage", value: "Module LED 2700K blanc chaud (CRI > 95), 850 lumens" },
        { label: "Consommation", value: "9W max, variateur tactile 3 niveaux avec mémoire" },
        { label: "Alimentation", value: "Câble tressé textile noir 2m, adaptateur secteur universel 110-240V" },
        { label: "Fabrication", value: "Conçu à Paris, usinage de précision en Suède" }
      ],

      // Points forts / Avantages clés
      benefits: [
        "Variateur tactile sans bruit au toucher intuitif",
        "Lumière chaude antireflet certifiée sans scintillement (Flicker-Free)",
        "Composants LED remplaçables garantis 50 000 heures",
        "Finition soignée résistante aux rayures et empreintes"
      ],

      // LIEN D'ACHAT EXTERNE CONFIGURABLE
      externalPurchase: {
        platform: "Shopify",
        url: "https://shopify.com",
        buttonText: "Commander sur notre boutique officielle",
        secondaryUrl: "https://amazon.fr",
        secondaryText: "Acheter via Amazon Prime"
      }
    },

    {
      id: "prod-002",
      slug: "enceinte-acoustique-krona-sound-1",
      name: "Enceinte Studio Krona Sound I",
      category: "audio",
      categoryName: "Audio & Technologie",
      price: 490,
      oldPrice: null,
      badge: "Populaire",
      badgeColor: "mint",
      isFeatured: true,
      isPopular: true,
      isNew: false,
      rating: 5.0,
      reviewsCount: 52,
      status: "En stock chez nos revendeurs",
      deliveryInfo: "Expédition sécurisée sous 24h avec assurance transport",
      shortDescription: "Enceinte sans fil haute fidélité enveloppée de laine acoustique Kvadrat et châssis en noyer huilé.",
      fullDescription: `Conçue pour les mélomanes exigeants et les amateurs d'architecture intérieure, l'enceinte Krona Sound I réconcilie pureté acoustique analogique et connectivité contemporaine.

Son caisson interne à double résonance symétrique neutralise toute vibration parasite, restituant des basses profondes et des aigus cristallins sans distorsion, même à volume élevé. Compatible Wi-Fi haute résolution, AirPlay 2 et Bluetooth 5.3 aptX HD.`,
      
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Noyer & Anthracite", hex: "#2c241d", selected: true },
          { name: "Chêne Brut & Gris Brume", hex: "#8c7e6c", selected: false },
          { name: "Ébène Sombre", hex: "#141517", selected: false }
        ],
        sizes: [
          { name: "Standard 60W", priceDiff: 0, selected: true },
          { name: "Duo Stéréo 2x60W", priceDiff: 420, selected: false }
        ]
      },

      specifications: [
        { label: "Puissance", value: "60 Watts RMS (Amplificateur classe D audiophile)" },
        { label: "Réponse en fréquence", value: "38 Hz – 24 000 Hz" },
        { label: "Connectivité", value: "Wi-Fi multiroom, AirPlay 2, Spotify Connect, Bluetooth 5.3 aptX HD, Entrée Jack 3.5mm" },
        { label: "Autonomie / Batterie", value: "Batterie Li-ion 18h d'écoute nomade ou alimentation continue" },
        { label: "Dimensions", value: "28 x 16 x 14 cm | Poids : 3.8 kg" },
        { label: "Garantie", value: "5 ans pièces et main d'œuvre" }
      ],

      benefits: [
        "Acoustique audiophile calibrée pour pièces de 15 à 60 m²",
        "Tissu acoustique tissé par Kvadrat au Danemark",
        "Mode stéréo jumelé sans latence avec une 2ème enceinte",
        "Application mobile iOS/Android dédiée sans création de compte obligatoire"
      ],

      externalPurchase: {
        platform: "Boutique Partenaire",
        url: "https://shopify.com",
        buttonText: "Commander chez notre distributeur officiel",
        secondaryUrl: "contact?sujet=krona-sound-1",
        secondaryText: "Demander une écoute en auditorium"
      }
    },

    {
      id: "prod-003",
      slug: "fauteuil-epure-nordic-lounge",
      name: "Fauteuil Minimaliste Lounge 03",
      category: "mobilier",
      categoryName: "Mobilier & Assises",
      price: 890,
      oldPrice: null,
      badge: "Édition Limitée",
      badgeColor: "mint",
      isFeatured: true,
      isPopular: false,
      isNew: true,
      rating: 4.8,
      reviewsCount: 19,
      status: "Fabriqué sur commande (délai 3-4 semaines)",
      deliveryInfo: "Livraison sur rendez-vous à l'étage avec déballage inclus",
      shortDescription: "Structure en acier tubulaire thermo-laqué noir mat et sellerie en cuir végétal pleine fleur patiné.",
      fullDescription: `Le fauteuil Lounge 03 est un hommage aux lignes tendues du design moderne du milieu du XXe siècle, réinterprétées avec la légèreté des techniques métallurgiques actuelles.

Chaque assise offre une inclinaison physiologique idéale de 105 degrés pour un maintien parfait du dos et des lombaires sans nécessiter de volume encombrant. Le cuir sélectionné dans des tanneries italiennes certifiées développera une patine unique avec les années.`,

      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1580481077191-45ecba4313d3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Cuir Havane Ambré", hex: "#7a431d", selected: true },
          { name: "Cuir Noir Onyx", hex: "#1a1a1a", selected: false },
          { name: "Lin Lourd Naturel", hex: "#c4b79b", selected: false }
        ],
        sizes: [
          { name: "Dimensions Standard", priceDiff: 0, selected: true },
          { name: "Avec Repose-pieds assorti", priceDiff: 290, selected: false }
        ]
      },

      specifications: [
        { label: "Structure", value: "Acier tubulaire 22mm, soudure TIG invisible, finition poudrée noir mat" },
        { label: "Assise & Dossier", value: "Mousse haute résilience 40kg/m³ doublée de plumes d'oie recyclées" },
        { label: "Revêtement", value: "Cuir bovin européen tannage végétal sans chrome" },
        { label: "Dimensions", value: "L 74 x P 82 x H 78 cm (hauteur d'assise 41 cm)" },
        { label: "Poids supporté", value: "Testé jusqu'à 160 kg" },
        { label: "Origine", value: "Assemblage artisanal dans notre atelier partenaire en Vénétie" }
      ],

      benefits: [
        "Confort d'assise enveloppant mais dynamique",
        "Cuir naturel respirant qui embellit avec le temps",
        "Pieds munis de patins feutre haute densité pour tous types de sols",
        "Garantie structurelle 10 ans"
      ],

      externalPurchase: {
        platform: "Marketplace Déco",
        url: "https://etsy.com",
        buttonText: "Commander la pièce sur notre boutique Etsy",
        secondaryUrl: "contact?sujet=fauteuil-lounge-03",
        secondaryText: "Demander des échantillons de cuir gratuits"
      }
    },

    {
      id: "prod-004",
      slug: "chronographe-automatique-krona-horizon",
      name: "Montre Automatique Krona Horizon",
      category: "accessoires",
      categoryName: "Accessoires & Bureau",
      price: 640,
      oldPrice: 720,
      badge: "Nouveau",
      badgeColor: "mint",
      isFeatured: false,
      isPopular: true,
      isNew: true,
      rating: 4.9,
      reviewsCount: 27,
      status: "Série numérotée (150 exemplaires)",
      deliveryInfo: "Livrée dans son coffret en bois massif avec outil de bracelet",
      shortDescription: "Boîtier 39mm en titane grade 5 brossé, mouvement mécanique automatique suisse et cadran vert forêt texturé.",
      fullDescription: `Conçue comme un instrument de précision minimaliste débarrassé du superflu, la Krona Horizon conjugue la robustesse du titane léger au charme intemporel de l'horlogerie mécanique.

Son cadran vert sombre profond change subtilement de nuance selon l'inclinaison de la lumière. Le verre saphir double dôme traité antireflet multicouche garantit une lisibilité absolue quelles que soient les conditions.`,

      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Vert Forêt & Titane", hex: "#1c3b31", selected: true },
          { name: "Cadran Noir Absolu", hex: "#111213", selected: false }
        ],
        sizes: [
          { name: "Bracelet Cuir Barénia", priceDiff: 0, selected: true },
          { name: "Bracelet Maille Milanaise Titane", priceDiff: 60, selected: false }
        ]
      },

      specifications: [
        { label: "Boîtier", value: "Titane Grade 5 brossé et poli main, diamètre 39 mm, épaisseur 10.4 mm" },
        { label: "Mouvement", value: "Mécanique à remontage automatique, 28 800 alt/h, réserve de marche 41h" },
        { label: "Verre", value: "Saphir inrayable double courbure avec traitement antireflet 5 couches" },
        { label: "Étanchéité", value: "10 ATM (100 mètres) avec couronne vissée étanche" },
        { label: "Fond de boîte", value: "Verre saphir transparent dévoilant la masse oscillante ajourée" },
        { label: "Garantie", value: "Garantie horlogère internationale 5 ans" }
      ],

      benefits: [
        "Poids plume de seulement 58 grammes grâce au titane grade 5",
        "Aiguilles et index traités au Super-LumiNova BGW9 à rémanence bleutée",
        "Système de changement rapide de bracelet sans outil",
        "Certificat de précision numéroté délivré à chaque montre"
      ],

      externalPurchase: {
        platform: "Amazon Store",
        url: "https://amazon.fr",
        buttonText: "Acheter sur notre Store Amazon Officiel",
        secondaryUrl: "https://shopify.com",
        secondaryText: "Acheter sur notre boutique Shopify"
      }
    },

    {
      id: "prod-005",
      slug: "suspension-geometrique-krona-orbit",
      name: "Suspension Aérienne Krona Orbit",
      category: "luminaire",
      categoryName: "Luminaires & Lampes",
      price: 360,
      oldPrice: null,
      badge: "Nouveau",
      badgeColor: "mint",
      isFeatured: false,
      isPopular: false,
      isNew: true,
      rating: 4.7,
      reviewsCount: 14,
      status: "En stock chez nos partenaires",
      deliveryInfo: "Expédié sous 48h dans emballage renforcé antichoc",
      shortDescription: "Suspension sculpturale à deux disques réflecteurs orientables en laiton bruni et noir sablé.",
      fullDescription: `Krona Orbit joue avec les éclipses et les ombres portées. Ses deux disques concentriques peuvent être orientés indépendamment sur 360° pour orienter le faisceau lumineux vers le plafond en éclairage indirect ou focalisé sur une table de repas.`,

      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Laiton Bruni & Noir", hex: "#8a7346", selected: true },
          { name: "Aluminium Brut", hex: "#7a8288", selected: false }
        ],
        sizes: [
          { name: "Diamètre 45 cm", priceDiff: 0, selected: true },
          { name: "Diamètre 65 cm", priceDiff: 110, selected: false }
        ]
      },

      specifications: [
        { label: "Diamètre", value: "45 cm (modèle standard) | Poids 2.8 kg" },
        { label: "Câble de suspension", value: "Câble d'acier réglable jusqu'à 250 cm" },
        { label: "Puissance", value: "LED intégrée 18W (1400 lumens), compatible variateur mural TRIAC" }
      ],

      benefits: [
        "Réflecteurs orientables à volonté sans outils",
        "Compatible avec variateurs muraux et interrupteurs domotiques",
        "Finition brossée vernie qui résiste à l'oxydation"
      ],

      externalPurchase: {
        platform: "Boutique Officielle",
        url: "https://shopify.com",
        buttonText: "Commander sur notre boutique officielle",
        secondaryUrl: "contact?sujet=krona-orbit",
        secondaryText: "Demander conseil pour l'installation"
      }
    },

    {
      id: "prod-006",
      slug: "organiseur-de-bureau-krona-monolith",
      name: "Organiseur Desk Tray Krona Monolith",
      category: "accessoires",
      categoryName: "Accessoires & Bureau",
      price: 110,
      oldPrice: 135,
      badge: "Promo",
      badgeColor: "mint",
      isFeatured: false,
      isPopular: true,
      isNew: false,
      rating: 4.9,
      reviewsCount: 64,
      status: "En stock chez tous nos revendeurs",
      deliveryInfo: "Expédition sous 24h, emballage cadeau disponible",
      shortDescription: "Plateau monobloc fraisé dans une pièce d'aluminium massif avec base feutrine mérinos antidérapante.",
      fullDescription: `Conçu pour libérer l'esprit en ordonnant le plan de travail. Le Krona Monolith offre des rainures de précision pour stylos d'écriture, accessoires, téléphone et cartes. Son poids de plus de 700g assure une stabilité inébranlable.`,

      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Gris Sidéral", hex: "#232629", selected: true },
          { name: "Argent Pur", hex: "#8e959b", selected: false },
          { name: "Vert Émeraude Sombre", hex: "#0b261e", selected: false }
        ],
        sizes: [
          { name: "Format Compact (24 cm)", priceDiff: 0, selected: true },
          { name: "Format Extended (36 cm)", priceDiff: 35, selected: false }
        ]
      },

      specifications: [
        { label: "Matière", value: "Aluminium CNC 6061 usiné dans la masse" },
        { label: "Base", value: "Feutre de laine mérinos 3mm découpé au laser" },
        { label: "Poids", value: "720 g" }
      ],

      benefits: [
        "Ne glisse jamais sur le bureau lors de la prise d'un stylo",
        "Rainure avec inclinaison optimisée pour poser son smartphone",
        "Usinage de précision sans la moindre arête vive"
      ],

      externalPurchase: {
        platform: "Amazon",
        url: "https://amazon.fr",
        buttonText: "Acheter sur Amazon avec livraison Prime",
        secondaryUrl: "https://shopify.com",
        secondaryText: "Voir sur la boutique Shopify"
      }
    },

    {
      id: "prod-007",
      slug: "table-basse-krona-slate",
      name: "Table Basse Krona Slate & Chêne",
      category: "mobilier",
      categoryName: "Mobilier & Assises",
      price: 750,
      oldPrice: null,
      badge: "Édition Limitée",
      badgeColor: "white",
      isFeatured: false,
      isPopular: false,
      isNew: true,
      rating: 4.8,
      reviewsCount: 11,
      status: "Fabriqué sur commande (délai 2 à 3 semaines)",
      deliveryInfo: "Livraison par transporteur spécialisé mobilier sur créneau 2h",
      shortDescription: "Plateau en ardoise naturelle clivée et piètement tripode en chêne massif certifié.",
      fullDescription: `Une alliance élémentaire de pierre brute et de bois chaleureux. Chaque plateau d'ardoise possède ses veines et textures minérales propres, faisant de chaque table un exemplaire unique et intemporel.`,

      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Ardoise Noire & Chêne Naturel", hex: "#3b332a", selected: true },
          { name: "Ardoise Grise & Chêne Fumé", hex: "#22201e", selected: false }
        ],
        sizes: [
          { name: "Diamètre 70 cm (H 38 cm)", priceDiff: 0, selected: true },
          { name: "Diamètre 90 cm (H 42 cm)", priceDiff: 190, selected: false }
        ]
      },

      specifications: [
        { label: "Plateau", value: "Ardoise naturelle traitée antitache mat imperméable" },
        { label: "Piètement", value: "Chêne massif de forêts éco-gérées françaises" },
        { label: "Montage", value: "Assemblage rapide sans vis apparente (outil fourni)" }
      ],

      benefits: [
        "Pierre naturelle inaltérable face à la chaleur des tasses et verres",
        "Traitement oléofuge et hydrofuge écologique sans solvant",
        "Pieds usinés avec patins feutre intégrés"
      ],

      externalPurchase: {
        platform: "Shopify",
        url: "https://shopify.com",
        buttonText: "Commander la table sur la boutique officielle",
        secondaryUrl: "contact?sujet=table-slate",
        secondaryText: "Prendre contact pour des dimensions sur-mesure"
      }
    },

    {
      id: "prod-008",
      slug: "casque-audio-krona-clarity-pro",
      name: "Casque Audio Krona Clarity Pro",
      category: "audio",
      categoryName: "Audio & Technologie",
      price: 380,
      oldPrice: 420,
      badge: "Populaire",
      badgeColor: "mint",
      isFeatured: false,
      isPopular: true,
      isNew: false,
      rating: 4.9,
      reviewsCount: 89,
      status: "En stock chez nos partenaires",
      deliveryInfo: "Expédition le jour même pour toute commande passée avant 14h",
      shortDescription: "Casque sans fil circum-auriculaire à réduction active de bruit adaptative et arceau en magnésium.",
      fullDescription: `Pensé pour les longues sessions de travail et les voyages, le Clarity Pro enveloppe l'auditeur dans une bulle de silence acoustique absolu. Les transducteurs en béryllium de 40 mm délivrent une spatialisation stéréo bluffante de précision.`,

      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80"
      ],

      variants: {
        colors: [
          { name: "Noir Minéral & Cuir Sombre", hex: "#111215", selected: true },
          { name: "Argent & Cuir Taupe", hex: "#9a948c", selected: false }
        ],
        sizes: [
          { name: "Édition Standard", priceDiff: 0, selected: true }
        ]
      },

      specifications: [
        { label: "Transducteurs", value: "Béryllium pur 40 mm, distorsion < 0.1%" },
        { label: "Réduction de bruit", value: "ANC hybride adaptative 4 micros MEMS" },
        { label: "Autonomie", value: "35 heures avec ANC active, recharge rapide USB-C (5h en 15 min)" },
        { label: "Poids", value: "245 g" }
      ],

      benefits: [
        "Coussinets à mémoire de forme ultra-respirants",
        "Mode transparence instantané activé d'un tapotement",
        "Étui rigide de transport ultra-plat inclus"
      ],

      externalPurchase: {
        platform: "Amazon Prime",
        url: "https://amazon.fr",
        buttonText: "Commander sur Amazon Prime",
        secondaryUrl: "https://shopify.com",
        secondaryText: "Voir sur le Store Officiel"
      }
    }
  ],

  // --- TÉMOIGNAGES CLIENTS & PRESSE ---
  testimonials: [
    {
      id: "test-1",
      author: "Julien V.",
      role: "Architecte d'intérieur — Paris",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "La lampe Krona Arch est devenue la pièce maîtresse des projets que je livre à mes clients. La finition de l'aluminium et la chaleur de la lumière sont d'une justesse rare. On sent la passion derrière chaque détail.",
      productMention: "Lampe Krona Arch",
      rating: 5
    },
    {
      id: "test-2",
      author: "Hélène de M.",
      role: "Acheteuse vérifiée via Shopify",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      content: "L'enceinte Krona Sound I n'est pas seulement un bel objet de décoration : le rendu sonore a surpassé toutes mes attentes. La commande auprès du revendeur partenaire s'est faite en deux clics.",
      productMention: "Krona Sound I",
      rating: 5
    },
    {
      id: "test-3",
      author: "Marc & Sophie B.",
      role: "Collectionneurs de mobilier design — Lyon",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "Un service client exceptionnel qui a pris le temps de nous envoyer des échantillons de cuir avant notre commande. Le fauteuil Lounge 03 est spectaculaire au quotidien.",
      productMention: "Fauteuil Lounge 03",
      rating: 5
    }
  ],

  // --- SERVICES ADDITIONNELS (Pour la page services.html) ---
  services: [
    {
      id: "custom",
      title: "Créations & Personnalisation sur-mesure",
      subtitle: "Gravure, choix d'essences de bois ou dimensions spécifiques",
      description: "Pour vos intérieurs privés ou projets professionnels d'hôtellerie, nous adaptons les finitions, matières et cotes de nos pièces phares selon votre cahier des charges.",
      icon: "tools",
      badge: "Sur devis",
      details: ["Gravure laser de monogrammes ou logos", "Choix parmi 12 teintes de cuir et 6 essences de bois certifiées", "Étude 3D préalable pour validation visuelle"]
    },
    {
      id: "shipping",
      title: "Livraison Blanche & Installation",
      subtitle: "Une logistique soignée jusqu'à votre pièce de vie",
      description: "Toutes nos pièces volumineuses sont acheminées par des transporteurs d'art et de mobilier. Déballage, mise en place et reprise des emballages offerts.",
      icon: "truck",
      badge: "Inclus sur le mobilier",
      details: ["Prise de rendez-vous sur créneau de 2 heures", "Équipe de deux livreurs spécialisés", "Inspection conjointe à la livraison"]
    },
    {
      id: "warranty",
      title: "Garantie Étendue & Réparabilité à Vie",
      subtitle: "Des objets conçus pour traverser les générations",
      description: "Parce que nous croyons à la durabilité réelle, nous stockons l'ensemble des pièces détachées (modules LED, câbleries, visseries) pour une réparation garantie sans obsolescence.",
      icon: "shield",
      badge: "Garantie 5 à 10 ans",
      details: ["Pièces de rechange disponibles pendant au moins 15 ans", "Atelier de restauration basé en France", "Diagnostic gratuit sur simple envoi de photos"]
    },
    {
      id: "b2b",
      title: "Espace Professionnels, Architectes & Presse",
      subtitle: "Accompagnement dédié pour projets d'aménagement",
      description: "Tarification préférentielle dès la première commande de projet, envoi d'échantillons sous 48h et mise à disposition des fichiers 3D (STEP, DWG, OBJ).",
      icon: "briefcase",
      badge: "Service Pro",
      details: ["Remises professionnelles dégressives", "Interlocuteur dédié joignable directement", "Accès à la matériauthèque complète"]
    }
  ],

  // --- TARIFS & PACKS (Pour la page tarifs.html) ---
  pricingPacks: [
    {
      id: "pack-starter",
      name: "Pack Découverte Bureau",
      price: 360,
      oldPrice: 399,
      badge: null,
      description: "La combinaison parfaite pour transformer votre espace de travail en sanctuaire de créativité.",
      includes: [
        "1x Organiseur Krona Monolith (au choix)",
        "1x Lampe de table Krona Arch 38cm",
        "Coffret cadeau premium avec carte signée",
        "Livraison express offerte"
      ],
      ctaText: "Découvrir auprès de notre revendeur",
      ctaUrl: "https://shopify.com",
      isPopular: false
    },
    {
      id: "pack-lounge",
      name: "Pack Salon Confort & Son",
      price: 1290,
      oldPrice: 1380,
      badge: "Pack Signature",
      description: "L'accord parfait entre design organique, assise physiologique et pureté acoustique.",
      includes: [
        "1x Fauteuil Lounge 03 (teinte au choix)",
        "1x Enceinte audiophile Krona Sound I",
        "Échantillons de cuir offerts en amont",
        "Livraison blanche avec montage inclus",
        "Garantie étendue 10 ans sur la structure"
      ],
      ctaText: "Commander le pack officiel",
      ctaUrl: "https://shopify.com",
      isPopular: true
    },
    {
      id: "pack-pro",
      name: "Formule Architectes & Pro",
      price: "Sur devis",
      oldPrice: null,
      badge: "B2B & Hôtels",
      description: "Solution complète d'ameublement et luminaires pour bureaux de direction, boutiques et résidences privées.",
      includes: [
        "Tarification préférentielle dès 3 pièces",
        "Personnalisation des finitions & gravures",
        "Accès aux fichiers 3D / BIM et photométries IES",
        "Livraison synchronisée sur votre calendrier de chantier"
      ],
      ctaText: "Demander une étude personnalisée",
      ctaUrl: "contact?sujet=devis-professionnel",
      isPopular: false
    }
  ],

  // --- QUESTIONS FRÉQUEMMENT POSÉES (FAQ) ---
  faq: [
    {
      category: "Achat & Disponibilité",
      items: [
        {
          q: "Puis-je acheter directement sur ce site web ?",
          a: "Ce site est le showroom vitrine officiel de notre studio. Afin de vous garantir les meilleurs délais logistiques, des paiements 100% sécurisés et des garanties fiables, nos ventes sont opérées par nos distributeurs certifiés (Shopify, Amazon Prime, concept stores physiques et boutiques partenaires). Chaque fiche produit comporte un lien direct vers le canal d'achat officiel."
        },
        {
          q: "Les prix affichés sont-ils identiques chez vos revendeurs ?",
          a: "Oui, nous appliquons une politique de prix public conseillé unique. En cas d'opérations promotionnelles exclusives (Prime Day, soldes saisonnières), les réductions peuvent être appliquées directement sur les plateformes respectives."
        },
        {
          q: "Où puis-je voir et essayer vos produits en vrai ?",
          a: "Nos créations sont exposées dans plus de 45 concept stores et galeries partenaires en France, Belgique et Suisse. Vous pouvez nous écrire via la page Contact pour connaître le point de vente le plus proche de chez vous."
        }
      ]
    },
    {
      category: "Fabrication & Matériaux",
      items: [
        {
          q: "D'où proviennent les matériaux utilisés pour vos créations ?",
          a: "Nous sélectionnons exclusivement des matériaux nobles et durables : aluminium usiné de haute précision, bois massifs certifiés FSC issus de forêts européennes éco-gérées, ardoise naturelle et cuirs tannés sans sels de chrome. Tous nos partenaires respectent des normes environnementales strictes."
        },
        {
          q: "Les pièces sont-elles livrées avec un certificat d'authenticité ?",
          a: "Absolument. Chaque objet porte un numéro de série unique gravé discrètement et s'accompagne d'un certificat d'authenticité signé par le designer et l'atelier de contrôle qualité."
        }
      ]
    },
    {
      category: "Livraison, Retours & Garantie",
      items: [
        {
          q: "Quels sont les délais d'expédition et modes de livraison ?",
          a: "Les pièces en stock sont expédiées sous 24 à 48 heures ouvrées par transporteur express (UPS, DHL ou Colissimo avec suivi et signature). Pour le mobilier volumineux ou les fabrications sur-mesure, un délai de 2 à 4 semaines est indiqué, avec livraison sur rendez-vous à votre domicile."
        },
        {
          q: "Comment fonctionne la garantie en cas de problème ?",
          a: "Toutes nos créations bénéficient d'une garantie de 5 ans (et 10 ans sur les structures de mobilier). En cas de besoin, vous pouvez nous contacter directement avec votre numéro de série : nous expédions les pièces de rechange ou organisons le retour sans frais."
        },
        {
          q: "Puis-je retourner un produit si la couleur ne convient pas à mon intérieur ?",
          a: "Oui, nos revendeurs partenaires vous offrent un délai de rétractation de 30 jours à compter de la réception pour tout produit non utilisé dans son emballage d'origine."
        }
      ]
    }
  ]
};

// Export global pour usage direct dans les scripts
if (typeof window !== "undefined") {
  window.CATALOG_DATA = CATALOG_DATA;
}
