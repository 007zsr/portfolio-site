import siteConfig from '../data/site.json';

export { siteConfig };

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName;
}
