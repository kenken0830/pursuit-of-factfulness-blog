import { Metadata } from 'next';
import AutoUploadTest2 from '@/components/AutoUploadTest2';
import { generateArticleSchema } from '@/lib/metadata-utils';

export const metadata: Metadata = {
  title: "自動アップロードテスト記事２：完全自動化システムの検証 | D×MirAI",
  description: "この記事は自動アップロードシステムの動作確認のためのテスト記事です。記事ファイルを配置するだけで自動的にGitHubにプッシュされ、本番環境にデプロイされることを確認します。",
  keywords: "自動化,テスト,アップロード,デプロイ,検証,システム",
  authors: [{ name: "システム管理者" }],
  openGraph: {
    title: "自動アップロードテスト記事２：完全自動化システムの検証",
    description: "自動アップロードシステムの動作確認のためのテスト記事です",
    type: "article",
    publishedTime: "2025-03-31",
    authors: ["システム管理者"],
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "自動アップロードテスト記事２：完全自動化システムの検証",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "自動アップロードテスト記事２：完全自動化システムの検証",
    description: "自動アップロードシステムの動作確認のためのテスト記事です",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function AutoUploadTest2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: "自動アップロードテスト記事２：完全自動化システムの検証",
              description: "この記事は自動アップロードシステムの動作確認のためのテスト記事です",
              author: "システム管理者",
              publishedTime: "2025-03-31",
              category: "ai-news",
              url: "https://www.pursuit-of-factfulness.com/blog/ai-news/auto-upload-test-2",
              keywords: "自動化,テスト,アップロード,デプロイ,検証,システム",
            })
          )
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <AutoUploadTest2 />
      </div>
    </>
  )
}
