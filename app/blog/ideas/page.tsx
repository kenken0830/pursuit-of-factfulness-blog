"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownDisplay } from "@/components/markdown-display"
import { generatePostIdeas, getContentSuggestion } from "@/lib/actions"
import { Loader2, Lightbulb, Copy, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function IdeasPage() {
  const [topic, setTopic] = useState("")
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false)
  const [postIdeas, setPostIdeas] = useState<string[]>([])

  const [selectedIdea, setSelectedIdea] = useState("")
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false)
  const [outlineContent, setOutlineContent] = useState("")

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) return

    setIsGeneratingIdeas(true)
    try {
      const ideas = await generatePostIdeas(topic)
      setPostIdeas(ideas)
    } catch (error) {
      console.error("アイデア生成エラー:", error)
    } finally {
      setIsGeneratingIdeas(false)
    }
  }

  const handleGenerateOutline = async (idea: string) => {
    setSelectedIdea(idea)
    setIsGeneratingOutline(true)

    try {
      const outline = await getContentSuggestion(idea)
      setOutlineContent(outline)
    } catch (error) {
      console.error("アウトライン生成エラー:", error)
    } finally {
      setIsGeneratingOutline(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("クリップボードにコピーしました")
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err)
      })
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">記事アイデア生成</h1>
          <p className="text-muted-foreground">
            トピックを入力して、記事のアイデアを生成しましょう。AIがトレンドや読者の関心に基づいたアイデアを提案します。
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>トピックを入力</CardTitle>
            <CardDescription>記事のアイデアを生成したいトピックやキーワードを入力してください。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="例: AI、NVIDIA、量子コンピューティング、ブロックチェーン..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Button onClick={handleGenerateIdeas} disabled={isGeneratingIdeas || !topic.trim()}>
                {isGeneratingIdeas ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    アイデア生成
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {postIdeas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>生成されたアイデア</CardTitle>
              <CardDescription>以下のアイデアから選択して、記事の構成を生成できます。</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {postIdeas.map((idea, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mt-0.5"
                      onClick={() => handleGenerateOutline(idea)}
                    >
                      {selectedIdea === idea && isGeneratingOutline ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <p className="font-medium">{idea}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {outlineContent && (
          <Card>
            <CardHeader>
              <CardTitle>記事構成</CardTitle>
              <CardDescription>「{selectedIdea}」の記事構成が生成されました。</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">プレビュー</TabsTrigger>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 bg-background">
                    <MarkdownDisplay content={outlineContent} />
                  </div>
                </TabsContent>
                <TabsContent value="markdown">
                  <div className="relative">
                    <Textarea value={outlineContent} readOnly className="min-h-[300px] font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(outlineContent)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => copyToClipboard(outlineContent)}>
                <Copy className="mr-2 h-4 w-4" />
                構成をコピー
              </Button>
              <Button asChild>
                <Link
                  href={`/blog/create?title=${encodeURIComponent(selectedIdea)}&outline=${encodeURIComponent(outlineContent)}`}
                >
                  この構成で記事を作成
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

