import AdBanner from './AdBanner';

/**
 * Responsive Ad
 * Mengikuti lebar container induk.
 * Cocok untuk posisi yang fleksibel.
 */
type AdResponsiveProps = {
  slot?: string;
  className?: string;
};

export default function AdResponsive({ slot, className }: AdResponsiveProps) {
  return (
    <AdBanner
      size="responsive"
      slot={slot}
      className={className}
      label="Responsive Ad"
    />
  );
}
