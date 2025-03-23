"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, X } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    readingTime: "5",
    category: "technology",
    featured: false,
    useCustomComponent: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // スラグを自動生成（タイトル入力時）
    if (name === "title" && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setMessageType(null)

    // タグを配列に変換
    const processedData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      readingTime: parseInt(formData.readingTime)
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData)
      })

      if (!response.ok) {
        throw new Error("記事の保存に失敗しました")
      }

      setMessage("記事が正常に保存されました！")
      setMessageType("success")
      
      // フォームをリセット
      setFormData({
        title: "",
        slug: "",
        author: "",
        date: new Date().toISOString().split("T")[0],
        excerpt: "",
        content: "",
        coverImage: "",
        tags: "",
        readingTime: "5",
        category: "technology",
        featured: false,
        useCustomComponent: false
      })

      // しばらくしたら自動的にリダイレクト
      setTimeout(() => {
        router.push("/blog")
      }, 2000)
    } catch (error) {
      console.error("投稿エラー:", error)
      setMessage("記事の保存中にエラーが発生しました。")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">ブログ記事管理</h1>

          {messageType && (
            <div className={`mb-6 p-4 rounded-md flex items-center ${
              messageType === "success" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : 
              "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            }`}>
              {messageType === "success" ? (
                <CheckCircle className="mr-2 h-5 w-5" />
              ) : (
                <X className="mr-2 h-5 w-5" />
              )}
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  タイトル*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">
                  スラグ* (URLの一部になります)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                  著者*
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  公開日*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
                  カバー画像URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="/images/example.jpg"
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  カテゴリー*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                >
                  <option value="technology">テクノロジー</option>
                  <option value="ai">AI</option>
                  <option value="news">ニュース</option>
                  <option value="report">レポート</option>
                  <option value="tutorial">チュートリアル</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">
                  タグ* (カンマ区切り)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="AI, GPT, Technology"
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="readingTime" className="block text-sm font-medium mb-1">
                  読了時間 (分)*
                </label>
                <input
                  type="number"
                  id="readingTime"
                  name="readingTime"
                  value={formData.readingTime}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="block text-sm font-medium">
                  注目記事として表示
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useCustomComponent"
                  name="useCustomComponent"
                  checked={formData.useCustomComponent}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useCustomComponent" className="block text-sm font-medium">
                  カスタムコンポーネントを使用（特別なレイアウトの記事用）
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                概要*
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={2}
                required
                className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                本文* (マークダウン形式)
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={15}
                required
                className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 font-mono"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/blog")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "保存中..." : "記事を保存"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
