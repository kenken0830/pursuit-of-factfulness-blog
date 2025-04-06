import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Tag, ArrowLeft, Bookmark, ThumbsUp } from "lucide-react"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TableOfContents } from "@/components/table-of-contents"
import { FeaturedPostCard } from "@/components/featured-post-card"
import { SocialShareButtons } from "@/components/social-share-buttons"
import NvidiaGTC2025Report from "@/components/NvidiaGTC2025Report"
import OpenAILatestReport from "@/components/OpenAILatestReport"
import { CalendarIcon } from "lucide-react"
import { MarkdownDisplay } from "@/components/markdown-display"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は見つかりませんでした。",
    }
  }

  return {
    title: `${post.title} | D×MirAI`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || "/og-image.jpg"],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  // NVIDIA GTCレポート用の特別処理
  if (params.slug === "nvidia-gtc-2025-report") {
    return <NvidiaGTC2025Report />
  }

  // OpenAIレポート用の特別処理
  if (params.slug === "openai-latest-report") {
    return <OpenAILatestReport />
  }

  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)
  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  
  // コンテンツに目次マーカーがある場合は目次を表示
  const hasToc = post.content && post.content.includes("<h2")

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-12 space-y-6">
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ブログ
            </Link>
            <span className="text-muted-foreground">/</span>
            {post.category && (
              <>
                <Link
                  href={`/blog?category=${post.category}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors capitalize"
                >
                  {post.category.replace(/-/g, " ")}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-sm truncate max-w-[120px] sm:max-w-xs">
              {post.title}
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-medium">{post.author}</span>
                <span className="hidden text-muted-foreground sm:inline">・</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
                <span className="hidden text-muted-foreground sm:inline">・</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime} 分で読める</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <SocialShareButtons title={post.title} />
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="overflow-hidden rounded-xl">
              <div className="aspect-video relative w-full">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* 目次（PCのみ表示） */}
          {hasToc && (
            <div className="order-2 hidden lg:block lg:w-64 lg:shrink-0 lg:order-1">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </div>
          )}

          {/* 記事コンテンツ */}
          <div className={`order-1 min-w-0 ${hasToc ? "lg:order-2" : ""}`}>
            {post.content ? (
              <div className="prose prose-stone dark:prose-invert max-w-none">
                <MarkdownDisplay content={post.content} />
              </div>
            ) : (
              // Dynamic component for OpenAI Report etc.
              <div>
                {/* コンポーネントは別の場所で読み込まれています */}
                {/* コンテンツのみをここでレンダリングする代わりに */}
                {/* app/blog/[slug]/page.tsx ではなく、特定の記事のページで関連コンポーネントを読み込んでいます */}
              </div>
            )}

            <Separator className="my-12" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} alt={post.author} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Written by</p>
                  <p className="text-sm text-muted-foreground">{post.author}</p>
                </div>
              </div>
              <SocialShareButtons title={post.title} />
            </div>
          </div>
        </div>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold">関連記事</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg">
                    <div className="aspect-video relative w-full">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
