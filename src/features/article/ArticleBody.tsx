import { PortableText } from '@portabletext/react';
import { urlFor } from '../../services/sanity/image';

type ArticleBodyProps = {
  content: unknown[];
};

export default function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="prose prose-lg max-w-[760px] text-text leading-[1.8]">
      <PortableText
        value={content as never}
        components={{
          // Menangani elemen block bawaan (heading, paragraf, dll)
          block: {
            h2: ({ children }) => (
              <h2 className="mt-10 mb-4 text-2xl font-semibold text-text">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-8 mb-3 text-xl font-semibold text-text">
                {children}
              </h3>
            ),
            normal: ({ children }) => (
              <p className="mb-5 text-text-secondary">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-5 italic text-text-muted font-serif text-xl my-6">
                {children}
              </blockquote>
            ),
          },
          // Menangani custom object seperti 'image'
          types: {
            image: ({ value }) => {
              if (!value?.asset?._ref) return null;

              return (
                <figure className="flex flex-col items-center">
                  <img
                    src={urlFor(value).url()}
                    alt={value.alt || 'Gambar artikel'}
                    className="w-full h-auto rounded-t-lg"
                    loading="lazy"
                  />
                  {/* Opsional: Menampilkan alt text sebagai caption di bawah gambar */}
                  {value.alt && (
                    <div className="p-4 bg-primary-soft w-full rounded-b-lg">
                      <figcaption className="text-xs text-text-muted italic">
                        {value.alt}
                      </figcaption>
                    </div>
                  )}
                </figure>
              );
            },
          },
          marks: {
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-hover"
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-text">{children}</strong>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="mb-5 list-disc pl-6 space-y-1">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="mb-5 list-decimal pl-6 space-y-1">{children}</ol>
            ),
          },
        }}
      />
    </div>
  );
}
