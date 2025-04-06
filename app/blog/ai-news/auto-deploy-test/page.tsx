import type { Metadata } from "next"
import { AutoDeployTest } from "@/components/AutoDeployTest"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "自動デプロイテスト：GitとVercel連携の検証",
  description: "自動デプロイテスト：GitとVercel連携の検証に関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-news/autodeploytest",
})

export default function BlogPost() {
  return <AutoDeployTest />
}
