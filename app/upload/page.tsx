"use client";

import { useState, useRef, FormEvent } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [deployUrl, setDeployUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // スラグを生成する関数
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // ファイルが選択されたときの処理
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ファイル選択イベント発生');
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const selectedFile = files[0];
      console.log('選択されたファイル:', selectedFile.name);
      
      // TSXファイルかどうかチェック
      if (!selectedFile.name.endsWith('.tsx')) {
        setError('TSXファイルを選択してください');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError('');
      
      // ファイル内容を読み込む
      try {
        const reader = new FileReader();
        const fileContentPromise = new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
              resolve(e.target.result);
            } else {
              reject(new Error('ファイル読み込みに失敗しました'));
            }
          };
          reader.onerror = reject;
        });
        
        reader.readAsText(selectedFile);
        const fileContent = await fileContentPromise;
        
        console.log('ファイル内容を読み込みました。長さ:', fileContent.length);
        
        // h1タグの内容を抽出（sフラグなしの正規表現）
        let h1Content = '';
        const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/;
        const h1Match = fileContent.match(h1Regex);
        
        if (h1Match && h1Match[1]) {
          h1Content = h1Match[1].trim();
          console.log('h1タグから抽出したタイトル:', h1Content);
        } else {
          console.log('h1タグが見つかりませんでした。他の方法を試します。');
        }
        
        // h1タグがない場合は他の方法を試す
        if (!h1Content) {
          // 大見出し（##など）を探す
          const headerMatch = fileContent.match(/##\s+(.*?)(\r?\n|$)/);
          if (headerMatch && headerMatch[1]) {
            h1Content = headerMatch[1].trim();
            console.log('マークダウン見出しから抽出したタイトル:', h1Content);
          } else {
            console.log('マークダウン見出しも見つかりませんでした。');
          }
        }
        
        // ファイル名からタイトルを生成（h1が見つからない場合のフォールバック）
        let formattedTitle = h1Content;
        if (!formattedTitle) {
          const fileName = selectedFile.name.replace('.tsx', '');
          
          // CamelCase/PascalCaseをスペース区切りに変換
          formattedTitle = fileName
            .replace(/([A-Z])/g, ' $1') // 大文字の前にスペースを挿入
            .trim();
          
          // 先頭を大文字に
          formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
          console.log('ファイル名から生成したタイトル:', formattedTitle);
        }
        
        console.log('最終的に使用するタイトル:', formattedTitle);
        
        // タイトルとスラグを設定
        setTitle(formattedTitle);
        const generatedSlug = generateSlug(formattedTitle);
        setSlug(generatedSlug);
        
        // 直接DOMを操作してinput要素の値を更新
        setTimeout(() => {
          try {
            const titleInput = document.getElementById('title-input') as HTMLInputElement;
            const slugInput = document.getElementById('slug-input') as HTMLInputElement;
            
            console.log('DOM要素:', { 
              titleInput: titleInput ? 'あり' : 'なし', 
              slugInput: slugInput ? 'あり' : 'なし' 
            });
            
            if (titleInput) {
              titleInput.value = formattedTitle;
              // フォーカスを当ててblurしてchangeイベントを発火させる
              titleInput.focus();
              titleInput.blur();
              console.log('タイトル入力欄を更新しました');
            }
            
            if (slugInput) {
              slugInput.value = generatedSlug;
              console.log('スラグ入力欄を更新しました');
            }
          } catch (domError) {
            console.error('DOM更新エラー:', domError);
          }
        }, 100); // 少し遅延させてDOMが確実に存在するようにする
        
      } catch (error) {
        console.error('ファイル読み込みエラー:', error);
        // エラーが発生した場合はファイル名からタイトルを生成（従来の方法）
        const fileName = selectedFile.name.replace('.tsx', '');
        
        // CamelCase/PascalCaseをスペース区切りに変換
        let formattedTitle = fileName
          .replace(/([A-Z])/g, ' $1') // 大文字の前にスペースを挿入
          .trim();
        
        // 先頭を大文字に
        formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
        
        // タイトルとスラグを設定
        setTitle(formattedTitle);
        const generatedSlug = generateSlug(formattedTitle);
        setSlug(generatedSlug);
      }
    }
  };

  // タイトルが変更されたときの処理
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    
    if (newTitle) {
      const newSlug = generateSlug(newTitle);
      setSlug(newSlug);
    }
  };

  // スラグが変更されたときの処理
  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(event.target.value);
  };

  // フォーム送信処理
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!file || !title || !slug) {
      setError('すべての項目を入力してください');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    setError('');
    
    try {
      // TSXファイルの内容を読み込む
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      });
      
      // コンポーネント名を取得
      const componentName = file.name.replace('.tsx', '');
      
      console.log('APIリクエスト準備完了:', { 
        componentName, 
        title, 
        slug, 
        contentLength: fileContent.length 
      });
      
      // APIリクエスト送信
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentName,
          componentContent: fileContent,
          title,
          slug,
        }),
      });
      
      const data = await response.json();
      console.log('APIレスポンス:', data);
      
      if (response.ok) {
        setMessage(data.message || 'デプロイが開始されました');
        setDeployUrl(`https://www.pursuit-of-factfulness.com/blog/${slug}`);
        
        // フォームをリセット
        setFile(null);
        setTitle('');
        setSlug('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(data.error || 'エラーが発生しました');
      }
    } catch (err) {
      console.error('エラー詳細:', err);
      setError(`処理中にエラーが発生しました: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TSXコンポーネントアップロード
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Reactコンポーネント(.tsx)をアップロードして、ウェブサイトに反映します
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {message && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-sm text-green-700">{message}</p>
            {deployUrl && (
              <p className="mt-2 text-sm">
                <a 
                  href={deployUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-green-700 hover:text-green-600"
                >
                  ページを表示 (数分後に反映) →
                </a>
              </p>
            )}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                TSXファイル
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".tsx"
                required
                ref={fileInputRef}
                onChange={handleFileChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {file && (
                <p className="mt-1 text-xs text-gray-500">
                  選択されたファイル: {file.name} ({Math.round(file.size / 1024)} KB)
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                id="title-input"
                name="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
                placeholder="記事のタイトル"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                スラグ (URL)
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  /blog/
                </span>
                <input
                  id="slug-input"
                  name="slug"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  required
                  placeholder="url-friendly-slug"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading 
                  ? 'bg-indigo-400' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isLoading ? 'アップロード中...' : 'アップロードして公開'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
