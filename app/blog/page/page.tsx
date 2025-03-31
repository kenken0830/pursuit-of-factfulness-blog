import page from "@/components/page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法 | Pursuit of Factfulness",
  description: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法に関する詳細レポートと最新情報",
  openGraph: {
    title: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法",
    description: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法に関する詳細情報",
    type: "article",
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法",
    description: "次世代AIの"Think"ツール導入で業務効率と信頼性を劇的向上させる方法に関する詳細情報",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function pagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <page />
    </div>
  )
}