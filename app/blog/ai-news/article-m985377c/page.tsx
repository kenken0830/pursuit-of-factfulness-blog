import type { Metadata } from "next";
import ArticleM985377c from "@/components/ArticleM985377c";

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
  return <ArticleM985377c />;
}
