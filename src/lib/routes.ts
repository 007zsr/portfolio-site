import { defaultLocale, getLocaleFromPath, t, type Locale } from './i18n';
import type { NavigationItem, RouteKey } from '../types/content';

type PrimaryRoute = {
  key: Exclude<RouteKey, 'notFound'>;
  path: string;
  labelKey: string;
};

export const primaryRoutes: PrimaryRoute[] = [
  { key: 'home', path: '/', labelKey: 'nav.home' },
  { key: 'projects', path: '/projects', labelKey: 'nav.projects' },
  { key: 'contact', path: '/contact', labelKey: 'nav.contact' }
];

export function normalizePath(pathname: string): string {
  const pathOnly = pathname.split('?')[0]?.split('#')[0] || '/';
  const withSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return withSlash.replace(/\/$/, '') || '/';
}

export function stripLocale(pathname: string): string {
  return normalizePath(pathname).replace(/^\/en(?=\/|$)/, '') || '/';
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);

  if (locale === defaultLocale) {
    return base;
  }

  return base === '/' ? '/en' : `/en${base}`;
}

export function getAlternateLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  return getLocalizedPath(pathname, locale === 'zh' ? 'en' : 'zh');
}

export function getRouteKeyFromPath(pathname: string): RouteKey {
  const base = stripLocale(pathname);
  const route = primaryRoutes.find((item) => normalizePath(item.path) === base);
  return route?.key ?? 'notFound';
}

export function getPrimaryNavigation(locale: Locale): NavigationItem[] {
  return primaryRoutes.map((item) => ({
    key: item.key,
    label: t(locale, item.labelKey),
    href: getLocalizedPath(item.path, locale)
  }));
}

export function isPrimaryRoute(pathname: string): boolean {
  const base = stripLocale(pathname);
  return primaryRoutes.some((item) => normalizePath(item.path) === base);
}
