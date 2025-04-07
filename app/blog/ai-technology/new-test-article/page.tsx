import type { Metadata } from "next"
import { NewTestArticle } from "@/components/NewTestArticle"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "newTestArticle",
  description: "newTestArticleに関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-technology/newtestarticle",
})

export default function BlogPost() {
  return <NewTestArticle />
}
