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

## 2. Sobriété et performance

### Méthode
- **Outil** : Lighthouse (CLI, `npx lighthouse`), lancé sur un **build de production** (`astro build` +
  serveur Node réel, pas le serveur de dev qui n'est pas représentatif) de la page d'accueil, la plus
  lourde du site (collage de 17 stickers desktop + galerie de projets).
- **Limite de la mesure** : exécuté en local sur la machine de développement (pas un environnement de
  mesure dédié), les scores varient donc d'une exécution à l'autre selon la charge de la machine (62, 60
  puis 71 sur trois passages). Les chiffres ci-dessous sont indicatifs ; **à refaire sur le site déployé
  en production** pour un score fiable à citer en soutenance.

### Résultat avant correctifs
Performance **62/100** (Accessibilité 95, Bonnes pratiques 96, SEO 100). Le plus mauvais indicateur :
LCP (Largest Contentful Paint) à **6.3 s**, score 0.1/1 — très en dessous de la cible (< 2.5 s).

### Ce qui a été vérifié, et corrigé

**1. L'image la plus grande visible à l'écran (LCP) était chargée en différé.**
- **Vérifié** : l'élément LCP identifié par Lighthouse était un sticker du hero mobile (`ds.png`),
  chargé avec `loading="lazy"` alors qu'il est visible dès l'arrivée sur la page.
- **Comment** : audit `lcp-discovery-insight` de Lighthouse, qui signale `loading=lazy` sur l'élément
  LCP comme anti-pattern.
- **Corrigé** : passage en `loading="eager"` pour tous les stickers du hero mobile
  (`src/pages/index.astro`), qui sont tous au-dessus de la ligne de flottaison sur mobile. Vérifié après
  correction : Lighthouse confirme `eagerlyLoaded: true` sur cet élément.

**2. Polices Google Fonts chargées en `@import` CSS (bloquant).**
- **Vérifié** : la police était importée via `@import url(...)` en première ligne de `global.css`.
- **Comment** : audit `render-blocking-insight` de Lighthouse, qui chiffre l'impact à ~809 ms — un
  `@import` CSS ajoute un aller-retour réseau supplémentaire avant que le navigateur découvre la police,
  car il doit d'abord télécharger et parser le CSS qui le contient.
- **Corrigé** : remplacé par `<link rel="preconnect">` (vers `fonts.googleapis.com` et
  `fonts.gstatic.com`) + `<link rel="stylesheet">` directement dans le `<head>`
  (`src/layouts/Layout.astro`), découverts par le navigateur dès le HTML initial, en parallèle du reste.

**3. Miniatures de projets (PocketBase) servies en pleine résolution.**
- **Vérifié** : les miniatures de projets, affichées à ~260–640 px de large, étaient envoyées à leur
  résolution d'origine (jusqu'à 2309×2048 px) — jusqu'à **1 069 Kio** gaspillés rien que sur la page
  d'accueil.
- **Comment** : audit `image-delivery-insight` de Lighthouse (taille réelle vs. taille affichée).
- **Corrigé partiellement** : le code demande maintenant une taille réduite au serveur PocketBase via le
  paramètre `thumb` déjà prévu dans `urlFichier()` (`700x0` à `1600x0` selon le contexte, dans
  `CardProjetL.astro`, `CardProjetM.astro`, `projets/[id].astro`).
- **Vérification du correctif** : test direct en comparant les en-têtes HTTP (`curl -I`) de l'image avec
  et sans paramètre `thumb` → **taille identique dans les deux cas**. La génération de miniature à la
  volée n'est pas activée côté serveur PocketBase pour ce champ.
- **Reste à faire (action côté PocketBase, pas dans le code)** : dans l'admin PocketBase, sur les champs
  fichier `Miniature` et `Galerie` de la collection `Projets`, ajouter les tailles de miniature utilisées
  par le code (`700x0`, `800x0`, `1000x0`, `1600x0`) dans l'option "Thumb sizes" du champ. Une fois fait,
  le gain sera immédiat sans nouveau déploiement (c'est PocketBase qui sert les miniatures).

### Identifié, non corrigé (choix de budget temps)
- **"Style & Layout"** domine le temps passé sur le thread principal (3.6 s sur un chargement), bien
  plus que le JavaScript (39 ms) — cohérent avec une feuille de style compilée Tailwind/DaisyUI assez
  volumineuse (~100 Kio, un seul fichier CSS pour tout le site) à faire correspondre à chaque élément de
  la page. Piste identifiée (réduire les variantes DaisyUI generées, non utilisées) mais non traitée :
  demanderait un audit plus poussé du CSS généré, hors budget de cette session.

### Résultat après correctifs
Performance entre **60 et 71/100** selon l'exécution (variance machine, voir "Méthode"), LCP amélioré de
6.3 s à **3.7 s** sur la meilleure exécution. Accessibilité, Bonnes pratiques et SEO inchangés (95, 96,
100).

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

## 4. Conformité juridique

### Mentions légales et politique de confidentialité
- **Vérifié** : présence et contenu des pages "Mentions légales" et "Politique de confidentialité"
  (identité de l'éditrice, hébergeur, données collectées, finalité, base légale, durée de conservation,
  destinataires, cookies, droits RGPD, sécurité) — liées depuis le footer de chaque page.
- **Comment** : relecture complète des deux pages (`src/pages/mentions-legales.astro`,
  `src/pages/politique-de-confidentialite.astro`).
- **Corrigé** : les mentions légales ne citaient que l'hébergeur du site (Infomaniak) mais pas celui qui
  héberge réellement les données du formulaire de contact (la base PocketBase, sur un serveur mis à
  disposition par l'IUT de Montbéliard) — ajout de cette précision dans la section "Hébergement".

### Information de la personne qui contacte
- **Vérifié** : la page Contact informe-t-elle sur le traitement des données au moment de la saisie ?
- **Décision** : pas d'ajout sur la page Contact elle-même — l'information complète (finalité, durée de
  conservation, droits) existe déjà et reste accessible via le lien "Politique de confidentialité" du
  footer, présent sur toutes les pages y compris Contact. Choix assumé pour ne pas alourdir le
  formulaire.

### Cookies et outils de suivi
- **Vérifié** : la politique de confidentialité affirme qu'aucun cookie non essentiel ni outil de mesure
  d'audience n'est utilisé — cette affirmation est-elle exacte ?
- **Comment** : recherche dans tout le code source de scripts de suivi connus (Google Analytics, Google
  Tag Manager, Plausible, Matomo, Hotjar, Umami...).
- **Résultat** : aucun script de ce type présent dans le code. L'affirmation de la politique de
  confidentialité est confirmée exacte, rien à corriger.
