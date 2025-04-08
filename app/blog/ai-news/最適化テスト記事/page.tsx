import type { Metadata } from "next"
import Article最適化テスト記事 from "@/components/Article最適化テスト記事"

// メタデータ
export const metadata: Metadata = {
  title: "最適化テスト記事",
  description: "自動化パイプラインの動作確認用テスト記事です。",
  openGraph: {
    title: "最適化テスト記事",
    description: "自動化パイプラインの動作確認用テスト記事です。",
    images: [{ url: "/images/test-image.jpg" }],
  },
}

export default function BlogPost() {
  return <Article最適化テスト記事 />
}
