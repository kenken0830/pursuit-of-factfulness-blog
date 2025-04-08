import type { Metadata } from "next"
import Testoptimizationarticle from "@/components/Testoptimizationarticle"

// メタデータ
export const metadata: Metadata = {
  title: "TestOptimizationArticle",
  description: "TestOptimizationArticleに関する詳細記事",
  openGraph: {
    title: "TestOptimizationArticle",
    description: "TestOptimizationArticleに関する詳細記事",
    images: [{ url: "/placeholder.svg?height=600&width=800" }],
  },
}

export default function BlogPost() {
  return <Testoptimizationarticle />
}
