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
  keywords = '',
  author = 'D×MirAI Team',
  ogImage = '/placeholder.svg?height=600&width=800',
  canonical,
  noIndex = false,
  category = 'ai-technology',
  publishedTime,
  schema,
}: SEOProps): Metadata {
  // 基本的なタイトルとディスクリプション
  const baseMetadata: Metadata = {
    title: `${title} | D×MirAI`,
    description,
    // robots設定
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    // カノニカルURL
    alternates: canonical ? {
      canonical: canonical
    } : undefined,
    // 著者
    authors: [{ name: author }],
  };

  // キーワード
  if (keywords) {
    baseMetadata.keywords = keywords;
  }

  // OGP設定
  baseMetadata.openGraph = {
    type: 'article',
    title: title,
    description: description,
    publishedTime: publishedTime,
    authors: [author],
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  // Twitter Card
  baseMetadata.twitter = {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [ogImage],
  };

  return baseMetadata;
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
