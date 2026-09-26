import { useEffect } from 'react'
import { setSeoMeta } from '../lib/seo'

export default function PrivacyPage() {
  useEffect(() => {
    setSeoMeta({ title: 'Privacy Policy', description: 'Kebijakan privasi 352.IDN.' })
  }, [])

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-text mb-6 font-serif">Privacy Policy</h1>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <h2 className="text-xl font-semibold text-text">Data yang Dikumpulkan</h2>
        <p>Kami mengumpulkan data penggunaan anonim untuk meningkatkan pengalaman pengguna, termasuk halaman yang dikunjungi dan durasi kunjungan.</p>
        <h2 className="text-xl font-semibold text-text mt-8">Cookie</h2>
        <p>Website ini menggunakan cookie untuk analitik dan preferensi pengguna. Anda dapat mengatur penggunaan cookie melalui pengaturan browser.</p>
        <h2 className="text-xl font-semibold text-text mt-8">Analytics</h2>
        <p>Kami menggunakan layanan analitik pihak ketiga untuk memahami bagaimana website digunakan.</p>
        <h2 className="text-xl font-semibold text-text mt-8">Hak Pengguna</h2>
        <p>Anda berhak meminta penghapusan data pribadi yang kami simpan. Silakan hubungi kami melalui halaman Kontak.</p>
      </div>
    </div>
  )
}
