import translations from '../data/i18n.json';
import siteConfig from '../data/site.json';

export type Locale = 'zh' | 'en';
export type LocalizedText = string | Partial<Record<Locale, string>>;

export const defaultLocale = siteConfig.defaultLocale as Locale;
export const locales = siteConfig.locales as Locale[];

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : defaultLocale;
}

export function localePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized === '/en' ? '/' : normalized.replace(/^\/en(?=\/|$)/, '') || '/';
  }
  const base = normalized.replace(/^\/en(?=\/|$)/, '') || '/';
  return base === '/' ? '/en' : `/en${base}`;
}

export function alternateLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  const targetLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  return localePath(pathname, targetLocale);
}

export function t(locale: Locale, key: string): string {
  const table = translations[locale] ?? translations[defaultLocale];
  return table[key as keyof typeof table] ?? translations.en[key as keyof typeof translations.en] ?? key;
}

export function pick(value: LocalizedText | undefined, locale: Locale): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value[defaultLocale] ?? value.en ?? '';
}

export function htmlLang(locale: Locale): string {
  return locale === 'zh' ? 'zh-CN' : 'en';
}
