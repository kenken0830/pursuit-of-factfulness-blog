import ArticleTemplate from "@/components/ArticleTemplate"
import { Metadata } from "next"
import { generateArticleSchema } from "@/lib/metadata-utils"

export const metadata: Metadata = {
  title: "AI技術記事のテンプレート | D×MirAI",
  description: "AI技術記事のテンプレートに関する詳細レポートと最新情報",
  keywords: "AI,テンプレート,人工知能,機械学習",
  authors: [{ name: "AI Team" }],
  openGraph: {
    title: "AI技術記事のテンプレート",
    description: "AI技術記事のテンプレートに関する詳細情報",
    type: "article",
    publishedTime: "2025-03-31",
    authors: ["AI Team"],
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "AI技術記事のテンプレート",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI技術記事のテンプレート",
    description: "AI技術記事のテンプレートに関する詳細情報",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function ArticleTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: "AI技術記事のテンプレート",
              description: "AI技術記事のテンプレートに関する詳細レポートと最新情報",
              author: "AI Team",
              publishedTime: "2025-03-31",
              category: "ai-technology",
              url: "https://www.pursuit-of-factfulness.com/blog/ai-technology/article-template",
              keywords: "AI,テンプレート,人工知能,機械学習",
            })
          )
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <ArticleTemplate />
      </div>
    </>
  )
}