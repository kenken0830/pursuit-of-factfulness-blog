import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // データの検証
    if (!data.title || !data.slug || !data.author || !data.excerpt || !data.content) {
      return NextResponse.json(
        { error: "必須フィールドが不足しています" },
        { status: 400 }
      )
    }

    // posts.tsのパスを取得
    const postsFilePath = path.join(process.cwd(), "lib", "posts.ts")
    
    // 現在のposts.tsファイルを読み込む
    let postsFileContent = fs.readFileSync(postsFilePath, "utf8")
    
    // allPostsの配列内容を見つける
    const allPostsStartIndex = postsFileContent.indexOf("export const allPosts: Post[] = [")
    const allPostsEndIndex = postsFileContent.lastIndexOf("]")
    
    if (allPostsStartIndex === -1 || allPostsEndIndex === -1) {
      return NextResponse.json(
        { error: "posts.tsのフォーマットが予期されたものと異なります" },
        { status: 500 }
      )
    }
    
    // 新しい記事オブジェクトを作成
    const newArticle = `  {
    title: "${data.title.replace(/"/g, '\\"')}",
    slug: "${data.slug}",
    date: "${data.date}",
    author: "${data.author.replace(/"/g, '\\"')}",
    excerpt: "${data.excerpt.replace(/"/g, '\\"')}",
    content: \`${data.content.replace(/`/g, "\\`")}\`,
    coverImage: "${data.coverImage || ""}",
    tags: [${data.tags.map((tag: string) => `"${tag.replace(/"/g, '\\"')}"`).join(", ")}],
    readingTime: ${data.readingTime || 5},
    featured: ${data.featured || false},
    category: "${data.category || "technology"}"
  },`
    
    // 既存の配列の末尾に新しい記事を追加
    const updatedContent = 
      postsFileContent.substring(0, allPostsEndIndex) + 
      (postsFileContent.substring(allPostsStartIndex + 29, allPostsEndIndex).trim() ? "\n  " : "") + 
      newArticle + 
      "\n" + 
      postsFileContent.substring(allPostsEndIndex)
    
    // ファイルを更新
    fs.writeFileSync(postsFilePath, updatedContent)
    
    // カスタムコンポーネントが必要な場合の処理
    if (data.useCustomComponent) {
      await createCustomComponent(data.slug, data.title)
    }
    
    return NextResponse.json({ success: true, message: "記事が正常に保存されました" })
  } catch (error) {
    console.error("記事保存エラー:", error)
    return NextResponse.json(
      { error: "記事の保存中にエラーが発生しました" },
      { status: 500 }
    )
  }
}

// カスタムコンポーネントを作成する関数
async function createCustomComponent(slug: string, title: string) {
  const componentName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") + "Report"
  
  const componentContent = `import { Code, CheckCircle, ArrowRight, BookOpen, Lightbulb, MessageSquare, Bot } from "lucide-react"

export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ヘッダー */}
      <header className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ${title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">詳細なレポートと分析</p>
        </div>
      </header>

      {/* 目次 */}
      <section className="container mx-auto px-4 py-8 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">目次</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-lg">
              <a href="#section1" className="text-blue-600 dark:text-blue-400 hover:underline">
                セクション1
              </a>
            </li>
            <li className="text-lg">
              <a href="#section2" className="text-blue-600 dark:text-blue-400 hover:underline">
                セクション2
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* セクション1 */}
      <section id="section1" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">1. セクション1</h2>
          <p className="text-lg mb-4">
            ここにセクション1の内容を記述します。
          </p>
        </div>
      </section>

      {/* セクション2 */}
      <section id="section2" className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">2. セクション2</h2>
          <p className="text-lg mb-4">
            ここにセクション2の内容を記述します。
          </p>
        </div>
      </section>
    </div>
  )
}`
  
  // コンポーネントディレクトリを確認し、必要に応じて作成
  const componentsDir = path.join(process.cwd(), "components")
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true })
  }
  
  // コンポーネントファイルを作成
  const componentPath = path.join(componentsDir, `${componentName}.tsx`)
  fs.writeFileSync(componentPath, componentContent)
  
  // 対応するページディレクトリも作成
  const pageDir = path.join(process.cwd(), "app", "blog", slug)
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true })
  }
  
  // ページファイルを作成
  const pagePath = path.join(pageDir, "page.tsx")
  const pageContent = `import ${componentName} from "@/components/${componentName}"

