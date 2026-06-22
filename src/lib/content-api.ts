import awards from '../data/awards.json';
import profile from '../data/profile.json';
import siteData from '../data/site.json';
import skills from '../data/skills.json';
import type {
  AboutContent,
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

export function getProjectsContent(locale: Locale): ProjectsContent {
  return {
    eyebrow: t(locale, 'nav.projects'),
    title: t(locale, 'page.projects.title'),
    description: t(locale, 'page.projects.desc'),
    projects: getProjects(locale)
  };
}

export function getFeaturedProjects(locale: Locale): ProjectSummary[] {
  return featuredProjects.map((project) => toProjectSummary(project, locale));
}

export function getHomeContent(locale: Locale): HomeContent {
  const site = getSiteConfig(locale);
  return {
    eyebrow: t(locale, 'page.home.eyebrow'),
    title: profile.name,
    headline: pick(profile.headline, locale),
    summary: pick(profile.summary, locale),
    focusLabel: locale === 'zh' ? '技术方向' : 'Technical focus areas',
    focusTags: skills.flatMap((group) => group.items).slice(0, 8),
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

export function getAboutContent(locale: Locale): AboutContent {
  return {
    eyebrow: t(locale, 'nav.about'),
    title: t(locale, 'page.about.desc'),
    description: pick(profile.summary, locale),
    educationTitle: locale === 'zh' ? '教育背景' : 'Education',
    interestsTitle: locale === 'zh' ? '项目兴趣' : 'Project Interests',
    skillsEyebrow: locale === 'zh' ? '技能' : 'Skills',
    skillsTitle: locale === 'zh' ? '技术工具箱' : 'Technical Toolkit',
    experienceEyebrow: locale === 'zh' ? '经历' : 'Experience',
    experienceTitle: locale === 'zh' ? '奖项与记录' : 'Awards and Notes',
    education: profile.education.map((item) => ({
      school: pick(item.school, locale),
      degree: pick(item.degree, locale),
      period: item.period,
      details: pick(item.details, locale)
    })),
    interests: profile.interests.map((item) => pick(item, locale)),
    skills: skills.map((group) => ({
      group: pick(group.group, locale),
      items: group.items
    })),
    experience: awards.map((item) => ({
      title: pick(item.title, locale),
      issuer: pick(item.issuer, locale),
      year: item.year,
      description: pick(item.description, locale)
    }))
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
    siteName: siteName(locale),
    description: t(locale, 'footer.description'),
    year: new Date().getFullYear(),
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
    about: {
      title: t(locale, 'page.about.title'),
      description: pick(profile.summary, locale),
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
