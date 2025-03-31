"use client"

import { useState, useCallback, ChangeEvent, FormEvent } from "react"
import { slugify } from "@/lib/utils"
import { 
  FaFileUpload, 
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaExternalLinkAlt
} from "react-icons/fa"

export default function UploadTSXForm() {
  const [tsxFile, setTsxFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("technology")
  const [autoDeploy, setAutoDeploy] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [result, setResult] = useState<any>(null)
  
  // タイトルが変更されたら自動的にスラグを生成
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (newTitle) {
      setSlug(slugify(newTitle))
    }
  }
  
  // ファイルが選択されたらファイル情報をセット
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.name.endsWith('.tsx')) {
        setTsxFile(file)
        setErrorMessage("")
        
        // ファイル名からタイトルを予測（.tsxを除去して空白を追加）
        const nameWithoutExt = file.name.replace('.tsx', '')
        const predictedTitle = nameWithoutExt
          .replace(/([A-Z])/g, ' $1') // CamelCaseをスペースで区切る
          .replace(/^./, (str) => str.toUpperCase()) // 先頭を大文字に
        
        if (!title) {
          setTitle(predictedTitle.trim())
          setSlug(slugify(predictedTitle.trim()))
        }
      } else {
        setTsxFile(null)
        setErrorMessage("TSX形式のファイルを選択してください")
      }
    }
  }
  
  // フォーム送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!tsxFile || !title || !slug) {
      setErrorMessage("TSXファイル、タイトル、スラグは必須です")
      return
    }
    
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")
    setResult(null)
    
    try {
      const formData = new FormData()
      formData.append("file", tsxFile)
      formData.append("title", title)
      formData.append("slug", slug)
      formData.append("category", category)
      formData.append("autoDeploy", autoDeploy.toString())
      
      const response = await fetch("/api/components/upload", {
        method: "POST",
        body: formData
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccessMessage(data.message || "コンポーネントを正常にアップロードしました")
        setResult(data)
        
        // フォームをリセット
        if (autoDeploy) {
          setTsxFile(null)
          setTitle("")
          setSlug("")
        }
      } else {
        setErrorMessage(data.error || "アップロード中にエラーが発生しました")
      }
    } catch (error: any) {
      setErrorMessage(`エラーが発生しました: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <FaFileUpload className="mr-2" />
        TSXコンポーネントをアップロード
      </h2>
      
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-500 mr-2" />
            <p className="text-red-700 dark:text-red-400">{errorMessage}</p>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p className="text-green-700 dark:text-green-400">{successMessage}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="tsx-file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            TSXファイル (Reactコンポーネント)
          </label>
          <input
            type="file"
            id="tsx-file"
            accept=".tsx"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
          {tsxFile && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              選択されたファイル: {tsxFile.name} ({Math.round(tsxFile.size / 1024)} KB)
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="記事のタイトルを入力"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            スラグ (URL)
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
              /blog/
            </span>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 block px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="url-friendly-slug"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            カテゴリー
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          >
            <option value="technology">テクノロジー</option>
            <option value="ai-technology">AI技術</option>
            <option value="research">研究レポート</option>
            <option value="news">ニュース</option>
            <option value="tutorial">チュートリアル</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="auto-deploy"
            checked={autoDeploy}
            onChange={(e) => setAutoDeploy(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isSubmitting}
          />
          <label htmlFor="auto-deploy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            自動デプロイを有効にする（GitHubコミット & Vercelデプロイ）
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !tsxFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                アップロード中...
              </>
            ) : (
              <>
                <FaFileUpload className="mr-2" />
                アップロードして公開
              </>
            )}
          </button>
        </div>
      </form>
      
      {result && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">公開結果</h3>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">コンポーネント:</span>
              <span className="ml-2 text-gray-800 dark:text-gray-200">{result.componentPath}</span>
            </div>
            
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ページ:</span>
              <span className="ml-2 text-gray-800 dark:text-gray-200">{result.pagePath}</span>
            </div>
            
            <div className="mt-4">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ページを表示 <FaExternalLinkAlt className="ml-1 text-xs" />
              </a>
              
              {autoDeploy && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>本番環境へのデプロイが進行中です。反映まで数分かかる場合があります。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
