// title: "日本語テスト記事"
// category: "ai-news"
// date: "2025-04-09"
// coverImage: "/images/test-japanese.jpg"
// description: "日本語タイトルの記事テストです"
// tags: ["テスト", "日本語"]
// author: "テスト担当者"

import React from 'react';

export default function JapaneseTestArticle() {
  return (
    <article className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">日本語テスト記事</h1>
      
      <div className="prose max-w-none">
        <p>これは日本語タイトルのテスト記事です。スクリプトが日本語を正しく処理できるかテストします。</p>
        
        <h2>テスト項目</h2>
        <ul>
          <li>日本語タイトルからスラグ生成</li>
          <li>日本語タイトルからコンポーネント名生成</li>
          <li>メタデータの正しい抽出</li>
          <li>ファイル生成の確認</li>
        </ul>
        
        <h2>期待する結果</h2>
        <p>このファイルが正しく処理され、コンポーネントとブログページが生成されるはずです。</p>
      </div>
    </article>
  );
} 