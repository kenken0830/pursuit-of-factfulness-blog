import type { Metadata } from "next"
import { ArticleTemplate } from "@/components/ArticleTemplate"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "AI技術記事のテンプレート",
  description: "AI技術記事のテンプレートに関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-technology/articletemplate",
})

export default function BlogPost() {
  return <ArticleTemplate />
}
