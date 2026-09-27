import { TextBody } from '../SkeletonAtomics';

export default function PageSimpleSkeleton() {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      {/* Main Title */}
      <div className="h-10 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 mb-8" />

      {/* Paragraf-paragraf panjang */}
      <div className="space-y-10">
        <TextBody />
        <TextBody />
        <TextBody />
      </div>
    </div>
  );
}
