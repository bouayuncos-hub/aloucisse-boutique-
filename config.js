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

  store: {
    name: "Alou Cissé",
    tagline: "Électronique & High-Tech",
    address: "Sébénikoro, Bamako, Mali",
    phone: "+223 00 00 00 00",       // affiché + bouton « Appeler »
    whatsapp: "22300000000",         // format international SANS + ni espaces
    email: "contact@alou-cisse.com",
    lat: 12.6390, lng: -8.0750,      // ⚠️ à ajuster sur la position exacte de la boutique
    orangeMoney: "+223 00 00 00 00", // numéro marchand Orange Money
    moovMoney: "+223 00 00 00 00",   // numéro marchand Moov Money
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
