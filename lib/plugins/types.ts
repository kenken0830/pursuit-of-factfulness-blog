import { ReactNode } from "react";

// プラグインの基本インターフェース
export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  icon?: ReactNode;
  category: PluginCategory;
  enabled: boolean;
}

// 利用可能なプラグインカテゴリ
export type PluginCategory = 
  | 'deploy'   // デプロイ関連
  | 'media'    // メディア処理
  | 'content'  // コンテンツ生成
  | 'utility'  // ユーティリティ
  | 'ai'       // AI関連
  | 'other';   // その他

// プラグイン設定のインターフェース
export interface PluginConfig {
  id: string;
  pluginId: string;
  settings: Record<string, any>;
}

// プラグイン入出力のインターフェース
export interface PluginIO {
  input: Record<string, any>;
  output: Record<string, any>;
}

// アクションの基本インターフェース
export interface Action {
  id: string;
  name: string;
  description: string;
  pluginId: string;
  inputs: ActionInput[];
  outputs: ActionOutput[];
}

// アクション入力パラメータのインターフェース
export interface ActionInput {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'file' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: any;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    enum?: string[];
  };
}

// アクション出力のインターフェース
export interface ActionOutput {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'file' | 'object' | 'array';
  description: string;
}

// アクション実行履歴のインターフェース
export interface ActionHistory {
  id: string;
  actionId: string;
  startTime: Date;
  endTime?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
}
