"use client"

import { useState } from "react"
import { FiYoutube, FiInfo, FiFileText, FiClipboard, FiDownload } from "react-icons/fi"
import Link from "next/link"

export default function YouTubePage() {
  const [url, setUrl] = useState("")
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [action, setAction] = useState<"info" | "transcript" | "summary">("info")
  const [error, setError] = useState("")

  // YouTubeのURLを処理する関数
  const processYouTube = async () => {
    if (!url) {
      setError("URLを入力してください")
      return
    }

    setProcessing(true)
    setError("")
    
    try {
      const response = await fetch("/api/actions/media/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, action }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "処理中にエラーが発生しました")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "処理中にエラーが発生しました")
      setResult(null)
    } finally {
      setProcessing(false)
    }
  }

  // YouTubeの埋め込みURLを生成
  const getEmbedUrl = (url: string) => {
    try {
      const videoId = extractVideoId(url)
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    } catch (e) {
      console.error(e)
    }
    return null
  }

  // YouTubeのビデオIDを抽出
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FiYoutube className="mr-3 text-red-600" /> YouTube処理
        </h1>
        
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ダッシュボードに戻る
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">YouTube URLを処理</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          YouTubeのURLを入力して、動画情報の取得、トランスクリプトの抽出、または要約の生成を行います。
        </p>
        
        <div className="mb-6">
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            YouTube URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            処理タイプ
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setAction("info")}
              className={`flex items-center px-4 py-2 rounded-md ${
                action === "info" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <FiInfo className="mr-2" /> 動画情報
            </button>
            <button
              type="button"
              onClick={() => setAction("transcript")}
              className={`flex items-center px-4 py-2 rounded-md ${
                action === "transcript" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <FiFileText className="mr-2" /> トランスクリプト
            </button>
            <button
              type="button"
              onClick={() => setAction("summary")}
              className={`flex items-center px-4 py-2 rounded-md ${
                action === "summary" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <FiClipboard className="mr-2" /> 要約生成
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={processYouTube}
          disabled={processing}
          className={`w-full py-2 px-4 rounded-md ${
            processing 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {processing ? "処理中..." : "処理開始"}
        </button>
      </div>

      {url && extractVideoId(url) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">プレビュー</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={getEmbedUrl(url) || ""}
              className="w-full h-64 md:h-96 rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">処理結果</h3>
            <button 
              className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              onClick={() => {
                const jsonStr = JSON.stringify(result, null, 2);
                navigator.clipboard.writeText(jsonStr);
              }}
            >
              <FiClipboard className="mr-1" /> コピー
            </button>
          </div>

          {action === "info" && result.data && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">タイトル</h4>
                <p>{result.data.title}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">チャンネル</h4>
                <p>{result.data.channelTitle}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">公開日</h4>
                <p>{new Date(result.data.publishedAt).toLocaleDateString('ja-JP')}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">視聴回数</h4>
                <p>{Number(result.data.viewCount).toLocaleString()} 回</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">説明</h4>
                <p className="whitespace-pre-line text-sm">{result.data.description}</p>
              </div>
            </div>
          )}

          {action === "transcript" && result.data && (
            <div>
              <div className="mb-2 flex justify-between items-center">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">トランスクリプト</h4>
                <div className="text-sm text-gray-500">言語: {result.data.language}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md max-h-96 overflow-y-auto">
                <p className="whitespace-pre-line text-sm">{result.data.transcript}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800">
                  <FiDownload className="mr-1" /> ダウンロード
                </button>
              </div>
            </div>
          )}

          {action === "summary" && result.data && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">要約</h4>
                <p className="whitespace-pre-line">{result.data.summary}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">キーポイント</h4>
                <ul className="list-disc pl-5">
                  {result.data.keyPoints.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">推奨タグ</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.data.suggestedTags.map((tag: string, index: number) => (
                    <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">アクション</h4>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-800">
                    記事として保存
                  </button>
                  <button className="flex items-center px-3 py-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800">
                    コンポーネント作成
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
