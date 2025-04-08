import type { Metadata } from "next";
import ArticleM984xne1 from "@/components/ArticleM984xne1";

export const metadata: Metadata = {
  title: "スクリプト修正テスト",
  description: "folder_watcherスクリプトの修正テスト記事です",
  openGraph: {
    title: "スクリプト修正テスト",
    description: "folder_watcherスクリプトの修正テスト記事です",
    images: [{ url: "/images/test-image.jpg" }],
  },
};

export default function BlogPost() {
  return <ArticleM984xne1 />;
}
