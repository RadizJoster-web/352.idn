/**
 * Ads Components
 *
 * Komponen iklan Google AdSense untuk portal 352.IDN.
 *
 * Penggunaan:
 * ```tsx
 * import GoogleAd from '../components/Ads/GoogleAd';
 *
 * <GoogleAd type="square" />    // Sidebar atas
 * <GoogleAd type="vertikal" />  // Sidebar bawah
 * <GoogleAd type="list" />      // Disisipkan di article list
 * <GoogleAd type="article" />   // In-article (auto placement Google)
 * ```
 */

export { default as GoogleAd } from './GoogleAd';
export type { GoogleAdType } from './GoogleAd';
