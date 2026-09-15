# TIZIRI — Maison de création e-commerce

## Objectif
Construire une véritable expérience e-commerce premium en français, inspirée de la maquette fournie, avec une narration centrée sur Ourika, la matière, le geste d’Ahmed et l’unicité des bracelets.

## Pages et parcours
- Accueil immersif avec la photographie hero fournie, narration éditoriale, sélection de créations et transitions lentes.
- Les Créations avec compositions asymétriques, grandes images et accès aux fiches produit.
- Fiches produit avec galerie, histoire, matières, inspiration, quantité et ajout au panier.
- Ourika, L’Atelier et Ahmed Tiziri sous forme de récits visuels cinématographiques.
- Contact avec formulaire validé et retour utilisateur clair.
- Panier persistant avec ajout, suppression, quantités, total et accès au checkout.
- Checkout en trois étapes avec validation, résumé et confirmation locale de commande.
- Pages Mentions légales, Confidentialité et Conditions générales pour éviter tout lien mort.

## Direction visuelle
- Ivoire, sable, terre, brun profond, vert végétal et noir doux, avec les couleurs vives réservées aux bracelets.
- Cormorant Garamond pour les titres et Manrope pour les textes.
- Grandes photographies, beaucoup d’espace négatif, compositions éditoriales et absence de grille e-commerce générique.
- Header transparent sur les grandes images, puis surface ivoire légèrement translucide au défilement.
- Animations lentes et sobres : révélations, parallaxe léger, transitions de page et zoom photographique discret, réduits sur mobile.

## Produits et médias
- Conserver strictement les quatre photos de bracelets fournies comme véritables visuels produit.
- Utiliser la photo hero fournie telle quelle sur l’accueil.
- Structurer les données produits dans un module unique, facile à enrichir.
- Créer les paysages et scènes d’atelier manquants dans une esthétique cohérente, sans générer ni altérer les bracelets réels.

## Structure technique
- Conserver TanStack Router, l’équivalent natif de React Router déjà intégré au projet, avec une page distincte pour chaque section.
- Créer des éléments partagés pour le header, le footer, les transitions, les récits produits et les contrôles de quantité.
- Centraliser le panier dans un contexte React avec persistance locale et calculs dérivés.
- Utiliser Motion pour React et Lucide pour les animations et icônes.
- Définir tous les styles et couleurs dans le système visuel global Tailwind.

## Validation finale
- Vérifier les pages et liens, le menu mobile, les formulaires, la galerie, l’ajout/suppression/quantité du panier et le checkout.
- Contrôler l’affichage desktop et mobile, l’absence de chevauchements, les erreurs navigateur et les métadonnées propres à chaque page.
