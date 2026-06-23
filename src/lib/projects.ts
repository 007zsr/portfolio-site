import projectLocales from '../data/projectLocales.json';
import { pick, t, type Locale } from './i18n';

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  repoName: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  year: number;
  role: string;
  featured: boolean;
  visibility: string;
  order: number;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  features: string[];
  outcomes: string[];
  links: ProjectLink[];
  image: string;
  imageAlt: string;
  downloads: string[];
  Content: MarkdownContentComponent;
};

type MarkdownContentComponent = any;

type ProjectModule = {
  frontmatter: Omit<Project, 'Content'>;
  Content: MarkdownContentComponent;
};

const modules = import.meta.glob<ProjectModule>('../content/projects/*.md', {
  eager: true
});

const EXCLUDED_PROJECT_IDS = new Set(['portfolio-site']);
const EXCLUDED_REPO_NAMES = new Set(['portfolio-site']);

function fileSlug(path: string) {
  return path.split('/').pop()?.replace('.md', '') ?? 'project';
}

function normalizeProject(path: string, module: ProjectModule): Project {
  const frontmatter = module.frontmatter;

  return {
    ...frontmatter,
    repoName: frontmatter.repoName || frontmatter.slug || fileSlug(path),
    slug: frontmatter.slug || fileSlug(path),
    featured: Boolean(frontmatter.featured),
    visibility: frontmatter.visibility || 'draft',
    order: Number(frontmatter.order ?? 999),
    responsibilities: frontmatter.responsibilities ?? [],
    technologies: frontmatter.technologies ?? [],
    features: frontmatter.features ?? [],
    outcomes: frontmatter.outcomes ?? [],
    links: frontmatter.links ?? [],
    downloads: frontmatter.downloads ?? [],
    image: frontmatter.image || '/images/projects/default.svg',
    imageAlt: frontmatter.imageAlt || `${frontmatter.title} project image`,
    Content: module.Content
  };
}

function isExcludedProject(project: Project) {
  return EXCLUDED_PROJECT_IDS.has(project.id) || EXCLUDED_REPO_NAMES.has(project.repoName);
}

export const allProjects = Object.entries(modules)
  .map(([path, module]) => normalizeProject(path, module))
  .sort((a, b) => a.order - b.order);

export const publicProjects = allProjects.filter(
  (project) => project.visibility === 'public' && !isExcludedProject(project)
);

export const featuredProjects = publicProjects.filter(
  (project) => project.featured
);

export function getProjectBySlug(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}

export function getProjectById(id: string) {
  return publicProjects.find((project) => project.id === id);
}

export function localizeProject(project: Project, locale: Locale) {
  const text = projectLocales[project.id as keyof typeof projectLocales] as
    | (typeof projectLocales)[keyof typeof projectLocales]
    | undefined;
  const optionalText = text as typeof text & {
    imageAlt?: string | Record<Locale, string>;
    responsibilities?: Partial<Record<Locale, string[]>>;
    features?: Partial<Record<Locale, string[]>>;
    outcomes?: Partial<Record<Locale, string[]>>;
  };

  return {
    ...project,
    title: pick(text?.title ?? project.title, locale),
    category: pick(text?.category ?? project.category, locale),
    status: t(locale, `status.${project.status}`),
    role: pick(text?.role ?? project.role, locale),
    summary: pick(text?.summary ?? project.summary, locale),
    responsibilities: (optionalText?.responsibilities?.[locale] ?? project.responsibilities) as string[],
    features: (optionalText?.features?.[locale] ?? project.features) as string[],
    outcomes: (optionalText?.outcomes?.[locale] ?? project.outcomes) as string[],
    imageAlt: pick(optionalText?.imageAlt ?? project.imageAlt, locale)
  };
}
