import AdBanner from './AdBanner';

/**
 * Mobile Banner (320x50) dan Large Mobile Banner (320x100)
 * Format iklan khusus untuk tampilan mobile.
 */
type AdMobileBannerProps = {
  /** 'small' = 320x50, 'large' = 320x100 */
  variant?: 'small' | 'large';
  slot?: string;
  className?: string;
};

export default function AdMobileBanner({
  variant = 'large',
  slot,
  className,
}: AdMobileBannerProps) {
  return (
    <AdBanner
      size={variant === 'small' ? '320x50' : '320x100'}
      slot={slot}
      className={className}
      label={variant === 'small' ? 'Mobile Banner' : 'Large Mobile Banner'}
    />
  );
}
