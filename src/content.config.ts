// Content collections for the tools section.
//
// Variation data lives here as JSON files; adding a variation means adding
// a data file, not writing a new page by hand. Tool pages are generated
// from these collections with getStaticPaths() (one static page per
// variation). The pilot engine (Ingredient Weight Converter) is the first
// collection to be filled in.
//
// Numbers: every grams-per-cup weight comes from the King Arthur Baking
// ingredient weight chart, re-checked live 2026-11-20. See the engine
// data file for the full verified table.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const engines = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/engines' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.string(),
    // Short description used on the /tools/ index and the engine page lede.
    description: z.string(),
    // Meta title WITHOUT the " | Kitchen Wayfinder" suffix the layout adds.
    // Full rendered title must be 50-60 chars, so keep this 30-40 chars. (The suffix is 20 chars.)
    title: z.string(),
    // Meta description, 140-155 chars.
    metaDescription: z.string(),
    // Intro paragraphs for the engine index page, in Felicity's voice.
    intro: z.array(z.string()),
  }),
});

const variations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/variations' }),
  schema: z.object({
    engine: z.string(),
    name: z.string(),
    // URL segment under /tools/<engine>/. Keyword-rich: the slug carries
    // the target query (e.g. cups-to-grams-butter), per Cozy's pilot
    // review 2026-11-20. File names stay short
    // (<engine>-<ingredient>.json); only this field drives the URL.
    slug: z.string(),
    // Meta title WITHOUT the " | Kitchen Wayfinder" suffix the layout adds.
    // Full rendered title must be 50-60 chars, so keep this 30-40 chars. (The suffix is 20 chars.)
    // Also used as the page H1.
    title: z.string(),
    // Meta description, 140-155 chars.
    description: z.string(),
    dateModified: z.string(),
    // King Arthur grams per US cup (spooned and levelled unless noted).
    gramsPerCup: z.number(),
    // King Arthur ounces per US cup (their own rounded figure).
    ouncesPerCup: z.number(),
    // Grams per tablespoon (gramsPerCup / 16, rounded to 1 decimal).
    gramsPerTablespoon: z.number(),
    // How the cup is filled: "spooned and levelled", "packed", etc.
    measureNote: z.string(),
    // One line naming the source value, e.g. "King Arthur lists ...".
    sourceNote: z.string(),
    // Quick-amount chips under the calculator.
    presets: z.array(z.object({ label: z.string(), cups: z.number() })),
    // An extra unit the ingredient is also measured in (butter sticks).
    extraUnit: z
      .object({
        label: z.string(),
        grams: z.number(),
        note: z.string(),
      })
      .optional(),
    // Tutorial paragraphs (4-5), in Felicity's voice, with this
    // variation's own numbers. Never copied word for word from another
    // variation.
    tutorial: z.array(z.string()),
    // Step-by-step "how to measure it" — visible as an ordered list and
    // the source of the HowTo JSON-LD.
    howToSteps: z.array(z.object({ name: z.string(), text: z.string() })),
    // Worked examples with this variation's own numbers (at least 2).
    examples: z.array(
      z.object({
        title: z.string(),
        steps: z.array(z.string()),
        result: z.string(),
      }),
    ),
    // The formula in plain words, each part explained.
    formula: z.object({
      text: z.string(),
      parts: z.array(z.object({ term: z.string(), meaning: z.string() })),
    }),
    // Niche FAQs, visible on the page and the source of FAQPage JSON-LD.
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    // One or two lines in Felicity's voice.
    felicityNote: z.string(),
    // Links to the closest live Ghost guides (title + absolute URL).
    links: z.array(z.object({ title: z.string(), url: z.string() })),
  }),
});

export const collections = { engines, variations };
