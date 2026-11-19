# Journal de bord

## 5 octobre – 8 novembr

- Conception graphique : maquettes Figma du portfolio (desktop et mobile), plusieurs allers-retours
  de retouches sur la direction artistique.
- Création des assets : icônes et illustrations façon pixel art utilisées dans le header, les
  pop-ups et l'inventaire d'objets de la page À propos.
- Préparation et mise en ligne : configuration du VPS, DNS chez Infomaniak
  (`portfolio.alice-frelin.fr` et `pb.alice-frelin.fr`), installation de PocketBase et du site Astro
  en mode serveur, reverse proxy Apache + HTTPS, mise en place du déploiement automatique.
- Ce qui a coincé : blocage sur la maquette Figma — plusieurs itérations nécessaires avant de
  converger vers une direction graphique satisfaisante.

## Semaine du 9 au 15 novembre

- Première version du site poussée sur GitHub : structure Astro, connexion à PocketBase.
- Page Projets : carrousel, filtres et cards branchés sur la base de données.
- Styles et composants partagés (bannière, bloc contact, bouton pilule).
- Page projet dynamique (fiche détail par projet).
- Page d'accueil : stickers, derniers projets, compétences.
- Pages Contact, Mentions légales et Politique de confidentialité.
- Ce qui a coincé : un problème sur le VPS dépendant du professeur a empêché de coder en tout début
  de semaine — explique en partie pourquoi l'essentiel du travail de la semaine est concentré sur la
  fin (je suis globalement plus productive en fin de semaine).
- Décisions : Astro configuré en mode serveur (SSR, adaptateur `@astrojs/node`) plutôt qu'en
  génération statique, pour que les pages interrogent PocketBase à chaque visite. Nécessaire pour
  que la liste des projets (et plus tard les messages de contact) restent à jour sans avoir à
  relancer un build à chaque ajout — l'intérêt de brancher un vrai backend (PocketBase) n'aurait
  aucun sens avec un site figé au moment du build : il faudrait redéployer pour chaque nouveau
  projet ajouté depuis l'admin PocketBase.

## Semaine du 16 au 18 novembre (en cours)

- Page Contact : nouvelle direction artistique "girly années 2000" reprise depuis Figma, formulaire
  fonctionnel, interactions (cœurs/étoiles animés avec GSAP au survol et au clic).
- Page À propos : animation des pop-ups objets/compétences, mise en page des colonnes.
- Carrousel "Ce que je fais" : plusieurs itérations d'ajustement (écartement, taille, symétrie) avant
  de trouver le bon réglage.
- Header : menu hamburger mobile, icônes de navigation.
- Page Projets : galerie façon Pinterest avec visionneuse plein écran, au lieu d'une image géante.
- Page 404 personnalisée.
- Refonte des versions mobiles (menu plein écran, landing, Contact, À propos) à partir des maquettes
  mobiles dédiées, plutôt qu'une simple adaptation du desktop.
- Formulaire de contact : remplacement du lien `mailto:` par un envoi direct dans PocketBase
  (nouvelle collection `messages_contact`), avec protection anti-spam (honeypot).
- Passage qualité : référencement (sitemap, robots.txt, Open Graph, meta descriptions par page),
  accessibilité (audit alt/aria-label, lien d'évitement, contraste), performance (Lighthouse,
  correction du LCP mobile, chargement des polices), rédaction de `QUALITE.md`.
- Ce qui a coincé : plusieurs retours en arrière sur le carrousel "Ce que je fais" avant de trouver
  un réglage satisfaisant (visible dans l'historique de commits : écartement, puis resserrement,
  puis retour à la valeur précédente).
- Décisions : toutes les pop-ups du site (objets, compétences, menu mobile, visionneuse galerie)
  utilisent l'élément HTML natif `<dialog>` plutôt qu'une librairie de modales — accessibilité
  native (focus, touche Échap) et pas de dépendance supplémentaire. Toutes les versions mobiles des
  pages (Contact, À propos, landing) sont reconstruites spécifiquement à partir des maquettes
  mobiles plutôt que simplement réadaptées depuis la version desktop, pour coller aux usages propres
  au mobile (ex. carrousel d'objets, boutons repositionnés sur les côtés).

---
