# Style.md

## 1. Design Direction

Website menggunakan visual berita sepak bola yang modern, profesional, cepat dibaca, dan editorial.

Referensi visual utama:

- Struktur berita seperti portal berita olahraga modern.
- Komposisi headline yang kuat.
- White space yang cukup.
- Dark navy sebagai struktur visual.
- Bright blue sebagai accent utama.
- Merah hanya untuk perhatian khusus seperti Breaking News atau Trending.

Website tidak boleh terasa seperti dashboard admin.

---

## 2. Color Palette

### Primary

```css
--color-primary: #168BFF;
--color-primary-hover: #0B76E6;
--color-primary-soft: #EAF4FF;
```

Bright blue digunakan untuk:

- Logo accent.
- CTA.
- Active navigation.
- Category badge.
- Link penting.
- Interactive state.

### Background

```css
--color-background: #FFFFFF;
--color-surface: #F6F8FB;
--color-surface-elevated: #FFFFFF;
--color-dark: #0B1730;
--color-dark-soft: #122342;
```

Dark navy digunakan terutama untuk:

- Hero.
- Footer.
- Section tertentu yang membutuhkan kontras.

Jangan menggunakan dark navy untuk seluruh halaman.

### Text

```css
--color-text: #111827;
--color-text-secondary: #4B5563;
--color-text-muted: #8A94A6;
--color-text-on-dark: #FFFFFF;
```

### Border

```css
--color-border: #E5E7EB;
--color-border-dark: #263754;
```

### Alert

```css
--color-alert: #EF4444;
--color-alert-soft: #FEE2E2;
```

Merah digunakan secara terbatas.

---

## 3. Typography

Gunakan font sans-serif modern.

Prioritas:

1. Inter
2. System sans-serif fallback

Contoh:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Hierarchy

Display headline:

```text
Desktop: 48px - 72px
Mobile: 32px - 40px
Weight: 700 - 800
Line-height: 0.95 - 1.05
```

Section title:

```text
Desktop: 28px - 36px
Mobile: 24px - 28px
Weight: 700
```

Article title:

```text
Desktop: 40px - 56px
Mobile: 30px - 38px
Weight: 700 - 800
```

Card title:

```text
18px - 24px
Weight: 700
```

Body:

```text
16px - 18px
Weight: 400
Line-height: 1.6 - 1.8
```

Metadata:

```text
12px - 14px
Weight: 500
```

Jangan menggunakan terlalu banyak ukuran font.

---

## 4. Layout Width

Gunakan container utama:

```css
--container-max: 1280px;
```

Grid besar:

```text
12 columns desktop
8 columns tablet
1 column mobile
```

Content harus tetap memiliki ruang kosong di kiri dan kanan.

Jangan membuat content menempel ke viewport.

---

## 5. Spacing

Gunakan sistem spacing konsisten.

Basis:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Section desktop:

```text
64px - 96px
```

Section mobile:

```text
40px - 64px
```

Card gap:

```text
16px - 24px
```

---

## 6. Border Radius

Gunakan radius halus.

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-xl: 18px;
```

Article card:

```text
10px - 14px
```

Button:

```text
8px - 10px
```

Jangan menggunakan radius ekstrem seperti pill pada semua element.

---

## 7. Shadow

Gunakan shadow tipis.

Card normal:

```css
box-shadow:
  0 1px 2px rgb(15 23 42 / 0.05);
```

Elevated:

```css
box-shadow:
  0 10px 30px rgb(15 23 42 / 0.08);
