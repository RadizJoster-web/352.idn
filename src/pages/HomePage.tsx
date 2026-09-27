import HomeFeature from '../features/home';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Berita Sepak Bola Terkini" 
        description="352.IDN - Portal berita sepak bola terpercaya. Berita terkini, skor pertandingan, dan analisis mendalam." 
        slug="" 
      />
      <HomeFeature />
    </>
  );
}
