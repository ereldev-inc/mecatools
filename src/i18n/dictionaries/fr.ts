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
converters: "Convertisseurs",
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
    torqueConverter: {
      name: "Convertisseur de couple",
      title: "Convertisseur de couple de serrage : N·m, lbf·ft, lbf·in, kgf·m",
      description:
        "Convertissez instantanément un couple de serrage moto entre N·m, lbf·ft, lbf·in et kgf·m.",
      intro: "Saisissez une valeur dans n'importe quelle unité, les autres se calculent instantanément.",
      about: [
        "Les manuels d'atelier donnent les couples de serrage en N·m, lbf·ft ou kgf·m selon le constructeur et le marché, et les clés dynamométriques sont souvent graduées dans une autre unité.",
        "Équivalences utiles : 1 lbf·ft = 1,3558 N·m, 1 lbf·in = 0,11298 N·m et 1 kgf·m = 9,80665 N·m. Serrez toujours au couple préconisé et, en cas de doute, dans l'ordre indiqué par le manuel.",
      ],
    },
    compressionConverter: {
      name: "Convertisseur de compression",
      title: "Convertisseur de compression : bar, psi, kPa, kgf/cm²",
      description:
        "Convertissez instantanément un relevé de compression moteur entre bar, psi, kPa et kgf/cm².",
      intro: "Saisissez une valeur dans n'importe quelle unité, les autres se calculent instantanément.",
      about: [
        "Les compressiomètres et les manuels d'atelier n'utilisent pas toujours la même unité : bar, psi, kPa ou kgf/cm². Convertissez votre relevé pour le comparer à la valeur constructeur.",
        "Équivalences utiles : 1 bar = 14,5038 psi = 100 kPa = 1,01972 kgf/cm². Ensuite, utilisez l'outil de relevé de compression pour vérifier chaque cylindre.",
      ],
    },
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
    valveClearance: {
      name: "Jeu aux soupapes",
      title: "Contrôle et relevé du jeu aux soupapes moto",
      description:
        "Relevez le jeu de chaque soupape d'admission et d'échappement et repérez tout de suite celles qui sont hors tolérance.",
      intro:
        "Configurez votre moteur, saisissez le jeu standard et vos mesures : les soupapes dans la norme passent au vert, les autres au rouge.",
      about: [
        "Le jeu aux soupapes est le faible espace entre la queue de soupape et son culbuteur ou son poussoir, mesuré à la jauge d'épaisseur sur un moteur froid, came dos au poussoir.",
        "Les soupapes d'admission et d'échappement ont généralement des valeurs différentes. Un jeu trop faible peut empêcher la soupape de bien fermer, un jeu trop important provoque du bruit et réduit la levée. Comparez chaque soupape à la plage du manuel d'atelier.",
      ],
    },
    valveShims: {
      name: "Calcul de pastilles",
      title: "Calcul de pastilles de soupapes : trouvez la bonne épaisseur pour votre moto",
      description:
        "Saisissez le jeu aux soupapes mesuré et la pastille actuelle pour obtenir l'épaisseur à monter sur chaque soupape, et la liste des pastilles à commander.",
      intro:
        "Configurez votre moteur et le jeu standard, puis saisissez le jeu mesuré et la pastille actuelle de chaque soupape.",
      about: [
        "Sur les culasses à pastille sous poussoir, le jeu se règle en changeant la pastille : plus épaisse, elle réduit le jeu ; plus fine, elle l'augmente.",
        "Les jauges d'épaisseur donnent en général une fourchette (par exemple entre 0,10 et 0,20 mm). Le calculateur vise le milieu de la plage standard : nouvelle pastille = pastille actuelle + milieu de la fourchette mesurée − milieu de la plage standard, arrondie à l'épaisseur disponible la plus proche. Mesurez toujours la pastille au micromètre avant de commander : la cote gravée peut être usée ou fausse.",
      ],
    },
  },
  converter: {
    valueLabel: "Valeur",
    swapHint: "Modifiez n'importe quel champ : les autres se mettent à jour.",
    clear: "Effacer",
  },
  compression: {
    layoutTitle: "Moteur",
    cylinders: "Nombre de cylindres",
    architecture: "Architecture",
    inline: "En ligne",
    vee: "V",
    specTitle: "Compression standard",
    min: "Minimum",
    max: "Maximum",
    unit: "Unité",
    readingsTitle: "Vos relevés",
    cylinder: "Cylindre",
    ok: "Dans la norme",
    low: "Trop basse",
    high: "Trop haute",
    empty: "Pas de relevé",
    specHint: "Saisissez la plage standard pour vérifier vos relevés.",
    specInvalid: "Le minimum doit être inférieur au maximum.",
    summary: "{ok} cylindre(s) sur {total} dans la norme",
    allOk: "Tous les cylindres sont dans la plage standard.",
    someBad: "Certains cylindres sont hors norme : refaites la mesure, puis cherchez la cause (segments, soupapes, joint de culasse).",
    diagram: "Schéma du moteur",
    reset: "Effacer les relevés",
  },
  valves: {
    engineTitle: "Moteur",
    cylinders: "Nombre de cylindres",
    architecture: "Architecture",
    inline: "En ligne",
    vee: "V",
    intakeValves: "Soupapes d'admission par cylindre",
    exhaustValves: "Soupapes d'échappement par cylindre",
    specTitle: "Jeu standard (mm)",
    intake: "Admission",
    exhaust: "Échappement",
    min: "Min",
    max: "Max",
    readingsTitle: "Vos mesures (mm)",
    cylinder: "Cylindre",
    bankLeft: "Banc gauche",
    bankRight: "Banc droit",
    intakeShort: "ADM",
    exhaustShort: "ECH",
    ok: "Dans la norme",
    low: "Trop serré",
    high: "Trop lâche",
    specHint: "Saisissez le jeu standard à l'admission et à l'échappement pour vérifier vos mesures.",
    specInvalid: "Le minimum doit être inférieur au maximum.",
    summary: "{ok} soupape(s) sur {total} dans la norme",
    allOk: "Toutes les soupapes sont dans le jeu standard.",
    someBad: "Certaines soupapes sont hors norme : refaites la mesure, puis réglez.",
    diagram: "Schéma du moteur",
    reset: "Effacer les mesures",
  },
  shims: {
    readingsTitle: "Mesures et pastilles (mm)",
    clearanceMin: "Mesuré min",
    clearanceMax: "Mesuré max",
    rangeHint: "Saisissez la fourchette de jeu mesurée (ex. 0,10 à 0,20 mm). Une valeur unique fonctionne aussi.",
    shim: "Pastille",
    stepTitle: "Pas d'épaisseur des pastilles",
    stepExact: "Exact (sans arrondi)",
    stepHint: "Les pastilles sont vendues par pas fixes (souvent 0,05 mm, ou 0,025 mm selon la marque).",
    keep: "Dans la norme : conservez la pastille",
    fit: "Montez une pastille de {shim} mm",
    resulting: "→ jeu de {value} mm",
    outOfReach: "Le jeu reste hors norme avec ce pas.",
    legend: "Schéma : pastille à monter en mm. Vert : on garde la pastille, rouge : on la remplace.",
    summary: "{n} soupape(s) à régler sur {total}",
    nothing: "Toutes les soupapes saisies sont dans la norme : rien à changer.",
    orderTitle: "Pastilles à monter",
    orderLine: "{shim} mm × {count}",
  },
  footer: { rights: "MecaTools" },
  notFound: {
    title: "Page introuvable",
    body: "La page que vous cherchez n'existe pas.",
    home: "Retour à l'accueil",
  },
};
