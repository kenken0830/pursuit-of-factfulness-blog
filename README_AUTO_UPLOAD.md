# D×MirAI ブログ記事自動アップロードシステム

## 概要
このシステムは、記事ファイル（TSX）を特定のフォルダに配置するだけで、自動的にウェブサイトに記事を公開できる自動化システムです。

## 使用方法

### 1. 自動監視システムの起動

```
D:\NvidiaGTCProject\auto_watcher.bat
```

このバッチファイルをダブルクリックして実行すると、記事フォルダの監視が開始されます。
コマンドプロンプトウィンドウが開き、監視状態が表示されます。このウィンドウは閉じないでください。

### 2. 記事ファイルの作成と配置

以下のフォーマットに従ってTSXファイルを作成し、適切なカテゴリフォルダに保存します：

```tsx
// title: 記事タイトル
// date: YYYY-MM-DD
// author: 著者名
// tags: ["タグ1", "タグ2"]
// category: ai-news
// featured: false
// description: 記事の説明文（SEO対策）
// keywords: キーワード1,キーワード2,キーワード3

import React from 'react';
import { コンポーネント } from "@/components/ui/コンポーネント";

export default function 記事コンポーネント名() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事タイトル</h1>
      
      {/* 記事の内容 */}
      <p>記事の本文...</p>
    </div>
  );
}
```

### 3. 記事ファイルの保存場所

作成したTSXファイルは、以下のいずれかのフォルダに保存してください：

```
D:\NvidiaGTCProject\articles\ai-news\         - AIニュース記事
D:\NvidiaGTCProject\articles\ai-technology\    - AI技術記事
D:\NvidiaGTCProject\articles\ai-applications\  - AIアプリケーション記事
```

### 4. 自動処理の流れ

1. ファイルを配置すると、監視システムが自動的に検出
2. 記事からメタデータを抽出しコンポーネントとページを作成
3. GitHubにコミットとプッシュを実行
4. Vercelが自動デプロイを開始
5. 本番サイトに記事が公開される

### 5. 公開された記事の確認

記事は以下のURLで確認できます：

```
https://www.pursuit-of-factfulness.com/blog/カテゴリ名/記事ファイル名
```

例：
```
https://www.pursuit-of-factfulness.com/blog/ai-news/auto-test-article3
```

## 主要ファイル一覧

- `folder_watcher.js` - メインの監視・処理スクリプト
- `start_auto_watcher.js` - 監視システム初期化スクリプト
- `auto_watcher.bat` - 簡易起動用バッチファイル
- `setup_auto_monitor.bat` - タスクスケジューラ登録用（常時自動起動）

## ログファイル

- `auto_watcher_log.txt` - 監視システムのログ
- `upload_log.txt` - ファイル処理・アップロードのログ

## トラブルシューティング

1. **記事が表示されない場合**
   - ログファイルを確認して処理状況を確認してください
   - GitHubプッシュが成功しているか確認してください
   - Vercelデプロイのステータスを確認してください

2. **監視システムが動作しない場合**
   - プロセスを終了して再起動してください
   - Node.jsが正しくインストールされているか確認してください

3. **その他の問題**
   - `TSX_Upload_Troubleshooting.md` を参照してください
