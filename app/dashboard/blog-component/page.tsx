"use client"

import { useState } from "react"
import { FiFileText, FiCode, FiSave, FiEye, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import Link from "next/link"

// TSXブログコンポーネント登録ページ
export default function BlogComponentPage() {
  const [code, setCode] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState("")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=600&width=800")
  const [componentName, setComponentName] = useState("")
  
  const [previewMode, setPreviewMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  // スラグを自動生成
  const handleTitleChange = (value: string) => {
    setTitle(value)
    // コンポーネント名を生成（スペース削除、各単語の先頭を大文字に）
    const componentNameCandidate = value
      .replace(/[^\w\s]/gi, '') // 特殊文字削除
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    
    if (!componentName) {
      setComponentName(componentNameCandidate)
    }
    
    // スラグを生成
    const slugCandidate = value
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    
    if (!slug) {
      setSlug(slugCandidate)
    }
  }

  // ブログコンポーネントを登録
  const submitBlogComponent = async () => {
    if (!code || !title || !slug || !componentName) {
      setError("必須項目を入力してください")
      return
    }
    
    setSubmitting(true)
    setError("")
    
    try {
      // API呼び出し
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt: excerpt || `${title}の詳細レポートと分析`,
          content: "", // コンポーネント使用の場合は空
          tags: tags.split(",").map(tag => tag.trim()),
          coverImage,
          componentCode: code,
          componentName,
          useCustomComponent: true
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "登録中にエラーが発生しました")
      }
      
      setResult(data)
    } catch (err: any) {
      setError(err.message || "登録中にエラーが発生しました")
    } finally {
      setSubmitting(false)
    }
  }

  // サンプルコードを挿入
  const insertSampleCode = () => {
    setCode(`import React from 'react';
import Image from 'next/image';

export default function ${componentName || 'BlogComponent'}() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">${title || 'ブログタイトルをここに入力'}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">${excerpt || 'ブログの概要をここに入力'}</p>
        <div className="flex justify-center space-x-2 mb-6">
          ${tags ? tags.split(',').map(tag => `<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tag.trim()}</span>`).join('\n          ') : '<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">タグ1</span>\n          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">タグ2</span>'}
        </div>
        <div className="relative h-[400px] w-full mb-8">
          <Image 
            src="${coverImage}" 
            alt="${title || 'ブログ画像'}"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>
          ここにブログの本文を記述します。リッチなコンポーネントを使って、魅力的な記事を作成できます。
        </p>
        <h2>セクション1</h2>
        <p>
          各セクションには見出しと本文を含めます。画像、リスト、引用などの要素も追加できます。
        </p>
        <ul>
          <li>リストアイテム1</li>
          <li>リストアイテム2</li>
          <li>リストアイテム3</li>
        </ul>
        <h2>セクション2</h2>
        <p>
          必要に応じて、グラフやその他のインタラクティブな要素も追加できます。
        </p>
        <blockquote>
          重要なポイントや引用はこのように表示できます。
        </blockquote>
        <p>
          記事の最後に結論や次のステップを記述します。
        </p>
      </div>
    </article>
  );
}`);
  }

  // プレビュー表示のトグル
  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FiFileText className="mr-3 text-purple-600" /> TSXブログコンポーネント
        </h1>
        
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ダッシュボードに戻る
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <FiCode className="mr-2" /> ブログコンポーネント
              </h2>
              <button 
                onClick={togglePreview} 
                className="flex items-center text-sm px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                {previewMode ? (
                  <>
                    <FiCode className="mr-1" /> コード編集
                  </>
                ) : (
                  <>
                    <FiEye className="mr-1" /> プレビュー
                  </>
                )}
              </button>
            </div>
            
            {!previewMode ? (
              <div className="mb-4">
                <div className="flex justify-end mb-2">
                  <button 
                    onClick={insertSampleCode} 
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    サンプルコードを挿入
                  </button>
                </div>
                <textarea 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  className="w-full h-[500px] px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 font-mono"
                  placeholder="Reactコンポーネントのコードを入力..."
                />
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-[500px] overflow-auto">
                <div className="text-sm text-gray-500 mb-2">プレビューモード (表示のみ)</div>
                <pre className="text-sm overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">ブログ情報</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  タイトル *
                </label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => handleTitleChange(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="記事タイトル"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    スラグ *
                  </label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    placeholder="article-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    コンポーネント名 *
                  </label>
                  <input 
                    type="text" 
                    value={componentName} 
                    onChange={(e) => setComponentName(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    placeholder="ArticleComponent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  概要
                </label>
                <textarea 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="記事の概要（空白の場合はタイトルから自動生成）"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  タグ（カンマ区切り）
                </label>
                <input 
                  type="text" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="AI, Technology, Report"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  カバー画像URL
                </label>
                <input 
                  type="text" 
                  value={coverImage} 
                  onChange={(e) => setCoverImage(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="/images/cover.jpg"
                />
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {result && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md text-sm">
                <div className="flex items-center">
                  <FiCheckCircle className="text-green-600 dark:text-green-400 mr-2" />
                  <span>ブログコンポーネントが正常に登録されました！</span>
                </div>
                <div className="mt-2">
                  <p><strong>タイトル:</strong> {result.title}</p>
                  <p><strong>URL:</strong> <a href={`/blog/${result.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">/blog/{result.slug}</a></p>
                </div>
              </div>
            )}
            
            <button
              onClick={submitBlogComponent}
              disabled={submitting}
              className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                submitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {submitting ? (
                <>
                  <span className="mr-2">登録中...</span>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> ブログコンポーネントを登録
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
