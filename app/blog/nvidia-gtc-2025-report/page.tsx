import React from "react"
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
                  <CheckCircle width={20} height={20} />
                </div>
                <p>NVIDIAが提示するフルスタックソリューションの全体像</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 dark:text-green-400">
                  <CheckCircle width={20} height={20} />
                </div>
                <p>Blackwell世代GPUの性能向上とFP4精度の意義</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-green-600 dark:text-green-400">
                  <CheckCircle width={20} height={20} />
                </div>
                <p>パーソナルAIスーパーコンピューティングの実現と影響</p>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">GTC 2025春の主要テーマ</h3>
            <p className="text-lg">
              NVIDIAのGTC 2025春基調講演では、「AIをあらゆる開発者や研究者、さらには学生の手元へ一気に届ける」というビジョンが示されました。これまでAIモデルのトレーニングや推論は巨大なデータセンターを要するイメージでしたが、今回の発表ではエッジからクラウドまでをシームレスにつなぐ新たなコンピューティングパラダイムが提示されています。
            </p>

            <div className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-blue-700 dark:text-blue-300 mb-2">
                  <Cpu width={20} height={20} className="mr-2" /> ハードウェア革新
                </h4>
                <p>DGX Spark、Blackwell Ultra、シリコンフォトニクスネットワーク</p>
              </div>

              <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-purple-700 dark:text-purple-300 mb-2">
                  <Code width={20} height={20} className="mr-2" /> ソフトウェア進化
                </h4>
                <p>NVIDIA Dynamo、NIM、オープンソース化された経路最適化ライブラリ</p>
              </div>

              <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-amber-700 dark:text-amber-300 mb-2">
                  <Server width={20} height={20} className="mr-2" /> AIモデル拡張
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
            <h3 className="text-xl font-semibold mb-4">GTC 2025春 主要発表一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">カテゴリ</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">製品/技術</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">主な特徴</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">発売予定</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">パーソナルAI</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 bg-green-100 dark:bg-green-900/30 font-medium">DGX Spark</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">デスクトップサイズ、1ペタフロップス、約3,000ドル</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">2025年夏</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">パーソナルAI</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">DGX Station</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">デスクサイド型、20ペタフロップス、784GB統合メモリ</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">2025年後半</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">GPU</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 bg-green-100 dark:bg-green-900/30 font-medium">Blackwell Ultra (GB300)</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">288GB HBM3e、FP4対応、20ペタフロップス</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">2025年後半</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">ネットワーク</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Spectrum-X/Quantum-X</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">シリコンフォトニクス、800Gb/s～1.6Tb/s</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">2025年中</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">AIモデル</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Llama Nemotron</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">オープンソース、商用利用可能</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">即時利用可能</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">ロボティクス</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Isaac GR00T N1</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">人型ロボット用AIモデル</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">2025年第2四半期</td>
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
              <h4 className="text-lg font-medium">
                パーソナルAIの民主化
              </h4>
              <ul>
                <li>デスクトップサイズのAIスーパーコンピュータ「DGX Spark」の登場</li>
                <li>約3,000ドルという従来比で大幅に低価格化</li>
                <li>研究室や個人でも大規模AIモデルを実行可能に</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium">
                Blackwellアーキテクチャの進化
              </h4>
              <ul>
                <li>FP4（4ビット浮動小数点）精度のサポートによるメモリ効率の飛躍的向上</li>
                <li>HBM3eメモリを288GBまで拡大したBlackwell Ultra</li>
                <li>単体で20ペタフロップス相当のAI演算性能</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium">
                ネットワークとインフラの革新
              </h4>
              <ul>
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
              <h3 className="text-2xl font-bold mb-4">パーソナルAIの革命</h3>
              <p className="text-lg mb-6">
                DGX Sparkの登場は、「パーソナルAIスーパーコンピューティング」という新しい時代の幕開けを告げるものです。
                これまで巨大な施設でしか利用できなかったAI処理能力が、
                個人や小規模チームでも手の届く価格帯で利用可能になる転換点となります。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold flex items-center mb-3">
                    <Server width={20} height={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    DGX Sparkの特徴
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>サイズ: デスクトップPC並みのコンパクト設計</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>性能: 1ペタフロップス（従来比10倍の電力効率）</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>メモリ: 96GB HBM3e 統合メモリ</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>価格: 約3,000ドル（予定価格）</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>発売: 2025年夏予定</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold flex items-center mb-3">
                    <Layers width={20} height={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    実現できること
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>最大70Bパラメータのモデルを単体で実行</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>ローカルでの大規模モデルのファインチューニング</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>リアルタイムのマルチモーダルAI推論</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>プライバシーを保持したローカルAI実行環境</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>クラウドとの分散協調処理</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">パーソナルAIのエコシステム</h3>
            
            <p>
              DGX Sparkは単なるハードウェア製品ではなく、NVIDIAが提供する総合的なAIエコシステムの一部として位置づけられています。
              このエコシステムには以下の要素が含まれます：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">ハードウェア</h4>
                <ul className="text-sm space-y-1">
                  <li>DGX Spark (エントリーモデル)</li>
                  <li>DGX Station (ワークグループ向け)</li>
                  <li>DGX SuperPOD (エンタープライズ向け)</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">ソフトウェア</h4>
                <ul className="text-sm space-y-1">
                  <li>NVIDIA AI Enterprise</li>
                  <li>CUDA-X (AI/HPC最適化ライブラリ)</li>
                  <li>NVIDIA Dynamo (モデル最適化)</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">モデル・アプリケーション</h4>
                <ul className="text-sm space-y-1">
                  <li>Llama Nemotron (オープンソースLLM)</li>
                  <li>NVIDIA AI基盤モデル</li>
                  <li>サードパーティAIアプリケーション</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl my-6">
              <h4 className="text-lg font-semibold mb-4">想定されるユースケース</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">個人・研究者向け</p>
                  <ul className="text-sm space-y-1">
                    <li>研究室単位でのAIモデル開発/訓練</li>
                    <li>ローカルでのプライベートAIアシスタント実行</li>
                    <li>教育機関でのAI学習環境の提供</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">企業向け</p>
                  <ul className="text-sm space-y-1">
                    <li>機密性の高いデータを扱うAI処理</li>
                    <li>エッジでのリアルタイムAI分析</li>
                    <li>部門単位でのAI活用環境の展開</li>
                  </ul>
                </div>
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
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-xl p-1"></div>
            <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-b-xl">
              <h3 className="text-2xl font-bold mb-4">次世代GPUアーキテクチャ</h3>
              <p className="text-lg mb-6">
                BlackwellアーキテクチャはNVIDIAの次世代GPUプラットフォームであり、
                AIモデルの訓練と推論に革命をもたらします。
                特にFP4（4ビット浮動小数点）精度のネイティブサポートは、
                AIモデルの効率を劇的に向上させる革新的な機能です。
              </p>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold flex items-center mb-3">
                    <Cpu width={20} height={20} className="mr-2 text-purple-600 dark:text-purple-400" />
                    Blackwellの技術革新
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>Transformer Engineの第二世代</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>FP4精度のネイティブサポート</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>新ソフトウェアスタック「NVIDIA Dynamo」</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>最大288GB HBM3eメモリ搭載</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-green-600 dark:text-green-400">
                        <CheckCircle width={16} height={16} />
                      </div>
                      <p>5nmプロセスルールによる電力効率</p>
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold flex items-center mb-3">
                    <BarChart width={20} height={20} className="mr-2 text-purple-600 dark:text-purple-400" />
                    性能向上ポイント
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>H200比で最大30倍の推論処理性能</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>最大4倍のメモリ使用効率（FP4採用時）</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>電力あたり10倍の性能（H100比）</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>MoE（Mixture of Experts）モデルの効率化</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                        <ArrowRight width={16} height={16} />
                      </div>
                      <p>シリコンフォトニクスによる超高速通信</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">FP4精度とAIモデルの効率化</h3>
            
            <p className="mb-4">
              FP4（4ビット浮動小数点）精度のネイティブサポートは、Blackwellの最も革新的な機能の一つです。
              従来の8ビット（FP8）や16ビット（FP16）精度と比較して、メモリ使用量を大幅に削減しながら、
              AIモデルの精度をほとんど損なわないという画期的な技術です。
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-3">モデル</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3">H100比 推論速度</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3">A100比 推論速度</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3">電力効率(H100比)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">GB200</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">30倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">5倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">4倍</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">GB200 Superchip</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">40倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">8倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">5倍</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">GB300 Ultra</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">60倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">10倍</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">6倍</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ※大規模言語モデル（LLM）トレーニングおよび推論タスクでの性能比較
            </p>
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
                  <h4 className="font-semibold mb-2">ソフトウェアプラットフォーム</h4>
                  <ul>
                    <li>NVIDIA Dynamo: MLモデル最適化フレームワーク</li>
                    <li>NIM: エンタープライズAIデプロイメントプラットフォーム</li>
                    <li>CUDA-X: 様々な産業向けに最適化されたライブラリ群</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">オープンエコシステム</h4>
                  <ul>
                    <li>Llama Nemotron: オープンソースLLM</li>
                    <li>NVIDIAのマルチモーダルAIモデルの公開</li>
                    <li>経路最適化ライブラリのオープンソース化</li>
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
                <p>
                  医療画像診断の精度向上と処理速度の大幅な改善。新しい薬物開発のためのAIモデルの拡充。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">製造/ロボティクス</h4>
                <p>
                  Isaac GR00T N1モデルによる人型ロボットの自律制御の進化。工場の自動化におけるAI活用の拡大。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">自動車/交通</h4>
                <p>
                  自動運転技術の進化と、NVIDIA DRIVEプラットフォームの新機能。都市交通の最適化AIモデルの発表。
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl my-6">
              <h4 className="text-lg font-semibold mb-4">エコシステムの将来展望</h4>
              <p className="mb-4">
                NVIDIAのエコシステムは、ハードウェア、ソフトウェア、サービス、パートナーシップの垂直統合によって、
                AIの研究開発から実用化までを加速しています。今後の展望として以下の点が挙げられます。
              </p>
              <ul>
                <li>さらに小型化・低価格化されたAIスーパーコンピューティングの普及</li>
                <li>エッジAIの性能向上と応用範囲の拡大</li>
                <li>様々な産業におけるAI活用の深化と拡大</li>
                <li>オープンモデルとクローズドモデルの共存による技術革新の加速</li>
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
