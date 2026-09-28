import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-5018559112243650';

/**
 * Tipe unit iklan Google Ads yang tersedia.
 * Setiap tipe memiliki slot ID dan konfigurasi format yang berbeda.
 */
export type GoogleAdType = 'square' | 'vertikal' | 'list' | 'article';

type GoogleAdConfig = {
  slot: string;
  format: string;
  layoutKey?: string;
  layout?: string;
  style: React.CSSProperties;
  fullWidthResponsive?: boolean;
};

const AD_CONFIGS: Record<GoogleAdType, GoogleAdConfig> = {
  square: {
    slot: '1898180187',
    format: 'auto',
    style: { display: 'block' },
    fullWidthResponsive: true,
  },
  vertikal: {
    slot: '4803545124',
    format: 'auto',
    style: { display: 'block' },
    fullWidthResponsive: true,
  },
  list: {
    slot: '6840264105',
    format: 'fluid',
    layoutKey: '-ez+5q+5e-d4+4m',
    style: { display: 'block' },
  },
  article: {
    slot: '8209186098',
    format: 'fluid',
    layout: 'in-article',
    style: { display: 'block', textAlign: 'center' as const },
  },
};

type GoogleAdProps = {
  /** Tipe unit iklan */
  type: GoogleAdType;
  /** CSS class tambahan */
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * GoogleAd — Komponen reusable untuk menampilkan unit iklan Google AdSense.
 *
 * Penggunaan:
 * ```tsx
 * <GoogleAd type="square" />
 * <GoogleAd type="vertikal" />
 * <GoogleAd type="list" />
 * <GoogleAd type="article" />
 * ```
 */
export default function GoogleAd({ type, className = '' }: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const config = AD_CONFIGS[type];

  useEffect(() => {
    // Pastikan hanya push sekali per instance
    if (pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div className={`ad-unit ad-${type} ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        {...(config.fullWidthResponsive && {
          'data-full-width-responsive': 'true',
        })}
        {...(config.layoutKey && {
          'data-ad-layout-key': config.layoutKey,
        })}
        {...(config.layout && {
          'data-ad-layout': config.layout,
        })}
      />
    </div>
  );
}
