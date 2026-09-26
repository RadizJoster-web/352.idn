import { Link } from 'react-router-dom';
import SiteLogo from '../components/navigation/SiteLogo';
import { SOCIAL_MEDIA_LINKS } from '../assets/socialMedia';
// import { FOOTER_LINKS } from '../lib/constants';

export function Footer() {
  return (
    // Menggunakan bg-surface agar area footer memiliki pemisah visual halus
    // dari konten utama, dan text-text agar warna dasar teks otomatis adaptif
    <footer className="bg-surface text-text">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center px-4 py-12 ">
        {/* Bagian Logo Tengah */}
        <div className="mb-10 flex justify-center">
          <SiteLogo />
        </div>

        {/* Bagian Media Sosial Tengah */}
        <div className="mb-12 flex gap-4">
          {SOCIAL_MEDIA_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                // Menggunakan border-border dan text-text-muted agar halus
                // Hover diubah ke warna primary agar memberikan interaksi yang lebih modern
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                aria-label={social.platform}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Bagian Bawah: Garis, Daftar Tautan, dan Copyright */}
        <div className="w-full max-w-3xl border-t border-border pt-8 flex flex-col items-center">
          {/* Daftar Tautan */}
          <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm text-text-secondary sm:gap-6">
            <Link
              to="/kontak"
              className="uppercase tracking-wider transition-colors hover:text-primary"
            >
              Kontak
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <Link
              to="/redaksi"
              className="uppercase tracking-wider transition-colors hover:text-primary"
            >
              Redaksi
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <Link
              to="/disclaimer"
              className="uppercase tracking-wider transition-colors hover:text-primary"
            >
              Disclaimer
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <Link
              to="/pedoman-media-siber"
              className="uppercase tracking-wider transition-colors hover:text-primary"
            >
              Pedoman Media Siber
            </Link>
          </div>

          {/* Hak Cipta */}
          {/* Menggunakan text-muted agar tidak mendominasi hierarki visual */}
          <div className="text-center text-xs text-text-muted">
            © {new Date().getFullYear()} 352.IDN. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}
