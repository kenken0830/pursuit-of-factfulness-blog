import page from "@/components/page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page | Pursuit of Factfulness",
  description: "Pageに関する詳細レポートと最新情報",
  openGraph: {
    title: "Page",
    description: "Pageに関する詳細レポートと最新情報",
    type: "article",
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page",
    description: "Pageに関する詳細レポートと最新情報",
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