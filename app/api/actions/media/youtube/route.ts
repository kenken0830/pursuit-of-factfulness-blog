import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { url, action = 'info' } = await request.json();

    // URLのバリデーション
    if (!url) {
      return NextResponse.json({ error: 'YouTube URLが必要です' }, { status: 400 });
    }

    // YouTube URLの形式チェック
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json({ error: '有効なYouTube URLではありません' }, { status: 400 });
    }

    // ビデオIDの抽出
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'YouTube動画IDが取得できませんでした' }, { status: 400 });
    }

    // アクションに基づいて処理
    let result;
    switch (action) {
      case 'info':
        result = await getVideoInfo(videoId);
        break;
      case 'transcript':
        result = await getVideoTranscript(videoId);
        break;
      case 'summary':
        result = await generateVideoSummary(videoId);
        break;
      default:
        return NextResponse.json({ error: '不明なアクションです' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      videoId,
      data: result
    });
  } catch (error: any) {
    console.error('YouTube処理エラー:', error);
    return NextResponse.json({ 
      error: error.message || 'YouTube処理中にエラーが発生しました', 
      status: 500 
    });
  }
}

// YouTube URLからビデオIDを抽出
function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// YouTube APIを使用してビデオ情報を取得
async function getVideoInfo(videoId: string) {
  try {
    // 環境変数からAPIキーを取得
    const API_KEY = process.env.YOUTUBE_API_KEY;
    
    if (!API_KEY) {
      throw new Error('YOUTUBE_API_KEYが設定されていません');
    }
    
    // Google YouTubeデータAPIの初期化
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY
    });
    
    // YouTube Data APIからビデオ情報を取得
    const { data } = await youtube.videos.list({
      id: [videoId],
      part: ['snippet', 'contentDetails', 'statistics']
    });
    
    if (!data.items || data.items.length === 0) {
      throw new Error('動画情報が見つかりませんでした');
    }
    
    const videoData = data.items[0];
    return {
      title: videoData.snippet?.title,
      description: videoData.snippet?.description,
      publishedAt: videoData.snippet?.publishedAt,
      channelTitle: videoData.snippet?.channelTitle,
      thumbnails: videoData.snippet?.thumbnails,
      duration: videoData.contentDetails?.duration,
      viewCount: videoData.statistics?.viewCount,
      likeCount: videoData.statistics?.likeCount,
      commentCount: videoData.statistics?.commentCount
    };
  } catch (error) {
    console.error('YouTube情報取得エラー:', error);
    throw error;
  }
}

// YouTubeの字幕（トランスクリプト）を取得
async function getVideoTranscript(videoId: string) {
  try {
    // 注: 実際の実装ではサードパーティライブラリを使用
    // ここではモックデータを返します
    
    // 将来的には以下のようなライブラリを使用できます
    // const youtubeDl = require('youtube-dl-exec');
    // const result = await youtubeDl(
    //   `https://www.youtube.com/watch?v=${videoId}`,
    //   { skipDownload: true, writeAutoSub: true, subLang: 'ja' }
    // );
    
    return {
      transcript: `これはサンプルのトランスクリプトです。
実際の実装では、YouTubeから実際の字幕データを取得する必要があります。
このためには、適切なAPIキーとサービスを利用してください。`,
      language: 'ja',
      isGenerated: true
    };
  } catch (error) {
    console.error('YouTubeトランスクリプト取得エラー:', error);
    throw error;
  }
}

// 動画の要約を生成
async function generateVideoSummary(videoId: string) {
  try {
    // 1. トランスクリプトを取得
    const transcriptData = await getVideoTranscript(videoId);
    
    // 2. トランスクリプトをAIに要約してもらう
    // 注: 実際の実装ではOpenAI APIなどを使用
    
    // モックデータを返します
    return {
      summary: `この動画は、[テーマ]について解説しています。
主なポイントは以下の通りです：
1. [ポイント1]
2. [ポイント2]
3. [ポイント3]

重要な洞察として、[洞察]が挙げられます。`,
      keyPoints: [
        '重要ポイント1',
        '重要ポイント2',
        '重要ポイント3'
      ],
      suggestedTags: ['AI', 'テクノロジー', '解説']
    };
  } catch (error) {
    console.error('YouTube要約生成エラー:', error);
    throw error;
  }
}
