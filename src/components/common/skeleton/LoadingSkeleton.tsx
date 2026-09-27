import React from 'react';

// Import Atomics
import {
  Title,
  TextBody,
  List,
  Card,
  Hero,
  SidebarCol,
  SearchBar,
  AuthorProfile,
} from './SkeletonAtomics';

// Import Pages
import PageHomeSkeleton from './pages/PageHomeSkeleton';
import PageCategorySkeleton from './pages/PageCategorySkeleton';
import PageArticleSkeleton from './pages/PageArticleSkeleton';
import PageAuthorSkeleton from './pages/PageAuthorSkeleton';
import PageSearchSkeleton from './pages/PageSearchSkeleton';
import PageContactSkeleton from './pages/PageContactSkeleton';
import PageSimpleSkeleton from './pages/PageSimpleSkeleton';

export type SkeletonVariant =
  | 'card'
  | 'list'
  | 'hero'
  | 'body'
  | 'line'
  | 'sidebar'
  | 'author-profile'
  | 'search-bar'
  | 'hot-article'
  | 'title'
  | 'page-home'
  | 'page-category'
  | 'page-article'
  | 'page-author'
  | 'page-search'
  | 'page-contact'
  | 'page-simple';

export type SkeletonProps = {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
};

export default function LoadingSkeleton({
  variant = 'card',
  count = 1,
  className = '',
}: SkeletonProps) {
  const isPageVariant = variant.startsWith('page-');

  const wrapperClass = isPageVariant
    ? `w-full animate-pulse ${className}`
    : `animate-pulse space-y-4 ${className}`;

  function renderVariant() {
    switch (variant) {
      // Atomics
      case 'title':
        return <Title />;
      case 'hero':
        return <Hero />;
      case 'list':
        return <List />;
      case 'body':
        return <TextBody />;
      case 'card':
        return <Card />;
      case 'line':
        return (
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        );
      case 'sidebar':
        return <SidebarCol />;
      case 'search-bar':
        return <SearchBar />;
      case 'author-profile':
        return <AuthorProfile />;
      case 'hot-article':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Card />
            <Card />
            <Card />
          </div>
        );

      // Pages
      case 'page-home':
        return <PageHomeSkeleton />;
      case 'page-category':
        return <PageCategorySkeleton />;
      case 'page-article':
        return <PageArticleSkeleton />;
      case 'page-author':
        return <PageAuthorSkeleton />;
      case 'page-search':
        return <PageSearchSkeleton />;
      case 'page-contact':
        return <PageContactSkeleton />;
      case 'page-simple':
        return <PageSimpleSkeleton />;

      default:
        return <Card />;
    }
  }

  return (
    <div className={wrapperClass} role="status" aria-label="Memuat konten">
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>{renderVariant()}</React.Fragment>
      ))}
      <span className="sr-only">Memuat...</span>
    </div>
  );
}
