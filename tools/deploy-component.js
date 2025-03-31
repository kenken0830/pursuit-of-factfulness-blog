const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

// 環境変数の読み込み
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// 引数の取得
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('使用方法: node deploy-component.js <TSXファイルパス> <タイトル> <スラグ>');
  process.exit(1);
}

const tsxFilePath = args[0];
const title = args[1];
const slug = args[2];

async function deployComponent() {
  try {
    // TSXファイルの読み込み
    if (!fs.existsSync(tsxFilePath)) {
      console.error(`ファイルが見つかりません: ${tsxFilePath}`);
      process.exit(1);
    }

    // コンポーネント名の取得（ファイル名から拡張子を除去）
    const componentName = path.basename(tsxFilePath, '.tsx');
    const componentContent = fs.readFileSync(tsxFilePath, 'utf8');
    
    // ページファイルの内容を生成
    const description = `${title}に関する詳細レポートと最新情報`;
    
    const pageContent = `import ${componentName} from "@/components/${componentName}"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "${title} | Pursuit of Factfulness",
  description: "${description}",
  openGraph: {
    title: "${title}",
    description: "${description}",
    type: "article",
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "${title}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "${title}",
    description: "${description}",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function ${componentName}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <${componentName} />
    </div>
  )
}
`;

    console.log(`コンポーネント名: ${componentName}`);
    console.log(`タイトル: ${title}`);
    console.log(`スラグ: ${slug}`);
    
    // GitHubへのデプロイ
    await deployToGitHub(componentName, componentContent, pageContent, slug);
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

async function deployToGitHub(componentName, componentContent, pageContent, slug) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKENが設定されていません。.env.localファイルを確認してください。');
    process.exit(1);
  }
  
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  
  if (!owner || !repo) {
    console.error('GITHUB_OWNERまたはGITHUB_REPOが設定されていません。');
    process.exit(1);
  }
  
  console.log(`GitHubリポジトリ: ${owner}/${repo}`);
  
  // Octokit初期化
  const octokit = new Octokit({ auth: token });
  
  try {
    // コンポーネントファイルのコミット
    const componentPath = `components/${componentName}.tsx`;
    console.log(`コンポーネントファイルをコミット中: ${componentPath}`);
    
    // 既存のファイルがあるか確認
    let componentSha;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: componentPath,
      });
      componentSha = data.sha;
      console.log('既存のコンポーネントファイルを更新します');
    } catch (e) {
      console.log('新しいコンポーネントファイルを作成します');
    }
    
    // コンポーネントファイルをコミット
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: componentPath,
      message: `Add/Update component: ${componentName}`,
      content: Buffer.from(componentContent).toString('base64'),
      sha: componentSha
    });
    
    // ページファイルのコミット
    const pagePath = `app/blog/${slug}/page.tsx`;
    console.log(`ページファイルをコミット中: ${pagePath}`);
    
    // 既存のファイルがあるか確認
    let pageSha;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: pagePath,
      });
      pageSha = data.sha;
      console.log('既存のページファイルを更新します');
    } catch (e) {
      console.log('新しいページファイルを作成します');
    }
    
    // ページファイルをコミット
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: pagePath,
      message: `Add/Update page for: ${slug}`,
      content: Buffer.from(pageContent).toString('base64'),
      sha: pageSha
    });
    
    console.log('GitHubへのコミットが完了しました');
    
    // Vercelデプロイフックを呼び出す
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (deployHookUrl) {
      console.log('Vercelデプロイを開始しています...');
      const response = await fetch(deployHookUrl, {
        method: 'POST'
      });
      
      if (response.ok) {
        console.log('Vercelデプロイが開始されました');
        console.log('本番環境での確認URL: https://www.pursuit-of-factfulness.com/blog/' + slug);
        console.log('デプロイには数分かかります');
      } else {
        console.error('Vercelデプロイの開始に失敗しました');
      }
    } else {
      console.warn('VERCEL_DEPLOY_HOOK_URLが設定されていないため、手動でデプロイを行う必要があります');
    }
    
  } catch (error) {
    console.error('GitHubへのデプロイ中にエラーが発生しました:', error);
    throw error;
  }
}

// スクリプトの実行
deployComponent();
