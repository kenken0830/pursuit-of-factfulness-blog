import type { Metadata } from "next";
import ArticleM984xnhe from "@/components/ArticleM984xnhe";

export const metadata: Metadata = {
  title: "日本語テスト記事",
  description: "日本語タイトルの記事テストです",
  openGraph: {
    title: "日本語テスト記事",
    description: "日本語タイトルの記事テストです",
    images: [{ url: "/images/test-japanese.jpg" }],
  },
};

export default function BlogPost() {
  return <ArticleM984xnhe />;
}
