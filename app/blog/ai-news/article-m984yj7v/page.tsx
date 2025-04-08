import type { Metadata } from "next";
import ArticleM984yj7v from "@/components/ArticleM984yj7v";

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
  return <ArticleM984yj7v />;
}
