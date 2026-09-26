# Arsitektur.md

## 1. Ringkasan Sistem

Website adalah portal berita sepak bola dengan React + TypeScript sebagai frontend dan Sanity CMS sebagai sistem manajemen konten.

Arsitektur memisahkan:

```text
Presentation
    ↓
Feature
    ↓
Data Access
    ↓
Sanity / External Football API
```

Sanity menjadi source of truth untuk berita editorial.

Data skor atau jadwal pertandingan dapat berasal dari football API eksternal. Integrasi ini opsional dan harus berada di server-side proxy jika API membutuhkan secret.

---

## 2. Teknologi

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Sanity Client
- Sanity Image URL Builder
- TanStack Query jika kebutuhan caching/query state meningkat

### CMS

- Sanity Studio
- Sanity Content Lake
- GROQ

### Quality

- ESLint
- Prettier
- TypeScript strict mode

### Optional

- Zod untuk validasi data eksternal
- React Error Boundary
- Testing Library
- Playwright

Jangan menambahkan library optional sebelum kebutuhan benar-benar muncul.

---

## 3. Public Pages

## 3.1 Home

Route:

```text
/
```

Konten:

1. Top Bar.
2. Header.
3. Main navigation.
4. Hero headline.
5. Match / Score sidebar.
6. Main News.
7. Timnas Indonesia.
8. Latest News.
9. Pagination atau link menuju archive.
10. Footer.

Data:

```text
heroArticle
topStories
timnasArticles
latestArticles
matchData
trendingItem
siteSettings
```

Hero hanya mengambil satu artikel utama.

Jangan mengambil semua artikel Home dalam satu query.

---

## 3.2 Category Page

Contoh:

```text
/timnas-indonesia
/liga-1
/liga-inggris
/liga-champions
/internasional
```

Konten:

1. Breadcrumb.
2. Category title.
3. Category description.
4. Featured category article.
5. Article grid.
6. Latest category articles.
7. Pagination.
8. Footer.

Category tidak boleh memiliki component khusus untuk setiap kategori jika struktur UI sama.

Gunakan parameter:

```text
categorySlug
```

---

## 3.3 Article Detail

Route:

```text
/artikel/:slug
```

Konten:

1. Breadcrumb.
2. Category badge.
3. Headline.
4. Excerpt.
5. Author.
6. Published time.
7. Updated time jika ada.
8. Hero image.
9. Article body.
10. Related articles.
11. Latest news.
12. Footer.

Article body berasal dari Portable Text Sanity.

Jangan render Portable Text sebagai raw HTML dari string.

Gunakan Portable Text renderer.

---

## 3.4 Search

Route:

```text
/search?q=
```

Konten:

1. Search heading.
2. Search input.
3. Result count.
4. Article results.
5. Empty state.
6. Pagination.

Query harus berasal dari URL.

Search input memakai debounce.

---

## 3.5 Match Schedule

Route:

```text
/jadwal
```

Konten:

1. Date navigation.
2. Competition filter.
3. Match list.
4. Status.
5. Score.
6. Empty state.

Jika memakai football API eksternal, frontend tidak boleh mengetahui API secret.

---

## 3.6 About

Route:

```text
/tentang
```

Konten:

- Profil website.
- Fokus editorial.
- Topik liputan.
- Informasi organisasi.

Konten statis atau dikelola dari Sanity Site Settings.

---

## 3.7 Editorial

Route:

```text
/redaksi
```

Konten:

- Prinsip editorial.
- Standar koreksi.
- Sumber berita.
- Struktur redaksi.
- Kontak redaksi.

---

## 3.8 Contact

Route:

```text
/kontak
```

Konten:

- Email umum.
- Email redaksi.
- Informasi kerja sama.
- Form contact jika backend tersedia.

Jangan membuat form yang tampak berfungsi tetapi tidak mempunyai endpoint.

---

## 3.9 Privacy Policy

Route:

```text
/privacy-policy
```

