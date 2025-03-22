"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus, FileText, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// 投稿予定のダミーデータ
const initialScheduledPosts = [
  {
    id: "1",
    title: "NVIDIA Blackwellアーキテクチャの詳細分析",
    date: new Date(2025, 3, 15),
    status: "draft",
    category: "技術解説",
  },
  {
    id: "2",
    title: "量子コンピューティングの最新動向",
    date: new Date(2025, 3, 20),
    status: "scheduled",
    category: "トレンド",
  },
  {
    id: "3",
    title: "AIモデルの最適化テクニック",
    date: new Date(2025, 3, 25),
    status: "draft",
    category: "チュートリアル",
  },
  {
    id: "4",
    title: "Web3とブロックチェーンの未来展望",
    date: new Date(2025, 4, 5),
    status: "idea",
    category: "分析",
  },
]

export default function ContentCalendarPage() {
  const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    date: new Date(),
    status: "idea",
    category: "技術解説",
  })

  // 日付に投稿があるかチェックする関数
  const hasPostOnDate = (date: Date) => {
    return scheduledPosts.some(
      (post) =>
        post.date.getDate() === date.getDate() &&
        post.date.getMonth() === date.getMonth() &&
        post.date.getFullYear() === date.getFullYear(),
    )
  }

  // 選択された日付の投稿を取得する関数
  const getPostsForSelectedDate = () => {
    if (!selectedDate) return []

    return scheduledPosts.filter(
      (post) =>
        post.date.getDate() === selectedDate.getDate() &&
        post.date.getMonth() === selectedDate.getMonth() &&
        post.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // 新しい投稿を追加する関数
  const handleAddPost = () => {
    const id = Math.random().toString(36).substr(2, 9)
    setScheduledPosts([...scheduledPosts, { id, ...newPost }])
    setNewPost({
      title: "",
      date: new Date(),
      status: "idea",
      category: "技術解説",
    })
    setIsAddDialogOpen(false)
  }

  // 投稿を削除する関数
  const handleDeletePost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== id))
  }

  // ステータスに応じたバッジの色を返す関数
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "scheduled":
        return "secondary"
      case "draft":
        return "outline"
      case "idea":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">コンテンツカレンダー</h1>
            <p className="text-muted-foreground">
              記事の公開スケジュールを管理し、計画的にコンテンツを作成しましょう。
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                予定を追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しい記事予定を追加</DialogTitle>
                <DialogDescription>記事のタイトル、公開予定日、ステータスを入力してください。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">タイトル</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="記事のタイトルを入力"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">公開予定日</Label>
                  <div className="flex gap-2">
                    <Input
                      id="date"
                      type="date"
                      value={newPost.date.toISOString().split("T")[0]}
                      onChange={(e) => setNewPost({ ...newPost, date: new Date(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">ステータス</Label>
                    <Select value={newPost.status} onValueChange={(value) => setNewPost({ ...newPost, status: value })}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="ステータスを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">アイデア</SelectItem>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="scheduled">予定済み</SelectItem>
                        <SelectItem value="published">公開済み</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">カテゴリ</Label>
                    <Select
                      value={newPost.category}
                      onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="カテゴリを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="技術解説">技術解説</SelectItem>
                        <SelectItem value="トレンド">トレンド</SelectItem>
                        <SelectItem value="チュートリアル">チュートリアル</SelectItem>
                        <SelectItem value="分析">分析</SelectItem>
                        <SelectItem value="ニュース">ニュース</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">メモ</Label>
                  <Textarea id="notes" placeholder="記事に関するメモや要点" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleAddPost}>追加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>カレンダー</CardTitle>
              <CardDescription>記事の公開予定日を選択してください</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasPost: (date) => hasPostOnDate(date),
                }}
                modifiersStyles={{
                  hasPost: {
                    fontWeight: "bold",
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {selectedDate.toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </div>
                ) : (
                  "選択された日付の予定"
                )}
              </CardTitle>
              <CardDescription>
                {getPostsForSelectedDate().length > 0
                  ? `${getPostsForSelectedDate().length}件の記事が予定されています`
                  : "この日に予定されている記事はありません"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getPostsForSelectedDate().length > 0 ? (
                <ul className="space-y-4">
                  {getPostsForSelectedDate().map((post) => (
                    <li key={post.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge variant={getStatusBadgeVariant(post.status)}>
                            {post.status === "published" && "公開済み"}
                            {post.status === "scheduled" && "予定済み"}
                            {post.status === "draft" && "下書き"}
                            {post.status === "idea" && "アイデア"}
                          </Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href="/blog/create">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-1">この日に予定はありません</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    「予定を追加」ボタンをクリックして新しい記事を計画しましょう
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    予定を追加
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

