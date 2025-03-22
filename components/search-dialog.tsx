"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, Calendar } from "lucide-react"
import Link from "next/link"

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock search results
  const searchResults = [
    {
      title: "NVIDIAが示す「AI時代の新しいコンピュータ」の全貌とは？",
      excerpt: "デスクトップからデータセンターまでを革新する最新GTC 2025春の衝撃",
      slug: "nvidia-ai-computer",
      date: "2025-03-15",
    },
    {
      title: "量子コンピューティングの最新動向",
      excerpt: "量子優位性の実証から実用化への道のり",
      slug: "quantum-computing-trends",
      date: "2025-02-20",
    },
    {
      title: "Web3とブロックチェーンの未来展望",
      excerpt: "分散型インターネットの可能性と課題",
      slug: "web3-blockchain-future",
      date: "2025-01-10",
    },
  ].filter(
    (result) =>
      searchQuery &&
      (result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">検索</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>記事を検索</DialogTitle>
          <DialogDescription>キーワードを入力して記事を検索できます</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="検索キーワードを入力..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {searchQuery && (
            <div className="space-y-2">
              {searchResults.length > 0 ? (
                <>
                  <h4 className="text-sm font-medium">検索結果</h4>
                  <ul className="space-y-2">
                    {searchResults.map((result) => (
                      <li key={result.slug}>
                        <Link
                          href={`/blog/${result.slug}`}
                          className="block p-2 rounded-md hover:bg-muted"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{result.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground ml-6">{result.excerpt}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 ml-6">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  「{searchQuery}」に一致する記事は見つかりませんでした
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

