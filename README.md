# Sirui Zhou Portfolio

Personal portfolio website for project demos, resume, and downloads. The first version is a static Astro site designed for Cloudflare Pages.

## Deployment Target

Current first-stage deployment target:

```text
https://<project-name>.pages.dev
```

Default project config currently uses:

```text
https://portfolio-site.pages.dev
```

Formal planned domain:

```text
https://www.zsr365.com
```

Root domain plan:

```text
https://zsr365.com
```

After the domain is purchased, the root domain should redirect with a Cloudflare Redirect Rule:

```text
https://zsr365.com -> https://www.zsr365.com
```

Do not treat the missing `zsr365.com` purchase or DNS record as a build failure. The site should deploy and work on the Cloudflare Pages default domain first.

## Unified Site Config

Domain and site identity settings live in one file:

```text
src/data/site.json
```

SEO, canonical URLs, Open Graph URLs, and the Astro `site` option read from this config. When the formal domain is ready, update this file instead of editing multiple components.

Key fields:

```json
{
  "siteName": "Sirui Zhou Portfolio",
  "siteUrl": "https://www.zsr365.com",
  "temporaryUrl": "https://portfolio-site.pages.dev"
}
```

## Tech Stack

- Astro
- TypeScript
- Markdown project content
- JSON profile and download data
- Static deployment on Cloudflare Pages

## Local Setup

Install Node.js LTS first, then run:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Pages

- `/`
- `/about`
- `/projects`
- `/projects/unitree-go2-voice-control`
- `/downloads`
- `/resume`
- `/contact`
- `/404`

## Cloudflare Pages Settings

If this folder is not a Git repository yet, create the GitHub repository first, then push:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/<github-username>/portfolio-site.git
git push -u origin main
```

Connect the GitHub repository to Cloudflare Pages:

```text
Cloudflare Dashboard
Workers & Pages
Create application
Pages
Connect to Git
Select GitHub
Select portfolio-site repository
```

Build settings:

```text
Framework preset: Astro
Build command: npm run build
Output directory: dist
Root directory: /
Production branch: main
```

The first successful deployment will provide a URL similar to:

```text
https://portfolio-site.pages.dev
```

If your Cloudflare Pages project name is different, update `temporaryUrl` in `src/data/site.json`.

## Future Custom Domain Setup

After purchasing `zsr365.com`:

1. Open the Cloudflare Pages project.
2. Go to `Custom domains`.
3. Add `www.zsr365.com`.
4. Follow Cloudflare's DNS validation flow.
5. Add a Cloudflare Redirect Rule for a permanent `301` redirect from `zsr365.com` to `www.zsr365.com`.

Do not implement domain purchase, DNS setup, or redirect logic in this codebase.

## Add a Project

Create a new Markdown file:

```text
src/content/projects/my-project.md
```

Set `visibility: "public"` to show it on the site, and `featured: true` to show it on the home page.

## Add a Download

Edit:

```text
src/data/downloads.json
```

For large demos, do not commit the files directly. Use GitHub Releases, a GitHub repository link, or external storage, then add the URL in the JSON file.

## Replace Resume PDF

Replace:

```text
public/files/resume-placeholder.pdf
```

Keep the same path if you do not want to edit the download data.

## Safety Notes

Do not commit:

- API keys
- passwords
- tokens
- private certificates
- private documents
- large datasets
- large model files
- large demo archives
