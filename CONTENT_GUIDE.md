# Content Guide

This site is content-driven. Most updates should happen in Markdown or JSON files.

## Site Config

Edit site identity and domain settings here:

```text
src/data/site.json
```

`siteUrl` is the formal canonical domain used by SEO, canonical links, and Open Graph URLs. `temporaryUrl` is the current Cloudflare Pages default domain used during the first deployment stage.

## Add a Project

Create a Markdown file in:

```text
src/content/projects/
```

Example:

```md
---
id: "my-project"
slug: "my-project"
title: "My Project"
category: "Robotics"
status: "Prototype"
year: 2026
role: "Developer"
featured: false
visibility: "public"
order: 5
summary: "Short project summary."
responsibilities:
  - "Designed the system flow."
technologies:
  - "Python"
features:
  - "Main feature"
outcomes:
  - "Main outcome"
links:
  - label: "Repository"
    url: "#"
image: "/images/projects/default.svg"
imageAlt: "Project visual"
downloads: []
---

Write the project body here.
```

## Project Fields

- `id`: Stable internal project ID.
- `slug`: URL path after `/projects/`.
- `title`: Public project title.
- `category`: Project type or area.
- `status`: Display badge text.
- `year`: Project year.
- `role`: Your role.
- `featured`: Show on the home page when `true`.
- `visibility`: Use `public` to show the project. Use `draft` to hide it.
- `order`: Lower numbers appear first.
- `summary`: Short card and SEO description.
- `responsibilities`: Bullet list for the detail page.
- `technologies`: Tag list.
- `features`: Main functions.
- `outcomes`: Results or deliverables.
- `links`: External links or placeholders.
- `image`: Public image path.
- `imageAlt`: Accessible image description.
- `downloads`: Related download IDs from `src/data/downloads.json`.

## Hide a Project

Set:

```yaml
visibility: "draft"
```

## Feature a Project on Home

Set:

```yaml
featured: true
```

## Add a Download

Edit:

```text
src/data/downloads.json
```

Example:

```json
{
  "id": "demo-v1",
  "title": "Demo Build",
  "category": "Project Demos",
  "fileType": "ZIP",
  "size": "External",
  "version": "v1",
  "updatedAt": "2026-06",
  "projectId": "my-project",
  "sourceType": "github_release",
  "url": "#",
  "visibility": "public",
  "featured": false
}
```

## Download Categories

Supported categories:

- Resume / CV
- Project Demos
- Reports
- Presentation Slides
- Code Archives
- Dataset Samples
- Videos
- Other Files

## Link a Download to a Project

Set `projectId` to the matching project `id`:

```json
"projectId": "unitree-go2-voice-control"
```

## Images

Place project images here:

```text
public/images/projects/
```

Then reference them with an absolute public path:

```yaml
image: "/images/projects/my-project.png"
```

## PDFs

Place public PDF files here:

```text
public/files/
```

The default resume placeholder path is:

```text
public/files/resume-placeholder.pdf
```

## Large Files

Do not commit large demo files, datasets, model weights, or build archives to the repository. Prefer:

- GitHub Releases
- OneDrive
- Google Drive
- Baidu Netdisk
- Aliyun Drive
- Object storage added later

## Privacy

Do not publish private addresses, private IDs, secrets, recovery codes, tokens, passwords, API keys, or non-public project material.
