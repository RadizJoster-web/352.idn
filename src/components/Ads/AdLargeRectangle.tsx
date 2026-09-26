import AdBanner from './AdBanner';

/**
 * Large Rectangle (336x280)
 * Variasi lebih besar dari Medium Rectangle.
 * Cocok untuk sidebar yang lebih lebar.
 */
type AdLargeRectangleProps = {
  slot?: string;
  className?: string;
};

export default function AdLargeRectangle({
  slot,
  className,
}: AdLargeRectangleProps) {
  return (
    <AdBanner
      size="336x280"
      slot={slot}
      className={className}
      label="Large Rectangle"
    />
  );
}
