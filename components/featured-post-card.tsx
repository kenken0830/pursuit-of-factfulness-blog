import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/posts"

interface FeaturedPostCardProps {
  post: Post
  priority?: boolean
}

export function FeaturedPostCard({ post, priority = false }: FeaturedPostCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-200 hover:shadow-md hover:translate-y-[-4px]">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage || "/placeholder.svg?height=400&width=600"}
          alt={post.title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.tags && post.tags.length > 0 && (
          <Badge className="absolute top-3 left-3 z-10" variant="secondary">
            {post.tags[0]}
          </Badge>
        )}
      </div>
      <CardContent className="flex-grow p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readingTime} 分で読める</span>
          </div>
        </div>
        <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium inline-flex items-center text-primary hover:underline"
        >
          続きを読む
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}

