type SkeletonProps = {
  variant?: 'card' | 'list' | 'hero' | 'body' | 'line';
  count?: number;
};

export default function LoadingSkeleton({
  variant = 'card',
  count = 1,
}: SkeletonProps) {
  return (
    <div className="animate-pulse" role="status" aria-label="Memuat konten">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderVariant(variant)}</div>
      ))}
      <span className="sr-only">Memuat...</span>
    </div>
  );
}

function renderVariant(variant: string) {
  switch (variant) {
    case 'hero':
      return (
        <div className="rounded-lg bg-dark/10 p-6 space-y-4">
          <div className="h-64 rounded-md bg-dark/10" />
          <div className="h-8 w-3/4 rounded bg-dark/10" />
          <div className="h-4 w-1/2 rounded bg-dark/10" />
        </div>
      );
    case 'list':
      return (
        <div className="flex gap-4 py-4 border-b border-border">
          <div className="h-20 w-28 shrink-0 rounded-md bg-dark/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-dark/10" />
            <div className="h-3 w-1/3 rounded bg-dark/10" />
          </div>
        </div>
      );
    case 'body':
      return (
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-dark/10" />
          <div className="h-4 w-5/6 rounded bg-dark/10" />
          <div className="h-4 w-4/5 rounded bg-dark/10" />
          <div className="h-4 w-full rounded bg-dark/10" />
          <div className="h-4 w-2/3 rounded bg-dark/10" />
        </div>
      );
    case 'line':
      return <div className="h-4 w-full rounded bg-dark/10" />;
    default:
      return (
        <div className="rounded-lg overflow-hidden">
          <div className="aspect-video bg-dark/10" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-dark/10" />
            <div className="h-3 w-1/2 rounded bg-dark/10" />
          </div>
        </div>
      );
  }
}