Konten:

- Data yang dikumpulkan.
- Cookie.
- Analytics.
- Advertising.
- Contact channel.
- Hak pengguna.

Konten final harus mengikuti kebutuhan legal website.

---

## 3.10 Terms of Service

Route:

```text
/terms-of-service
```

Konten:

- Penggunaan website.
- Hak konten.
- Larangan penggunaan.
- Disclaimer.
- Ketentuan layanan.

---

## 3.11 Disclaimer

Route:

```text
/disclaimer
```

Konten:

- Akurasi informasi.
- Pembaruan berita.
- External links.
- Third-party services.

---

## 3.12 404

Route fallback:

```text
/*
```

Konten:

- 404 message.
- Back to Home.
- Search article.

---

# 4. Global Layout

## 4.1 App Shell

```text
App
├── TopBar
├── Header
├── Navigation
├── Main
└── Footer
```

Public pages menggunakan shell yang sama.

Article page dapat menyesuaikan spacing tetapi tidak membuat Header baru.

---

## 4.2 Top Bar

Data:

```text
currentDate
trendingText
socialLinks
```

Tanggal dihitung di client atau server sesuai arsitektur deployment.

Trending berasal dari Sanity jika editorially managed.

---

## 4.3 Header

Data:

```text
siteLogo
siteName
navigation
```

Search hanya menangani UI dan mengarahkan user ke:

```text
/search?q=...
```

---

# 5. Data Architecture

```text
src/
  features/
    home/
    category/
    article/
    search/
    matches/

  services/
    sanity/
    football/

  queries/
    articleQueries.ts
    categoryQueries.ts
    matchQueries.ts
```

Feature parent memanggil service/query.

Raw client logic tidak tersebar ke presentation component.

---

# 6. Sanity Schema

## 6.1 Article

Document type:

```text
article
```

Fields:

```text
title
slug
excerpt
mainImage
category
author
content
publishedAt
updatedAt
featured
trending
seoTitle
seoDescription
seoImage
```

### title

```text
type: string
required: true
```

Judul utama artikel.

### slug

```text
type: slug
source: title
required: true
```

URL publik.

Contoh:

```text
timnas-indonesia-menang-di-laga-terbaru
```

### excerpt

```text
type: text
required: true
```

Ringkasan 1 sampai 2 kalimat.

Gunakan untuk:

- Homepage.
- Card.
- Meta description fallback.

### mainImage

```text
type: image
required: true
```

Gunakan hotspot/crop jika dibutuhkan.

Simpan alt text.

### category

```text
reference -> category
required: true
```

### author

```text
reference -> author
required: true
```

### content

```text
Portable Text
required: true
```

Konten utama artikel.

### publishedAt

```text
datetime
required: true
```

Waktu publikasi.

### updatedAt

```text
datetime
optional
```

Dipakai jika artikel diperbarui setelah publikasi.

### featured

```text
boolean
default: false
```

Menentukan apakah artikel dapat dipakai sebagai hero atau featured content.

Jangan biarkan banyak artikel aktif sebagai hero tanpa aturan.

### trending

```text
boolean
default: false
```

Menandai artikel untuk area trending.

### SEO fields

```text
seoTitle
seoDescription
seoImage
```

Jika kosong, frontend menggunakan fallback dari title, excerpt, dan mainImage.

---

# 7. Category Schema

Document type:

```text
category
```

Fields:

```text
title
slug
description
color
order
```

Contoh:

```text
Timnas Indonesia
Liga 1
Liga Inggris
Liga Champions
Internasional
```

`slug` dipakai sebagai route.

---

# 8. Author Schema

Document type:

```text
author
```

Fields:

```text
name
slug
avatar
bio
role
socialLinks
```

Author tidak perlu memiliki login system untuk public website.

---

# 9. Site Settings Schema

Document type:

```text
siteSettings
```

Fields:

```text
siteName
logo
description
socialLinks
navigation
footerLinks
contactEmail
```

