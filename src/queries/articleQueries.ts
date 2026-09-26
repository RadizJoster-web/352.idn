import type { ArticleDetail, ArticleListItem } from '../types/article'
import { sanityFetch } from '../services/sanity/fetcher'

const ARTICLE_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  hot,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name }
}`

const ARTICLE_DETAIL_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  content,
  hot,
  seoTitle,
  seoDescription,
  seoImage,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, avatar, bio, socialLinks }
}`

export function fetchHeroArticle() {
  return sanityFetch<ArticleListItem | null>(
    `*[_type == "article" && featured == true && defined(slug.current)] | order(publishedAt desc)[0] ${ARTICLE_LIST_PROJECTION}`
  )
}

export function fetchHotArticles(limit = 4) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && hot == true && defined(slug.current)] | order(publishedAt desc)[0...${limit}] ${ARTICLE_LIST_PROJECTION}`
  )
}

export function fetchTopStories(limit = 4) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && defined(slug.current) && featured != true && hot != true] | order(publishedAt desc)[0...${limit}] ${ARTICLE_LIST_PROJECTION}`
  )
}

export function fetchTimnasArticles(limit = 4) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && defined(slug.current) && category->slug.current == "timnas-indonesia"] | order(publishedAt desc)[0...${limit}] ${ARTICLE_LIST_PROJECTION}`
  )
}

export function fetchLatestArticles(start = 0, end = 10) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && defined(slug.current)] | order(publishedAt desc)[$start...$end] ${ARTICLE_LIST_PROJECTION}`,
    { start, end }
  )
}

export function fetchArticleBySlug(slug: string) {
  return sanityFetch<ArticleDetail | null>(
    `*[_type == "article" && slug.current == $slug][0] ${ARTICLE_DETAIL_PROJECTION}`,
    { slug }
  )
}

export function fetchRelatedArticles(categorySlug: string, excludeId: string, limit = 4) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && category->slug.current == $categorySlug && _id != $excludeId && defined(slug.current)] | order(publishedAt desc)[0...${limit}] ${ARTICLE_LIST_PROJECTION}`,
    { categorySlug, excludeId }
  )
}

export function fetchSearchArticles(query: string, start = 0, end = 10) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && defined(slug.current) && (title match $query || excerpt match $query)] | order(publishedAt desc)[$start...$end] ${ARTICLE_LIST_PROJECTION}`,
    { query: `${query}*`, start, end }
  )
}

export function fetchSearchCount(query: string) {
  return sanityFetch<number>(
    `count(*[_type == "article" && defined(slug.current) && (title match $query || excerpt match $query)])`,
    { query: `${query}*` }
  )
}

export function fetchCategoryArticles(categorySlug: string, start = 0, end = 10) {
  return sanityFetch<ArticleListItem[]>(
    `*[_type == "article" && defined(slug.current) && category->slug.current == $categorySlug] | order(publishedAt desc)[$start...$end] ${ARTICLE_LIST_PROJECTION}`,
    { categorySlug, start, end }
  )
}

export function fetchCategoryArticleCount(categorySlug: string) {
  return sanityFetch<number>(
    `count(*[_type == "article" && defined(slug.current) && category->slug.current == $categorySlug])`,
    { categorySlug }
  )
}
