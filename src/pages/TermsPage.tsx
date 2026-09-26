import { useEffect } from 'react';
import { setSeoMeta } from '../lib/seo';

export default function TermsPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Terms of Service',
      description: 'Syarat dan ketentuan penggunaan 352.IDN.',
    });
  }, []);

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-text mb-6 font-serif">
        Terms of Service
      </h1>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <h2 className="text-xl font-semibold text-text">Penggunaan Website</h2>
        <p>
          Dengan mengakses 352.IDN, Anda menyetujui untuk mematuhi syarat dan
          ketentuan berikut.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Hak Konten</h2>
        <p>
          Seluruh konten yang dipublikasikan di 352.IDN dilindungi hak cipta.
          Dilarang menyalin, mendistribusikan, atau mereproduksi konten tanpa
          izin tertulis.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">
          Larangan Penggunaan
        </h2>
        <p>
          Dilarang menggunakan website ini untuk tujuan ilegal, menyebarkan
          konten berbahaya, atau mengganggu operasional website.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Ketentuan Layanan</h2>
        <p>
          352.IDN berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
          Perubahan akan dipublikasikan pada halaman ini.
        </p>
      </div>
    </div>
  );
}
