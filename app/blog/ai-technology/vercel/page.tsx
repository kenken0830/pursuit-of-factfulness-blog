import type { Metadata } from "next"
import Vercel from "@/components/Vercel"

// メタデータ
export const metadata: Metadata = {
  title: "Vercelデプロイ修正テスト",
  description: "修正後のVercelデプロイテスト記事です",
  openGraph: {
    title: "Vercelデプロイ修正テスト",
    description: "修正後のVercelデプロイテスト記事です",
    images: [{ url: "/images/vercel-deploy-fixed.jpg" }],
  },
}

export default function BlogPost() {
  return <Vercel />
}
