# Variations

One JSON file per variation page. The file name is the variation slug
(`<engine>-<variation>`, e.g. `ingredient-weight-all-purpose-flour.json`).
The schema is defined in `src/content.config.ts` (`variations` collection).

Example:

```json
{
  "engine": "ingredient-weight-converter",
  "name": "All-Purpose Flour",
  "slug": "ingredient-weight-all-purpose-flour",
  "title": "Cups to Grams: All-Purpose Flour",
  "description": "Convert cups of all-purpose flour to grams and back, with the weight per cup and a worked example."
}
```

The variation test (from the taxonomy): one variation = one page only when
its answer, presets, or inputs genuinely differ. Presets, reference tables,
worked examples, and FAQs for a variation live in its data file and are
extended as each engine is built — the schema above is the scaffold, not
the final shape.
