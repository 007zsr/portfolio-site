import type { Locale, LocalizedText } from '../lib/i18n';

export type { Locale, LocalizedText };

export type RouteKey = 'home' | 'about' | 'projects' | 'contact' | 'notFound';

export interface SiteDisplayConfig {
  name: string;
  shortName: string;
  description: string;
  siteUrl: string;
  temporaryUrl: string;
  rootDomain: string;
  author: string;
  defaultImage: string;
}

export interface NavigationItem {
  key: RouteKey;
  label: string;
  href: string;
}

export interface ActionLink {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  year: number;
  role: string;
  summary: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  technologiesLabel: string;
  links: ActionLink[];
}

export interface HomeContent {
  eyebrow: string;
  title: string;
  headline: string;
  summary: string;
  focusLabel: string;
  focusTags: string[];
  heroImage: string;
  actions: ActionLink[];
  featuredTitle: string;
  featuredDescription: string;
  featuredProjects: ProjectSummary[];
}

export interface ProjectsContent {
  eyebrow: string;
  title: string;
  description: string;
  projects: ProjectSummary[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  details: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface ExperienceItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  educationTitle: string;
  interestsTitle: string;
  skillsEyebrow: string;
  skillsTitle: string;
  experienceEyebrow: string;
  experienceTitle: string;
  education: EducationItem[];
  interests: string[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  items: ContactItem[];
}

export interface SeoMeta {
  title?: string;
  description: string;
  image: string;
}
