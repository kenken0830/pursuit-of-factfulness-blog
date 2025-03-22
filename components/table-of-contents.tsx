"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Find all headings in the article
    const headings = Array.from(document.querySelectorAll(".prose h2, .prose h3"))

    const tocItems: TocItem[] = headings.map((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""

      // Set id if not already present
      if (!heading.id) {
        heading.id = id
      }

      return {
        id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      }
    })

    setToc(tocItems)

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (toc.length === 0) {
    return <p className="text-muted-foreground text-sm">目次がありません</p>
  }

  return (
    <nav>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-block transition-colors hover:text-primary",
                activeId === item.id ? "text-primary font-medium" : "text-muted-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

