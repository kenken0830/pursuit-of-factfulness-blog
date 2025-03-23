import { Code, CheckCircle, ArrowRight, BookOpen, Lightbulb, MessageSquare, Bot } from "lucide-react"
import OpenAILatestReportPart2 from "./part2"

export default function OpenAILatestReport() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ヘッダー */}
      <header className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            OpenAIの最新ライブ配信と新ツールがもたらす未来
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">GPT-4.5やエージェント構築プラットフォームを活用した戦略</p>
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
              <a href="#live-streaming" className="text-blue-600 dark:text-blue-400 hover:underline">
                OpenAIの最新ライブ配信と全体動向
              </a>
            </li>
            <li className="text-lg">
              <a href="#gpt-45" className="text-blue-600 dark:text-blue-400 hover:underline">
                GPT-4.5の登場と深いリサーチへの波及
              </a>
            </li>
            <li className="text-lg">
              <a href="#operator" className="text-blue-600 dark:text-blue-400 hover:underline">
                新ツール「Operator」とエージェント構築の未来
              </a>
            </li>
            <li className="text-lg">
              <a href="#business" className="text-blue-600 dark:text-blue-400 hover:underline">
                ビジネス活用と今後の展望
              </a>
            </li>
            <li className="text-lg">
              <a href="#expert" className="text-blue-600 dark:text-blue-400 hover:underline">
                専門家の意見
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
                <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                  <CheckCircle width={20} height={20} />
                </div>
                <p>OpenAIの最新ライブ配信と12日間連続アップデート企画の全容</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                  <CheckCircle width={20} height={20} />
                </div>
                <p>GPT-4.5の新機能と性能向上がもたらすビジネスインパクト</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                  <CheckCircle width={20} height={20} />
                </div>
                <p>エージェント構築プラットフォーム「Operator」の活用法</p>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">OpenAIの最新動向</h3>
            <p className="text-lg">
              OpenAIは急速に進化するAI技術を通じて、ビジネスやクリエイティブ活動の在り方を大きく変えています。新しい音声モデルのAPI提供、GPT-4.5の登場、エージェント構築プラットフォームの開発など、多面的な進化を続けるOpenAIの情報を整理し、自社の活動に取り入れることで大きなアドバンテージが得られます。
            </p>

            <div className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-blue-700 dark:text-blue-300 mb-2">
                  <MessageSquare className="mr-2 h-5 w-5" /> ライブ配信
                </h4>
                <p>新機能のローンチから技術解説まで多岐にわたるテーマをカバー</p>
              </div>

              <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-purple-700 dark:text-purple-300 mb-2">
                  <Code className="mr-2 h-5 w-5" /> 言語モデル
                </h4>
                <p>GPT-4.5による自然言語処理、数値解析、論理推論の性能向上</p>
              </div>

              <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center text-amber-700 dark:text-amber-300 mb-2">
                  <Bot className="mr-2 h-5 w-5" /> エージェント
                </h4>
                <p>「Operator」によるエージェント構築の簡易化と自動化の促進</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OpenAIの最新ライブ配信と全体動向 */}
      <section id="live-streaming" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">2. OpenAIの最新ライブ配信と全体動向</h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">ライブ配信の主な特徴</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-lg flex items-center">
                  <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                  コンテンツの多様性
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>新機能のローンチイベント</li>
                  <li>技術解説セッション</li>
                  <li>ユースケースのデモンストレーション</li>
                  <li>Q&Aセッション</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-lg flex items-center">
                  <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                  参加者層の広がり
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>AI開発者コミュニティ</li>
                  <li>デザイナーやマーケター</li>
                  <li>教育関係者</li>
                  <li>ビジネスリーダー</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">ライブ配信の主要内容</h3>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                音声モデルのAPI実装（3月20日）
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>音声モデルをAPIとして実装する方法の紹介</li>
                <li>実際のデモンストレーションによる活用例の提示</li>
                <li>チャットサポートの自動音声応答やカスタマーサービスへの応用</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">12日間連続アップデート企画の概要</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                        日程
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                        発表内容
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                        主な特徴
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Day 1</td>
                      <td className="px-4 py-3 text-sm">新型モデルo1とChatGPT Proのローンチ</td>
                      <td className="px-4 py-3 text-sm">高速推論と拡張機能</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Day 2</td>
                      <td className="px-4 py-3 text-sm">強化学習フィードバックプログラム</td>
                      <td className="px-4 py-3 text-sm">ユーザーフィードバックの活用</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Day 5</td>
                      <td className="px-4 py-3 text-sm">Appleの音声認識技術との連携</td>
                      <td className="px-4 py-3 text-sm">チャットボットの高度化</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Day 6</td>
                      <td className="px-4 py-3 text-sm">音声と動画の組み合わせアプリケーション</td>
                      <td className="px-4 py-3 text-sm">マルチモーダル機能の拡張</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                表1: OpenAIの12日間連続アップデート企画の主要発表内容
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                ライブ配信の効果
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>情報提供：</strong> 新機能や技術の詳細な解説
                </li>
                <li>
                  <strong>質疑応答：</strong> ユーザーの疑問や課題への直接回答
                </li>
                <li>
                  <strong>コミュニティ形成：</strong> 開発者同士の交流促進
                </li>
                <li>
                  <strong>フィードバックループ：</strong> ユーザー意見の製品開発への反映
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GPT-4.5の登場と深いリサーチへの波及 */}
      <section id="gpt-45" className="container mx-auto px-4 py-10 border-b bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">3. GPT-4.5の登場と深いリサーチへの波及</h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">GPT-4.5の主要特徴</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-lg flex items-center">
                  <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                  性能向上
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>自然言語処理の精度向上</li>
                  <li>数値解析能力の強化</li>
                  <li>論理推論の高度化</li>
                  <li>長文の文脈理解の改善</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-lg flex items-center">
                  <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                  セキュリティ強化
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>ユーザーデータ保護の強化</li>
                  <li>API利用時の暗号化通信</li>
                  <li>プライバシー設定の拡充</li>
                  <li>セキュリティ監査の実施</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">GPT-4.5の活用シナリオ</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <BookOpen width={20} height={20} className="mr-2 text-blue-600" />
                  ビジネス文書処理
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>長文の要点抽出と要約</li>
                  <li>複数情報源の統合分析</li>
                  <li>市場レポートの自動生成</li>
                  <li>データに基づく洞察の提供</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <Lightbulb width={20} height={20} className="mr-2 text-blue-600" />
                  研究支援
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>学術論文の分析と要約</li>
                  <li>研究データの解釈支援</li>
                  <li>仮説生成と検証</li>
                  <li>文献レビューの効率化</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">GPT-4.5導入ステップ</h3>
              <ol className="list-decimal pl-8 space-y-3">
                <li>
                  <strong>用途の明確化：</strong> 具体的な活用シナリオと目標を設定
                </li>
                <li>
                  <strong>リソース計画：</strong> 必要なデータと予算の見積もり
                </li>
                <li>
                  <strong>技術環境整備：</strong> API接続のためのプログラミング環境構築
                </li>
                <li>
                  <strong>セキュリティ対応：</strong> データ保護とプライバシー要件への対応
                </li>
                <li>
                  <strong>テスト実施：</strong> 小規模環境での検証と調整
                </li>
                <li>
                  <strong>本格導入：</strong> 段階的な展開と効果測定
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">研究機関との連携</h3>
              <p className="text-lg">
                OpenAIは研究レジデンシープログラムを通じて学術界との協力関係を強化しています。これにより、アルゴリズムの透明性向上や倫理的課題への対応が進められています。
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">研究連携の主な取り組み</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>バイアス評価：</strong> 言語モデルの社会的バイアスを評価・軽減する共同研究
                  </li>
                  <li>
                    <strong>政策形成支援：</strong> 公共セクターデータを活用した政策シミュレーション
                  </li>
                  <li>
                    <strong>透明性向上：</strong> モデルの判断プロセスを説明可能にする研究
                  </li>
                  <li>
                    <strong>倫理ガイドライン：</strong> AI利用の倫理的枠組み構築への貢献
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新ツール「Operator」とエージェント構築の未来 */}
      <section id="operator" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">4. 新ツール「Operator」とエージェント構築の未来</h2>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">「Operator」の概要</h3>
            <p className="text-lg">
              「Operator」はOpenAIが提供するエージェント構築のためのプラットフォーム的ツールです。複雑なワークフローやタスクの自動化を容易にし、チャットボットやバーチャルアシスタントなど多様なエージェントを素早く構築できます。
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">「Operator」の主要機能</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">統合管理画面</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ワークフロー可視化</li>
                    <li>• API連携の一元管理</li>
                    <li>• リアルタイムモニタリング</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">拡張性</h4>
                  <ul className="text-sm space-y-1">
                    <li>• プラグイン開発サポート</li>
                    <li>• 外部システム連携</li>
                    <li>• カスタムモジュール追加</li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-center mb-2">ユーザー体験</h4>
                  <ul className="text-sm space-y-1">
                    <li>• GUIベースのカスタマイズ</li>
                    <li>• エージェント個性設定</li>
                    <li>• ノンコーディング対応</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                活用事例：営業部門向け自動応答システム
              </h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>問い合わせ内容の自動分類と理解</li>
                <li>顧客データベースからの情報取得</li>
                <li>在庫状況や価格表のリアルタイム参照</li>
                <li>適切な回答の生成と提示</li>
                <li>必要に応じた人間オペレーターへの引き継ぎ</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">エージェント構築の未来展望</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-3">カスタマーサポートの進化</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>24時間対応の自動応答システム</li>
                    <li>感情認識による適切な対応</li>
                    <li>過去データからの学習による精度向上</li>
                    <li>人間オペレーターとのシームレスな連携</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-3">マーケティング・営業支援</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>リード獲得の自動化</li>
                    <li>製品説明の24時間提供</li>
                    <li>顧客行動分析と最適提案</li>
                    <li>ハイブリッド型営業体制の構築</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">エージェント構築における課題と対策</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">課題</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>人間の仕事が奪われるリスク</li>
                    <li>情報のブラックボックス化</li>
                    <li>セキュリティの脆弱性</li>
                    <li>責任所在の不明確さ</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">対策</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>人間との協調モデルの構築</li>
                    <li>透明性の高いAI設計</li>
                    <li>セキュリティ対策の強化</li>
                    <li>明確なガバナンス体制の確立</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part2の内容を挿入 */}
      <OpenAILatestReportPart2 />
    </div>
  )
}
