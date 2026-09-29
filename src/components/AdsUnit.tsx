import React, { useEffect } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style = { display: 'block' },
  className = '',
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-5018559112243650"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
        {...(adLayoutKey ? { 'data-ad-layout-key': adLayoutKey } : {})}
        data-full-width-responsive="true"
      />
    </div>
  );
};
