import type { Metadata } from "next";
import ArticleM9850yk2 from "@/components/ArticleM9850yk2";

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
  return <ArticleM9850yk2 />;
}
