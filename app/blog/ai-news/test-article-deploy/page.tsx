import type { Metadata } from "next"
import { TestArticleDeploy } from "@/components/TestArticleDeploy"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "テスト記事：自動デプロイの確認",
  description: "テスト記事：自動デプロイの確認に関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-news/testarticledeploy",
})

export default function BlogPost() {
  return <TestArticleDeploy />
}
