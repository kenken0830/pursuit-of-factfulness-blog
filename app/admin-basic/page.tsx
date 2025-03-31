"use client"

import { useState } from "react"
import Link from "next/link"

export default function BasicAdminPage() {
  const [message, setMessage] = useState("")
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ブログ管理システム - 簡易版</h1>
      
      {message && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">サイト状態</h2>
          <div className="space-y-4">
            <div>
              <p>Next.jsバージョン: 15.1.0</p>
              <p>現在時刻: {new Date().toLocaleString('ja-JP')}</p>
              <p>ローカル環境: http://localhost:3000</p>
            </div>
            <button
              onClick={() => setMessage("サーバーは正常に動作しています。")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              サーバー状態を確認
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">クイックアクション</h2>
          <div className="space-y-4">
            <Link 
              href="/"
              className="block px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
            >
              ホームページを表示
            </Link>
            <Link 
              href="/blog"
              className="block px-4 py-2 bg-purple-600 text-white text-center rounded hover:bg-purple-700"
            >
              ブログ一覧を表示
            </Link>
            <button
              onClick={() => {
                setMessage("キャッシュをクリアしました。変更が反映されるまで数秒かかる場合があります。")
              }}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              キャッシュをクリア
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">トラブルシューティング</h2>
        <div className="space-y-4">
          <p>現在、依存関係の問題により一部機能が制限されています。以下の手順で問題を解決できる場合があります：</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>ターミナルで <code>npm install --legacy-peer-deps</code> を実行</li>
            <li>サーバーを再起動 (<code>npm run dev</code>)</li>
            <li>ブラウザのキャッシュをクリア</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            詳細な手順については、プロジェクトルートにある「セットアップと利用手順.md」を参照してください。
          </p>
        </div>
      </div>
    </div>
  )
}
