import type { Metadata } from "next";
import ArticleM984yjh6 from "@/components/ArticleM984yjh6";

export const metadata: Metadata = {
  title: "最終修正確認テスト",
  description: "スクリプト最終修正の確認テスト記事です",
  openGraph: {
    title: "最終修正確認テスト",
    description: "スクリプト最終修正の確認テスト記事です",
    images: [{ url: "/images/test-final.jpg" }],
  },
};

export default function BlogPost() {
  return <ArticleM984yjh6 />;
}
