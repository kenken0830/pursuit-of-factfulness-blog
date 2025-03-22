"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
      <Input
        type="search"
        placeholder="記事を検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 w-full sm:w-[260px]"
      />
      {searchQuery ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full aspect-square"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">クリア</span>
        </Button>
      ) : (
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full aspect-square">
          <Search className="h-4 w-4" />
          <span className="sr-only">検索</span>
        </Button>
      )}
    </form>
  )
}

