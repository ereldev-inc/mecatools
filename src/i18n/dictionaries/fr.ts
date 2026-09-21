import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    siteName: "MecaTools",
    homeTitle: "MecaTools – Outils gratuits pour mécaniciens moto",
    homeDescription:
      "Outils d'atelier gratuits et simples pour mécaniciens moto : relevé de compression, calcul de pastilles de soupapes et plus encore.",
  },
  nav: {
    skipToContent: "Aller au contenu",
    tools: "Outils",
    home: "Accueil",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    breadcrumb: "Fil d'Ariane",
  },
  home: {
    h1: "Outils pour mécaniciens moto",
    intro:
      "Des calculateurs et relevés simples et rapides, pensés pour l'atelier. Choisissez un outil pour commencer.",
    openTool: "Ouvrir l'outil",
  },
  tool: {
    soon: "Bientôt disponible",
    soonBody:
      "Cet outil est en cours de développement et sera disponible très bientôt.",
    about: "À propos de cet outil",
  },
  tools: {
    compressionTest: {
      name: "Relevé de compression",
      title: "Relevé de compression moto : suivi et comparaison",
      description:
        "Enregistrez la compression de chaque cylindre de votre moto et comparez-la à la valeur constructeur et entre cylindres.",
      intro:
        "Saisissez la compression de chaque cylindre et comparez-la à la valeur préconisée par le constructeur.",
      about: [
        "Un relevé de compression mesure la pression que chaque cylindre peut atteindre : c'est un moyen rapide d'évaluer l'état des segments, des soupapes et du joint de culasse.",
        "Moteur chaud, bougies déposées, poignée de gaz en grand, faites tourner le moteur jusqu'à ce que le manomètre cesse de monter. Répétez pour chaque cylindre, puis comparez les valeurs à la spécification et entre elles : un écart important indique un problème sur le cylindre le plus faible.",
      ],
    },
    valveShims: {
      name: "Pastilles de soupapes",
      title: "Calcul de pastilles pour jeu aux soupapes moto",
      description:
        "Calculez l'épaisseur de pastille nécessaire pour ramener le jeu aux soupapes de votre moto dans la tolérance.",
      intro:
        "Saisissez le jeu mesuré et l'épaisseur de la pastille actuelle pour obtenir la pastille à monter.",
      about: [
        "Sur les moteurs à poussoirs avec pastille, le jeu aux soupapes se règle en changeant l'épaisseur de la pastille. Mesurez le jeu à froid, comparez-le à la valeur constructeur, puis calculez la nouvelle pastille.",
        "L'épaisseur de la nouvelle pastille est égale à l'épaisseur actuelle plus le jeu mesuré, moins le jeu visé. Arrondissez à l'épaisseur disponible la plus proche.",
      ],
    },
  },
  footer: { rights: "MecaTools" },
  notFound: {
    title: "Page introuvable",
    body: "La page que vous cherchez n'existe pas.",
    home: "Retour à l'accueil",
  },
};
