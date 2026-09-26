/**
 * Ads Components
 * 
 * Kumpulan komponen iklan Google Ads dengan berbagai ukuran standar.
 * Setiap komponen berfungsi sebagai placeholder yang siap diisi
 * dengan kode Google AdSense kapanpun.
 * 
 * Cara penggunaan:
 * 1. Import komponen yang diinginkan
 * 2. Tanpa slot: akan menampilkan placeholder canvas
 * 3. Dengan slot: akan menampilkan container untuk kode AdSense
 * 
 * Contoh:
 * ```tsx
 * // Placeholder (development)
 * <AdMediumRectangle />
 * 
 * // Dengan Google AdSense slot
 * <AdMediumRectangle slot="1234567890" />
 * ```
 */

export { default as AdBanner } from './AdBanner';
export type { AdSize } from './AdBanner';
export { default as AdMediumRectangle } from './AdMediumRectangle';
export { default as AdLargeRectangle } from './AdLargeRectangle';
export { default as AdHalfPage } from './AdHalfPage';
export { default as AdLeaderboard } from './AdLeaderboard';
export { default as AdSkyscraper } from './AdSkyscraper';
export { default as AdMobileBanner } from './AdMobileBanner';
export { default as AdResponsive } from './AdResponsive';
