import type { Metadata } from "next";
import MinimalTest from "@/components/MinimalTest"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "Minimal Test",
  description: "Minimal Testに関する詳細記事",
  openGraph: {
    title: "Minimal Test",
    description: "Minimal Testに関する詳細記事",
    images: [{ url: "/placeholder.svg?height=600&width=800" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <MinimalTest />;
}
