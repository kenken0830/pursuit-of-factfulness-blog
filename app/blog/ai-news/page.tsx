import type { Metadata } from "next"
import {  } from "@/components/"
import { generateArticleMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = generateArticleMetadata({
  title: "最終パイプラインテスト",
  description: "最終パイプラインテストに関する詳細記事",
  ogImage: "/images/pipeline-test.jpg",
  category: "ai-news",
  publishedTime: "2025-04-08",
})

export default function BlogPost() {
  return < />
}
