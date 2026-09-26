import AdBanner from './AdBanner';

/**
 * Half Page / Large Skyscraper (300x600)
 * Format iklan vertikal yang besar.
 * Sangat efektif untuk sidebar karena visibilitas tinggi.
 */
type AdHalfPageProps = {
  slot?: string;
  className?: string;
};

export default function AdHalfPage({ slot, className }: AdHalfPageProps) {
  return (
    <AdBanner
      size="300x600"
      slot={slot}
      className={className}
      label="Half Page"
    />
  );
}
