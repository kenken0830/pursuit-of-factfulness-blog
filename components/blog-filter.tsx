"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal, Check } from "lucide-react"

export function BlogFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          フィルター
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>並び替え</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Check className="mr-2 h-4 w-4" />
            <span>最新順</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-6">人気順</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-6">古い順</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>カテゴリー</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Check className="mr-2 h-4 w-4" />
            <span>すべて</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-6">テクノロジー</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-6">サイエンス</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-6">ビジネス</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

