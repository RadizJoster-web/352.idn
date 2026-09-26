import { Link } from 'react-router-dom';

type CategoryBadgeProps = {
  title: string;
  slug?: string;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'soft';
  className?: string;
};

export default function CategoryBadge({
  title,
  slug,
  size = 'sm',
  className,
}: CategoryBadgeProps) {
  const classes = `inline-block font-medium uppercase tracking-wide text-primary ${
    size === 'sm' ? 'text-[11px]' : 'text-xs'
  }${className ? ` ${className}` : ''}`;

  if (slug) {
    return (
      <Link
        to={`/kategori/${slug}`}
        className={`${classes} transition-opacity duration-200 hover:opacity-80`}
      >
        {title}
      </Link>
    );
  }

  return <span className={classes}>{title}</span>;
}
