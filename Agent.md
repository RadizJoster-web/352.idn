# Agent.md

## 1. Tujuan Dokumen

Dokumen ini berisi aturan kerja wajib untuk AI Agent saat membangun website berita sepak bola menggunakan React, TypeScript, dan Sanity CMS.

Agent harus mengutamakan:

1. Stabilitas aplikasi.
2. Struktur modular.
3. Performa halaman.
4. Kemudahan maintenance.
5. SEO dan aksesibilitas.
6. Konsistensi visual.
7. Pemisahan data, state, layout, dan presentation.
8. Keamanan credential dan API.

Jangan mengubah arsitektur inti hanya karena cara lain terlihat lebih singkat.

---

## 2. Technology Rules

Stack utama:

- React
- TypeScript
- React Router
- Tailwind CSS
- Sanity CMS
- GROQ
- Sanity Image URL Builder
- TanStack Query atau custom data hooks jika diperlukan
- Lucide React untuk icon
- ESLint
- Prettier

Gunakan browser API atau library tambahan hanya jika memang dibutuhkan.

Jangan menambahkan library untuk masalah yang bisa diselesaikan dengan React, CSS, atau utility yang sudah tersedia.

---

## 3. Rule Struktur Component

Setiap feature atau section utama harus memakai pola parent-child.

Contoh:

```text
features/
  home/
    index.tsx
    HeroHeadline.tsx
    TopStories.tsx
    NationalTeamSection.tsx
    LatestNews.tsx
```

`index.tsx` adalah parent component.

Parent component bertanggung jawab atas:

- State management.
- Layout orchestration.
- Pemanggilan API.
- Pemanggilan GROQ query melalui service.
- Loading state.
- Error state.
- Empty state.
- Pagination state.
- Passing data ke child component.

Child component bertanggung jawab atas:

- Presentation.
- Interaksi lokal sederhana.
- Rendering data yang diterima melalui props.

Jangan menaruh pemanggilan GROQ secara tersebar di banyak child component.

Raw GROQ query harus berada di layer query/service.

---

## 4. Batas Ukuran File

Tidak ada file React component yang boleh melebihi 180 baris.

Target ideal:

- Parent component: 80 sampai 150 baris.
- Child component: 30 sampai 120 baris.
- Utility: sesingkat mungkin.
- Query file: satu domain data per file.

Jika component mendekati 150 baris, evaluasi ulang sebelum menambahkan fitur baru.

Jika component melebihi 180 baris:

1. Pertahankan file parent sebagai `index.tsx`.
2. Pindahkan UI yang independen ke child component.
3. Pindahkan transformasi data ke utility.
4. Pindahkan query ke query/service.
5. Pindahkan state yang reusable ke custom hook.

Dilarang mengatasi batas 180 baris dengan mengecilkan formatting atau menggabungkan banyak statement dalam satu baris.

---

## 5. Larangan Duplikasi

Jangan membuat komponen berbeda untuk UI yang secara visual dan perilaku sama.

Contoh yang wajib reusable:

- ArticleCard
- CompactArticleCard
- CategoryBadge
- SectionHeader
- Pagination
- SearchInput
- SocialIcons
- SiteLogo
- ImageWithFallback
- TimeAgo
- Breadcrumb
- MatchScoreCard
- LoadingSkeleton
- ErrorState
- EmptyState

Perbedaan data tidak boleh menjadi alasan untuk membuat komponen UI yang sama berulang.

---

## 6. Data Flow

Gunakan alur berikut:

```text
Sanity CMS
   ↓
GROQ Query
   ↓
Data Service / Query
   ↓
Parent Feature Component
   ↓
Child Presentation Components
```

Untuk data pertandingan eksternal:

```text
Football API
   ↓
Server-side API Proxy
   ↓
Parent Feature Component
   ↓
Match Components
```

Jangan memanggil API pertandingan langsung dari browser jika credential API diperlukan.

---

## 7. Sanity Rules

Sanity menjadi source of truth untuk konten editorial.

Konten yang disimpan di Sanity:

- Article
- Category
- Author
- Site Settings
- Trending Item
- Sponsor Banner
- Match Editorial Data jika dibutuhkan
- Navigation Configuration jika dibutuhkan

Jangan menyimpan:

