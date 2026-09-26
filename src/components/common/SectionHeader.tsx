import { Link } from 'react-router-dom';
import { FiChevronRight as ChevronRight } from 'react-icons/fi';

type SectionHeaderProps = {
  title: string;
  href?: string;
  linkText?: string;
};

export default function SectionHeader({
  title,
  href,
  linkText = 'Lihat Semua',
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b-2 border-primary pb-3 mb-6">
      <h2 className="text-xl font-semibold text-text lg:text-xl">{title}</h2>
      {href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          {linkText}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
