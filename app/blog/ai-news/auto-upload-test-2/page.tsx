import type { Metadata } from "next"
import { AutoUploadTest2 } from "@/components/AutoUploadTest2"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "自動アップロードテスト記事２：完全自動化システムの検証",
  description: "自動アップロードテスト記事２：完全自動化システムの検証に関する詳細記事",
  ogImage: "/placeholder.svg?height=600&width=800",
  path: "/blog/ai-news/autouploadtest2",
})

export default function BlogPost() {
  return <AutoUploadTest2 />
}
