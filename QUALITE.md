# Qualité web

Grille de contrôle qualité du portfolio, sur les quatre domaines demandés : accessibilité, sobriété et
performance, référencement, conformité juridique. Pour chaque critère : ce qui a été vérifié, comment, et
ce qui a été corrigé.

Document vivant, rempli au fur et à mesure (voir les sections encore à compléter plus bas).

## 1. Accessibilité

### Textes alternatifs (`alt`) et labels (`aria-label`)
- **Vérifié** : chaque image (`<Image>`/`<img>`) et chaque bouton icône-only du site (menu, croix de
  fermeture, flèches de carrousel, objets/compétences de l'inventaire...).
- **Comment** : relecture manuelle de tous les composants et pages (recherche systématique des balises
  `<Image`/`<img` et `<button`).
- **Corrigé** : l'image de la visionneuse plein écran de la galerie projet gardait un `alt=""` permanent
  au lieu d'être mise à jour à chaque photo affichée — ajout d'un `alt` dynamique du type
  "Photo 2 sur 5" (`src/pages/projets/[id].astro`).

### Contraste des couleurs (WCAG AA)
- **Vérifié** : les principales combinaisons texte/fond du design system (rose vif, rose pastel, bleu
  vif, marron, noir, blanc).
- **Comment** : calcul du ratio de contraste selon la formule WCAG (relative luminance), la même utilisée
  par l'outil WebAIM Contrast Checker.
- **Résultat** :
  | Combinaison | Ratio | Norme AA | Usage |
  |---|---|---|---|
  | Rose vif sur blanc | 2.76:1 | 3:1 (texte large) | Titres de section ("Qui suis-je ?"...) |
  | Blanc sur bleu vif | 1.85:1 | 3:1 (texte large) | Grand titre des bannières |
  | Marron sur rose pastel/blanc | 3.63:1 | 4.5:1 (texte normal) | Labels du formulaire de contact |
  | Noir sur rose pastel, blanc, bleu vif | 11.4 à 21:1 | — | Boutons de nav, texte courant |
- **Corrigé** : **non** — choix assumé. Les trois cas en dessous du seuil concernent exclusivement du
  texte décoratif de grand titre (identité visuelle du site), jamais du contenu essentiel à la
  compréhension ; conservés tels quels pour préserver la direction artistique.

### Navigation au clavier
- **Vérifié** : ordre de tabulation, visibilité du focus, présence d'un moyen d'éviter la navigation
  répétée en haut de chaque page.
- **Comment** : navigation manuelle au clavier (Tab/Entrée/Échap) sur les pages principales et les
  pop-ups (objets, compétences, menu mobile, visionneuse galerie).
- **Corrigé** : il n'existait aucun lien d'évitement ("aller au contenu") — un utilisateur clavier devait
  retraverser les 4 liens de navigation à chaque page avant d'atteindre le contenu (critère WCAG 2.4.1
  "Bypass Blocks"). Ajout d'un lien "Aller au contenu", premier élément focusable de chaque page,
  visible uniquement au focus (`src/layouts/Layout.astro`).
- Le focus visible (contour noir) est géré globalement via `:focus-visible` (`src/styles/global.css`) et
  vérifié fonctionnel sur les liens, boutons et pop-ups.

### Pop-ups et modales
- **Vérifié** : fermeture au clavier, piégeage du focus à l'intérieur de la pop-up ouverte.
- **Comment** : toutes les pop-ups du site (objets, compétences, menu mobile, visionneuse galerie)
  utilisent l'élément natif `<dialog>` avec `showModal()`, qui gère nativement la fermeture à la touche
  Échap et le piégeage du focus — comportement du navigateur, testé manuellement.
- **Corrigé** : rien à corriger, comportement natif déjà correct.

### Préférence de réduction des animations
- **Vérifié** : respect de `prefers-reduced-motion`.
- **Comment** : la média query `@media (prefers-reduced-motion: reduce)` désactive le flou et le rebond
  des pop-ups et le glissement du menu mobile (`src/styles/global.css`), testée en activant l'option dans
  les réglages système.
- **Corrigé** : rien à corriger, déjà en place.

