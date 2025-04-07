import type { Metadata } from "next"
import FinalTestArticle from "@/components/FinalTestArticle"

// メタデータ
export const metadata: Metadata = {
  title: "最終テスト記事",
  description: "自動生成システムのテスト記事です",
  openGraph: {
    title: "最終テスト記事",
    description: "自動生成システムのテスト記事です",
    images: [{ url: "/placeholder.svg?height=600&width=800" }],
  },
}

export default function BlogPost() {
  return <FinalTestArticle />
}