export default function Page() {
  return <${componentName} />
}`
  
  fs.writeFileSync(pagePath, pageContent)
  
  // [slug]/page.tsxを更新して新しいカスタムコンポーネントの条件を追加
  updateSlugPage(slug, componentName)
  
  // ここから新規追加：カスタムコンポーネント記事をposts.ts の記事リストに追加
  const postsFilePath = path.join(process.cwd(), "lib", "posts.ts")
  
  // 現在のposts.tsファイルを読み込む
  let postsFileContent = fs.readFileSync(postsFilePath, "utf8")
  
  // allPostsの配列内容を見つける
  const allPostsStartIndex = postsFileContent.indexOf("const posts: Post[] = [")
  const allPostsEndIndex = postsFileContent.indexOf("]", allPostsStartIndex)
  
  if (allPostsStartIndex === -1 || allPostsEndIndex === -1) {
    console.error("posts.tsのフォーマットが予期されたものと異なります")
    return
  }
  
  // 現在の日時を取得
  const now = new Date()
  const isoDate = now.toISOString()
  
  // カスタムコンポーネント記事のPostオブジェクトを作成
  const newPost = `  {
    slug: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    date: "${isoDate}",
    author: "システム管理者",
    excerpt: "${title.replace(/"/g, '\\"')}の詳細レポートと分析",
    content: "",  // カスタムコンポーネントなので空のコンテンツ
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["AI", "Technology", "Report"],
    readingTime: 10,
    featured: true,
    category: "technology",
  },`
  
  // 既存の配列の先頭に新しい記事を追加（最新として表示するため）
  const updatedContent = 
    postsFileContent.substring(0, allPostsStartIndex + 21) + 
    "\n" + newPost + 
    "\n" + postsFileContent.substring(allPostsStartIndex + 21)
  
  // ファイルを更新
  fs.writeFileSync(postsFilePath, updatedContent)
}

// [slug]/page.tsxファイルを更新する関数
function updateSlugPage(slug: string, componentName: string) {
  const slugPagePath = path.join(process.cwd(), "app", "blog", "[slug]", "page.tsx")
  
  if (fs.existsSync(slugPagePath)) {
    let content = fs.readFileSync(slugPagePath, "utf8")
    
    // インポート文を追加
    if (!content.includes(`import ${componentName}`)) {
      const lastImportIndex = content.lastIndexOf("import")
      const endOfImports = content.indexOf("\n", lastImportIndex)
      
      const newImport = `import ${componentName} from "@/components/${componentName}"\n`
      content = content.substring(0, endOfImports + 1) + newImport + content.substring(endOfImports + 1)
    }
    
    // 条件分岐を追加
    const exportDefaultIndex = content.indexOf("export default")
    const openingBraceIndex = content.indexOf("{", exportDefaultIndex)
    const firstIfIndex = content.indexOf("if (", openingBraceIndex)
    
    if (firstIfIndex !== -1) {
      // 既存のif文の後に追加
      const nextLineIndex = content.indexOf("\n", firstIfIndex)
      const indentation = content.substring(content.lastIndexOf("\n", firstIfIndex) + 1, firstIfIndex)
      
      const newCondition = `\n${indentation}if (params.slug === "${slug}") {\n${indentation}  return <${componentName} />\n${indentation}}`
      content = content.substring(0, nextLineIndex) + newCondition + content.substring(nextLineIndex)
    }
    
    fs.writeFileSync(slugPagePath, content)
  }
}
