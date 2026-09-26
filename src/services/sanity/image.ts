import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export const IMAGE_WIDTHS = {
  hero: 1600,
  featured: 900,
  card: 600,
  compact: 320,
  thumbnail: 180,
} as const

export type ImagePreset = keyof typeof IMAGE_WIDTHS
