/* =====================================================================
   ALOU CISSÉ — CONFIGURATION
   C'est le SEUL fichier à modifier pour connecter la boutique.
   - Firebase vide  => la boutique fonctionne en MODE DÉMO (données locales)
   - PayPal vide    => paiement carte/PayPal simulé
   ===================================================================== */
window.AC_CONFIG = {
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // Identifiant client PayPal (LIVE ou SANDBOX) — developer.paypal.com
  paypalClientId: "",

  // E-mail du compte administrateur (créé dans Firebase > Authentication).
  // Sur l'écran de connexion, seul le mot de passe est demandé.
  adminEmail: "admin@alou-cisse.com",

  // MODE DÉMO uniquement : empreinte SHA-256 du mot de passe « alou2026 ».
  // En production, le mot de passe est celui du compte Firebase : il n'est JAMAIS écrit dans le code.
  demoPasswordHash: "220e7ea0eac992781e5467a34d39e936213e401560c20ff3fb911a6cfeba90f4",

  store: {
    name: "Alou Cissé",
    tagline: "Électronique & High-Tech",
    address: "Sébénikoro, Bamako, Mali",
    phone: "+223 77 91 91 44",       // téléphone principal (affiché + bouton « Appeler »)
    phone2: "+223 66 50 14 44",      // second téléphone
    whatsapp: "22377919144",         // WhatsApp : format international SANS + ni espaces
    email: "contact@alou-cisse.com",
    lat: 12.6390, lng: -8.0750,      // ⚠️ à ajuster sur la position exacte de la boutique
    orangeMoney: "+223 77 91 91 44", // numéro qui reçoit les paiements Orange Money
    moovMoney: "+223 66 50 14 44",   // numéro qui reçoit les paiements Moov Money
    omUssd: "#144#",                 // code du menu Orange Money (à vérifier, modifiable dans l'admin)
    moovUssd: "",                    // code du menu Moov Money (à renseigner dans l'admin)
    reservationHours: 48,            // durée de réservation Click & Collect
    // Horaires (heure de Bamako = GMT). d : 0 = dimanche … 6 = samedi
    hours: [
      { d: 1, open: "08:30", close: "20:00" },
      { d: 2, open: "08:30", close: "20:00" },
      { d: 3, open: "08:30", close: "20:00" },
      { d: 4, open: "08:30", close: "20:00" },
      { d: 5, open: "08:30", close: "13:00" },
      { d: 5, open: "15:00", close: "20:00" },
      { d: 6, open: "09:00", close: "20:00" }
      // dimanche absent = fermé
    ]
  },

  // Textes du site par défaut (modifiables dans admin.html > Contenu du site)
  content: {
    announce: "",
    kicker: "Sébénikoro · Bamako · International",
    title: "La tech haut de gamme, près de chez vous.",
    text: "Smartphones, ordinateurs, audio et objets connectés neufs et garantis. Retirez en boutique, faites-vous livrer dans Bamako ou expédier partout dans le monde.",
    cta1: "Voir le catalogue",
    cta2: "Click & Collect",
    perks: [
      { t: "Livraison Bamako", d: "Sébénikoro, Hamdallaye, ACI 2000…" },
      { t: "Retrait en boutique", d: "Réservez en ligne, payez sur place" },
      { t: "Mobile Money", d: "Orange Money, Moov Money, espèces" },
      { t: "International", d: "Carte bancaire & PayPal" }
    ],
    footer: "Produits neufs et garantis. Retrait en boutique, livraison dans tout Bamako et expédition internationale.",
    copyright: "Alou Cissé — Sébénikoro, Bamako, Mali"
  },

  // Valeurs par défaut (modifiables ensuite dans admin.html > Réglages)
  defaults: {
    usdRate: 600,        // 1 USD = x FCFA (repli si le taux automatique est indisponible)
    freeFrom: 500000,    // livraison Bamako offerte à partir de ce montant (0 = jamais)
    zones: [
      { name: "Sébénikoro", fee: 500 },
      { name: "Djicoroni Para", fee: 1000 },
      { name: "Lafiabougou", fee: 1000 },
      { name: "Hamdallaye", fee: 1500 },
      { name: "ACI 2000", fee: 1500 },
      { name: "Hippodrome", fee: 2000 },
      { name: "Badalabougou", fee: 2000 },
      { name: "Kalaban Coura", fee: 2500 },
      { name: "Faladié", fee: 2500 },
      { name: "Autre quartier de Bamako", fee: 3000 }
    ],
    relays: [
      { name: "Point relais Hamdallaye ACI (à configurer)", fee: 1000 },
      { name: "Point relais Badalabougou (à configurer)", fee: 1000 }
    ],
    intlZones: [
      { name: "Afrique de l'Ouest (UEMOA / CEDEAO)", fee: 15000 },
      { name: "Reste de l'Afrique", fee: 25000 },
      { name: "Europe", fee: 25000 },
      { name: "Amérique du Nord", fee: 35000 },
      { name: "Reste du monde", fee: 40000 }
    ]
  }
};
