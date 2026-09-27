import { Hero, Card, SidebarCol } from '../SkeletonAtomics';

export default function PageHomeSkeleton() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4">
      <div className="grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <Hero />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <aside className="hidden lg:block">
          <SidebarCol />
        </aside>
      </div>
    </div>
  );
}