Gunakan singleton document.

Jangan membuat banyak site settings aktif.

---

# 10. Trending Schema

Document type:

```text
trendingItem
```

Fields:

```text
label
text
article
active
startAt
endAt
```

Digunakan untuk top bar.

Jika tidak ada active item, sembunyikan trending area atau tampilkan item fallback.

---

# 11. Sponsor Banner Schema

Document type:

```text
sponsorBanner
```

Fields:

```text
name
image
targetUrl
placement
active
priority
startAt
endAt
```

Placement:

```text
home_hero
home_inline
category
article_top
article_bottom
footer
```

Sponsor banner harus memiliki valid target URL.

---

# 12. Match Data

Match data sebaiknya tidak menjadi editorial source jika datanya berasal dari API.

Gunakan:

```text
External Football API
```

Flow:

```text
Client
  ↓
Server API Route
  ↓
Football API
```

Server-side proxy menangani:

- API key.
- Rate limit.
- Cache.
- Normalisasi response.

Frontend hanya menerima bentuk data yang sudah dinormalisasi:

```ts
type Match = {
  id: string
  competition: string
  homeTeam: Team
  awayTeam: Team
  kickoffAt: string
  status: MatchStatus
  homeScore?: number
  awayScore?: number
}
```

---

# 13. GROQ Query Architecture

## Article list

```groq
*[
  _type == "article" &&
  defined(slug.current)
]
| order(publishedAt desc)
[$start...$end] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "category": category->{
    title,
    "slug": slug.current
  },
  "author": author->{
    name
  }
}
```

Gunakan parameter query.

Jangan membangun string query dari input user.

---

## Article detail

```groq
*[
  _type == "article" &&
  slug.current == $slug
][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  mainImage,
  content,
  seoTitle,
  seoDescription,
  seoImage,
  "category": category->{
    title,
    "slug": slug.current
  },
  "author": author->{
    name,
    "slug": slug.current,
    avatar,
    bio
  }
}
```

---

## Related articles

Gunakan category yang sama.

Jangan mengembalikan article yang sedang dibaca.

Contoh konsep:

```groq
*[
  _type == "article" &&
  category._ref == $categoryId &&
  _id != $articleId
]
| order(publishedAt desc)[0...4]
```

---

