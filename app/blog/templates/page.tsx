import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowRight } from "lucide-react"

export default function TemplatesPage() {
  const templates = [
    {
      id: "tech-news",
      title: "テクノロジーニュース",
      description: "最新の技術ニュースや発表を分析する記事テンプレート",
      structure: [
        "## 導入部: 主要なニュースの概要",
        "## 背景: このニュースが重要な理由",
        "## 主要ポイント: 3-5つの重要な要素を解説",
        "## 業界への影響: このニュースが業界にどう影響するか",
        "## 将来の展望: 今後の発展や予測",
        "## まとめ: 要点のまとめと読者へのアドバイス",
      ],
    },
    {
      id: "product-review",
      title: "製品レビュー",
      description: "新製品や技術の詳細なレビューと分析",
      structure: [
        "## 製品概要: 基本情報と主な特徴",
        "## スペック詳細: 技術仕様の詳細な解説",
        "## 使用体験: 実際の使用感や性能評価",
        "## 比較分析: 競合製品との比較",
        "## メリット・デメリット: 長所と短所の分析",
        "## 結論: 総合評価と推奨ユーザー",
      ],
    },
    {
      id: "how-to-guide",
      title: "ハウツーガイド",
      description: "特定の技術やプロセスの詳細な解説",
      structure: [
        "## はじめに: 目的と対象読者",
        "## 必要なもの: 前提条件や必要なツール",
        "## ステップバイステップガイド: 詳細な手順",
        "## よくある問題と解決策: トラブルシューティング",
        "## 応用例: 発展的な使い方や応用例",
        "## まとめ: 要点のまとめと次のステップ",
      ],
    },
    {
      id: "industry-analysis",
      title: "業界分析",
      description: "特定の技術分野や業界の動向を分析",
      structure: [
        "## 現状分析: 業界の現在の状況",
        "## 主要プレイヤー: 重要な企業や組織の分析",
        "## トレンド: 最新の動向と将来の方向性",
        "## 課題と機会: 業界が直面する課題と可能性",
        "## 事例研究: 具体的な成功事例や失敗例",
        "## 予測と提言: 今後の展望と読者へのアドバイス",
      ],
    },
    {
      id: "concept-explanation",
      title: "概念解説",
      description: "複雑な技術概念をわかりやすく解説",
      structure: [
        "## 基本概念: 簡潔な定義と基本説明",
        "## 歴史的背景: 概念の発展と重要な転換点",
        "## 仕組みの解説: 技術の仕組みをわかりやすく説明",
        "## 実世界での応用: 実際の使用例や影響",
        "## 将来の可能性: 今後の発展や可能性",
        "## まとめ: 要点のまとめと参考資料",
      ],
    },
    {
      id: "interview",
      title: "インタビュー記事",
      description: "専門家や業界リーダーとのインタビュー",
      structure: [
        "## 紹介: インタビュー対象者の紹介",
        "## 背景: インタビューの背景や目的",
        "## Q&A: 質問と回答の詳細",
        "## 主要な洞察: インタビューから得られた重要な洞察",
        "## 業界への影響: インタビュー内容の業界への影響",
        "## まとめ: 要点のまとめと今後の展望",
      ],
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">記事テンプレート</h1>
          <p className="text-muted-foreground">
            記事作成を効率化するための様々なテンプレートを用意しています。テンプレートを選択して記事作成を始めましょう。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h3 className="text-sm font-medium mb-2">記事構成:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {template.structure.map((item, index) => (
                    <li key={index}>{item.replace("## ", "")}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/create?template=${template.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    このテンプレートを使用
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild>
            <Link href="/blog/create">
              テンプレートを使わずに作成
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

