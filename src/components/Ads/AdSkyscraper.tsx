import AdBanner from './AdBanner';

/**
 * Wide Skyscraper (160x600)
 * Format iklan vertikal yang ramping.
 * Cocok untuk sidebar yang lebih sempit.
 */
type AdSkyscraperProps = {
  slot?: string;
  className?: string;
};

export default function AdSkyscraper({ slot, className }: AdSkyscraperProps) {
  return (
    <AdBanner
      size="160x600"
      slot={slot}
      className={className}
      label="Skyscraper"
    />
  );
}
