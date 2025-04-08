// title: Vercelデプロイ修正テスト
// category: ai-technology
// date: 2025-04-08
// coverImage: /images/vercel-deploy-fixed.jpg
// description: 修正後のVercelデプロイテスト記事です

export default function Article() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Vercelデプロイ修正テスト</h1>
      
      <p>
        これは、すべての設定を修正した後の自動デプロイのテストです。
      </p>
      
      <p>
        以下の修正を行いました：
        <ul>
          <li>React依存関係の修正 (18.2.0)</li>
          <li>metadataBase設定の追加</li>
          <li>folder_watcherのVercelデプロイフック修正（PowerShell対応）</li>
        </ul>
      </p>
    </article>
  );
} 