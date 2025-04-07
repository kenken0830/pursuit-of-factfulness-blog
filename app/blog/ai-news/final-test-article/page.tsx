import type { Metadata } from "next"
import { FinalTestArticle } from "@/components/FinalTestArticle"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "finalTestArticle",
  description: "finalTestArticleに関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-news/finaltestarticle",
})

export default function BlogPost() {
  return <FinalTestArticle />
}
