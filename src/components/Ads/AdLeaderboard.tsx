import AdBanner from './AdBanner';

/**
 * Leaderboard (728x90)
 * Format iklan horizontal yang lebar.
 * Biasanya digunakan di atas atau bawah konten, bukan sidebar.
 */
type AdLeaderboardProps = {
  slot?: string;
  className?: string;
};

export default function AdLeaderboard({ slot, className }: AdLeaderboardProps) {
  return (
    <AdBanner
      size="728x90"
      slot={slot}
      className={className}
      label="Leaderboard"
    />
  );
}
