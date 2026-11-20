# Engines

One JSON file per engine. The file name is the engine slug. The schema is
defined in `src/content.config.ts` (`engines` collection).

Example (`ingredient-weight-converter.json`):

```json
{
  "name": "Ingredient Weight Converter",
  "slug": "ingredient-weight-converter",
  "category": "Conversions & Measurements",
  "description": "Cups to grams for 45+ ingredients, using published grams-per-cup weights."
}
```

Engine names, categories, and slugs come from the locked taxonomy
(`tools-taxonomy-DRAFT.md` in the KW goal workspace). Do not invent new
engines here — the taxonomy is the map.
