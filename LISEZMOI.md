# Alou Cissé — Boutique en ligne (Électronique & High-Tech)

Boutique PWA HTML/CSS/JS + Firebase, déployée gratuitement sur Vercel.
**Aucune ligne de commande nécessaire** : tout se fait dans le navigateur.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | La boutique (accueil, catalogue, fiche produit, panier, commande, confirmation + QR, suivi, page boutique) |
| `admin.html` | Administration protégée par mot de passe : tableau de bord, commandes, produits & stocks (publication), contenu du site, réglages, mot de passe, journal d'audit |
| `config.js` | **Le seul fichier à modifier** : Firebase, PayPal, téléphone, WhatsApp, numéros Orange/Moov Money, horaires, position GPS |
| `demo-data.js` | Catalogue de démonstration (14 produits) |
| `sw.js`, `manifest.json`, `icon-*.png` | Application installable + catalogue consultable hors-ligne |
| `firestore.rules` | Règles de sécurité à coller dans Firebase |
| `storage.rules` | Règles pour les vidéos (Firebase Storage) |
| `vercel.json` | En-têtes de cache et de sécurité |

## Étape 0 — Tester tout de suite (mode démo)
Tant que `config.js` n'a pas de `projectId` Firebase, le site fonctionne **en mode démo** : produits, stock, commandes et admin sont stockés dans le navigateur. Déployez-le tel quel (étapes 1-2) pour le voir en ligne, puis ouvrez `/admin.html` dans un autre onglet : les changements de stock apparaissent en direct.

## Étape 1 — GitHub
1. Sur github.com (organisation ou compte personnel) : **New repository** → nom `alou-cisse` → Public ou Privé → **Create**.
2. Cliquez **uploading an existing file**, glissez-déposez **tous les fichiers du dossier** (pas le dossier lui-même), puis **Commit changes**.

## Étape 2 — Vercel (gratuit)
1. vercel.com → **Add New… → Project** → importez le dépôt `alou-cisse`.
2. Framework Preset : **Other**. Aucune commande de build. **Deploy**.
3. Vous obtenez une adresse `https://alou-cisse.vercel.app` (un domaine personnalisé comme `alou-cisse.com` s'ajoute ensuite dans *Settings → Domains*).

À chaque modification d'un fichier sur GitHub, Vercel redéploie automatiquement.

## Étape 3 — Firebase (gratuit, plan Spark)
1. console.firebase.google.com → **Ajouter un projet** (ex. `alou-cisse`). Google Analytics : facultatif.
2. **Firestore Database → Créer une base de données** → mode production → région `eur3 (europe-west)` (la plus proche du Mali).
3. Onglet **Règles** : remplacez tout par le contenu de `firestore.rules` → **Publier**.
4. **Authentication → Commencer → E-mail/Mot de passe → Activer**.
5. **Authentication → Utilisateurs → Ajouter un utilisateur** : votre e-mail d'admin + mot de passe solide. Copiez l'**UID** affiché.
6. **Firestore → Démarrer une collection** `admins` → ID du document = **l'UID copié** → ajoutez un champ `email` (texte) → Enregistrer. *(Répétez pour chaque gérant.)*
7. **Authentication → Paramètres → Domaines autorisés** : ajoutez `alou-cisse.vercel.app` (et votre domaine perso).
8. **Paramètres du projet (⚙️) → Vos applications → `</>` Web** → enregistrez l'application → copiez l'objet `firebaseConfig`.

## Étape 4 — Remplir `config.js`
Sur GitHub, ouvrez `config.js` → icône crayon ✏️ :
- collez les valeurs Firebase dans `firebase: { … }` ;
- renseignez `phone`, `whatsapp` (ex. `22376123456`, sans + ni espaces), `email`, `orangeMoney`, `moovMoney` ;
- ajustez `lat` / `lng` : sur Google Maps, clic droit sur la boutique → les coordonnées s'affichent, cliquez pour les copier ;
- ajustez les horaires `hours`.

**Commit changes** → Vercel redéploie en ~30 s. Le bandeau « Mode démonstration » disparaît.

## Étape 4 bis — Le compte administrateur et le mot de passe

> **Version 7 — plus simple :** inutile de créer le compte à la main. Une fois la base Firestore créée, `firestore.rules` publié et « E-mail/Mot de passe » activé, ouvrez `/admin.html` et tapez **`alou2026`** : le compte administrateur (`adminEmail` de `config.js`) est créé et autorisé automatiquement à la première connexion. Faites-le **juste après la mise en ligne**.
>
> **Changer son mot de passe personnel** : bouton **🔑 Mon mot de passe** en haut de l'administration.
>
> **Mot de passe oublié → revenir à `alou2026`** : lien « Mot de passe oublié ? » sur l'écran de connexion. En résumé : dans la console Firebase, supprimez l'utilisateur dans Authentication, puis le document `settings/owner` dans Firestore. Reconnectez-vous ensuite avec `alou2026`. Produits et commandes sont conservés.
>
> **Contrôle du site** : Contenu du site → « Suspendre les commandes en ligne » (inventaire, congés…). Le catalogue reste visible et un message s'affiche.

- **Mode démo** : ouvrez `/admin.html`, mot de passe **`alou2026`**. Seule son empreinte chiffrée figure dans `config.js`.
- **Production (Firebase)** : à l'étape 3.5, créez l'utilisateur avec l'e-mail indiqué dans `adminEmail` de `config.js` et le mot de passe **`alou2026`**. L'écran de connexion ne demande que le mot de passe (lien « Autre compte administrateur » pour un gérant).
- ⚠️ `alou2026` est court et a été partagé : **changez-le dès la mise en ligne** dans **Réglages → Sécurité** (8 caractères minimum, mélangez lettres, chiffres et symboles).

**Ce que seul l'administrateur peut faire** (garanti par `firestore.rules`, pas seulement par l'interface) :
- publier, modifier, dépublier ou supprimer un produit (case « Publié » dans la fiche produit) ;
- modifier tout le contenu du site dans l'onglet **Contenu du site** : bandeau d'annonce, nom, slogan, textes de l'accueil, les 4 avantages, adresse, téléphone, WhatsApp, e-mail, numéros Orange/Moov Money, position sur le plan, durée de réservation, horaires, pied de page ;
- modifier les tarifs de livraison, voir et traiter les commandes, lire le journal d'audit.

