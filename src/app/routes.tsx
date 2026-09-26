import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import ArticlePage from '../pages/ArticlePage';
import LatestArticlesPage from '../pages/LatestArticlesPage';
import SearchPage from '../pages/SearchPage';
import MatchesPage from '../pages/MatchesPage';
import AboutPage from '../pages/AboutPage';
import EditorialPage from '../pages/EditorialPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import DisclaimerPage from '../pages/DisclaimerPage';
import CyberGuidelinePage from '../pages/CyberGuidelinePage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'kategori/:slug', element: <CategoryPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'jadwal', element: <MatchesPage /> },
      { path: 'artikel/:slug', element: <ArticlePage /> },
      { path: 'artikel-terbaru', element: <LatestArticlesPage /> },
      { path: 'tentang', element: <AboutPage /> },
      { path: 'redaksi', element: <EditorialPage /> },
      { path: 'kontak', element: <ContactPage /> },
      { path: 'privacy-policy', element: <PrivacyPage /> },
      { path: 'terms-of-service', element: <TermsPage /> },
      { path: 'disclaimer', element: <DisclaimerPage /> },
      { path: 'pedoman-media-siber', element: <CyberGuidelinePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
