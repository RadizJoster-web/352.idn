import { useEffect } from 'react';
import { setSeoMeta } from '../lib/seo';
import {
  IoIosWarning,
  IoIosInformationCircleOutline,
  IoIosLink,
  IoIosStats,
} from 'react-icons/io';

export default function DisclaimerPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Disclaimer',
      description: 'Sanggahan dan batasan tanggung jawab informasi 352.IDN.',
    });
  }, []);

  const disclaimerItems = [
    {
      icon: IoIosWarning,
      title: 'Akurasi Informasi',
      description:
        '352.IDN berusaha menyajikan informasi yang akurat dan terpercaya dari berbagai sumber terakreditasi. Namun, kami tidak menjamin kelengkapan atau kebenaran mutlak atas seluruh materi yang dipublikasikan.',
    },
    {
      icon: IoIosInformationCircleOutline,
      title: 'Pembaruan Berita',
      description:
        'Informasi dan isu olahraga dapat berkembang dengan cepat. Kami berhak melakukan pembaruan, perbaikan, atau koreksi pada artikel seiring bertambahnya data dan fakta baru.',
    },
    {
      icon: IoIosLink,
      title: 'Tautan Eksternal',
      description:
        'Situs ini dapat memuat tautan menuju situs web pihak ketiga. 352.IDN tidak memiliki kontrol dan tidak bertanggung jawab atas isi, kebijakan privasi, atau konten dari situs eksternal tersebut.',
    },
    {
      icon: IoIosStats,
      title: 'Layanan Pihak Ketiga',
      description:
        'Data statistik, skor, dan jadwal pertandingan bersumber dari penyedia data atau widget pihak ketiga. Keakuratan serta pembaruan data real-time sepenuhnya bergantung pada penyedia layanan terkait.',
    },
  ];

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      {/* Header Section */}
      <h1 className="text-3xl font-semibold text-text mb-2 font-serif">Disclaimer</h1>
      <p className="text-text-secondary mb-8">
        Batasan tanggung jawab dan ketentuan penggunaan informasi pada platform
        352.IDN.
      </p>

      {/* Grid Card Disclaimer */}
      <div className="grid gap-4 sm:grid-cols-1 mb-8">
        {disclaimerItems.map((item, index) => {
          const Icon = item.icon;
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
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Box Catatan Penting */}
      <div className="rounded-xl border border-border bg-surface p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <h2 className="text-base font-semibold text-text mb-2">
          Pemberitahuan Hak Cipta & Penggunaan
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Seluruh isi artikel disadur dan dikurasi untuk tujuan informasi umum.
          Dengan menggunakan platform 352.IDN, Anda menyetujui batasan tanggung
          jawab yang tertuang pada halaman ini.
        </p>
      </div>
    </div>
  );
}
