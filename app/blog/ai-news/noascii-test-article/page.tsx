import type { Metadata } from "next";
import NoAsciiTestArticle from "@/components/NoAsciiTestArticle"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "NoAscii Test Article",
  description: "A test article that should work without anyAscii",
  openGraph: {
    title: "NoAscii Test Article",
    description: "A test article that should work without anyAscii",
    images: [{ url: "/images/test-noascii.jpg" }], // OGP画像
  },
};

// ページコンポーネント
export default function BlogPost() {
  return <NoAsciiTestArticle />;
}
