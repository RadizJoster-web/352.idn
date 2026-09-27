import { ImageResponse } from '@vercel/og';
import type { Handler, HandlerEvent } from '@netlify/functions';
import React from 'react';

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const { title, image } = event.queryStringParameters || {};

    const fallbackImage = 'https://352.idn/default-og.jpg'; // fallback
    const bgImage = image || fallbackImage;
    const titleText = title || 'Berita Sepak Bola Terkini';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Overlay for readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)',
            }}
          />
          
          {/* Logo / Watermark */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0EA5E9', // Tailwind primary color
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            <span style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>
              352.IDN
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              padding: '60px 40px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                margin: 0,
              }}
            >
              {titleText}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    ) as any;
  } catch (e: any) {
    console.error(e);
    return {
      statusCode: 500,
      body: 'Failed to generate OG image',
    };
  }
};
