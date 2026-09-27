export default function PageContactSkeleton() {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      {/* Title Placeholder */}
      <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
      {/* Description Placeholder */}
      <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-8" />

      {/* Grid untuk Kotak Info / Input Form */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="h-24 w-full rounded-lg border border-border bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-24 w-full rounded-lg border border-border bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Tombol Submit / Pesan Opsional */}
      <div className="h-12 w-1/3 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
