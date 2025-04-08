import type { Metadata } from "next";
import ArticleM984xnby from "@/components/ArticleM984xnby";

export const metadata: Metadata = {
  title: "最終修正テスト",
  description: "スクリプト修正の最終テスト記事です",
  openGraph: {
    title: "最終修正テスト",
    description: "スクリプト修正の最終テスト記事です",
    images: [{ url: "/images/test-image.jpg" }],
  },
};

export default function BlogPost() {
  return <ArticleM984xnby />;
}