- Password user website.
- API secret.
- Access token.
- Credential server.
- Data session sensitif.

Write token Sanity tidak boleh masuk ke frontend.

Jika dataset membutuhkan akses privat, gunakan server-side endpoint.

---

## 8. GROQ Rules

Setiap query harus:

- Mengambil field yang benar-benar dibutuhkan.
- Menggunakan projection.
- Membatasi jumlah hasil.
- Menggunakan ordering yang jelas.
- Menghindari `*` tanpa projection.
- Menghindari nested expansion yang tidak diperlukan.
- Menghindari query yang mengambil seluruh dataset.
- Memakai pagination.

Contoh pola:

```groq
*[
  _type == "article" &&
  defined(slug.current)
]
| order(publishedAt desc)
[0...10] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category->{
    title,
    slug
  },
  mainImage
}
```

Jangan membuat satu GROQ query raksasa untuk seluruh Home Page.

Lebih baik gunakan beberapa query domain yang jelas jika payload lebih kecil dan mudah di-cache.

---

## 9. Image Rules

Semua gambar Sanity harus menggunakan Sanity Image URL Builder.

Wajib:

- Tentukan width.
- Gunakan `auto=format`.
- Gunakan `fit` sesuai kebutuhan.
- Gunakan lazy loading untuk gambar di luar viewport awal.
- Gunakan priority loading untuk hero image jika memang muncul pada first viewport.
- Gunakan aspect ratio yang konsisten.

Jangan memakai original image URL berukuran besar jika ukuran yang lebih kecil cukup.

Contoh konsep:

```text
Hero: 1600w
Featured card: 900w
Card: 600w
Compact list: 320w
Thumbnail: 180w
```

Ukuran aktual harus disesuaikan dengan layout.

---

## 10. Performance Rules

Jangan:

- Mengambil semua artikel pada Home Page.
- Mengirim gambar full resolution untuk card kecil.
- Membuat infinite scroll untuk semua halaman tanpa alasan.
- Menjalankan query yang sama berulang kali.
- Menaruh heavy library untuk fitur sederhana.
- Menggunakan animation pada setiap element.
- Menjalankan state global untuk state lokal.

Gunakan:

- Pagination.
- Query projection.
- Image resizing.
- Lazy loading.
- Caching.
- Memoization jika benar-benar diperlukan.
- Skeleton loading.
- Route-level code splitting jika tersedia.
- Debounce untuk search.

---

## 11. Search Rules

Search input tidak boleh melakukan request pada setiap keypress.

Gunakan debounce.

Alur:

```text
Typing
  ↓
Debounce
  ↓
Search Request
  ↓
Search Result
```

Search harus memiliki:

- Loading state.
- Empty result.
- Error state.
- Pagination jika hasil banyak.

Jangan mengandalkan browser filtering jika dataset artikel sudah besar.

---

## 12. State Management Rules

Gunakan state lokal untuk:

- Toggle mobile menu.
- Search UI.
- Pagination.
- Tab.
- Modal.
- Temporary UI state.

Jangan menggunakan global state untuk data yang hanya dipakai satu section.

Gunakan cache/query library jika data dipakai lintas halaman dan memerlukan:

- Deduplication.
- Refetching.
- Cache.
- Loading state.
- Error state.

---

## 13. Routing Rules

Route utama:

```text
/
 /timnas-indonesia
 /liga-1
 /liga-inggris
 /liga-champions
 /internasional
 /search
 /artikel/:slug
 /jadwal
 /tentang
 /redaksi
 /kontak
 /privacy-policy
 /terms-of-service
 /disclaimer
```

Category route harus bisa berkembang tanpa membuat component baru untuk setiap kategori.

Gunakan konfigurasi category untuk data:

```ts
type CategoryConfig = {
  slug: string
  title: string
  description?: string
}
```

---

## 14. SEO Rules

Setiap halaman artikel harus memiliki:

- `<title>`
- Meta description.
- Canonical URL.
- Open Graph.
- Twitter/X card.
- Article published time.
- Article modified time jika tersedia.
- Author.
- Category.
- Structured data jika diimplementasikan.

Article page harus menghasilkan URL yang stabil:

```text
/artikel/judul-berita-dalam-slug
```

Jangan menggunakan ID database sebagai URL publik jika slug tersedia.

