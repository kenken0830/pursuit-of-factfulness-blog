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

      {/* 概要 */}
      <section id="overview" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">1. 概要</h2>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-4">本資料のポイント</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                </div>
                <p>NVIDIAが提示するフルスタックソリューションの全体像</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                </div>
                <p>Blackwell世代GPUの性能向上とFP4精度の意義</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                </div>
                <p>パーソナルAIスーパーコンピューティングの実現と影響</p>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">GTC 2025春の主要テーマ</h3>
            <p className="text-lg">
              NVIDIAのGTC
              2025春基調講演では、「AIをあらゆる開発者や研究者、さらには学生の手元へ一気に届ける」というビジョンが示されました。これまでAIモデルのトレーニングや推論は巨大なデータセンターを要するイメージでしたが、今回の発表ではエッジからクラウドまでをシームレスにつなぐ新たなコンピューティングパラダイムが提示されています。
            </p>

            <div className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-blue-700 dark:text-blue-300 mb-2">
                  <Cpu className="mr-2 h-5 w-5" /> ハードウェア革新
                </h4>
                <p>DGX Spark、Blackwell Ultra、シリコンフォトニクスネットワーク</p>
              </div>

              <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-purple-700 dark:text-purple-300 mb-2">
                  <Code className="mr-2 h-5 w-5" /> ソフトウェア進化
                </h4>
                <p>NVIDIA Dynamo、NIM、オープンソース化された経路最適化ライブラリ</p>
              </div>

              <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-amber-700 dark:text-amber-300 mb-2">
                  <Server className="mr-2 h-5 w-5" /> AIモデル拡張
                </h4>
                <p>Llama Nemotron、Isaac GR00T N1、商用利用可能なオープンモデル</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要発表内容 */}
      <section id="key-announcements" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">2. 主要発表内容</h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">GTC 2025春 主要発表一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      カテゴリ
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      製品/技術
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      主な特徴
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      発売予定
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">パーソナルAI</td>
                    <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20 font-medium">DGX Spark</td>
                    <td className="px-4 py-3 text-sm">デスクトップサイズ、1ペタフロップス、約3,000ドル</td>
                    <td className="px-4 py-3 text-sm">2025年夏</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">パーソナルAI</td>
                    <td className="px-4 py-3 text-sm">DGX Station</td>
                    <td className="px-4 py-3 text-sm">デスクサイド型、20ペタフロップス、784GB統合メモリ</td>
                    <td className="px-4 py-3 text-sm">2025年後半</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">GPU</td>
                    <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20 font-medium">
                      Blackwell Ultra (GB300)
                    </td>
                    <td className="px-4 py-3 text-sm">288GB HBM3e、FP4対応、20ペタフロップス</td>
                    <td className="px-4 py-3 text-sm">2025年後半</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">ネットワーク</td>
                    <td className="px-4 py-3 text-sm">Spectrum-X/Quantum-X</td>
                    <td className="px-4 py-3 text-sm">シリコンフォトニクス、800Gb/s～1.6Tb/s</td>
                    <td className="px-4 py-3 text-sm">2025年中</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">AIモデル</td>
                    <td className="px-4 py-3 text-sm">Llama Nemotron</td>
                    <td className="px-4 py-3 text-sm">オープンソース、商用利用可能</td>
                    <td className="px-4 py-3 text-sm">即時利用可能</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">ロボティクス</td>
                    <td className="px-4 py-3 text-sm">Isaac GR00T N1</td>
                    <td className="px-4 py-3 text-sm">人型ロボット用AIモデル</td>
                    <td className="px-4 py-3 text-sm">2025年第2四半期</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              表1: NVIDIA GTC 2025春の主要発表一覧（緑色のハイライトは特に注目の製品）
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">発表内容の重要ポイント</h3>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-green-600" />
                パーソナルAIの民主化
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>デスクトップサイズのAIスーパーコンピュータ「DGX Spark」の登場</li>
                <li>約3,000ドルという従来比で大幅に低価格化</li>
                <li>研究室や個人でも大規模AIモデルを実行可能に</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-green-600" />
                Blackwellアーキテクチャの進化
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>FP4（4ビット浮動小数点）精度のサポートによるメモリ効率の飛躍的向上</li>
                <li>HBM3eメモリを288GBまで拡大したBlackwell Ultra</li>
                <li>単体で20ペタフロップス相当のAI演算性能</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-green-600" />
                ネットワークとインフラの革新
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>シリコンフォトニクスを活用した次世代ネットワークスイッチ</li>
                <li>800Gb/s～1.6Tb/sの超高速データ転送</li>
                <li>エッジとクラウドをシームレスに接続するインフラ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DGX Sparkとパーソナルスーパーコンピューティング */}
      <section id="dgx-spark" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">3. DGX Sparkとパーソナルスーパーコンピューティング</h2>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-t-xl p-1"></div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-b-xl">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <div className="aspect-square bg-white dark:bg-gray-700 rounded-xl p-4 flex items-center justify-center">
                    <Server className="h-24 w-24 text-blue-500" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">DGX Spark: AIの民主化</h3>
                  <p className="text-lg mb-4">
                    NVIDIAは「DGX Spark」という革新的な製品を発表しました。これはデスクトップサイズのAIスーパーコンピュータで、
                    約3,000ドルという価格で提供される予定です。
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>1ペタフロップスのAI演算性能</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Blackwellアーキテクチャを搭載</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>2025年夏発売予定</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">パーソナルスーパーコンピューティングの意義</h3>
            
            <p>
              従来、大規模AIモデルのトレーニングや推論には巨大なデータセンターが必要でした。
              しかし、DGX Sparkの登場により、研究者や開発者、そして学生でさえもデスクトップ上で
              高度なAIモデルを実行できるようになります。これはAI開発の民主化に大きく貢献します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-blue-500" /> 研究者向け
                </h4>
                <p className="text-sm">
                  実験室レベルの研究でも大規模モデルを扱えるようになり、AI研究の加速が期待できます。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Code className="mr-2 h-5 w-5 text-blue-500" /> 開発者向け
                </h4>
                <p className="text-sm">
                  クラウドに依存せず独自のモデルをローカルで開発・微調整できるようになります。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-blue-500" /> 学生向け
                </h4>
                <p className="text-sm">
                  教育機関で実践的なAI学習の機会が増え、次世代のAI人材育成が加速します。
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl my-6">
              <h4 className="text-lg font-semibold mb-4">DGX製品ラインナップ比較</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">モデル</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">AI性能</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">メモリ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">価格目安</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">用途</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">DGX Spark</td>
                      <td className="px-4 py-3 text-sm">1ペタFLOPS</td>
                      <td className="px-4 py-3 text-sm">96GB</td>
                      <td className="px-4 py-3 text-sm">約3,000ドル</td>
                      <td className="px-4 py-3 text-sm">個人開発/小規模研究</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">DGX Station</td>
                      <td className="px-4 py-3 text-sm">20ペタFLOPS</td>
                      <td className="px-4 py-3 text-sm">784GB</td>
                      <td className="px-4 py-3 text-sm">約10万ドル</td>
                      <td className="px-4 py-3 text-sm">チーム開発/中規模研究</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">DGX H200</td>
                      <td className="px-4 py-3 text-sm">200ペタFLOPS</td>
                      <td className="px-4 py-3 text-sm">1,536GB</td>
                      <td className="px-4 py-3 text-sm">約50万ドル</td>
                      <td className="px-4 py-3 text-sm">企業/大規模研究</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blackwellアーキテクチャと次世代GPU */}
      <section id="blackwell" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">4. Blackwellアーキテクチャと次世代GPU</h2>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-t-xl p-1"></div>
            <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-b-xl">
              <h3 className="text-2xl font-bold mb-4">Blackwell Ultra: 次世代AIコンピューティング</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <div className="aspect-square bg-white dark:bg-gray-700 rounded-xl p-4 flex items-center justify-center">
                    <Cpu className="h-24 w-24 text-green-500" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4">
                    BlackwellアーキテクチャはNVIDIAの次世代GPUアーキテクチャで、
                    特にAI・機械学習のワークロードに最適化されています。
                    Blackwell Ultra (GB300) は、そのフラッグシップモデルです。
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>288GB HBM3eメモリを搭載し、超大規模AIモデルの処理が可能</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>FP4（4ビット浮動小数点）精度をネイティブサポート</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>単体で20ペタフロップスの演算性能を実現</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">FP4精度とAI効率の革命</h3>
            
            <p>
              BlackwellアーキテクチャにおけるFP4（4ビット浮動小数点）精度のサポートは、
              AIモデルのトレーニングと推論の効率を飛躍的に向上させる革新的な技術です。
              従来のFP16（16ビット）やFP8（8ビット）と比較して、メモリ使用量を大幅に削減しながら、
              精度をほとんど損なわずにAIモデルを実行できます。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl my-6">
              <h4 className="text-lg font-semibold mb-4">精度比較と効率化</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">精度</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">ビット数</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">メモリ効率</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">演算効率</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">主な用途</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">FP32</td>
                      <td className="px-4 py-3 text-sm">32ビット</td>
                      <td className="px-4 py-3 text-sm">1x (基準)</td>
                      <td className="px-4 py-3 text-sm">1x (基準)</td>
                      <td className="px-4 py-3 text-sm">高精度学術研究</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">FP16</td>
                      <td className="px-4 py-3 text-sm">16ビット</td>
                      <td className="px-4 py-3 text-sm">2x</td>
                      <td className="px-4 py-3 text-sm">2-4x</td>
                      <td className="px-4 py-3 text-sm">トレーニング/推論</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">FP8</td>
                      <td className="px-4 py-3 text-sm">8ビット</td>
                      <td className="px-4 py-3 text-sm">4x</td>
                      <td className="px-4 py-3 text-sm">4-8x</td>
                      <td className="px-4 py-3 text-sm">主に推論</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium bg-green-50 dark:bg-green-900/20">FP4</td>
                      <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20">4ビット</td>
                      <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20">8x</td>
                      <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20">8-16x</td>
                      <td className="px-4 py-3 text-sm bg-green-50 dark:bg-green-900/20">推論特化</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h4 className="text-lg font-medium flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-green-600" />
              Blackwellアーキテクチャの主な利点
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>メモリ容量の制約を緩和し、より大規模なAIモデルを実行可能に</li>
              <li>電力効率の大幅な向上により、運用コストの削減を実現</li>
              <li>AIモデルの推論速度が著しく向上し、リアルタイム処理に最適</li>
              <li>チップ間通信を高速化する第二世代NVLinkの採用</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NVIDIAのAIエコシステム */}
      <section id="ecosystem" className="container mx-auto px-4 py-10 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">5. NVIDIAのAIエコシステム</h2>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-xl p-1"></div>
            <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-b-xl">
              <h3 className="text-2xl font-bold mb-4">エンドツーエンドのAIプラットフォーム</h3>
              <p className="text-lg mb-6">
                NVIDIAはハードウェアからソフトウェア、サービスに至るまで垂直統合されたAIエコシステムを構築しています。
                GTC 2025では、このエコシステムの拡充と強化の方針が示されました。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-purple-500" /> ソフトウェアプラットフォーム
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>NVIDIA Dynamo: MLモデル最適化フレームワーク</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>NIM: エンタープライズAIデプロイメントプラットフォーム</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>CUDA-X: 様々な産業向けに最適化されたライブラリ群</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-gray-700">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Network className="mr-2 h-5 w-5 text-purple-500" /> オープンエコシステム
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Llama Nemotron: オープンソースLLM</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>NVIDIAのマルチモーダルAIモデルの公開</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>経路最適化ライブラリのオープンソース化</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">産業別AIソリューション</h3>
            
            <p>
              NVIDIAは様々な産業に特化したAIソリューションを提供しています。
              GTC 2025では、以下の産業向けのAIソリューションに関する新たな発表がありました。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">医療</h4>
                <p className="text-sm">
                  医療画像診断の精度向上と処理速度の大幅な改善。新しい薬物開発のためのAIモデルの拡充。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">製造/ロボティクス</h4>
                <p className="text-sm">
                  Isaac GR00T N1モデルによる人型ロボットの自律制御の進化。工場の自動化におけるAI活用の拡大。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">自動車/交通</h4>
                <p className="text-sm">
                  自動運転技術の進化と、NVIDIA DRIVEプラットフォームの新機能。都市交通の最適化AIモデルの発表。
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl my-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Server className="mr-2 h-5 w-5 text-blue-600" /> エコシステムの将来展望
              </h4>
              <p className="mb-4">
                NVIDIAのエコシステムは、ハードウェア、ソフトウェア、サービス、パートナーシップの垂直統合によって、
                AIの研究開発から実用化までを加速しています。今後の展望として以下の点が挙げられます。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>さらに小型化・低価格化されたAIスーパーコンピューティングの普及</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>エッジAIの性能向上と応用範囲の拡大</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>様々な産業におけるAI活用の深化と拡大</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>オープンモデルとクローズドモデルの共存による技術革新の加速</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-8 mt-8">
              <h3 className="text-2xl font-bold mb-4 text-center">まとめ</h3>
              <p className="text-lg mb-6 text-center">
                NVIDIA GTC 2025春の発表は、AIの民主化と産業革新を加速する画期的な内容でした。
                特にDGX SparkとBlackwellアーキテクチャの登場により、
                AIの利用可能性が大きく広がることが期待されます。
              </p>
              <div className="flex justify-center">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg inline-block">
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    ※本資料は2025年3月時点の情報に基づいています。製品の発売時期や仕様は変更される可能性があります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
