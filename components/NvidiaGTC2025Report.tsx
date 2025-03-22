import { Cpu, Network, Server, Code, CheckCircle, ArrowRight, BarChart, Layers } from "lucide-react"

export default function NvidiaGTC2025Report() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ヘッダー */}
      <header className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">NVIDIA GTC 2025春 発表内容資料</h1>
          <p className="text-xl text-white/90 max-w-3xl">AI時代の新しいコンピューティングパラダイム</p>
        </div>
      </header>

      {/* 目次 */}
      <section className="container mx-auto px-4 py-8 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">目次</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-lg">
              <a href="#overview" className="text-blue-600 dark:text-blue-400 hover:underline">
                概要
              </a>
            </li>
            <li className="text-lg">
              <a href="#key-announcements" className="text-blue-600 dark:text-blue-400 hover:underline">
                主要発表内容
              </a>
            </li>
            <li className="text-lg">
              <a href="#dgx-spark" className="text-blue-600 dark:text-blue-400 hover:underline">
                DGX Sparkとパーソナルスーパーコンピューティング
              </a>
            </li>
            <li className="text-lg">
              <a href="#blackwell" className="text-blue-600 dark:text-blue-400 hover:underline">
                Blackwellアーキテクチャと次世代GPU
              </a>
            </li>
            <li className="text-lg">
              <a href="#ecosystem" className="text-blue-600 dark:text-blue-400 hover:underline">
                NVIDIAのAIエコシステム
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* 以下の内容は長いため省略し、別ファイルに続けます */}
      {/* 残りのコンポーネント内容は NvidiaGTC2025ReportContent.tsx に記述します */}
    </div>
  )
}
