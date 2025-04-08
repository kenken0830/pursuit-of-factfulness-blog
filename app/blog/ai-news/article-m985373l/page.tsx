import type { Metadata } from "next";
import ArticleM985373l from "@/components/ArticleM985373l";

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
  return <ArticleM985373l />;
}
