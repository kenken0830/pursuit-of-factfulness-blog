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
    title: `${post.title} | Pursuit of Factfulness`,
    description: post.excerpt,
    authors: [{ name: post.author }],
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
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, 3)

  return (
    <article className="bg-muted/30">
      {/* Hero Section */}
      <div className="w-full bg-background">
        <div className="container max-w-screen-lg px-4 py-12 md:py-16">
          <Button variant="ghost" asChild className="mb-8 pl-0 -ml-3">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              ブログに戻る
            </Link>
          </Button>

          <div className="space-y-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{post.title}</h1>

            <p className="text-xl text-muted-foreground">{post.excerpt}</p>

            <div className="flex items-center gap-4 pt-4">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} alt={post.author} />
                <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readingTime} 分で読める</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full bg-background pb-8">
          <div className="container max-w-screen-lg px-4">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container max-w-screen-lg px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-background rounded-xl shadow-sm p-8 md:p-10">
              <div
                className="prose prose-lg prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Separator className="my-8" />

              {/* Article Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    役に立った
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </div>

                <SocialShareButtons title={post.title} />
              </div>

              {/* Author Bio */}
              <Card className="mt-8 bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} alt={post.author} />
                      <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{post.author}</h3>
                      <p className="text-muted-foreground">
                        テクノロジーと科学の専門家。最新の技術動向と科学的発見について執筆しています。
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          プロフィール
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          他の記事
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">関連記事</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <FeaturedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-background rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">目次</h3>
                <TableOfContents />
              </div>

              <div className="bg-background rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags &&
                    post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="px-3 py-1">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

