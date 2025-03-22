import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { FeaturedPostCard } from "@/components/featured-post-card"
import { BlogSearch } from "@/components/blog-search"
import { BlogFilter } from "@/components/blog-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "ブログ | D×MirAI",
  description: "最先端のAI技術とその応用に関する洞察を提供するブログ",
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = posts.find((post) => post.featured) || posts[0]
  const regularPosts = posts.filter((post) => post !== featuredPost)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 text-primary">
              ブログ
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">最新の記事</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              最先端のAI技術とその応用に関する洞察を提供します。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <BlogSearch />
            <BlogFilter />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-10"></div>
            <Image
              src={featuredPost.coverImage || "/placeholder.svg?height=600&width=1200"}
              alt={featuredPost.title}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/90 hover:bg-primary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    注目記事
                  </Badge>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <Badge variant="secondary">{featuredPost.tags[0]}</Badge>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-sm">
                  {featuredPost.title}
                </h2>
                <p className="text-white/90 mb-4 max-w-2xl text-base md:text-lg drop-shadow-sm">
                  {featuredPost.excerpt}
                </p>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>記事を読む</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Post Tabs */}
        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="mb-8">
            <TabsTrigger value="all">すべての記事</TabsTrigger>
            <TabsTrigger value="technology">AI技術</TabsTrigger>
            <TabsTrigger value="applications">AI応用</TabsTrigger>
            <TabsTrigger value="news">AIニュース</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <FeaturedPostCard key={post.slug} post={post} priority={index < 3} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="technology" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts
                .filter((post) => post.tags?.includes("AI") || post.tags?.includes("Machine Learning"))
                .map((post, index) => (
                  <FeaturedPostCard key={post.slug} post={post} priority={index < 3} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts
                .filter((post) => post.tags?.includes("AI Applications") || post.tags?.includes("Business"))
                .map((post, index) => (
                  <FeaturedPostCard key={post.slug} post={post} priority={index < 3} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts
                .filter((post) => post.tags?.includes("AI News") || post.tags?.includes("Technology"))
                .map((post, index) => (
                  <FeaturedPostCard key={post.slug} post={post} priority={index < 3} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              前へ
            </Button>
            <Button variant="outline" className="bg-primary/10 text-primary">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">次へ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

