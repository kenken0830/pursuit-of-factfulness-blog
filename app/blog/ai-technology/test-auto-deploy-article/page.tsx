import type { Metadata } from "next"
import { TestAutoDeployArticle } from "@/components/TestAutoDeployArticle"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "testAutoDeployArticle",
  description: "testAutoDeployArticleに関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-technology/testautodeployarticle",
})

export default function BlogPost() {
  return <TestAutoDeployArticle />
}
