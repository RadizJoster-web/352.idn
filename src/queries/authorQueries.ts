import type { Author } from '../types/author'
import { sanityFetch } from '../services/sanity/fetcher'

export function fetchAuthorBySlug(slug: string) {
  return sanityFetch<Author | null>(
    `*[_type == "author" && slug.current == $slug][0] { _id, name, "slug": slug.current, avatar, bio, role, socialLinks }`,
    { slug }
  )
}
