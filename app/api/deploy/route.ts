import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import 'dotenv/config';

// 起動時にデバッグ情報を出力
console.log('API DEPLOY ROUTE LOADED:', {
  hasGithubToken: !!process.env.GITHUB_TOKEN,
  hasGithubOwner: !!process.env.GITHUB_OWNER,
  hasGithubRepo: !!process.env.GITHUB_REPO,
  hasVercelHook: !!process.env.VERCEL_DEPLOY_HOOK_URL
});

export async function POST(request: NextRequest) {
  try {
    const { componentName, componentContent, title, slug } = await request.json();
    
    if (!componentName || !componentContent || !title || !slug) {
      return NextResponse.json(
        { error: "すべての項目が必要です" },
        { status: 400 }
      );
    }
    
    // 環境変数の取得
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    
    if (!token || !owner || !repo) {
      return NextResponse.json(
        { error: "GitHub認証情報が設定されていません。.env.localファイルを確認してください。" },
        { status: 500 }
      );
    }
    
    // ページコンテンツを生成
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
}`;
    
    // GitHubクライアントの初期化
    const octokit = new Octokit({ auth: token });
    
    // コンポーネントファイルのコミット
    const componentPath = `components/${componentName}.tsx`;
    let componentSha;
    
    try {
      // 既存のファイルを確認
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: componentPath,
      });
      
      if (!Array.isArray(fileData)) {
        componentSha = fileData.sha;
      }
    } catch (error) {
      // ファイルが存在しない場合は新規作成
      console.log(`新しいコンポーネントを作成: ${componentPath}`);
    }
    
    // コンポーネントファイルをコミット
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: componentPath,
      message: `コンポーネント ${componentName} を追加/更新`,
      content: Buffer.from(componentContent).toString("base64"),
      sha: componentSha
    });
    
    // ページファイルのコミット
    const pagePath = `app/blog/${slug}/page.tsx`;
    let pageSha;
    
    try {
      // 既存のファイルを確認
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: pagePath,
      });
      
      if (!Array.isArray(fileData)) {
        pageSha = fileData.sha;
      }
    } catch (error) {
      // ファイルが存在しない場合は新規作成
      console.log(`新しいページを作成: ${pagePath}`);
    }
    
    // ページファイルをコミット
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: pagePath,
      message: `ページ ${slug} を追加/更新`,
      content: Buffer.from(pageContent).toString("base64"),
      sha: pageSha
    });
    
    // Vercelデプロイの実行（オプション）
    let deploymentResult = null;
    if (deployHookUrl) {
      try {
        console.log('Vercelデプロイフックを呼び出し中:', deployHookUrl);
        
        // より確実なデプロイフック呼び出し
        const deployResponse = await fetch(deployHookUrl, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // レスポンスのステータスを確認
        if (deployResponse.ok) {
          console.log('デプロイフック成功:', deployResponse.status);
          
          try {
            deploymentResult = await deployResponse.json();
            console.log('デプロイ結果:', deploymentResult);
          } catch (jsonError) {
            // JSONでないレスポンスの場合もエラーとしない
            console.log('デプロイレスポンスはJSONではありません。デプロイは開始されています。');
            deploymentResult = { status: 'triggered', message: 'Deploy hook called successfully' };
          }
        } else {
          console.error('デプロイフック失敗:', deployResponse.status, await deployResponse.text());
          deploymentResult = { error: `Deploy hook failed with status ${deployResponse.status}` };
        }
      } catch (error) {
        console.error("デプロイフック呼び出しエラー:", error);
        
        // PowerShellコマンドを実行してデプロイを試みる（Node.jsから別プロセスとして）
        try {
          console.log('PowerShellを使用してデプロイを試みます...');
          const { exec } = require('child_process');
          
          exec(`powershell -Command "Invoke-RestMethod -Method POST -Uri '${deployHookUrl}'"`, 
            (error, stdout, stderr) => {
              if (error) {
                console.error('PowerShellデプロイ失敗:', error);
                return;
              }
              console.log('PowerShellデプロイ成功:', stdout);
            }
          );
          
          deploymentResult = { status: 'backup_triggered', message: 'Tried alternative deployment method' };
        } catch (execError) {
          console.error('バックアップデプロイ方法も失敗:', execError);
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "コンポーネントとページがGitHubにコミットされ、デプロイが開始されました",
      deploymentUrl: `https://www.pursuit-of-factfulness.com/blog/${slug}`,
      deploymentResult
    });
    
  } catch (error: any) {
    console.error("デプロイエラー:", error);
    return NextResponse.json(
      { error: `デプロイ中にエラーが発生しました: ${error.message}` },
      { status: 500 }
    );
  }
}
