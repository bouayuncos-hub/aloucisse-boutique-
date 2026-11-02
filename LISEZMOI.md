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

## Fonctionnement au quotidien

**Statuts** : Reçue → Confirmée → En préparation → Prête au retrait / En livraison → Retirée / Livrée. Le client suit chaque étape sur `#/suivi/CODE` ou en scannant son QR code.

**Orange Money / Moov Money (v1)** : le client fait un paiement marchand vers votre numéro et saisit la référence → la commande apparaît en « Paiement à vérifier » dans l'admin → vous contrôlez sur votre téléphone marchand → « Payé ».

**Click & Collect** : le client présente son QR code ou son code `AC-XXXXXXXX` au comptoir ; recherchez-le dans Commandes.

**Annulation** : bouton « Annuler et remettre en stock » (les commandes ne sont jamais supprimées ; chaque action admin est tracée dans le Journal d'audit).

**Mise à jour du site** : après avoir modifié `index.html`, changez `VERSION` dans `sw.js` (ex. `ac-v2`) pour que les téléphones déjà installés récupèrent la nouvelle version.

## Limites connues et évolutions (phase 2)
- **Mobile Money automatique** : brancher un agrégateur de paiement couvrant le Mali via une fonction serverless Vercel + webhook, pour passer les commandes en « Payé » sans vérification manuelle.
- **Prix** : vérifiés côté client au moment de la commande ; l'admin doit valider chaque commande (étape « Confirmée ») — une fonction serveur permettrait de recalculer les totaux de façon infalsifiable.
- **Images** : stockées dans Firestore (gratuit). Au-delà de ~200 produits, passer à un stockage d'images dédié.
- **Quotas gratuits Firestore** : environ 50 000 lectures et 20 000 écritures par jour, largement suffisant pour démarrer.
- Notifications SMS/e-mail, programme de fidélité, avis clients, application Android (TWA) à partir de la PWA.