---

## 15. Accessibility Rules

Wajib:

- Semantic HTML.
- `main`, `header`, `nav`, `section`, `article`, `footer`.
- Alt text pada image.
- Label pada search input.
- Keyboard navigation.
- Visible focus state.
- Button untuk action.
- Link untuk navigation.
- Jangan menggunakan clickable `div` untuk action utama.

Jangan menggunakan icon sebagai satu-satunya indikator tanpa accessible label.

---

## 16. Error Handling

Setiap feature yang mengambil data eksternal harus memiliki:

```text
Loading
Success
Empty
Error
```

Jangan menampilkan blank screen ketika API gagal.

Error message harus dapat dipahami pengguna.

Detail error teknis hanya masuk ke console atau monitoring.

---

## 17. Security Rules

Dilarang:

- Menaruh Sanity write token di frontend.
- Menaruh football API key di frontend.
- Menaruh secret di source code.
- Commit `.env`.
- Menampilkan credential melalui UI.
- Menggunakan HTML mentah dari CMS tanpa sanitization yang sesuai.

Gunakan:

```text
.env
.env.local
.env.example
```

`env.example` hanya berisi nama variable tanpa secret.

---

## 18. Responsive Rules

Layout harus memiliki setidaknya:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

Jangan membuat desktop layout lalu berharap browser otomatis menangani mobile.

Prioritaskan:

- Content readability.
- Tap target.
- Image ratio.
- Navigation usability.
- Search usability.

Desktop sidebar tidak boleh menyebabkan horizontal overflow pada mobile.

---

## 19. Animation Rules

Animation harus mendukung UX.

Gunakan:

- Hover.
- Fade.
- Small translate.
- Menu transition.
- Loading transition.

Hindari:

- Animation terus-menerus.
- Parallax berat.
- Particle effect.
- Video background pada halaman berita.
- Animation besar pada setiap card.

News website harus terasa cepat.

---

## 20. Maintainability Rules

Nama harus jelas.

Hindari:

```text
Comp.tsx
Data.ts
Helper.ts
Utils2.ts
Temp.tsx
NewCard.tsx
```

Gunakan nama berdasarkan domain:

```text
ArticleCard.tsx
LatestNews.tsx
CategoryHeader.tsx
articleQueries.ts
articleService.ts
```

Jangan membuat abstraction sebelum memang ada kebutuhan.

---

## 21. CSS Rules

Gunakan design token dari `Style.md`.

Jangan membuat random color di dalam component.

Hindari:

```tsx
className="text-[#1299ff]"
```

jika warna tersebut sudah menjadi design token.

Gunakan CSS variable atau utility yang sudah ditentukan.

---

## 22. Content Rules

UI website harus menggunakan bahasa Indonesia kecuali elemen teknis yang memang ditentukan dalam English.

Contoh:

- Baca Selengkapnya
- Berita Terbaru
- Berita Populer
- Jadwal Pertandingan
- Cari Berita
- Tidak ada berita ditemukan

Judul artikel dan isi artikel berasal dari Sanity.

Jangan hard-code artikel ke component.

---

## 23. Agent Workflow

Sebelum membuat file baru:

1. Periksa struktur project.
2. Cari component reusable yang sudah ada.
3. Cari query/service yang sudah ada.
4. Reuse design token.
5. Pastikan route tidak duplikat.
6. Pastikan component tetap di bawah 180 baris.

Setelah membuat perubahan:

1. Jalankan TypeScript check.
2. Jalankan ESLint.
3. Jalankan build.
4. Periksa route utama.
5. Periksa mobile layout.
6. Periksa loading, empty, dan error state.

Jangan menganggap implementasi selesai hanya karena TypeScript tidak error.

---

## 24. Definition of Done

Feature dianggap selesai jika:

- Tidak ada TypeScript error.
- Tidak ada ESLint error baru.
- Build berhasil.
- Component mengikuti batas 180 baris.
- Tidak ada API secret di client.
- Query memakai projection.
- Image menggunakan optimized URL.
- Mobile tidak horizontal overflow.
- Loading state tersedia.
- Empty state tersedia jika relevan.
- Error state tersedia jika data eksternal.
- Accessibility dasar tersedia.
- SEO metadata tersedia untuk route publik yang relevan.
