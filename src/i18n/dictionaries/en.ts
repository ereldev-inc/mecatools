export const en = {
  meta: {
    siteName: "MecaTools",
    homeTitle: "MecaTools – Free online tools for motorcycle mechanics",
    homeDescription:
      "Free, simple workshop tools for motorcycle mechanics: compression test log, valve clearance shim calculator and more.",
  },
  nav: {
    skipToContent: "Skip to content",
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
    valveShims: {
      name: "Valve shims",
      title: "Valve clearance shim calculator for motorcycles",
      description:
        "Calculate the replacement shim size needed to bring your motorcycle valve clearance back within specification.",
      intro:
        "Enter the measured valve clearance and the current shim thickness to find the shim you need.",
      about: [
        "On engines with shim-under-bucket valvetrains, the valve clearance is adjusted by changing the shim thickness. Measure the clearance cold, compare it to the specification, and work out the new shim.",
        "The new shim thickness equals the current shim thickness plus the measured clearance, minus the target clearance. Round to the nearest available shim size.",
      ],
    },
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
  footer: { rights: "MecaTools" },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
