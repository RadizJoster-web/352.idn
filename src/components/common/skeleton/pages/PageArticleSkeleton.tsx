import { TextBody, SidebarCol } from '../SkeletonAtomics';

export default function PageArticleSkeleton() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px]">
          <div className="space-y-4 mb-6">
            <div className="h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
          <div className="aspect-video w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-8" />
          <div className="space-y-6">
            <TextBody />
            <TextBody />
            <TextBody />
          </div>
        </div>
        <aside className="hidden lg:block">
          <SidebarCol />
        </aside>
      </div>
    </div>
  );
}
