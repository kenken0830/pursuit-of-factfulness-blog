import type { Metadata } from "next";
import ArticleM9850yax from "@/components/ArticleM9850yax";

export const metadata: Metadata = {
  title: "最終成功確認テスト",
  description: "スクリプト完全修正後の成功確認テスト記事です",
  openGraph: {
    title: "最終成功確認テスト",
    description: "スクリプト完全修正後の成功確認テスト記事です",
    images: [{ url: "/images/test-success.jpg" }],
  },
};

export default function BlogPost() {
  return <ArticleM9850yax />;
}
