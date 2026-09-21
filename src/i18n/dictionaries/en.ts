export const en = {
  meta: {
    siteName: "MecaTools",
    homeTitle: "MecaTools – Free online tools for motorcycle mechanics",
    homeDescription:
      "Free, simple workshop tools for motorcycle mechanics: compression test log, valve clearance shim calculator and more.",
  },
  nav: {
    skipToContent: "Skip to content",
converters: "Converters",
    tools: "Tools",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    breadcrumb: "Breadcrumb",
  },
  home: {
    h1: "Tools for motorcycle mechanics",
    intro:
      "Simple, fast calculators and logs built for the workshop. Pick a tool to get started.",
    openTool: "Open tool",
  },
  tool: {
    soon: "Coming soon",
    soonBody:
      "This tool is being built and will be available shortly. Check back soon!",
    about: "About this tool",
  },
  tools: {
    torqueConverter: {
      name: "Torque converter",
      title: "Torque converter: N·m, lbf·ft, lbf·in, kgf·m",
      description:
        "Convert motorcycle tightening torque between N·m, lbf·ft, lbf·in and kgf·m instantly.",
      intro: "Type a value in any unit and get the others instantly.",
      about: [
        "Service manuals give tightening torques in N·m, lbf·ft or kgf·m depending on the manufacturer and the market. Torque wrenches are often graduated in another unit than the manual.",
        "Useful equivalences: 1 lbf·ft = 1.3558 N·m, 1 lbf·in = 0.11298 N·m and 1 kgf·m = 9.80665 N·m. Always tighten to the specification and, when in doubt, in the sequence given by the manual.",
      ],
    },
    compressionConverter: {
      name: "Compression converter",
      title: "Compression pressure converter: bar, psi, kPa, kgf/cm²",
      description:
        "Convert engine compression readings between bar, psi, kPa and kgf/cm² instantly.",
      intro: "Type a value in any unit and get the others instantly.",
      about: [
        "Compression gauges and service manuals do not always use the same unit: bar, psi, kPa or kgf/cm². Convert your reading to compare it with the specification.",
        "Useful equivalences: 1 bar = 14.5038 psi = 100 kPa = 1.01972 kgf/cm². Once converted, use the compression test tool to check each cylinder.",
      ],
    },
    compressionTest: {
      name: "Compression test",
      title: "Motorcycle compression test log & calculator",
      description:
        "Record your motorcycle engine compression readings per cylinder and compare them to the spec and between cylinders.",
      intro:
        "Record the compression reading of each cylinder and compare it with the manufacturer's specification.",
      about: [
        "A compression test measures the pressure each cylinder can build, which is a quick way to assess the condition of piston rings, valves and head gasket.",
        "Warm the engine up, remove all spark plugs, hold the throttle wide open and crank the engine until the gauge stops rising. Repeat for every cylinder, then compare the readings with the specification and with each other: a large gap between cylinders points to a problem in the weakest one.",
      ],
    },
    valveClearance: {
      name: "Valve clearance",
      title: "Motorcycle valve clearance check and log",
      description:
        "Record the valve clearance of every intake and exhaust valve and instantly see which ones are out of specification.",
      intro:
        "Set up your engine, enter the standard clearance and your measurements: valves in range turn green, the others red.",
      about: [
        "Valve clearance is the small gap between the valve stem and its rocker or bucket, measured with a feeler gauge on a cold engine with the cam lobe pointing away from the follower.",
        "Intake and exhaust valves usually have different specifications. A clearance that is too tight can prevent the valve from closing fully, while a clearance that is too loose causes noise and reduces valve lift. Compare every valve with the range from your service manual.",
      ],
    },
    valveShims: {
      name: "Valve shim calculator",
      title: "Valve shim calculator: find the right shim for your motorcycle",
      description:
        "Enter the measured valve clearance and the current shim to get the shim thickness to fit on each valve, plus the list of shims to order.",
      intro:
        "Set up your engine and the standard clearance, then enter the measured clearance and current shim of each valve.",
      about: [
        "On shim-under-bucket valvetrains the clearance is adjusted by changing the shim. A thicker shim reduces the clearance, a thinner one increases it.",
        "Feeler gauges usually give a range (for example between 0.10 and 0.20 mm). The calculator aims at the middle of the standard range: new shim = current shim + middle of the measured range − middle of the standard range, rounded to the nearest available size. Always measure the shim with a micrometer before ordering, as the printed size may be worn or wrong.",
      ],
    },
  },
  converter: {
    valueLabel: "Value",
    swapHint: "Edit any field: the others update automatically.",
    clear: "Clear",
  },
  compression: {
    layoutTitle: "Engine",
    cylinders: "Number of cylinders",
    architecture: "Layout",
    inline: "Inline",
    vee: "V",
    specTitle: "Standard compression",
    min: "Minimum",
    max: "Maximum",
    unit: "Unit",
    readingsTitle: "Your readings",
    cylinder: "Cylinder",
    ok: "In range",
    low: "Too low",
    high: "Too high",
    empty: "No reading",
    specHint: "Enter the standard range to check your readings.",
    specInvalid: "The minimum must be lower than the maximum.",
    summary: "{ok} of {total} cylinders in range",
    allOk: "All cylinders are within the standard range.",
    someBad: "Some cylinders are out of range: check them again, then investigate (rings, valves, head gasket).",
    diagram: "Engine diagram",
    reset: "Clear readings",
  },
  valves: {
    engineTitle: "Engine",
    cylinders: "Number of cylinders",
    architecture: "Layout",
    inline: "Inline",
    vee: "V",
    intakeValves: "Intake valves per cylinder",
    exhaustValves: "Exhaust valves per cylinder",
    specTitle: "Standard clearance (mm)",
    intake: "Intake",
    exhaust: "Exhaust",
    min: "Min",
    max: "Max",
    readingsTitle: "Your measurements (mm)",
    cylinder: "Cylinder",
    bankLeft: "Left bank",
    bankRight: "Right bank",
    intakeShort: "IN",
    exhaustShort: "EX",
    ok: "In range",
    low: "Too tight",
    high: "Too loose",
    specHint: "Enter the standard clearance for intake and exhaust to check your measurements.",
    specInvalid: "The minimum must be lower than the maximum.",
    summary: "{ok} of {total} valves in range",
    allOk: "All valves are within the standard clearance.",
    someBad: "Some valves are out of range: re-measure them, then adjust.",
    diagram: "Engine diagram",
    reset: "Clear measurements",
  },
  shims: {
    readingsTitle: "Measurements and shims (mm)",
    clearanceMin: "Measured min",
    clearanceMax: "Measured max",
    rangeHint: "Enter the clearance range you measured (e.g. 0.10 to 0.20 mm). A single value also works.",
    shim: "Shim",
    stepTitle: "Shim size increment",
    stepExact: "Exact (no rounding)",
    stepHint: "Shims are sold in fixed steps (often 0.05 mm, or 0.025 mm depending on the brand).",
    keep: "In range: keep the current shim",
    fit: "Fit a {shim} mm shim",
    resulting: "→ clearance {value} mm",
    outOfReach: "The clearance stays out of range with this increment.",
    legend: "Diagram: shim to fit in mm. Green: keep the current shim, red: replace it.",
    summary: "{n} valve(s) to adjust out of {total}",
    nothing: "All entered valves are in range: nothing to change.",
    orderTitle: "Shims to fit",
    orderLine: "{shim} mm × {count}",
  },
  footer: { rights: "MecaTools" },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
