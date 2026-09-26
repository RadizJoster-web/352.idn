import { Link } from 'react-router-dom';

export default function SiteLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
      aria-label="352.IDN - Beranda"
    >
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-primary">352</span>
        <span className="text-dark">.IDN</span>
      </span>
    </Link>
  );
}
