import type { Metadata } from "next"
import { AutoTestArticle3 } from "@/components/AutoTestArticle3"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "自動監視システム動作テスト記事３",
  description: "自動監視システム動作テスト記事３に関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-news/autotestarticle3",
})

export default function BlogPost() {
  return <AutoTestArticle3 />
}
