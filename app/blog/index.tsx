"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPage {
  slug: string;
  title: string;
  date?: string;
  type: 'system' | 'custom';
}

export default function BlogIndex() {
  const [pages, setPages] = useState<BlogPage[]>([]);
  const [loading, setLoading] = useState(true);

  // 既知の記事リスト
  const knownPages: BlogPage[] = [
    { 
      slug: 'nvidia-gtc-2025-report', 
      title: 'NVIDIA GTC 2025レポート', 
      date: '2025-03-28',
      type: 'system'
    },
    { 
      slug: 'openai-latest-report', 
      title: 'OpenAI最新レポート', 
      date: '2025-03-25',
      type: 'system'
    }
  ];

  // GitHubから動的にページリストを取得する関数
  async function fetchGitHubPages() {
    try {
      const response = await fetch('https://api.github.com/repos/kenken0830/pursuit-of-factfulness-blog/contents/app/blog');
      if (!response.ok) throw new Error('GitHub APIからデータを取得できませんでした');
      
      const data = await response.json();
      
      // ディレクトリを抽出（これがブログの記事）
      const blogDirs = data.filter((item: any) => 
        item.type === 'dir' && 
        item.name !== 'api' && 
        item.name !== 'components' &&
        !knownPages.some(known => known.slug === item.name)
      );
      
      // 新しく見つかったページを整形
      const newPages: BlogPage[] = blogDirs.map((dir: any) => ({
        slug: dir.name,
        title: dir.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
        type: 'custom'
      }));
      
      // 既知のページと併合してソート
      const allPages = [...knownPages, ...newPages].sort((a, b) => {
        if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (a.date) return -1;
        if (b.date) return 1;
        return a.title.localeCompare(b.title);
      });
      
      setPages(allPages);
    } catch (error) {
      console.error('ページリスト取得エラー:', error);
      setPages(knownPages); // エラーの場合は既知の記事だけを表示
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGitHubPages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          ホームに戻る
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-8">ブログ記事一覧</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/blog/${page.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
              {page.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{page.date}</p>
              )}
              <span className={`text-xs px-2 py-1 rounded ${
                page.type === 'system' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {page.type === 'system' ? 'システム記事' : 'アップロード記事'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
