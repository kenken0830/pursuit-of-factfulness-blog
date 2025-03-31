import { Metadata } from 'next';
import AutoDeployTest from '@/components/AutoDeployTest';
import { generateArticleSchema } from '@/lib/metadata-utils';

export const metadata: Metadata = {
  title: "自動デプロイテスト：GitとVercel連携の検証 | D×MirAI",
  description: "全自動アップロードシステムのGitとVercel連携機能を検証するためのテスト記事です",
  keywords: "デプロイ,自動化,テスト,記事",
  authors: [{ name: "システムテストチーム" }],
  openGraph: {
    title: "自動デプロイテスト：GitとVercel連携の検証",
    description: "全自動アップロードシステムのGitとVercel連携機能を検証するためのテスト記事です",
    type: "article",
    publishedTime: "2025-03-31",
    authors: ["システムテストチーム"],
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "自動デプロイテスト：GitとVercel連携の検証",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "自動デプロイテスト：GitとVercel連携の検証",
    description: "全自動アップロードシステムのGitとVercel連携機能を検証するためのテスト記事です",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function AutoDeployTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: "自動デプロイテスト：GitとVercel連携の検証",
              description: "全自動アップロードシステムのGitとVercel連携機能を検証するためのテスト記事です",
              author: "システムテストチーム",
              publishedTime: "2025-03-31",
              category: "ai-news",
              url: "https://www.pursuit-of-factfulness.com/blog/ai-news/auto-deploy-test",
              keywords: "デプロイ,自動化,テスト,記事",
            })
          )
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <AutoDeployTest />
      </div>
    </>
  )
}
