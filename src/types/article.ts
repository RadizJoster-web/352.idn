import type { SanityImageSource } from '@sanity/image-url'

export type ArticleListItem = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  mainImage: SanityImageSource
  hot?: boolean
  category: {
    title: string
    slug: string
  }
  author: {
    name: string
  }
}

export type ArticleDetail = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  mainImage: SanityImageSource
  content: unknown[]
  hot?: boolean
  seoTitle?: string
  seoDescription?: string
  seoImage?: SanityImageSource
  category: {
    title: string
    slug: string
  }
  author: {
    name: string
    slug: string
    avatar?: SanityImageSource
    bio?: string
    socialLinks?: { platform: string; url: string }[]
  }
}
