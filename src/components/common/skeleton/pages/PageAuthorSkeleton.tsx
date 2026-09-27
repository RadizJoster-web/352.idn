import { AuthorProfile, List } from '../SkeletonAtomics';

export default function PageAuthorSkeleton() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <AuthorProfile />
        <div className="h-6 w-40 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
        <div className="space-y-4 divide-y divide-border">
          <List />
          <List />
          <List />
          <List />
        </div>
      </div>
    </div>
  );
}
