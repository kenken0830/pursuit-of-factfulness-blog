import type { Metadata } from "next";
import RiBenYutesutoJiShi from "@/components/RiBenYutesutoJiShi"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "日本語テスト記事",
  description: "日本語タイトルの記事テストです",
  openGraph: {
    title: "日本語テスト記事",
    description: "日本語タイトルの記事テストです",
    images: [{ url: "/images/test-japanese.jpg" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <RiBenYutesutoJiShi />;
}
