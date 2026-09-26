import { FaFacebookF as Facebook, FaXTwitter as Twitter, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa6'

const ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
}

type SocialIconsProps = {
  links?: { platform: string; url: string }[]
  className?: string
}

const DEFAULT_LINKS = [
  { platform: 'facebook', url: '#' },
  { platform: 'twitter', url: '#' },
  { platform: 'instagram', url: '#' },
  { platform: 'youtube', url: '#' },
]

export default function SocialIcons({ links = DEFAULT_LINKS, className = '' }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ platform, url }) => {
        const Icon = ICONS[platform]
        if (!Icon) return null
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="text-text-on-dark/70 transition-colors hover:text-text-on-dark"
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
}
