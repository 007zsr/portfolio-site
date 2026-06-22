import links from '../data/links.json';
import papers from '../data/papers.json';
import videos from '../data/videos.json';
import { pick, type Locale, type LocalizedText } from './i18n';

export type Paper = (typeof papers)[number];
export type Video = (typeof videos)[number];
export type LinkItem = (typeof links)[number];
export type ContentKind = 'papers' | 'videos' | 'links';

export const publicPapers = papers.filter((item) => item.visibility === 'public');
export const publicVideos = videos.filter((item) => item.visibility === 'public');
export const publicLinks = links.filter((item) => item.visibility === 'public');

export const featuredPapers = publicPapers.filter((item) => item.featured);
export const featuredVideos = publicVideos.filter((item) => item.featured);
export const featuredLinks = publicLinks.filter((item) => item.featured);

function localized(value: LocalizedText, locale: Locale) {
  return pick(value, locale);
}

export function localizePaper(item: Paper, locale: Locale) {
  return {
    ...item,
    topic: localized(item.topic, locale),
    summary: localized(item.summary, locale),
    notes: localized(item.notes, locale)
  };
}

export function localizeVideo(item: Video, locale: Locale) {
  return {
    ...item,
    title: localized(item.title, locale),
    summary: localized(item.summary, locale)
  };
}

export function localizeLink(item: LinkItem, locale: Locale) {
  return {
    ...item,
    title: localized(item.title, locale),
    summary: localized(item.summary, locale),
    category: localized(item.category, locale)
  };
}

export function getPaperBySlug(slug: string) {
  return publicPapers.find((item) => item.slug === slug);
}

export function getVideoBySlug(slug: string) {
  return publicVideos.find((item) => item.slug === slug);
}

export function getLinkBySlug(slug: string) {
  return publicLinks.find((item) => item.slug === slug);
}
