import { formatTimeAgo } from '../../lib/formatTimeAgo';

type TimeAgoProps = {
  date: string;
  className?: string;
};

export default function TimeAgo({ date, className = '' }: TimeAgoProps) {
  return (
    <time dateTime={date} className={`text-text-muted ${className}`}>
      {formatTimeAgo(date)}
    </time>
  );
}
