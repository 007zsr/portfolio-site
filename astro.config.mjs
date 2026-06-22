import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { defineConfig } from 'astro/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteConfig = JSON.parse(
  readFileSync(join(__dirname, 'src/data/site.json'), 'utf-8')
);

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static'
});
