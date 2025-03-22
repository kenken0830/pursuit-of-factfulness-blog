"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MarkdownDisplay } from "@/components/markdown-display"
import { savePost } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, FileText, Upload, Sparkles, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=600&width=800")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [category, setCategory] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would save to your database or CMS
      await savePost({
        title,
        excerpt,
        content,
        coverImage,
        tags,
        date: new Date().toISOString(),
        category,
        featured: isFeatured,
      })

      toast({
        title: "記事が保存されました",
        description: "記事が正常に保存されました。",
      })

      // Reset form or redirect
      // setTitle('')
      // setExcerpt('')
      // setContent('')
      // setTags([])
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "記事の保存中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">新しい記事を作成</h1>
            <p className="text-muted-foreground">Markdownで記事を作成し、プレビューで確認できます。</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">下書き保存</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  公開する
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-background">
              <CardContent className="p-6">
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="mb-4 w-full justify-start">
                    <TabsTrigger value="write" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      編集
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      プレビュー
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="write" className="mt-0">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">タイトル</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="記事のタイトルを入力してください"
                          className="text-lg"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="excerpt">概要</Label>
                        <Textarea
                          id="excerpt"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="記事の簡単な概要を入力してください"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="content">本文 (Markdown)</Label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Markdownで記事の本文を入力してください"
                          className="min-h-[500px] font-mono"
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="mt-0">
                    <div className="border rounded-md p-6 min-h-[500px] bg-background">
                      {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
                      {excerpt && <p className="text-muted-foreground mb-6">{excerpt}</p>}
                      {content ? (
                        <ScrollArea className="h-[500px] pr-4">
                          <MarkdownDisplay content={content} />
                        </ScrollArea>
                      ) : (
                        <p className="text-muted-foreground text-center py-20">
                          プレビューするコンテンツがありません。編集タブでコンテンツを入力してください。
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">公開設定</h3>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">カテゴリー</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリーを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">テクノロジー</SelectItem>
                          <SelectItem value="science">サイエンス</SelectItem>
                          <SelectItem value="business">ビジネス</SelectItem>
                          <SelectItem value="health">健康</SelectItem>
                          <SelectItem value="environment">環境</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="publishDate">公開日</Label>
                      <Input id="publishDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        注目記事として表示
                      </Label>
                      <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">カバー画像</h3>

                  <div className="space-y-4">
                    <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                      {coverImage && (
                        <img
                          src={coverImage || "/placeholder.svg"}
                          alt="カバー画像"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // In a real app, you would upload this file to your server
                            // For now, we'll just create a local URL
                            const url = URL.createObjectURL(file)
                            setCoverImage(url)
                          }
                        }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="w-full" onClick={triggerFileInput}>
                        <Upload className="mr-2 h-4 w-4" />
                        画像をアップロード
                      </Button>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">または画像URLを入力</Label>
                      <Input
                        id="imageUrl"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">タグ</h3>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="タグを入力..."
                      />
                      <Button type="button" variant="outline" onClick={handleAddTag}>
                        追加
                      </Button>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 p-0"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">削除</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2">よく使われるタグ</h4>
                      <div className="flex flex-wrap gap-2">
                        {["AI", "テクノロジー", "サイエンス", "ビジネス", "環境", "健康"].map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-secondary"
                            onClick={() => {
                              if (!tags.includes(tag)) {
                                setTags([...tags, tag])
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

