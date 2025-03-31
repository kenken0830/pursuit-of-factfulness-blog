"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import { ChevronRight, ChevronDown, Zap, BookOpen, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedPosts, getFeaturedPostsWithDynamic, Post } from "@/lib/posts"
import { FeaturedPostCard } from "@/components/featured-post-card"
import { CategoryCard } from "@/components/category-card"

// ローカルファイアチェック用のフォールバックポスト
const FALLBACK_POSTS: Post[] = [
  {
    slug: "new-uploaded-tsx-article",
    title: "新しくアップロードされた記事",
    date: new Date().toISOString().split('T')[0],
    author: "システム",
    excerpt: "この記事は自動的に生成されたフォールバック記事です。",
    content: "コンテンツはページで直接レンダリングされます。",
    coverImage: `/images/blog/default-cover.jpg`,
    tags: ["新着", "自動生成"],
    readingTime: 3,
    featured: true,
    category: "ai-technology"
  },
  {
    slug: "nvidia-gtc-2025-report",
    title: "NVIDIA GTC 2025春 発表内容資料",
    date: "2025-03-23",
    author: "テックアナリスト",
    excerpt: "GTC 2025春で発表されたDGX Spark、Blackwellアーキテクチャ、AIエコシステム",
    content: "コンテンツはページで直接レンダリングされます。",
    coverImage: `/images/blog/default-cover.jpg`,
    tags: ["NVIDIA", "GTC", "AI"],
    readingTime: 10,
    featured: true,
    category: "ai-news"
  },
  {
    slug: "openai-latest-report-2025",
    title: "OpenAIの最新技術動向",
    date: "2025-03-20",
    author: "AIスペシャリスト",
    excerpt: "OpenAIの最新技術と将来展望についての詳細レポート",
    content: "コンテンツはページで直接レンダリングされます。",
    coverImage: `/images/blog/default-cover.jpg`,
    tags: ["OpenAI", "GPT", "AI"],
    readingTime: 8,
    featured: true,
    category: "ai-technology"
  }
];

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>(FALLBACK_POSTS); // 初期値を設定
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        // 動的記事を含む特集記事を読み込む
        const posts = await getFeaturedPostsWithDynamic(3);
        if (posts && posts.length > 0) {
          setFeaturedPosts(posts);
        } else {
          console.warn("動的記事の取得に失敗しました。フォールバック記事を使用します。");
          setFeaturedPosts(FALLBACK_POSTS); // フォールバックを使用
        }
      } catch (error) {
        console.error("記事の読み込みに失敗:", error);
        // エラー時はフォールバックとして静的データを使用
        setFeaturedPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Reduced height */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-[15%] w-72 h-72 bg-blue-300/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center">
          <Badge className="px-4 py-1.5 text-sm font-medium mb-4" variant="secondary">
            AIの未来を探求する
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6">
            D×MirAI
          </h1>

          <div className="mt-4">
            <Link
              href="#categories"
              className="inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 p-3 shadow-md hover:shadow-lg transition-all duration-200"
              scroll={false}
              aria-label="Scroll to categories"
            >
              <ChevronDown className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section - Reduced top padding */}
      <section id="categories" className="w-full py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center mb-10">
            <div className="space-y-2">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 text-primary">
                カテゴリー
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">探索する分野</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                様々な分野の最新情報と深い洞察を提供しています。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="AI技術"
              description="機械学習、ディープラーニング、大規模言語モデルなどの最新AI技術の解説"
              icon={<Zap className="h-6 w-6" />}
              href="/blog?category=ai-technology"
              gradient="from-blue-500 to-indigo-700"
            />
            <CategoryCard
              title="AI応用"
              description="ビジネス、医療、教育など様々な分野におけるAI活用事例の紹介"
              icon={<BookOpen className="h-6 w-6" />}
              href="/blog?category=ai-applications"
              gradient="from-emerald-500 to-teal-700"
            />
            <CategoryCard
              title="AIニュース"
              description="AI業界の最新ニュース、製品発表、研究成果、市場動向の速報"
              icon={<Newspaper className="h-6 w-6" />}
              href="/blog?category=ai-news"
              gradient="from-amber-500 to-orange-700"
            />
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="w-full py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center mb-10">
            <div className="space-y-2">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 text-primary">
                注目記事
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">最新のインサイト</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                厳選された最新の記事をご覧ください。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <FeaturedPostCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link href="/blog">
                すべての記事を見る
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