### Formulaire de contact
- **Vérifié** : chaque champ a un `<label for>` associé, les erreurs de validation sont signalées
  (`reportValidity()` natif), un message de statut (`role="status"`) annonce le résultat de l'envoi.
- **Comment** : relecture du code + test manuel (soumission avec champs vides/invalides).
- **Corrigé** : rien à corriger, déjà en place.

### Structure sémantique
- **Vérifié** : repères de page (`<header>`, `<nav aria-label>`, `<main>`, `<footer>`), langue déclarée
  (`lang="fr"`).
- **Comment** : relecture du code.
- **Corrigé** : rien à corriger, déjà en place.

---

## 2. Sobriété et performance — *à compléter*

Pistes identifiées, pas encore vérifiées en détail :
- Poids des images (optimisation automatique via `astro:assets`, formats WebP, `loading="lazy"` déjà
  utilisé par endroits — à vérifier systématiquement).
- Police web : `Manrope` et `Pixelify Sans` chargées via Google Fonts, `Peix` en police locale
  (`.woff2`) — stratégie de chargement (`font-display`) à vérifier.
- Mesure concrète : score Lighthouse (Performance) à faire tourner sur les pages principales.
- Taille du bundle JS envoyé au client (Astro n'envoie du JS que pour les parties interactives —
  à confirmer avec le rapport de build).

## 3. Référencement

### Méta-descriptions
- **Vérifié** : chaque page avait-elle une description unique ?
- **Comment** : relecture des composants `<Layout>`.
- **Corrigé** : toutes les pages utilisaient la même description générique par défaut. Chaque page a
  maintenant sa propre description (accueil, projets, à propos, contact, mentions légales, politique de
  confidentialité, page 404).

### Sitemap et robots.txt
- **Vérifié** : présence d'un plan du site et d'instructions pour les robots d'indexation.
- **Comment** : inspection du dossier `public/` et de la config Astro — aucun des deux n'existait.
- **Corrigé** : ajout de `@astrojs/sitemap` (génère `sitemap-index.xml` au build) et d'un
  `public/robots.txt` qui pointe vers ce sitemap.
- **Limite connue** : les fiches projet individuelles (`/projets/[id]`) ne sont pas listées dans le
  sitemap car leur contenu vient de PocketBase et n'est pas pré-rendu au build — elles restent
  indexables via les liens internes depuis `/projets`.

### Partage sur les réseaux (Open Graph / Twitter Card)
- **Vérifié** : aperçu affiché en partageant un lien du site sur LinkedIn/Discord/etc.
- **Comment** : inspection des balises `<meta>` du `<head>`.
- **Corrigé** : aucune balise Open Graph ni Twitter Card n'existait (aucun aperçu ne s'affichait).
  Ajout des balises `og:*` et `twitter:*`, d'une URL canonique (`<link rel="canonical">`), et d'un
  visuel de partage dédié (`public/og-image.jpg`, 1200×630).

### URL canonique
- **Vérifié** : chaque page déclare-t-elle son URL canonique ?
- **Comment** : inspection du `<head>`.
- **Corrigé** : ajout de `<link rel="canonical">` calculée dynamiquement dans `Layout.astro`.

## 4. Conformité juridique — *à compléter*

Déjà en place :
- Pages "Mentions légales" et "Politique de confidentialité" existantes (`src/pages/mentions-legales.astro`,
  `src/pages/politique-de-confidentialite.astro`), liées depuis le footer de chaque page.

À vérifier/compléter avec toi :
- Contenu exact des mentions légales : identité de l'éditrice, hébergeur (nom, adresse) — qui héberge
  `portfolio.alice-frelin.fr` et le VPS PocketBase ?
- Conformité RGPD du formulaire de contact : les messages envoyés via PocketBase sont des données
  personnelles (nom, e-mail, message) — durée de conservation prévue, information de la personne qui
  contacte (actuellement aucune mention sur la page Contact), droit d'accès/suppression.
- Cookies/traceurs : le site utilise-t-il un outil d'analyse d'audience (Google Analytics, Plausible...)
  ? Si oui, bandeau de consentement à prévoir. Si non, à préciser dans la politique de confidentialité.
  Il faut aussi que la politique de confidentialité en place soit mise à jour avec les éléments décidés dans les deux points ci-dessus.
