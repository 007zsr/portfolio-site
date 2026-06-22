import siteConfig from '../data/site.json';
import type { Locale } from './i18n';
import { defaultLocale, pick } from './i18n';

export { siteConfig };

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function siteName(locale: Locale = defaultLocale) {
  return pick(siteConfig.siteName, locale);
}

export function shortName(locale: Locale = defaultLocale) {
  return pick(siteConfig.shortName, locale);
}

export function siteDescription(locale: Locale = defaultLocale) {
  return pick(siteConfig.siteDescription, locale);
}

export function pageTitle(title?: string, locale: Locale = defaultLocale) {
  return title ? `${title} | ${shortName(locale)}` : siteName(locale);
}
