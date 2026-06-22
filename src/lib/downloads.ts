import downloadLocales from '../data/downloadLocales.json';
import downloads from '../data/downloads.json';
import { pick, type Locale } from './i18n';

export type Download = (typeof downloads)[number];

export const publicDownloads = downloads.filter((download) => download.visibility === 'public');

export function localizeDownload(download: Download, locale: Locale) {
  const text = downloadLocales[download.id as keyof typeof downloadLocales];

  return {
    ...download,
    title: pick(text?.title ?? download.title, locale),
    category: pick(text?.category ?? download.category, locale),
    size: pick(text?.size ?? download.size, locale)
  };
}
