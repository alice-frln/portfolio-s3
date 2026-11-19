# Déclaration d'usage de l'IA

Outil utilisé sur l'ensemble du projet : **Claude Code** (Anthropic), un agent IA en ligne de
commande avec accès direct au code du dépôt, au terminal, à un navigateur de test et (via un
connecteur Figma) à mes maquettes. Utilisé en continu du début du développement jusqu'à la fin,
en binôme : je donne les instructions, les retours de design et les décisions de fond, l'IA écrit
le code, je le relis, je le teste dans le navigateur et je corrige ou je fais recommencer ce qui
ne va pas.

Aucun outil de génération d'images IA n'a été utilisé pour les visuels du site : toutes les images
viennent soit de mes propres assets (photos, illustrations, icônes pixel que j'ai faites), soit de
mes maquettes Figma (récupérées via le connecteur Figma intégré à Claude Code). Le seul visuel
composé avec l'aide de l'IA est `public/og-image.jpg` (image de partage réseaux sociaux) : assemblé
en HTML/CSS à partir de mes propres assets et polices existants, puis capturé en image — pas une
image générée par un modèle génératif.

Précision importante pour la soutenance : je n'ai pas laissé l'IA en autonomie sur des choix de
direction artistique ou de contenu. Les maquettes Figma sont les miennes ; l'IA a servi à les lire
(mesures, couleurs, structure) et à les traduire en code, et je valide/corrige le résultat visuel à
chaque étape par des captures d'écran avant de considérer une fonctionnalité terminée.

## Par étape du projet

### Mise en place et déploiement (mi-novembre)
- **Pour quoi faire** : passer le projet Astro en mode serveur (SSR), configurer la base PocketBase
  (schéma, règles d'API), préparer le déploiement sur le VPS.
- **Modifié/rejeté** : la configuration du reverse proxy Apache et des services systemd sur le VPS a
  été écrite dans un premier temps dans un guide de déploiement produit avec l'IA, que j'ai ensuite
  exécutée et vérifiée moi-même étape par étape sur le serveur.

### Intégration des pages (Accueil, Projets, À propos, Contact)
- **Pour quoi faire** : traduire mes maquettes Figma en pages Astro (structure HTML, Tailwind CSS,
  composants), brancher les données dynamiques (projets, filtres, galerie) sur PocketBase.
- **Modifié/rejeté** :
  - Le carrousel "Ce que je fais" a demandé plusieurs allers-retours (écartement des cartes,
    symétrie, taille) avant que je valide le rendu — plusieurs propositions de l'IA rejetées ou
    ajustées avant la version finale.
  - Pour les boutons de la version mobile de la page À propos (Objets/Compétences/CV), j'ai rejeté
    la première proposition (images composites recréées depuis Figma) et demandé de reprendre
    directement les boutons déjà utilisés sur desktop, pour rester cohérente visuellement.
  - Pour les croix de fermeture des nouvelles pop-ups mobiles, j'ai demandé de réutiliser mon asset
    existant (`bouton_croix_pixel.svg`) plutôt que l'icône proposée par l'IA.
  - J'ai demandé d'inverser l'ordre des boutons "envoyer"/"effacer" du formulaire de contact, et
    d'agrandir le bouton de fermeture du menu mobile — ajustements directs après premier rendu.

### Formulaire de contact : passage de `mailto:` à PocketBase
- **Pour quoi faire** : remplacer le lien `mailto:` (qui ouvrait le client mail de la visiteuse) par
  un envoi direct du message dans une base PocketBase.
- **Modifié/rejeté** : j'ai fait corriger un bug introduit par l'IA (le message de succès du
  formulaire était effacé immédiatement après l'envoi à cause de l'ordre des instructions) après
  l'avoir repéré en testant moi-même le formulaire.
- J'ai refusé de donner mes identifiants PocketBase à l'IA pour qu'elle configure elle-même la
  collection et le serveur SMTP : je préfère suivre les instructions pas à pas et exécuter les
  étapes sensibles moi-même (l'IA a d'ailleurs refusé d'elle-même d'utiliser un mot de passe que je
  lui avais collé par erreur dans la conversation).

### Mobile (refonte des pages)
- **Pour quoi faire** : adapter chaque page à mes maquettes mobiles dédiées (menu plein écran, hero
  de la landing, Contact, À propos), plutôt qu'une simple adaptation automatique du desktop.
- **Modifié/rejeté** : la première version du hero mobile de la landing était trop vide par rapport
  à la maquette (4 stickers au lieu d'une dizaine) — j'ai demandé une version plus proche de la
  maquette, avec davantage de stickers resserrés autour du titre.

### Qualité du site (accessibilité, performance, référencement)
- **Pour quoi faire** : vérifier et corriger l'accessibilité (textes alternatifs, contraste,
  navigation clavier), la performance (audit Lighthouse) et le référencement (sitemap, meta
  descriptions, Open Graph) du site, et consigner le tout dans `QUALITE.md`.
- **Modifié/rejeté** :
  - Sur les trois cas de contraste de couleur insuffisant détectés (rose vif sur blanc, blanc sur
    bleu vif, marron sur rose pastel), j'ai choisi de **ne pas corriger** : ce sont des titres
    décoratifs, pas du contenu essentiel, et je préfère garder la direction artistique telle quelle.
    L'IA avait identifié le problème mais c'est moi qui ai tranché sur la suite à donner.
  - Le correctif de performance sur les miniatures de projets (demander une taille réduite à
    PocketBase) s'est révélé incomplet : le code est correct mais sans effet tant que je n'ai pas
    moi-même enregistré les tailles de miniature dans l'admin PocketBase — vérifié ensemble par un
    test direct (`curl`) montrant que le poids de l'image ne changeait pas.

## Ce que je peux expliquer et modifier devant le jury
L'intégralité du code du site a été relue par mes soins au fur et à mesure (page par page,
fonctionnalité par fonctionnalité), testée dans le navigateur à chaque étape, et je suis en mesure
d'expliquer les choix techniques (Astro en mode serveur, PocketBase comme backend, Tailwind/DaisyUI
pour le style, GSAP pour les animations de particules, `<dialog>` natif plutôt qu'une librairie de
modales) détaillés dans la partie technologies de ma soutenance.
