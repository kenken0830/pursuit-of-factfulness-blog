import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

// GitHub APIとの連携を担当
export async function POST(request: Request) {
  try {
    const { code, path, message, repo, owner, branch, apiToken } = await request.json();

    // APIトークンのバリデーション（ユーザー指定または環境変数から取得）
    const token = apiToken || process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'GitHub APIトークンが必要です' }, { status: 400 });
    }

    // 必須パラメータのバリデーション
    if (!code || !path || !repo || !owner) {
      return NextResponse.json({ 
        error: '必須パラメータが不足しています (code, path, repo, owner)', 
        status: 400 
      });
    }

    // GitHubクライアントの初期化
    const octokit = new Octokit({ auth: token });

    // ファイルがすでに存在するか確認
    let sha;
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch || 'main'
      });
      
      // 配列の場合はディレクトリなので、ファイルとしては存在しない
      if (Array.isArray(fileData)) {
        return NextResponse.json({ error: '指定されたパスはディレクトリです' }, { status: 400 });
      }
      
      sha = fileData.sha;
    } catch (error) {
      // ファイルが存在しない場合は新規作成
      console.log('ファイルが存在しないため新規作成します');
    }

    // ファイルのコミット
    const commitResponse = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: message || `Update ${path}`,
      content: Buffer.from(code).toString('base64'),
      branch: branch || 'main',
      sha: sha
    });
    
    // Vercelデプロイの自動トリガー
    let deploymentResult = null;
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      try {
        const vercelResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
          method: 'POST'
        });
        deploymentResult = await vercelResponse.json();
      } catch (error) {
        console.error('Vercelデプロイフック呼び出しエラー:', error);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${path} を ${repo} にコミットしました`, 
      data: commitResponse.data,
      deployment: deploymentResult
    });
  } catch (error: any) {
    console.error('GitHubデプロイエラー:', error);
    return NextResponse.json({ 
      error: error.message || 'GitHubデプロイ中にエラーが発生しました', 
      status: 500 
    });
  }
}

// Vercelへの直接デプロイ（Vercel APIを使用）
async function triggerVercelDeploy(teamId: string, projectId: string, apiToken: string) {
  try {
    const response = await fetch(`https://api.vercel.com/v1/deployments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectId,
        target: 'production',
        teamId: teamId || undefined
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Vercelデプロイトリガーエラー:', error);
    throw error;
  }
}
