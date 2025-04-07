// テスト記事のTSXファイル
import React from 'react'

export function TestArticleDeploy() {
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">テスト記事：Vercel自動デプロイの確認</h1>
      <p className="mb-4">これは自動アップロード機能のテスト記事です。</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">主な内容</h2>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-2">自動検出機能のテスト</li>
        <li className="mb-2">記事変換機能の確認</li>
        <li className="mb-2">Vercelデプロイの確認</li>
      </ul>
      
      <p className="mt-6">このファイルが正しく処理されると、ブログページに表示されるはずです。</p>
    </article>
  )
}

// メタデータ
// title: テスト記事：自動デプロイの確認
// category: ai-news
// coverImage: /placeholder.svg?height=600&width=800