# 14. Folder Structure

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
│
├── assets/
│   └── ...
│
├── components/
│   ├── article/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleListItem.tsx
│   │   ├── CompactArticleCard.tsx
│   │   └── RelatedArticles.tsx
│   │
│   ├── common/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── Pagination.tsx
│   │   └── SectionHeader.tsx
│   │
│   ├── media/
│   │   └── SanityImage.tsx
│   │
│   └── navigation/
│       ├── SiteLogo.tsx
│       ├── SearchBar.tsx
│       └── SocialIcons.tsx
│
├── features/
│   ├── home/
│   │   ├── index.tsx
│   │   ├── HeroHeadline.tsx
│   │   ├── MainNews.tsx
│   │   ├── TimnasSection.tsx
│   │   ├── LatestNews.tsx
│   │   └── MatchSidebar.tsx
│   │
│   ├── category/
│   │   ├── index.tsx
│   │   ├── CategoryHeader.tsx
│   │   ├── CategoryFeatured.tsx
│   │   └── CategoryArticles.tsx
│   │
│   ├── article/
│   │   ├── index.tsx
│   │   ├── ArticleHeader.tsx
│   │   ├── ArticleBody.tsx
│   │   └── ArticleSidebar.tsx
│   │
│   ├── search/
│   │   ├── index.tsx
│   │   ├── SearchHeader.tsx
│   │   └── SearchResults.tsx
│   │
│   └── matches/
│       ├── index.tsx
│       ├── MatchFilters.tsx
│       └── MatchList.tsx
│
├── layout/
│   ├── index.tsx
│   ├── TopBar.tsx
│   ├── Header.tsx
│   ├── MainNavigation.tsx
│   └── Footer.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   ├── ArticlePage.tsx
│   ├── SearchPage.tsx
│   ├── MatchesPage.tsx
│   ├── AboutPage.tsx
│   ├── EditorialPage.tsx
│   ├── ContactPage.tsx
│   ├── PrivacyPage.tsx
│   ├── TermsPage.tsx
│   ├── DisclaimerPage.tsx
│   └── NotFoundPage.tsx
│
├── queries/
│   ├── articleQueries.ts
│   ├── categoryQueries.ts
│   ├── authorQueries.ts
│   ├── siteQueries.ts
│   ├── trendingQueries.ts
│   └── sponsorQueries.ts
│
├── services/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── fetcher.ts
│   │
│   └── football/
│       ├── client.ts
│       ├── normalizer.ts
│       └── types.ts
│
├── hooks/
│   ├── useArticles.ts
│   ├── useCategoryArticles.ts
│   ├── useSearchArticles.ts
│   ├── useMatches.ts
│   └── useDebounce.ts
│
├── lib/
│   ├── seo.ts
│   ├── formatDate.ts
│   ├── formatTimeAgo.ts
│   └── constants.ts
│
├── types/
│   ├── article.ts
│   ├── category.ts
│   ├── author.ts
│   ├── match.ts
│   └── site.ts
│
├── styles/
│   └── index.css
│
└── main.tsx
```

---

# 15. Parent Component Contract

Setiap feature parent bernama:

```text
index.tsx
```

Contoh:

```text
features/home/index.tsx
```

Parent harus melakukan:

1. Ambil data.
2. Kelola loading.
3. Kelola error.
4. Kelola pagination atau filter.
5. Susun layout.
6. Kirim props ke children.

Parent tidak boleh:

- Memiliki UI card yang panjang.
- Memiliki raw SVG icon.
- Menulis query GROQ panjang.
- Menyimpan data hard-coded.
- Memiliki lebih dari 180 baris.

---

# 16. Example Parent Responsibility

```tsx
export default function HomeFeature() {
  const { data, isLoading, error } = useHomeData()

  if (isLoading) return <HomeSkeleton />
  if (error) return <HomeError />
  if (!data) return <HomeEmpty />

  return (
    <div>
      <HeroHeadline article={data.hero} />
      <MainNews articles={data.topStories} />
      <TimnasSection articles={data.timnas} />
      <LatestNews articles={data.latest} />
    </div>
  )
}
```

Raw query tetap berada di `queries/`.

---

# 17. API and Cache Strategy

Sanity:

```text
Homepage article data
Category data
Article detail
Author
Site settings
Trending
Sponsor
```

Gunakan CDN/cache Sanity untuk public read jika memungkinkan.

External football API:

```text
Match schedule
Live score
Match status
```

Cache sesuai provider rate limit.

Jangan meminta live score setiap component.

Satu feature mengambil data, lalu membagikannya ke child component.

---

# 18. Homepage Query Strategy

Home dapat memakai beberapa query kecil:

```text
Query A:
Hero article

Query B:
Top stories

Query C:
Timnas articles

