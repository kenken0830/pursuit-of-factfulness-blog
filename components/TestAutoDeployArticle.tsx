import React from 'react';

export const TestAutoDeployArticle = () => {
  return (
    <div className="article-content">
      <h1>自動デプロイテスト記事</h1>
      
      <p>これは自動デプロイシステムのテスト記事です。このファイルが正しく検出され、必要なファイルが生成され、GitHubにプッシュされ、Vercelにデプロイされるかを確認します。</p>
      
      <h2>テスト内容</h2>
      <ul>
        <li>自動ファイル検出</li>
        <li>コンポーネント生成</li>
        <li>ページファイル生成</li>
        <li>Git自動コミット＆プッシュ</li>
        <li>Vercel自動デプロイ</li>
      </ul>
      
      <p>このシステムが正常に動作すれば、このテキストがウェブサイト上に表示されるはずです。</p>
    </div>
  );
}; 