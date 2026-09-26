import { useEffect } from 'react';
import { setSeoMeta } from '../lib/seo';
import {
  IoIosCheckmark,
  IoIosCheckmarkCircleOutline,
  IoIosChatboxes,
  IoIosRefresh,
  IoIosTrash,
  IoIosMegaphone,
  IoIosPaper,
  IoIosHelpCircle,
} from 'react-icons/io';

export default function CyberGuidelinePage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Pedoman Media Siber',
      description:
        'Pedoman pemberitaan media siber dan standar etika publikasi 352.IDN.',
    });
  }, []);

  const guidelines = [
    {
      icon: IoIosCheckmark,
      title: '1. Ruang Lingkup & Prinsip Utamanya',
      description:
        '352.IDN beroperasi sebagai media siber yang menghormati kemerdekaan berpendapat dan pers sesuai UU No. 40 Tahun 1999. Seluruh publikasi dikurasi serta dirangkum dengan asas profesionalisme dan kode etik jurnalistik.',
    },
    {
      icon: IoIosCheckmarkCircleOutline,
      title: '2. Verifikasi & Keberimbangan Berita',
      description:
        'Informasi yang disajikan disadur dari sumber resmi, saluran media sosial terakreditasi, dan kanal berita tepercaya. Jika terdapat informasi mendesak yang belum sepenuhnya terverifikasi, redaksi akan mencantumkan keterangan khusus dan memperbaruinya secara berkala.',
    },
    {
      icon: IoIosChatboxes,
      title: '3. Konten Pembaca & Komentar (UGC)',
      description:
        'Komentar atau postingan pengguna tidak boleh memuat fitnah,ujaran kebencian, SARA, diskriminasi, maupun kekerasan. Redaksi berhak menyunting atau menghapus interaksi pembaca yang melanggar ketentuan.',
    },
    {
      icon: IoIosRefresh,
      title: '4. Ralat, Koreksi, & Hak Jawab',
      description:
        'Setiap kekeliruan fakta akan segera diperbaiki melalui mekanisme ralat/koreksi transparan yang ditautkan langsung pada artikel terkait, lengkap dengan waktu pembaruannya.',
    },
    {
      icon: IoIosTrash,
      title: '5. Pencabutan Berita',
      description:
        'Artikel yang telah terbit tidak dapat dicabut secara sepihak, kecuali berkaitan dengan masalah SARA, kesusilaan, perlindungan anak/korban, atau atas arahan khusus dari Dewan Pers.',
    },
    {
      icon: IoIosMegaphone,
      title: '6. Tranparansi Iklan & Sponsor',
      description:
        '352.IDN memisahkan secara tegas antara konten editorial dan iklan. Artikel berbayar atau kemitraan akan diberi label yang jelas seperti "Advertorial", "Sponsor", atau "Iklan".',
    },
    {
      icon: IoIosPaper,
      title: '7. Hak Cipta & Sumber Informasi',
      description:
        'Kami menghormati hak cipta dan kepemilikan intelektual. Pengutipan dari sumber eksternal dilakukan secara sah dengan selalu mencantumkan kredit atau tautan ke sumber asli.',
    },
  ];

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      {/* Header Section */}
      <h1 className="text-3xl font-semibold text-text mb-2 font-serif">
        Pedoman Media Siber
      </h1>
      <p className="text-text-secondary mb-8">
        Standar etika, ketentuan pemberitaan, dan transparansi publikasi konten
        pada platform 352.IDN.
      </p>

      {/* List Card Pedoman */}
      <div className="grid gap-4 sm:grid-cols-1 mb-8">
        {guidelines.map((item, index) => {
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

      {/* Box Penyesuaian & Penyelesaian Sengketa */}
      <div className="rounded-xl border border-border bg-surface p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex items-start gap-3">
          <IoIosHelpCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-semibold text-text mb-1">
              Penyelesaian Sengketa
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Pedoman ini disusun berpatokan pada Pedoman Pemberitaan Media
              Siber yang ditetapkan oleh Dewan Pers. Penilaian akhir atas
              sengketa mengenai pelaksanaan pedoman ini diselesaikan melalui
              mekanimse Dewan Pers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
