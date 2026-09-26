import type { SanityImageSource } from '@sanity/image-url'

export type Author = {
  _id: string
  name: string
  slug: string
  avatar?: SanityImageSource
  bio?: string
  role?: string
  socialLinks?: SocialLink[]
}

export type SocialLink = {
  platform: string
  url: string
}
