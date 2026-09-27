import { urlFor } from '../../services/sanity/image';

interface HeaderProps {
  author: {
    name: string;
    avatar?: Parameters<typeof urlFor>[0];
    role?: string;
    bio?: string;
  };

  totalPosts: number;
}

export default function Header({ author, totalPosts }: HeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100 via-zinc-950 to-zinc-950 dark:from-zinc-800/80 dark:via-zinc-950 dark:to-black p-6 sm:p-10 shadow-xl transition-all duration-300">
      {/* Aksen Pendaran Cahaya Putih (Radial Glow 20%) di Atas Kiri */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-white/20 dark:bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center sm:flex-row sm:items-start gap-6 text-center sm:text-left">
        {/* Avatar Penulis */}
        <div className="relative shrink-0">
          {author.avatar ? (
            <img
              src={urlFor(author.avatar).width(200).height(200).url()}
              alt={author.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
          ) : (
            <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-2xl font-bold text-white">
              {author.name?.charAt(0) || 'A'}
            </div>
          )}
        </div>

        {/* Informasi Penulis */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {author.name}
            </h1>

            {/* Badge Role */}
            {author.role && (
              <span className="inline-self-center sm:inline-self-auto rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-200 border border-white/15">
                {author.role}
              </span>
            )}
          </div>

          {/* Biografi Penulis */}
          {author.bio && (
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl font-normal">
              {author.bio}
            </p>
          )}

          {/* Garis Pemisah & Metadata */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-center sm:justify-start gap-6 text-xs text-zinc-400">
            <div>
              Dipublikasikan:{' '}
              <span className="font-semibold text-white">
                {totalPosts} Artikel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