```

Jangan membuat semua card memiliki shadow besar.

---

## 8. Top Bar

Top bar:

```text
Height: 34px - 38px
Background: Dark Navy
Text: White
```

Layout:

```text
Tanggal       Breaking / Trending       Social Icons
```

Mobile:

```text
Tanggal       Trending
```

Social icons dapat disembunyikan jika width sempit.

Tanggal harus mengikuti timezone dan format yang ditentukan aplikasi.

---

## 9. Header

Header utama menggunakan background putih.

Struktur:

```text
Logo       Search
```

Menu berada di bawah row utama.

Navigation:

```text
Home
Timnas Indonesia
Liga 1
Liga Inggris
Liga Champions
Internasional
```

Active navigation:

- Bright blue text.
- Optional bottom border.
- Font weight lebih kuat.

Jangan menggunakan underline default browser.

---

## 10. Search

Search box harus jelas tetapi tidak mendominasi.

Desktop:

```text
Width: 320px - 480px
```

Mobile:

```text
Full width
```

Gunakan icon search.

Input harus memiliki:

- Label accessible.
- Placeholder.
- Focus state.
- Clear action jika ada query.

---

## 11. Hero Section

Hero memakai dark navy.

Desktop:

```text
┌───────────────────────────────┬───────────────┐
│                               │               │
│        Main Headline          │ Match / Score │
│                               │ Sidebar       │
│                               │               │
└───────────────────────────────┴───────────────┘
```

Main article:

- Large image.
- Category badge.
- Large headline.
- Excerpt.
- Published time.
- CTA.
- Gradient overlay jika text berada di atas image.

Hero tidak boleh terlalu ramai.

Sidebar:

- Jadwal pertandingan.
- Skor pertandingan.
- Status pertandingan.
- Kompetisi.
- Waktu kickoff.

---

## 12. Article Card

Card standard:

```text
┌────────────────────┐
│      Image         │
│  CATEGORY          │
├────────────────────┤
│ Article title      │
│ Short metadata     │
└────────────────────┘
```

Thumbnail harus memiliki aspect ratio konsisten.

Recommended:

```text
16:9
```

Category badge:

```text
Background: Bright Blue
Text: White
Uppercase
Font: 11px - 12px
Weight: 700
```

---

## 13. Main News Section

Gunakan layout editorial.

Desktop:

```text
┌──────────────────────────┬────────────┐
│                          │ Top Story 1│
│     Featured Article     ├────────────┤
│                          │ Top Story 2│
│                          ├────────────┤
│                          │ Top Story 3│
└──────────────────────────┴────────────┘
```

Featured article lebih besar.

Top stories lebih compact.

---

## 14. Timnas Indonesia Section

Section khusus artikel dengan category atau tag:

```text
Timnas Indonesia
```

Desktop:

```text
[Card] [Card] [Card] [Card]
```

Tablet:

```text
[Card] [Card]
[Card] [Card]
```

Mobile:

```text
[Card]
[Card]
[Card]
[Card]
```

Gunakan section header konsisten.

---

## 15. Latest News

Latest News menggunakan list vertical.

Desktop:

```text
┌──────────┬───────────────────────────────┐
│ Thumbnail│ Title                         │
│          │ Category • Time               │
└──────────┴───────────────────────────────┘
```

Setiap item dipisahkan divider.

Gunakan pagination.

Jangan menggunakan infinite scroll sebagai default.

---

## 16. Category Page

Category page:

```text
Breadcrumb
Category Title
Category Description
Featured Category Article
Article Grid / List
Pagination
```

Gunakan layout yang konsisten dengan Home.

Category page harus memiliki slug yang sama dengan category document di Sanity.

---

## 17. Article Detail

Struktur:

```text
Breadcrumb
Category Badge
Headline
Excerpt
Author + Publish Time
Hero Image
Article Body
Related Articles
Latest News
```

Article body harus memiliki readability tinggi.

Recommended content width:

```text
680px - 760px
```

Hero image dapat lebih lebar daripada article body.

---

## 18. Search Page

Struktur:

```text
Search Header
Search Input
Result Count
Article Results
Pagination
Empty State
```

Search result card harus lebih compact dari card Home.

Query harus disimpan di URL:

```text
/search?q=timnas
```

Ini membuat hasil dapat dibagikan dan diakses ulang.

---

## 19. Match Section

Sidebar atau page pertandingan menggunakan:

```text
Competition
Home Team
Away Team
Kickoff Time
Score
Match Status
```

Status:

```text
Scheduled
Live
Finished
Postponed
Cancelled
```

Match UI harus tetap terbaca pada mobile.

---

## 20. Footer

Dark Navy.

Struktur:

```text
Logo
Short Description

Navigation
Categories
Legal

Copyright
```

Footer tidak boleh menjadi terlalu tinggi.

---

## 21. Interaction

Hover:

- Sedikit perubahan opacity.
- Bright blue link.
- Image scale maksimum sekitar 1.02 - 1.04.

Transition:

```text
150ms - 250ms
```

Gunakan `transform` dan `opacity` untuk animation yang ringan.

---

## 22. Responsive

Breakpoint berdasarkan kebutuhan layout.

Desktop:

```text
2 - 3 column layout
```

Tablet:

```text
2 column layout
```

Mobile:

```text
1 column layout
```

Mobile harus memprioritaskan:

1. Headline.
2. Image.
3. Article title.
4. Metadata.
5. Navigation yang mudah digunakan.

---

## 23. Image Treatment

Gunakan:

```text
object-fit: cover
```

Jangan membiarkan thumbnail berubah ratio antar card.

Untuk hero:

- Gunakan overlay gradient.
- Pastikan text kontras.
- Jangan menutup focal point penting pada gambar.

---

## 24. Design Tokens

Semua warna utama harus tersedia sebagai token.

Contoh:

```css
:root {
  --color-primary: #168BFF;
  --color-primary-hover: #0B76E6;
  --color-background: #FFFFFF;
  --color-surface: #F6F8FB;
  --color-dark: #0B1730;
  --color-text: #111827;
  --color-text-secondary: #4B5563;
  --color-text-muted: #8A94A6;
  --color-border: #E5E7EB;
  --color-alert: #EF4444;
}
```

Jangan membuat variasi warna baru tanpa alasan desain yang jelas.
