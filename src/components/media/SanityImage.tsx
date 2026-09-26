import type { SanityImageSource } from '@sanity/image-url'
import { urlFor, IMAGE_WIDTHS, type ImagePreset } from '../../services/sanity/image'

type SanityImageProps = {
  source: SanityImageSource
  alt: string
  preset?: ImagePreset
  width?: number
  className?: string
  priority?: boolean
}

export default function SanityImage({
  source,
  alt,
  preset = 'card',
  width,
  className = '',
  priority = false,
}: SanityImageProps) {
  const w = width || IMAGE_WIDTHS[preset]
  const url = urlFor(source).width(w).auto('format').fit('crop').url()

  return (
    <img
      src={url}
      alt={alt}
      width={w}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      className={`object-cover ${className}`}
    />
  )
}
