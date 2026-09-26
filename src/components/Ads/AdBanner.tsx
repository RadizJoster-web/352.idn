import { useEffect, useRef } from 'react';

/**
 * Ukuran standar Google Ads yang umum digunakan.
 * Component ini berfungsi sebagai placeholder/wrapper
 * yang siap diisi dengan kode Google AdSense kapanpun.
 */

export type AdSize =
  | '300x250'   // Medium Rectangle
  | '336x280'   // Large Rectangle
  | '300x600'   // Half Page / Large Skyscraper
  | '160x600'   // Wide Skyscraper
  | '728x90'    // Leaderboard
  | '320x100'   // Large Mobile Banner
  | '320x50'    // Mobile Banner
  | 'responsive'; // Responsive (mengikuti container)

type AdBannerProps = {
  /** Ukuran iklan, contoh: '300x250', '300x600', 'responsive' */
  size: AdSize;
  /** Slot ID dari Google AdSense (opsional, isi nanti) */
  slot?: string;
  /** CSS class tambahan */
  className?: string;
  /** Label untuk testing/development */
  label?: string;
};

const AD_DIMENSIONS: Record<AdSize, { width: number; height: number } | null> = {
  '300x250': { width: 300, height: 250 },
  '336x280': { width: 336, height: 280 },
  '300x600': { width: 300, height: 600 },
  '160x600': { width: 160, height: 600 },
  '728x90': { width: 728, height: 90 },
  '320x100': { width: 320, height: 100 },
  '320x50': { width: 320, height: 50 },
  responsive: null,
};

export default function AdBanner({
  size,
  slot,
  className = '',
  label,
}: AdBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = AD_DIMENSIONS[size];

  // Render placeholder canvas saat belum ada slot iklan
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || slot) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, w, h);

    // Border dashed
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // Diagonal lines untuk menunjukkan area iklan
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.moveTo(w, 0);
    ctx.lineTo(0, h);
    ctx.stroke();

    // Label text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label || `AD ${size}`, w / 2, h / 2 - 8);

    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#b0bec5';
    ctx.fillText('Google Ads Placeholder', w / 2, h / 2 + 10);
  }, [size, slot, label]);

  // Jika sudah ada slot, render container untuk Google AdSense
  if (slot) {
    return (
      <div
        className={`ad-container ${className}`}
        style={
          dimensions
            ? { width: dimensions.width, height: dimensions.height }
            : { width: '100%', minHeight: 100 }
        }
      >
        {/* 
          TODO: Masukkan kode Google AdSense di sini
          Contoh:
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        */}
      </div>
    );
  }

  // Placeholder canvas
  if (size === 'responsive') {
    return (
      <div className={`w-full ${className}`}>
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="w-full rounded-md"
          style={{ aspectRatio: '300 / 100' }}
          aria-label={`Ad placeholder: ${label || 'Responsive'}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center ${className}`}
      style={{ maxWidth: dimensions!.width }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions!.width}
        height={dimensions!.height}
        className="rounded-md"
        aria-label={`Ad placeholder: ${label || size}`}
      />
    </div>
  );
}
