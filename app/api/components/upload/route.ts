import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 簡略化されたTSXアップロード処理（依存関係問題を回避）
export async function POST(request: NextRequest) {
  try {
    // フォームデータから情報を取得
    const formData = await request.formData();
    const tsxFile = formData.get("file") as File;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string || "technology";
    
    if (!tsxFile || !title || !slug) {
      return NextResponse.json(
        { error: "TSXファイル、タイトル、スラグは必須です" },
        { status: 400 }
      );
    }

    // ファイル名からコンポーネント名を抽出
    const fileName = tsxFile.name;
    const componentName = fileName.replace(/\.tsx$/, "");
    
    // ファイルの内容を文字列として取得
    const fileContent = await tsxFile.text();
    
    // ローカルのコンポーネントディレクトリにファイルを保存
    const componentsDir = path.join(process.cwd(), "components");
    const filePath = path.join(componentsDir, fileName);
    
    // ディレクトリが存在することを確認
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }
    
    // ファイルを書き込み
    fs.writeFileSync(filePath, fileContent);
    
    // ページファイルのパスを決定
    const pageDir = path.join(process.cwd(), "app", "blog", slug);
    const pagePath = path.join(pageDir, "page.tsx");
    
    // ディレクトリが存在することを確認
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    
    // メタデータの説明を生成
    const description = `${title}に関する詳細レポートと最新情報`;
    
    // ページファイルの内容を生成
    const pageContent = `import ${componentName} from "@/components/${componentName}"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "${title} | Pursuit of Factfulness",
  description: "${description}",
  openGraph: {
    title: "${title}",
    description: "${description}",
    type: "article",
    images: [
      {
        url: "/placeholder.svg?height=600&width=800",
        width: 1200,
        height: 630,
        alt: "${title}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "${title}",
    description: "${description}",
    images: ["/placeholder.svg?height=600&width=800"],
  },
}

export default function ${componentName}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <${componentName} />
    </div>
  )
}
`;
    
    // ページファイルを書き込み
    fs.writeFileSync(pagePath, pageContent);
    
    return NextResponse.json({
      success: true,
      message: `${componentName}コンポーネントを登録し、${slug}ページを生成しました`,
      componentPath: filePath,
      pagePath: pagePath,
      url: `/blog/${slug}`,
      note: "GitHub/Vercelへの自動デプロイは現在無効化されています"
    });
    
  } catch (error: any) {
    console.error("TSXファイルアップロードエラー:", error);
    return NextResponse.json(
      { error: "TSXファイルの処理中にエラーが発生しました: " + error.message },
      { status: 500 }
    );
  }
}
