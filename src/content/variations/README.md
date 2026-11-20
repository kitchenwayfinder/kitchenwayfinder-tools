# Variations

One JSON file per variation page. The file name is `<engine>-<variation>`
(e.g. `ingredient-weight-all-purpose-flour.json`) so files stay unique
across engines; the `slug` field inside is the short variation slug used
in the URL (`/tools/<engine>/<slug>/`).

The schema is defined in `src/content.config.ts` (`variations`
collection). Every variation carries the full page template from the
build plan: calculator numbers, presets, tutorial, how-to steps, worked
examples, formula breakdown, FAQs, Felicity note, and Ghost links. The
reference table is computed from `gramsPerCup` at build time, so the
table and the calculator can never disagree.

Rules for variation data:

- `title` is the meta title WITHOUT the " | Kitchen Wayfinder" suffix the
  layout adds. The full rendered title must be 50–60 chars, so keep
  `title` 30–40 chars. `description` is the meta description, 140–155
  chars.
- Every number comes from the engine's named source, checked live before
  the engine ships. For the Ingredient Weight Converter the source is
  the King Arthur Baking ingredient weight chart (re-checked 2026-11-20).
- No prices anywhere. No markdown in text fields — plain text only.
- The tutorial is written per variation with its own numbers. Never copy
  another variation's text word for word.

Validate before building:

```sh
node ~/workspace/goals/kitchen-wayfinder-website/files/tools/validate-tools-content.mjs
```

The variation test (from the taxonomy): one variation = one page only when
its answer, presets, or inputs genuinely differ.
