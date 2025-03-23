import { ArrowRight } from "lucide-react"

export default function OpenAILatestReportPart2() {
  return (
    <>
      {/* ビジネス活用と今後の展望 */}
      <section id="business" className="container mx-auto px-4 py-10 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">5. ビジネス活用と今後の展望</h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">ビジネス活用の成功事例</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      業種
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      導入技術
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                      成果
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">EC</td>
                    <td className="px-4 py-3 text-sm">チャットボット</td>
                    <td className="px-4 py-3 text-sm">売上数%向上、問い合わせ対応時間短縮</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">グローバル企業</td>
                    <td className="px-4 py-3 text-sm">多言語対応エージェント</td>
                    <td className="px-4 py-3 text-sm">NPS向上、顧客満足度改善</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">マーケティング</td>
                    <td className="px-4 py-3 text-sm">GPT-4.5によるコンテンツ生成</td>
                    <td className="px-4 py-3 text-sm">コンテンツ制作時間50%削減</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">金融</td>
                    <td className="px-4 py-3 text-sm">データ分析自動化</td>
                    <td className="px-4 py-3 text-sm">分析時間70%削減、精度向上</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">表2: OpenAI技術導入による業種別ビジネス成果</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">導入時の注意点</h3>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center">
                <ArrowRight width={20} height={20} className="mr-2 text-blue-600" />
                法規制とコンプライアンス
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>個人情報保護：</strong> 各国のプライバシー法に準拠した運用
                </li>
                <li>
                  <strong>API利用規約：</strong> OpenAIの定める利用規約の遵守
                </li>
                <li>
                  <strong>センシティブデータ：</strong> 金融・医療など規制の厳しい分野での特別な配慮
                </li>
                <li>
                  <strong>運用ルール：</strong> 社内ガイドラインの策定と周知
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">今後の展望：社会的インパクト</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-3">公共サービスの変革</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>行政手続きの合理化</li>
                    <li>市民サービスの向上</li>
                    <li>災害対応の効率化</li>
                    <li>公共データの活用促進</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-3">教育分野の進化</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>個別最適化された学習支援</li>
                    <li>教育格差の是正</li>
                    <li>才能の早期発掘</li>
                    <li>教育コンテンツの多様化</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">今後の技術展開予測</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>GPT-5：</strong> さらに高度な言語理解と生成能力を持つ次世代モデル
                </li>
                <li>
                  <strong>マルチモーダル拡張：</strong> 音声・画像・テキストを統合的に処理する能力の向上
                </li>
                <li>
                  <strong>エージェント間連携：</strong> 複数AIエージェントが協調して問題解決する仕組み
                </li>
                <li>
                  <strong>ドメイン特化型モデル：</strong> 特定業界や用途に最適化された専門AIの登場
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 専門家の意見 */}
      <section id="expert" className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">6. 専門家の意見</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">ライティング専門家の視点</h3>
              <div className="space-y-3">
                <p>
                  親しみやすい文章を書くコツは具体例を示すことです。数字を交えた実例を提示することで、読者は「自分のビジネスでも似たような成果が出せるかも」と考え始めます。
                </p>
                <p>
                  文章は短めに区切り、読点を適切に使うと読みやすくなります。専門用語が多い分野では、小見出しや箇条書きで要点を整理し、「なぜそれが重要なのか」を補足すると理解が深まります。
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">デザイン専門家の視点</h3>
              <div className="space-y-3">
                <p>
                  画像選びでは、テーマに合った雰囲気と色彩計画が重要です。近未来感を出すなら、黒やネオンブルー、メタリックシルバーといったクール系の色合いが効果的です。
                </p>
                <p>
                  グラフや表は背景色とのコントラストを意識し、データが読み取りやすいよう配慮します。画像は単なる装飾ではなく、読者の理解を補完する役割を担うものです。
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">AIエンジニアの視点</h3>
              <div className="space-y-3">
                <p>
                  GPT-4.5や音声モデルを活用する際は、システム全体のアーキテクチャ設計が重要です。通信プロトコルの選択によって開発の複雑度が変わります。
                </p>
                <p>
                  AIモデルの運用には継続的なモニタリングが不可欠です。推論時間、レスポンス品質、エラー率などの指標を観測し、ログ管理や可観測性ツールと連携することをおすすめします。
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">マーケターの視点</h3>
              <div className="space-y-3">
                <p>
                  AI関連記事のSEOでは、基本キーワード（AI、チャットボットなど）とニッチなロングテールキーワード（GPT-4.5導入事例など）を組み合わせるのが効果的です。
                </p>
                <p>
                  キーワードは本文の5～10％程度に適度に散りばめ、過剰にならないよう注意します。適切なキーワード配置を行ったページは約1.4～1.6倍の訪問者数増加を記録しています。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">まとめ</h3>
            <div className="space-y-4">
              <p className="text-lg">
                OpenAIのライブ配信やGPT-4.5の新機能、エージェント構築ツール「Operator」、音声モデルなど、多角的な技術革新が進んでいます。コミュニティとの双方向のやりとりや学術研究機関との連携を通じて、技術レベルと安全性の向上が図られています。
              </p>

              <p className="text-lg">
                今後もOpenAIは新たなモデルや機能を追加していくと予想され、GPT-5の正式リリースによってさらに高度な文章生成やマルチモーダル情報処理が可能になるでしょう。重要なのは自分たちの目的や課題を踏まえた上で「どの技術をどのように使うか」を見極めることです。
              </p>

              <p className="text-lg">
                組織内でのコンセンサス形成や予算調整、セキュリティ対策など多方面の準備が必要ですが、それを乗り越えた先にあるメリットは非常に大きいものです。ぜひ次のライブ配信や公式ドキュメントもチェックし、新しい知見や活用方法を探ってみてください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
