import AdBanner from './AdBanner';

/**
 * Medium Rectangle (300x250)
 * Ukuran paling populer dan sering digunakan di sidebar.
 * Cocok untuk sidebar, antara konten, dan posisi in-article.
 */
type AdMediumRectangleProps = {
  slot?: string;
  className?: string;
};

export default function AdMediumRectangle({
  slot,
  className,
}: AdMediumRectangleProps) {
  return (
    <AdBanner
      size="300x250"
      slot={slot}
      className={className}
      label="Medium Rectangle"
    />
  );
}
