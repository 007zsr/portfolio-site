import profile from '../data/profile.json';
import siteData from '../data/site.json';
import type {
  ActionLink,
  ContactContent,
  HomeContent,
  Locale,
  NavigationItem,
  ProjectsContent,
  ProjectSummary,
  RouteKey,
  SeoMeta,
  SiteDisplayConfig
} from '../types/content';
import { defaultLocale, pick, t } from './i18n';
import { featuredProjects, localizeProject, publicProjects, type Project } from './projects';
import { getLocalizedPath as localizeRoute, getPrimaryNavigation } from './routes';
import { shortName, siteDescription, siteName } from './site';

function usableHref(href: string | undefined): href is string {
  return Boolean(href && href.trim() && href !== '#');
}

function projectLinkLabel(label: string, locale: Locale): string {
  const lower = label.toLowerCase();
  const isCode = lower.includes('git') || lower.includes('repo') || lower.includes('code');
  if (locale === 'zh') {
    return isCode ? '查看代码' : '查看项目';
  }
  return isCode ? 'View Code' : 'View Project';
}

function toProjectSummary(project: Project, locale: Locale): ProjectSummary {
  const localized = localizeProject(project, locale);
  const links: ActionLink[] = project.links
    .filter((link) => usableHref(link.url))
    .map((link) => ({
      label: projectLinkLabel(link.label, locale),
      href: link.url,
      variant: 'secondary',
      external: true
    }));

  return {
    id: project.id,
    slug: project.slug,
    title: localized.title,
    category: localized.category,
    status: localized.status,
    year: project.year,
    role: localized.role,
    summary: localized.summary,
    technologies: project.technologies,
    image: project.image,
    imageAlt: localized.imageAlt,
    technologiesLabel:
      locale === 'zh' ? `${localized.title} 使用的技术` : `${localized.title} technologies`,
    links
  };
}

export function getSiteConfig(locale: Locale = defaultLocale): SiteDisplayConfig {
  return {
    name: siteName(locale),
    shortName: shortName(locale),
    description: siteDescription(locale),
    siteUrl: siteData.siteUrl,
    temporaryUrl: siteData.temporaryUrl,
    rootDomain: siteData.rootDomain,
    author: siteData.author,
    defaultImage: siteData.defaultImage
  };
}

export function getNavigation(locale: Locale): NavigationItem[] {
  return getPrimaryNavigation(locale);
}

export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  return localizeRoute(pathname, targetLocale);
}

export function getProjects(locale: Locale): ProjectSummary[] {
  return publicProjects.map((project) => toProjectSummary(project, locale));
}

export function getFeaturedProjects(locale: Locale, limit = 3): ProjectSummary[] {
  return featuredProjects.slice(0, limit).map((project) => toProjectSummary(project, locale));
}

export function getOtherProjects(locale: Locale, featuredLimit = 3): ProjectSummary[] {
  const featuredIds = new Set(featuredProjects.slice(0, featuredLimit).map((project) => project.id));
  return publicProjects
    .filter((project) => !featuredIds.has(project.id))
    .map((project) => toProjectSummary(project, locale));
}

export function getProjectsContent(locale: Locale): ProjectsContent {
  return {
    eyebrow: t(locale, 'nav.projects'),
    title: t(locale, 'page.projects.title'),
    description: t(locale, 'page.projects.desc'),
    featuredTitle: t(locale, 'page.projects.featured'),
    featuredDescription: t(locale, 'page.projects.featuredDesc'),
    carouselLabel: t(locale, 'page.projects.carouselLabel'),
    otherTitle: t(locale, 'page.projects.other'),
    otherEmptyText: t(locale, 'page.projects.otherEmpty'),
    featuredProjects: getFeaturedProjects(locale, 3),
    otherProjects: getOtherProjects(locale, 3)
  };
}

export function getHomeContent(locale: Locale): HomeContent {
  const site = getSiteConfig(locale);
  return {
    eyebrow: t(locale, 'page.home.eyebrow'),
    title: pick(siteData.homeTitle, locale),
    headline: pick(siteData.homeSubtitle, locale),
    summary: site.description,
    heroImage: site.defaultImage,
    actions: [
      {
        label: t(locale, 'button.viewProject'),
        href: getLocalizedPath('/projects', locale),
        variant: 'primary'
      },
      {
        label: t(locale, 'button.contact'),
        href: getLocalizedPath('/contact', locale),
        variant: 'secondary'
      }
    ],
    featuredTitle: t(locale, 'page.home.featured'),
    featuredDescription: t(locale, 'page.home.featuredDesc'),
    featuredProjects: getFeaturedProjects(locale)
  };
}

export function getContactContent(locale: Locale): ContactContent {
  const site = getSiteConfig(locale);
  const contactItems = [
    {
      label: 'Email',
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`
    },
    {
      label: 'GitHub',
      value: 'github.com/007zsr',
      href: profile.contact.github,
      external: true
    },
    {
      label: 'LinkedIn',
      value: 'LinkedIn',
      href: profile.contact.linkedin,
      external: true
    },
    {
      label: locale === 'zh' ? '网站' : 'Website',
      value: site.temporaryUrl.replace(/^https?:\/\//, ''),
      href: site.temporaryUrl,
      external: true
    }
  ].filter((item) => usableHref(item.href));

  return {
    eyebrow: t(locale, 'nav.contact'),
    title: t(locale, 'page.contact.title'),
    description: t(locale, 'page.contact.desc'),
    items: contactItems
  };
}

export function getFooterContent(locale: Locale) {
  const contact = getContactContent(locale);
  return {
    links: contact.items.filter((item) => item.label === 'Email' || item.label === 'GitHub')
  };
}

export function getSeoMeta(route: RouteKey, locale: Locale): SeoMeta {
  const site = getSiteConfig(locale);
  const routeMeta: Record<RouteKey, SeoMeta> = {
    home: {
      description: site.description,
      image: site.defaultImage
    },
    projects: {
      title: t(locale, 'nav.projects'),
      description: t(locale, 'page.projects.desc'),
      image: site.defaultImage
    },
    contact: {
      title: t(locale, 'nav.contact'),
      description: t(locale, 'page.contact.desc'),
      image: site.defaultImage
    },
    notFound: {
      title: t(locale, 'page.notFound.title'),
      description: t(locale, 'page.notFound.desc'),
      image: site.defaultImage
    }
  };

  return routeMeta[route];
}
