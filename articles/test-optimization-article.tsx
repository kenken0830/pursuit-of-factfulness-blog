// title: "最適化テスト記事"
// category: "ai-news"
// date: "2025-04-08"
// coverImage: "/images/test-image.jpg"
// description: "自動化パイプラインの動作確認用テスト記事です。"
// tags: ["テスト", "自動化", "最適化"]
// author: "テスト担当"

import React from 'react';

export default function TestOptimizationArticle() {
  return (
    <article className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">最適化テスト記事</h1>
      
      <div className="prose max-w-none">
        <p>これは自動化パイプラインの動作確認用のテスト記事です。メタデータの抽出と処理が正しく行われるかを確認します。</p>
        
        <h2>テスト対象</h2>
        <ul>
          <li>メタデータの正しい抽出</li>
          <li>日本語タイトルからのスラグ生成</li>
          <li>ファイル生成の確認</li>
          <li>Gitコマンドの実行</li>
        </ul>
        
        <p>このテストが成功すれば、記事公開の自動化パイプラインが正しく機能していることが確認できます。</p>
      </div>
    </article>
  );
} 