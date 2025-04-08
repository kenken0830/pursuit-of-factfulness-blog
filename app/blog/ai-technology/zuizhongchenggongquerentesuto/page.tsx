import type { Metadata } from "next";
import ZuiZhongChengGongQueRentesuto from "@/components/ZuiZhongChengGongQueRentesuto"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "最終成功確認テスト",
  description: "最終成功確認テストに関する詳細記事",
  openGraph: {
    title: "最終成功確認テスト",
    description: "最終成功確認テストに関する詳細記事",
    images: [{ url: "/placeholder.svg?height=600&width=800" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <ZuiZhongChengGongQueRentesuto />;
}