Query D:
Latest articles
```

Manfaat:

- Payload lebih kecil.
- Query lebih mudah dirawat.
- Section dapat diubah tanpa mempengaruhi query lain.
- Error dapat diisolasi per section.

Jangan membuat:

```text
One giant homepage query
```

kecuali profiling membuktikan pendekatan tersebut lebih efisien.

---

# 19. Pagination Strategy

Gunakan offset pagination untuk MVP:

```text
page = 1
limit = 10
start = (page - 1) * limit
end = start + limit
```

Untuk dataset yang sangat besar, pertimbangkan cursor-based pagination.

URL:

```text
/category?page=2
```

Pagination harus dapat diakses dengan keyboard.

---

# 20. SEO Architecture

Setiap route memiliki SEO metadata.

### Home

- Site title.
- Site description.
- Open Graph.

### Category

- Category title.
- Category description.
- Canonical URL.

### Article

- Article title.
- Article description.
- Author.
- Published time.
- Updated time.
- Image.
- Canonical URL.

Gunakan reusable metadata utility.

---

# 21. Article Structured Data

Article page dapat menyediakan schema JSON-LD:

```text
NewsArticle
```

Data minimal:

```text
headline
image
datePublished
dateModified
author
publisher
mainEntityOfPage
```

Nilai harus berasal dari CMS.

Jangan mengarang structured data.

---

# 22. Accessibility Architecture

Komponen dasar:

```text
Header
Nav
Main
Article
Aside
Footer
```

Image wajib memiliki alt.

Jika gambar hanya dekoratif:

```text
alt=""
```

Button dan link harus dapat dipakai dengan keyboard.

Focus state harus terlihat.

---

# 23. Loading Architecture

Homepage:

```text
HeroSkeleton
StorySkeleton
CardSkeleton
ListSkeleton
```

Category:

```text
FeaturedSkeleton
GridSkeleton
PaginationSkeleton
```

Article:

```text
ArticleHeaderSkeleton
ArticleBodySkeleton
RelatedSkeleton
```

Skeleton harus mempertahankan layout agar tidak menyebabkan layout shift besar.

---

# 24. Error Architecture

Gunakan error state per feature.

Contoh:

```text
Home
 ├── Hero Error
 ├── Main News Error
 ├── Timnas Error
 └── Match Error
```

Jika satu section gagal, jangan otomatis membuat seluruh homepage blank.

Untuk article detail, jika artikel utama gagal, tampilkan error page karena konten utama tidak tersedia.

---

# 25. Sanity Studio Organization

Studio sebaiknya mengelompokkan:

```text
Editorial
  Article
  Category
  Author

Site
  Site Settings
  Trending Item
  Sponsor Banner
```

Gunakan preview untuk article.

Author dan category dibuat reusable melalui reference.

---

# 26. Content Validation

Sanity validation minimal:

Article:

```text
title: required
slug: required
excerpt: required
mainImage: required
category: required
author: required
content: required
publishedAt: required
```

Slug harus unik.

Title tidak boleh kosong.

Image harus memiliki alt text.

---

# 27. Deployment Separation

Public frontend:

```text
React Application
```

CMS:

```text
Sanity Studio
```

External football service:

```text
Server-side API endpoint
```

Secret hanya berada pada server environment.

Contoh environment:

```text
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=

FOOTBALL_API_KEY=
```

`FOOTBALL_API_KEY` tidak boleh menggunakan prefix `VITE_` karena variable tersebut dapat ikut masuk ke client bundle pada Vite.

---

# 28. Environment Rules

File:

```text
.env
.env.local
.env.example
```

`.env.example`:

```text
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=
VITE_SANITY_API_VERSION=

FOOTBALL_API_KEY=
FOOTBALL_API_BASE_URL=
```

Jangan commit secret.

---

# 29. Routing Map

```text
/
├── Home
├── /timnas-indonesia
├── /liga-1
├── /liga-inggris
├── /liga-champions
├── /internasional
├── /search
├── /jadwal
├── /artikel/:slug
├── /tentang
├── /redaksi
├── /kontak
├── /privacy-policy
├── /terms-of-service
├── /disclaimer
└── /*
```

---

# 30. Final Architecture Rule

Ketika AI Agent menghasilkan code:

```text
Do not start from components.

Start from architecture.

First:
1. Create types.
2. Create Sanity client.
3. Create query layer.
4. Create service layer.
5. Create reusable UI.
6. Create feature parents.
7. Create pages.
8. Connect routes.
9. Add SEO.
10. Add error/loading states.
11. Test responsive behavior.
```

Jangan membuat seluruh website dalam satu component besar.

Jangan menaruh query, state, layout, card rendering, dan utility dalam satu file.

Struktur final harus tetap mudah dipahami developer baru yang membuka repository untuk pertama kali.
