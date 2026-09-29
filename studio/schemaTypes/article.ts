// schemas/article.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Judul utama artikel',
      validation: (Rule) => Rule.required().error('Title tidak boleh kosong'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description: 'URL publik (contoh: timnas-indonesia-menang)',
      validation: (Rule) => Rule.required().error('Slug harus unik dan wajib diisi'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Ringkasan 1 sampai 2 kalimat',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required().error('Image harus memiliki alt text'),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Konten utama artikel menggunakan Portable Text',
      validation: (Rule) => Rule.required(),
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true}, // Tambahan opsi hotspot opsional agar gambar di konten juga bisa di-crop
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Deskripsi gambar ini untuk keperluan SEO dan aksesibilitas pembaca',
              options: {
                isHighlighted: true, // Menampilkan input ini langsung di modal gambar agar editor tidak perlu menekan tombol edit tambahan
              },
              validation: (Rule) => Rule.required().error('Alt text wajib diisi untuk SEO'),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Waktu publikasi',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Menentukan apakah artikel dapat dipakai sebagai headline',
      initialValue: false,
    }),
    defineField({
      name: 'hot',
      title: 'Hot Article (Support Headline)',
      type: 'boolean',
      description:
        'Menandai artikel ini sebagai berita hangat pendukung headline (4 artikel dibawah headline)',
      initialValue: false,
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
})
