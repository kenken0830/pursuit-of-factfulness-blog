import { Metadata } from 'next';

export type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  category?: string;
  publishedTime?: string;
  schema?: Record<string, any>;
};

/**
 * ブログ記事用のメタデータを生成
 */
export function generateArticleMetadata({
  title,
  description,
  ogImage = '/placeholder.svg?height=600&width=800',
  category = 'ai-news',
  publishedTime = new Date().toISOString(),
  keywords = '',
  author = 'D×MirAI Team',
  noIndex = false,
}: {
  title: string
  description: string
  ogImage?: string
  category?: string
  publishedTime?: string
  keywords?: string
  author?: string
  noIndex?: boolean
}): Metadata {
  const url = `https://your-domain.com/blog/${category}/${title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
  
  return {
    title: `${title} | D×MirAI`,
    description,
    keywords,
    authors: [{ name: author }],
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime,
      authors: [author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * LLM対応のJSON-LDスキーマを生成
 */
export function generateArticleSchema({
  title,
  description,
  author = 'D×MirAI Team',
  publishedTime = new Date().toISOString(),
  category = 'AI Technology',
  url,
  imageUrl = '/placeholder.svg?height=600&width=800',
  keywords = '',
}: {
  title: string;
  description: string;
  author?: string;
  publishedTime?: string;
  category?: string;
  url: string;
  imageUrl?: string;
  keywords?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'D×MirAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pursuit-of-factfulness.com/logo.png',
      },
    },
    keywords: keywords,
    articleSection: category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// メタデータを生成するユーティリティ関数
export function getMetadata({
  title,
  description,
  ogImage,
  path,
}: {
  title: string
  description: string
  ogImage: string
  path: string
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    metadataBase: new URL("https://your-domain.com"),
    alternates: {
      canonical: path,
    },
  }
}
