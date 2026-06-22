import { pick, type Locale, type LocalizedText } from './i18n';

export type Article = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  date: string;
  category: LocalizedText;
  tags: string[];
  visibility: string;
  featured: boolean;
  languageStatus: Partial<Record<Locale, string>>;
  Content: any;
};

type ArticleModule = {
  frontmatter: Omit<Article, 'Content'>;
  Content: any;
};

const modules = import.meta.glob<ArticleModule>('../content/articles/*.md', {
  eager: true
});

export const allArticles = Object.values(modules)
  .map((module) => ({
    ...module.frontmatter,
    tags: module.frontmatter.tags ?? [],
    featured: Boolean(module.frontmatter.featured),
    languageStatus: module.frontmatter.languageStatus ?? {},
    Content: module.Content
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const publicArticles = allArticles.filter((article) => article.visibility === 'public');

export const featuredArticles = publicArticles.filter((article) => article.featured);

export function getArticleBySlug(slug: string) {
  return publicArticles.find((article) => article.slug === slug);
}

export function localizeArticle(article: Article, locale: Locale) {
  return {
    ...article,
    title: pick(article.title, locale),
    summary: pick(article.summary, locale),
    category: pick(article.category, locale),
    languageStatus: article.languageStatus[locale] ?? 'draft'
  };
}
