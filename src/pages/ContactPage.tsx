import { useEffect } from 'react';
import { setSeoMeta } from '../lib/seo';
import { IoIosMail, IoIosCall } from 'react-icons/io';

export default function ContactPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Kontak & Kerja Sama',
      description: 'Hubungi redaksi dan tim bisnis 352.IDN.',
    });
  }, []);

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-text mb-2 font-serif">Kontak Kami</h1>
      <p className="text-text-secondary mb-8">
        Hubungi kami melalui kanal resmi di bawah ini untuk pertanyaan umum,
        redaksi, maupun informasi kerja sama bisnis.
      </p>
    
      {/* Grid Kontak */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {/* Email Umum */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary">
          <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0">
            <IoIosMail className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-muted">
              Email Umum
            </h2>
            <span className="text-base font-medium text-text hover:text-primary transition-colors block mt-0.5">
              info@352.idn
            </span>
          </div>
        </div>

        {/* Kontak Bisnis */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary">
          <div className="rounded-md bg-primary-soft p-2.5 text-primary shrink-0">
            <IoIosCall className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-muted">
              Kontak Bisnis
            </h2>
            <span className="text-base font-medium text-text hover:text-primary transition-colors block mt-0.5">
              +62 812-3456-7890
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
