# Kitchen Wayfinder — Tools

Interactive kitchen calculators at **kitchenwayfinder.com/tools**, built as a
static Astro app. Ghost keeps the root of the domain; the tools never touch
Ghost's database.

## The plan

The locked build plan and the 61-engine taxonomy live in the Kitchen
Wayfinder goal workspace (not in this repo):

- `tools-build-plan-DRAFT.md` — architecture, page template, phases, QA gates
- `tools-taxonomy-DRAFT.md` — the engine list, variation counts, data sources

## Develop

```sh
npm install
npm run dev     # local server
npm run build   # static output in dist/
```

Requires Node 22.23.4 or newer (Astro 6).

## Structure

- `src/pages/` — routes. `index.astro` is the tools directory at `/tools/`.
  One dynamic route per engine, with `getStaticPaths()` generating one
  static page per variation.
- `src/content/` — content collections (Astro content layer). `engines/`
  holds one JSON file per engine; `variations/` holds one JSON file per
  variation page. Adding a variation means adding a data file.
- `src/layouts/` — the shared page layout (header, nav, footer, meta).
- `src/styles/` — global CSS, Honest Table tokens.
- `public/` — static files copied verbatim to the build output.

## Deploy

Dokploy builds this repo with the `Dockerfile` (Node build stage, then
nginx serving `dist/`) and routes `/tools/*` to the container. Traefik
does **not** strip the path, so the Dockerfile copies the build output to
`/usr/share/nginx/html/tools` — a request for `/tools/` resolves to
`tools/index.html` inside the container.

`base: '/tools'` in `astro.config.mjs` makes every link and asset carry
the prefix. Internal links must use `import.meta.env.BASE_URL` (or the
literal `/tools/` prefix) or they 404.

The sitemap is generated at build time by `@astrojs/sitemap` and served
at `/tools/sitemap.xml`. Ghost keeps its own sitemap; the URL sets are
disjoint.

## Rules

- No prices anywhere. No fabricated ratings or reviews.
- No tags for the tools section.
- Every number on a tool page comes from a named source, checked before
  the engine ships (see the plan's data-accuracy table). Safety-critical
  engines (canning, curing, fermentation) are checked twice.
- Felicity's voice for all copy.
