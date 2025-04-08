import type { Metadata } from "next"
import Ai from "@/components/Ai"

// メタデータ
export const metadata: Metadata = {
  title: "AIニュース速報",
  description: "AI分野の最新ニュースをお届けします",
  openGraph: {
    title: "AIニュース速報",
    description: "AI分野の最新ニュースをお届けします",
    images: [{ url: "/images/ai-news.jpg" }],
  },
}

export default function BlogPost() {
  return <Ai />
}
