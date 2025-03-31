"use client"

import { useState } from "react"
import { PiPlugsConnected } from "react-icons/pi"
import { FiGithub, FiYoutube, FiPlus, FiImage, FiCode, FiSettings } from "react-icons/fi"
import { SiVercel } from "react-icons/si"
import Link from "next/link"

// アクションカードコンポーネント
const ActionCard = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  bgColor: string; 
  onClick: () => void 
}) => {
  return (
    <div 
      className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-white text-3xl mb-4">{icon}</div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  )
}

// プラグインカードコンポーネント
const PluginCard = ({ 
  title, 
  description, 
  icon,
  isInstalled = false
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  isInstalled?: boolean
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative">
      {isInstalled && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          インストール済み
        </div>
      )}
      <div className="text-blue-600 dark:text-blue-400 text-2xl mb-2">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-4">
        <button 
          className={`px-3 py-1 rounded text-sm ${
            isInstalled 
              ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isInstalled ? "設定" : "インストール"}
        </button>
      </div>
    </div>
  )
}

// ダッシュボードページ
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'actions' | 'plugins'>('actions')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">自動化ダッシュボード</h1>
        
        <div className="flex space-x-2">
          <Link 
            href="/admin" 
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ブログ管理
          </Link>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FiSettings className="inline mr-2" />
            設定
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">クイックスタート</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          このダッシュボードでは、コンテンツの自動デプロイやメディア処理など様々な自動化タスクを管理できます。
          プラグインをインストールして機能を拡張することも可能です。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 flex items-center">
              <FiGithub className="mr-2" /> GitHubとの連携
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              GitHubと連携して自動的にコードをデプロイします。
            </p>
            <button className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              設定する
            </button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 flex items-center">
              <SiVercel className="mr-2" /> Vercelとの連携
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vercelと連携して自動的にコードをデプロイします。
            </p>
            <button className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              設定する
            </button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 flex items-center">
              <FiPlus className="mr-2" /> プラグインの追加
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              新しいプラグインを追加して機能を拡張します。
            </p>
            <button 
              className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={() => setActiveTab('plugins')}
            >
              プラグイン管理
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('actions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'actions'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              アクション
            </button>
            <button
              onClick={() => setActiveTab('plugins')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'plugins'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              プラグイン
            </button>
          </nav>
        </div>
        
        {activeTab === 'actions' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">利用可能なアクション</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActionCard
                title="コードデプロイ"
                description="TSXファイルを自動的にGitHubにプッシュし、Vercelにデプロイします"
                icon={<FiCode />}
                bgColor="bg-gradient-to-br from-blue-600 to-indigo-700"
                onClick={() => console.log("コードデプロイ")}
              />
              
              <ActionCard
                title="YouTube処理"
                description="YouTubeのURLを入力して、情報抽出や分析を行います"
                icon={<FiYoutube />}
                bgColor="bg-gradient-to-br from-red-600 to-pink-700"
                onClick={() => console.log("YouTube処理")}
              />
              
              <ActionCard
                title="画像処理"
                description="画像の最適化、トリミング、alt属性の自動生成を行います"
                icon={<FiImage />}
                bgColor="bg-gradient-to-br from-green-600 to-teal-700"
                onClick={() => console.log("画像処理")}
              />
            </div>
            
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FiPlus className="mr-2" />
                新しいアクションを追加
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'plugins' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">プラグイン管理</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PluginCard
                title="GitHub連携"
                description="GitHubリポジトリとの統合機能を提供します"
                icon={<FiGithub />}
                isInstalled={true}
              />
              
              <PluginCard
                title="YouTube分析"
                description="YouTube動画の分析と情報抽出を行います"
                icon={<FiYoutube />}
                isInstalled={true}
              />
              
              <PluginCard
                title="Vercel連携"
                description="Vercelへの自動デプロイ機能を提供します"
                icon={<SiVercel />}
                isInstalled={false}
              />
              
              <PluginCard
                title="メディア処理"
                description="画像や動画の最適化と処理を行います"
                icon={<FiImage />}
                isInstalled={false}
              />
            </div>
            
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FiPlus className="mr-2" />
                プラグインを探す
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
