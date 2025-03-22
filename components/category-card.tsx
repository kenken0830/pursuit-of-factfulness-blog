import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  gradient: string
}

export function CategoryCard({ title, description, icon, href, gradient }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-200 hover:shadow-md hover:translate-y-[-4px]">
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`}></div>
      <CardContent className="flex-grow p-6 pt-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={href} className="text-sm font-medium inline-flex items-center text-primary group-hover:underline">
          このカテゴリーの記事を見る
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

