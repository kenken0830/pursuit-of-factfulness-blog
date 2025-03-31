import { Metadata } from 'next';
import AutoTestArticle3 from '@/components/AutoTestArticle3';

export const metadata: Metadata = {
  title: '自動監視システム動作テスト記事３',
  description: 'この記事は完全自動化された監視システムのテスト用記事です。ファイルを配置するだけで自動的にGitHubにプッシュされ、本番環境にデプロイされることを確認します。',
  keywords: '自動化,テスト,監視,システム,検証',
  openGraph: {
    title: '自動監視システム動作テスト記事３',
    description: 'この記事は完全自動化された監視システムのテスト用記事です。ファイルを配置するだけで自動的にGitHubにプッシュされ、本番環境にデプロイされることを確認します。',
    url: 'https://example.com/blog/ai-news/auto-test-article3',
    siteName: 'D×MirAI Blog',
    locale: 'ja_JP',
    type: 'article',
  },
};

export default function Page() {
  return <AutoTestArticle3 />;
}
