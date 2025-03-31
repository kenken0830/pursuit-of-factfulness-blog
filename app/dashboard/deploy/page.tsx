"use client"

import { useState } from "react"
import { FiGithub, FiCode, FiUploadCloud, FiCheck, FiX, FiClipboard, FiFolder } from "react-icons/fi"
import { SiVercel } from "react-icons/si"
import Link from "next/link"

export default function DeployPage() {
  const [code, setCode] = useState("")
  const [path, setPath] = useState("")
  const [repository, setRepository] = useState("")
  const [owner, setOwner] = useState("")
  const [branch, setBranch] = useState("main")
  const [message, setMessage] = useState("")
  const [apiToken, setApiToken] = useState("")
  
  const [deploying, setDeploying] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  
  // GitHubとVercelにコードをデプロイする
  const deployCode = async () => {
    // 入力バリデーション
    if (!code) {
      setError("コードを入力してください")
      return
    }
    
    if (!path) {
      setError("保存先パスを入力してください")
      return
    }
    
    if (!repository || !owner) {
      setError("リポジトリとオーナー情報を入力してください")
      return
    }
    
    if (!apiToken) {
      setError("GitHub APIトークンを入力してください")
      return
    }
    
    setDeploying(true)
    setError("")
    setResult(null)
    
    try {
      const response = await fetch("/api/actions/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          path,
          message: message || `Update ${path}`,
          repo: repository,
          owner,
          branch,
          apiToken
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "デプロイ中にエラーが発生しました")
      }
      
      setResult(data)
    } catch (err: any) {
      setError(err.message || "デプロイ中にエラーが発生しました")
    } finally {
      setDeploying(false)
    }
  }
  
  // サンプルコードを挿入する
  const insertSampleCode = () => {
    setCode(`import React from 'react';

export default function SampleComponent() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">サンプルコンポーネント</h1>
      <p className="text-gray-600 dark:text-gray-400">
        このコンポーネントは自動デプロイ機能のデモンストレーションです。
        GitHubにプッシュされ、Vercelで自動的にデプロイされます。
      </p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500">
          デプロイ日時: {new Date().toLocaleString('ja-JP')}
        </p>
      </div>
    </div>
  );
}`);
  }
  
  // ファイルパスにコンポーネント名を追加する
  const handleComponentNameChange = (name: string) => {
    if (!name) return;
    
    const componentName = name.trim();
    // 最初の文字を大文字にする
    const formattedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    // パスを設定
    setPath(`components/${formattedName}.tsx`);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FiCode className="mr-3 text-blue-600" /> コードデプロイ
        </h1>
        
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ダッシュボードに戻る
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiCode className="mr-2" /> TSXコード
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={insertSampleCode} 
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  サンプルコードを挿入
                </button>
              </div>
              <textarea 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                className="w-full h-80 px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 font-mono"
                placeholder="Reactコンポーネントのコードを入力..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  コンポーネント名
                </label>
                <input 
                  type="text" 
                  onChange={(e) => handleComponentNameChange(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="MyComponent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  保存先パス
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={path} 
                    onChange={(e) => setPath(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    placeholder="components/MyComponent.tsx"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiGithub className="mr-2" /> GitHubデプロイ設定
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  リポジトリオーナー
                </label>
                <input 
                  type="text" 
                  value={owner} 
                  onChange={(e) => setOwner(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="github-username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  リポジトリ名
                </label>
                <input 
                  type="text" 
                  value={repository} 
                  onChange={(e) => setRepository(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="my-repository"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ブランチ
                </label>
                <input 
                  type="text" 
                  value={branch} 
                  onChange={(e) => setBranch(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="main"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  コミットメッセージ
                </label>
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder={`Update ${path || 'component'}`}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GitHub APIトークン
              </label>
              <input 
                type="password" 
                value={apiToken} 
                onChange={(e) => setApiToken(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️ 注意:</span> APIトークンはサーバーに保存されません。リポジトリの書き込み権限が必要です。
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              onClick={deployCode}
              disabled={deploying}
              className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                deploying 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {deploying ? (
                <>
                  <span className="mr-2">デプロイ中...</span>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <FiUploadCloud className="mr-2" /> GitHubにデプロイ
                </>
              )}
            </button>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">デプロイ状態</h2>
            
            {!result && !error && (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiUploadCloud className="text-4xl mx-auto mb-3" />
                  <p>コードをデプロイすると、ここに結果が表示されます</p>
                </div>
              </div>
            )}
            
            {result && (
              <div className="space-y-6">
                <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                  <FiCheck className="text-xl mr-2" />
                  <span className="font-medium">デプロイが成功しました！</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">コミット情報</h3>
                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <p className="mb-1"><strong>ファイル:</strong> {path}</p>
                      <p className="mb-1"><strong>リポジトリ:</strong> {owner}/{repository}</p>
                      <p className="mb-1"><strong>ブランチ:</strong> {branch}</p>
                      <p className="mb-1"><strong>メッセージ:</strong> {message || `Update ${path}`}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHubでの表示</h3>
                    <div className="mt-1">
                      <a 
                        href={`https://github.com/${owner}/${repository}/blob/${branch}/${path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiGithub className="inline mr-2" />
                        GitHubで表示
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vercelデプロイ</h3>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        GitHubとVercelの連携が設定されている場合、自動的にデプロイが開始されます。
                      </p>
                      <a 
                        href={`https://vercel.com/${owner}/${repository}/deployments`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <SiVercel className="inline mr-2" />
                        Vercelで確認
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
