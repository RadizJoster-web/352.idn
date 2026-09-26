import { SITE_NAME } from './constants'

type SeoParams = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

export function setSeoMeta(params: SeoParams) {
  const fullTitle = params.title ? `${params.title} | ${SITE_NAME}` : SITE_NAME
  document.title = fullTitle

  setMeta('description', params.description || '')
  setMeta('og:title', fullTitle)
  setMeta('og:description', params.description || '')
  setMeta('og:type', params.ogType || 'website')
  setMeta('og:site_name', SITE_NAME)
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', fullTitle)
  setMeta('twitter:description', params.description || '')

  if (params.ogImage) {
    setMeta('og:image', params.ogImage)
    setMeta('twitter:image', params.ogImage)
  }
  if (params.canonical) {
    setLink('canonical', params.canonical)
  }
  if (params.publishedTime) {
    setMeta('article:published_time', params.publishedTime)
  }
  if (params.modifiedTime) {
    setMeta('article:modified_time', params.modifiedTime)
  }
  if (params.author) {
    setMeta('article:author', params.author)
  }
  if (params.section) {
    setMeta('article:section', params.section)
  }
}

function setMeta(property: string, content: string) {
  const isOg = property.startsWith('og:') || property.startsWith('article:') || property.startsWith('twitter:')
  const attr = isOg ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function setJsonLd(data: Record<string, unknown>) {
  const id = 'json-ld-structured'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}
