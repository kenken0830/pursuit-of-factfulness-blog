import type { Metadata } from "next";
import SukuriputoXiuZhengtesuto from "@/components/SukuriputoXiuZhengtesuto"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "スクリプト修正テスト",
  description: "スクリプト修正テストに関する詳細記事",
  openGraph: {
    title: "スクリプト修正テスト",
    description: "スクリプト修正テストに関する詳細記事",
    images: [{ url: "/placeholder.svg?height=600&width=800" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <SukuriputoXiuZhengtesuto />;
}