Les visiteurs peuvent uniquement passer commande, ce qui diminue le stock et ne peut pas l'augmenter.

## Étape 5 — Charger le catalogue
Ouvrez `https://…/admin.html`, connectez-vous. Le tableau de bord propose **« Importer les produits de démonstration »** : un clic, puis modifiez prix, stocks et photos (onglet Produits), ou supprimez-les et créez les vôtres. Les photos sont compressées automatiquement (≈ 15 Ko la miniature).

Dans **Réglages** : quartiers et frais de livraison, points relais, zones internationales, seuil de livraison offerte, taux USD de repli.

## Étape 6 — PayPal & cartes Visa/Mastercard
1. developer.paypal.com → connectez-vous avec un **compte PayPal Business** → **Apps & Credentials**.
2. Commencez en **Sandbox** : créez une app, copiez le **Client ID** dans `paypalClientId` de `config.js`, testez avec les comptes de test sandbox.
3. Pour encaisser réellement : basculez sur **Live**, créez une app, remplacez le Client ID.

Les clients paient par carte **sans compte PayPal** (bouton « Carte »), et la carte est saisie chez PayPal : aucune donnée bancaire ne transite par votre site. Le montant est converti en **euros** (PayPal n'accepte pas le FCFA). Vérifiez l'éligibilité de votre pays de compte PayPal Business pour recevoir des paiements.

⚠️ Après un paiement PayPal, le statut « Payé » est enregistré par le navigateur du client : **contrôlez toujours la transaction dans votre tableau de bord PayPal** (numéro affiché dans le détail de la commande) avant d'expédier.

## Étape 7 — Installer l'application
Sur Android (Chrome) : menu ⋮ → **Installer l'application**. Sur iPhone (Safari) : Partager → **Sur l'écran d'accueil**. Le catalogue reste consultable sans connexion ; la validation d'une commande nécessite Internet.

## Nouveautés v4 — ventes, promotions, Mobile Money

**Contacts** : +223 77 91 91 44 (principal, WhatsApp, Orange Money) et +223 66 50 14 44 (Moov Money). Ils sont modifiables dans **Contenu du site**. Vérifiez que chaque numéro de paiement correspond bien au bon opérateur, ainsi que le code du menu Orange Money (`#144#`). Le code du menu Moov Money reste à renseigner.

**Côté clients**
- **Achat en ligne par Orange Money / Moov Money** : à la commande, le client voit le montant exact, un bouton qui compose le code du menu, le numéro et le montant à copier. Il saisit ensuite la référence reçue par SMS, tout de suite ou plus tard depuis la page de suivi. La commande passe alors en « Paiement à vérifier ».
- **Promotions** : prix barré, badge −X %, compte à rebours, section « Promotions » sur l'accueil.
- **Codes promo** à saisir au paiement (démo : `BIENVENUE10`, −10 % dès 50 000 FCFA).
- **Favoris ♥**, **récemment consultés**, **partage** d'un produit (WhatsApp…), **commande via WhatsApp** depuis le panier.
- **Reçu imprimable / PDF**, bouton **WhatsApp flottant**, bouton **Installer l'application** (Android).

**Côté administrateur**
- **Produits** : publier ou dépublier, et modifier le **prix** et le **stock** directement dans la liste (validez avec Entrée). La fiche produit propose un prix promo et une date de fin.
- **Promotions & prix** : lancer une vente flash (−X % sur une catégorie ou tout le catalogue, avec date de fin), arrêter une promo, créer ou désactiver des codes promo (en % ou en montant, avec achat minimum, expiration et nombre d'utilisations), changer les prix en masse (+/− %).
- **Vente comptoir** : enregistrer une vente faite à la boutique en espèces, Orange Money (avec référence), Moov Money ou carte. Le stock est déduit et la vente est comptée dans le chiffre d'affaires.
- **Tableau de bord** : bouton **✓ Payé** à côté de chaque paiement Orange Money / Moov à vérifier. Contrôlez d'abord le SMS reçu sur le téléphone marchand.

⚠️ Après la mise à jour, **republiez `firestore.rules`** dans Firebase : les codes promo, l'envoi de la référence de paiement et les ventes comptoir en dépendent.

## Nouveautés v8 — photos, vidéos, suppression rapide

**Photos (sans URL)** : dans la fiche produit, utilisez **📷 Prendre une photo** (appareil photo du téléphone) ou **🖼️ Choisir dans la galerie** (plusieurs à la fois). Vous pouvez mettre jusqu'à 6 photos. Elles sont compressées automatiquement et ne demandent aucun réglage Firebase en plus. Les boutons **✕** suppriment une photo, et **Mettre en principale** choisit celle qui s'affiche dans le catalogue.

**Vidéos** : **🎥 Filmer une vidéo** ou **🎞️ Choisir une vidéo**, jusqu'à 3 par produit, de 60 Mo maximum chacune. Elles sont envoyées en cliquant sur Enregistrer, avec une barre de progression. **✕ Supprimer** retire une vidéo. Côté client, la vidéo ne se charge que s'il appuie sur « ▶ Voir la vidéo », pour économiser ses données.
Les vidéos utilisent **Firebase Storage** :
1. Console Firebase → **Storage → Commencer**. Pour les projets récents, Storage demande le **forfait Blaze**, qui exige une carte bancaire mais garde un quota gratuit.
2. Onglet **Règles** : collez le contenu de `storage.rules` → **Publier**. Acceptez l'autorisation pour que Storage puisse lire Firestore.

Sans Storage, les photos fonctionnent quand même ; seul l'envoi de vidéos affiche un message.

**Supprimer les produits invendus en 3 gestes** : Produits → filtre **« Invendus depuis 30/60/90 jours »** → cochez les produits, ou **Tout sélectionner** → **🗑 Supprimer la sélection**. Une seule confirmation suffit, et les photos et vidéos sont supprimées avec les produits. Vous pouvez aussi utiliser **Retirer de la vente** pour les masquer sans les supprimer. Chaque produit affiche son nombre de ventes et la date de sa dernière vente.

## Fonctionnement au quotidien

**Statuts** : Reçue → Confirmée → En préparation → Prête au retrait / En livraison → Retirée / Livrée. Le client suit chaque étape sur `#/suivi/CODE` ou en scannant son QR code.

**Orange Money / Moov Money (v1)** : le client fait un paiement marchand vers votre numéro et saisit la référence → la commande apparaît en « Paiement à vérifier » dans l'admin → vous contrôlez sur votre téléphone marchand → « Payé ».

**Click & Collect** : le client présente son QR code ou son code `AC-XXXXXXXX` au comptoir ; recherchez-le dans Commandes.

**Annulation** : bouton « Annuler et remettre en stock » (les commandes ne sont jamais supprimées ; chaque action admin est tracée dans le Journal d'audit).

**Mise à jour du site** : après avoir modifié `index.html`, changez `VERSION` dans `sw.js` (ex. `ac-v2`) pour que les téléphones déjà installés récupèrent la nouvelle version.

## Limites connues et évolutions (phase 2)
- **Mobile Money 100 % automatique** (confirmation sans vérification manuelle) : nécessite un contrat marchand avec Orange Money / Moov ou un agrégateur, puis brancher un agrégateur de paiement couvrant le Mali via une fonction serverless Vercel + webhook, pour passer les commandes en « Payé » sans vérification manuelle.
- **Prix** : vérifiés côté client au moment de la commande ; l'admin doit valider chaque commande (étape « Confirmée ») — une fonction serveur permettrait de recalculer les totaux de façon infalsifiable.
- **Images** : stockées dans Firestore (gratuit). Au-delà de ~200 produits, passer à un stockage d'images dédié.
- **Quotas gratuits Firestore** : environ 50 000 lectures et 20 000 écritures par jour, largement suffisant pour démarrer.
- Notifications SMS/e-mail, programme de fidélité, avis clients, application Android (TWA) à partir de la PWA.
