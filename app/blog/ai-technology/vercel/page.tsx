import type { Metadata } from "next"
import Vercel from "@/components/Vercel"

// メタデータ
export const metadata: Metadata = {
  title: "Vercelデプロイテスト記事",
  description: "スクリプト修正後のVercelデプロイテスト記事です",
  openGraph: {
    title: "Vercelデプロイテスト記事",
    description: "スクリプト修正後のVercelデプロイテスト記事です",
    images: [{ url: "/images/vercel-deploy.jpg" }],
  },
}

export default function BlogPost() {
  return <Vercel />
}
