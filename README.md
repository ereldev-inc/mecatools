# MecaTools

Free online tools for motorcycle mechanics. Static Next.js site (App Router, TypeScript, Tailwind), English (default) and French, hosted on GitHub Pages.

## Tools

- Compression test (`/en/compression-test/`, `/fr/releve-compression/`)
- Valve clearance (`/en/valve-clearance/`, `/fr/jeu-aux-soupapes/`)
- Valve shim calculator (`/en/valve-shim-calculator/`, `/fr/calcul-pastilles-soupapes/`)

Each tool page combines the interactive tool with SEO text (see `src/i18n/dictionaries`).

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export in out/
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://tools.example.com`) when building so canonical URLs, hreflang and the sitemap use the real domain.

## Deploy (built locally, no GitHub Actions)

```bash
NEXT_PUBLIC_SITE_URL=https://tools.example.com NEXT_PUBLIC_CF_BEACON_TOKEN=<token> npm run deploy
```

Builds the site and publishes `out/` to the `gh-pages` branch. One-time setup:

1. GitHub → Settings → Pages → Deploy from a branch → `gh-pages` / root, custom domain = your subdomain.
2. DNS: `CNAME <subdomain> → ereldev-inc.github.io`.
3. Add `public/CNAME` containing the subdomain (so each deploy keeps it).

## Analytics

Page views per URL are measured with [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (cookieless, no consent banner needed for this alone). The beacon is only included when a token is provided at build time:

1. Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site (enter your subdomain; no DNS change needed) and copy the beacon token.
2. Put it in `.env.local` (gitignored): `NEXT_PUBLIC_CF_BEACON_TOKEN=<token>`, or prefix the deploy command with it.

Tools are told apart by URL: `/en/`, `/fr/` are the homepages, every tool has its own path.

## Adding a tool

1. Add an entry in `src/lib/tools.ts` (id, icon, localized slugs).
2. Add its texts (`name`, `title`, `description`, `intro`, `about`) under `tools` in `src/i18n/dictionaries/en.ts` and `fr.ts`.
3. Put the interactive component in the tool page (`src/app/[locale]/[tool]/page.tsx`).

## Notes

- i18n is done without middleware (incompatible with static export): `/` detects the language client-side and redirects to `/en/` or `/fr/`.
- SEO: per-page metadata, canonical + hreflang, JSON-LD, sitemap.xml, robots.txt, localized slugs.
