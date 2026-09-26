import { useEffect } from 'react';
import { setSeoMeta } from '../lib/seo';
import {
  IoIosCheckmarkCircleOutline,
  IoIosRefresh,
  IoIosGlobe,
  IoIosPaperPlane,
} from 'react-icons/io';

export default function EditorialPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Redaksi',
      description:
        'Prinsip editorial, standar koreksi, dan struktur redaksi 352.IDN.',
    });
  }, []);

  const editorialPoints = [
    {
      icon: IoIosCheckmarkCircleOutline,
      title: 'Prinsip Editorial',
      description:
        '352.IDN berkomitmen menyajikan berita yang akurat, berimbang, dan dapat dipertanggungjawabkan. Setiap berita melalui proses verifikasi dan penyuntingan ketat sebelum dipublikasikan.',
    },
    {
      icon: IoIosRefresh,
      title: 'Standar Koreksi',
      description:
        'Jika terdapat kekeliruan atau fakta baru dalam pemberitaan, redaksi akan segera melakukan pembaruan/koreksi transparan dan mencantumkan catatannya pada artikel terkait.',
    },
    {
      icon: IoIosGlobe,
      title: 'Sumber Berita',
      description:
        'Informasi disadur dan dirangkum dari sumber-sumber resmi terverifikasi serta saluran media sosial terakreditasi untuk memastikan Anda mendapatkan fakta dan inti berita paling relevan.',
    },
  ];

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      {/* Header Section */}
      <h1 className="text-3xl font-semibold text-text mb-2 font-serif">
        Pedoman Redaksi
      </h1>
      <p className="text-text-secondary mb-8">
        Komitmen dan standar kredibilitas jurnalistik 352.IDN dalam menyajikan
        informasi berkualitas kepada pembaca.
      </p>

      {/* Grid Prinsip Editorial */}
      <div className="grid gap-4 sm:grid-cols-1 mb-8">
        {editorialPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text mb-1">
                  {point.title}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner Kontak Redaksi */}
      <div className="rounded-xl border border-border bg-surface p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex items-start gap-4">
          <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0 hidden sm:block">
            <IoIosPaperPlane className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">
              Punya Pertanyaan Redaksi?
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Ingin mengajukan hak jawab, koreksi berita, atau pers release?
              Hubungi tim redaksi kami.
            </p>
          </div>
        </div>
        <a
          href="/kontak"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-text-on-primary transition-colors hover:bg-primary-hover shrink-0"
        >
          Hubungi Redaksi
        </a>
      </div>
    </div>
  );
}
