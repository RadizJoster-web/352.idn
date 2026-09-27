import { SearchBar, List, SidebarCol } from '../SkeletonAtomics';

export default function PageSearchSkeleton() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px]">
          <SearchBar />
          <div className="space-y-4 divide-y divide-border">
            <List />
            <List />
            <List />
            <List />
            <List />
          </div>
        </div>
        <aside className="hidden lg:block">
          <SidebarCol />
        </aside>
      </div>
    </div>
  );
}
