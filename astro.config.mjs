// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The tools section lives at kitchenwayfinder.com/tools, served by its own
// container behind the same domain. Ghost keeps the root. `base` makes every
// link and asset carry the /tools prefix; `site` is the full domain so the
// sitemap lists absolute https://kitchenwayfinder.com/tools/... URLs.
export default defineConfig({
  site: 'https://kitchenwayfinder.com',
  base: '/tools',
  output: 'static',
  // Tool URLs always end with a slash (/tools/<category>/<engine>-<variation>/).
  // Without this the sitemap lists both the slash and no-slash variant.
  trailingSlash: 'always',
  integrations: [sitemap()],
});
