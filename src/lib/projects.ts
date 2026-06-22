export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
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

function fileSlug(path: string) {
  return path.split('/').pop()?.replace('.md', '') ?? 'project';
}

function normalizeProject(path: string, module: ProjectModule): Project {
  const frontmatter = module.frontmatter;

  return {
    ...frontmatter,
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

export const allProjects = Object.entries(modules)
  .map(([path, module]) => normalizeProject(path, module))
  .sort((a, b) => a.order - b.order);

export const publicProjects = allProjects.filter(
  (project) => project.visibility === 'public'
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
