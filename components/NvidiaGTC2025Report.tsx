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

      {/* 概要セクション */}
      <section id="overview" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">1. 概要</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">本資料のポイント</h3>
            <ul className="space-y-2 pl-5 list-disc">
              <li className="text-lg flex items-start">
                <CheckCircle className="text-green-500 mr-2 h-6 w-6 flex-shrink-0 mt-0.5" />
                <span>NVIDIAが提供するフルスタックソリューションの全体像</span>
              </li>
              <li className="text-lg flex items-start">
                <CheckCircle className="text-green-500 mr-2 h-6 w-6 flex-shrink-0 mt-0.5" />
                <span>Blackwell世代GPU性能向上と性能/電力効率の向上</span>
              </li>
              <li className="text-lg flex items-start">
                <CheckCircle className="text-green-500 mr-2 h-6 w-6 flex-shrink-0 mt-0.5" />
                <span>パーソナルスーパーコンピューティングの深化と普及</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">GTC 2025春の主要テーマ</h3>
            <p className="text-lg leading-relaxed mb-4">
              NVIDIAのGTC 2025春開催講演では、「AIからヒト研究まで世界が進化、さらには歴史の『次へ』へと向かう」というビジョンが示されました。
              これまでのモデルのトレーニングや推論性能の向上に加え、今年の発表では「マイクリレーションと人間中心」のデモがクローズアップされました。
            </p>
          </div>
        </div>
      </section>

      {/* 主要発表内容 */}
      <section id="key-announcements" className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">2. 主要発表内容</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">GTC 2025春 主要発表一覧</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                <Server className="text-blue-500 mr-3 h-6 w-6 flex-shrink-0" />
                <span>Blackwell Ultra GPUアーキテクチャ</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                <Cpu className="text-blue-500 mr-3 h-6 w-6 flex-shrink-0" />
                <span>DGX Sparkパーソナルスーパーコンピュータ</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                <Network className="text-blue-500 mr-3 h-6 w-6 flex-shrink-0" />
                <span>NVIDIAエンドツーエンドAIプラットフォーム拡張</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex">
                <BarChart className="text-blue-500 mr-3 h-6 w-6 flex-shrink-0" />
                <span>産業別AIソリューションの強化</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">発表内容の重要ポイント</h3>
            <p className="text-lg leading-relaxed">
              今回の発表は、AIコンピューティングの民主化とインフラストラクチャの進化に焦点を当てています。
              特にBlackwellアーキテクチャによる次世代GPUの性能向上と、DGX Sparkによるパーソナルスーパーコンピューティングの普及が注目ポイントです。
            </p>
          </div>
        </div>
      </section>

      {/* DGX Sparkセクション */}
      <section id="dgx-spark" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">3. DGX Sparkとパーソナルスーパーコンピューティング</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">DGX Spark: AIの民主化</h3>
            <p className="text-lg leading-relaxed mb-4">
              DGX Sparkは、NVIDIAが提供する初めてのパーソナルスーパーコンピュータです。以下の特徴を持ちます：
            </p>
            <ul className="space-y-3 pl-5 list-disc mb-6">
              <li className="text-lg">コンパクトなデスクトップ筐体</li>
              <li className="text-lg">Blackwell Ultraアーキテクチャを採用したGPU搭載</li>
              <li className="text-lg">ローカルでの大規模言語モデル実行が可能</li>
              <li className="text-lg">消費電力を抑えた高効率設計</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <Cpu className="text-blue-600 dark:text-blue-400 mr-2 h-5 w-5" />
                スペック概要
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">GPU</p>
                  <p>Blackwell Ultra (3基)</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">メモリ</p>
                  <p>288GB HBM3e</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">消費電力</p>
                  <p>1,000W (最大)</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">冷却方式</p>
                  <p>液冷ハイブリッド</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">パーソナルスーパーコンピューティングの意義</h3>
            <p className="text-lg leading-relaxed mb-4">
              パーソナルスーパーコンピューティングは、以下の点で大きな意義があります：
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">データプライバシーの向上</h4>
                  <p>データをクラウドに送信せずローカルで処理することが可能に</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">レイテンシの低減</h4>
                  <p>インターネット接続に依存しない即時処理を実現</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">AIアクセシビリティの向上</h4>
                  <p>より多くの開発者や研究者がAIを活用可能に</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                  <CheckCircle className="text-green-600 dark:text-green-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">イノベーション促進</h4>
                  <p>実験とプロトタイピングの障壁を低減</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blackwellセクション */}
      <section id="blackwell" className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">4. Blackwellアーキテクチャと次世代GPU</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Blackwell Ultra: 次世代AIコンピューティング</h3>
            <p className="text-lg leading-relaxed mb-4">
              Blackwell Ultraは、NVIDIAの次世代GPUアーキテクチャで、以下の特徴があります：
            </p>
            <ul className="space-y-2 pl-5 list-disc mb-6">
              <li className="text-lg">288GB HBM3eメモリ搭載（前世代比1.5倍）</li>
              <li className="text-lg">最大10倍のAI推論性能向上（BF16精度比）</li>
              <li className="text-lg">新しいFP4精度のサポートによる効率化</li>
              <li className="text-lg">消費電力あたりの性能が2倍に向上</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">FP4精度とAI効率の革命</h3>
            <p className="text-lg leading-relaxed mb-4">
              新しく導入されたFP4（4ビット浮動小数点）精度は、AI推論ワークロードを革新的に効率化します。
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">精度タイプ</th>
                    <th className="py-3 px-4 text-left">ビット数</th>
                    <th className="py-3 px-4 text-left">主な用途</th>
                    <th className="py-3 px-4 text-left">相対性能（対FP32）</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4">FP32</td>
                    <td className="py-3 px-4">32ビット</td>
                    <td className="py-3 px-4">高精度計算、トレーニング初期段階</td>
                    <td className="py-3 px-4">1倍（ベースライン）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">FP16</td>
                    <td className="py-3 px-4">16ビット</td>
                    <td className="py-3 px-4">一般的なディープラーニングトレーニング</td>
                    <td className="py-3 px-4">約4倍</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">FP8</td>
                    <td className="py-3 px-4">8ビット</td>
                    <td className="py-3 px-4">トレーニング後半、推論</td>
                    <td className="py-3 px-4">約8倍</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">FP4</td>
                    <td className="py-3 px-4">4ビット</td>
                    <td className="py-3 px-4">AI推論、特に言語モデル</td>
                    <td className="py-3 px-4">約16倍</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* AIエコシステム */}
      <section id="ecosystem" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">5. NVIDIAのAIエコシステム</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">エンドツーエンドのAIプラットフォーム</h3>
            <p className="text-lg leading-relaxed mb-4">
              NVIDIAは、AIワークフローの全段階をカバーする包括的なプラットフォームを提供しています：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <Code className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold">データ準備・処理</h4>
                </div>
                <p>RAPIDS、DALI、cuDFなど</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <Layers className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold">モデル開発・トレーニング</h4>
                </div>
                <p>CUDA-X AI、NGC、各種フレームワーク最適化</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <Server className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold">デプロイメント・推論</h4>
                </div>
                <p>TensorRT、Triton Inference Server</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <Network className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold">エンドユーザーアプリケーション</h4>
                </div>
                <p>NVIDIA AIエンタープライズ、Omniverse</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">産業別AIソリューション</h3>
            <p className="text-lg leading-relaxed mb-4">
              各産業向けの特化したAIソリューションが発表されました：
            </p>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-semibold mb-3">医療・ヘルスケア</h4>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>NVIDIA Clara：医療画像処理、ゲノム解析、創薬のための統合プラットフォーム</li>
                  <li>次世代医療AI：患者固有の治療計画最適化と医師の意思決定支援</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-semibold mb-3">製造・ロボティクス</h4>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>NVIDIA Isaac：ロボット工学のためのAIプラットフォーム強化</li>
                  <li>デジタルツイン技術：製造プロセスのリアルタイムシミュレーションと最適化</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-semibold mb-3">自動車・輸送</h4>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>NVIDIA DRIVE：次世代自動運転プラットフォームのアップデート</li>
                  <li>Fleet Management：商用車両フリートの最適化と自律運用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">まとめ</h2>
          <p className="text-lg leading-relaxed mb-6">
            NVIDIAのGTC 2025春の発表は、AIコンピューティングの次の段階への移行を示すものでした。
            Blackwellアーキテクチャの導入とDGX Sparkの発表により、AIの民主化と性能向上の両立を実現しています。
            また、産業別のAIソリューションの拡充により、様々な分野でのAI活用が加速することが期待されます。
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
            <h4 className="text-xl font-semibold mb-3">今後の展望</h4>
            <p className="leading-relaxed">
              2025年以降、NVIDIAのテクノロジーはさらに進化し、AI開発のバリアを下げるとともに、
              より高度なAIモデルのトレーニングと推論を可能にすることで、技術革新を加速させると考えられます。
              特に、パーソナルスーパーコンピューティングの普及は、AI開発の裾野を広げる重要な転換点となるでしょう。
            </p>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-600 dark:text-gray-400">
              &copy; 2025 Pursuit of Factfulness. NVIDIA GTC 2025レポート
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
