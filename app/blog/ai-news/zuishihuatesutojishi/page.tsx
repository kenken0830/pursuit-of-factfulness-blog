import type { Metadata } from "next";
import ZuiShiHuatesutoJiShi from "@/components/ZuiShiHuatesutoJiShi"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "最適化テスト記事",
  description: "自動化パイプラインの動作確認用テスト記事です。",
  openGraph: {
    title: "最適化テスト記事",
    description: "自動化パイプラインの動作確認用テスト記事です。",
    images: [{ url: "/images/test-image.jpg" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <ZuiShiHuatesutoJiShi />;
}
