// This is a mock implementation for demonstration purposes
// In a real application, you would fetch data from a CMS or parse Markdown files

export interface Post {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  coverImage?: string
  tags?: string[]
  readingTime: number
  featured?: boolean
  category?: string
}

// Sample blog posts data
const posts: Post[] = [
  {
    slug: "understanding-climate-change",
    title: "気候変動を理解する：事実と神話",
    date: "2023-04-15",
    author: "Dr. Emma Johnson",
    excerpt:
      "気候変動は現代の最も重要な課題の一つです。この記事では、気候変動の科学的背景を探り、事実と一般的な誤解を区別します。",
    content: `
      <h2>気候変動の科学</h2>
      <p>気候変動とは、気温や気象パターンの長期的な変化を指します。これらの変化は自然なものかもしれませんが、1800年代以降、人間の活動が気候変動の主な原因となっています。主に石炭、石油、ガスなどの化石燃料の燃焼が熱を閉じ込めるガスを生成しています。</p>
      
      <h2>気候変動に関する重要な事実</h2>
      <ul>
        <li>世界の気温は産業革命前と比較して約1°C上昇しています。</li>
        <li>海面上昇の速度は近年加速しています。</li>
        <li>大気中のCO2濃度は人類の歴史上最高レベルに達しています。</li>
        <li>極端な気象現象がより頻繁かつ激しくなっています。</li>
      </ul>
      
      <h2>一般的な誤解の解明</h2>
      <p>科学的コンセンサスにもかかわらず、気候変動についてはまだ多くの誤解があります。最も一般的な誤解のいくつかを見てみましょう：</p>
      
      <h3>誤解1：気候変動は単なる自然変動である</h3>
      <p>地球の気候は歴史を通じて変化してきましたが、現在の温暖化傾向は前例のない速度で進行しており、人間の活動と直接関連付けることができます。</p>
      
      <h3>誤解2：科学者は気候変動について意見が分かれている</h3>
      <p>気候変動が実在し、人為的なものであるという圧倒的な科学的コンセンサスがあります。複数の研究によると、気候科学者の97-99%がこれに同意しています。</p>
      
      <h2>私たちにできること</h2>
      <p>気候変動に対処するには、個人と集団の両方の行動が必要です。以下はいくつかの対策です：</p>
      
      <ul>
        <li>エネルギー消費を削減し、再生可能エネルギー源に切り替える</li>
        <li>公共交通機関の利用、カーシェアリング、または電気自動車への切り替え</li>
        <li>廃棄物を最小限に抑えるために、削減、再利用、リサイクルを実践する</li>
        <li>気候変動対策に取り組む政策やリーダーを支援する</li>
      </ul>
      
      <p>気候変動に関する事実を理解し行動することで、その影響を緩和し、より持続可能な未来を創造するために協力することができます。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Climate", "Environment", "Science"],
    readingTime: 8,
    featured: true,
    category: "science",
  },
  {
    slug: "nvidia-ai-computer",
    title: "NVIDIAが示す「AI時代の新しいコンピュータ」の全貌とは？",
    date: "2025-03-15",
    author: "山田太郎",
    excerpt: "デスクトップからデータセンターまでを革新する最新GTC 2025春の衝撃",
    content: `
      <h2>AIの新時代を切り開くNVIDIAの革新</h2>
      <p>NVIDIAは2025年春のGTCカンファレンスで、AIコンピューティングの未来を根本から変える新製品群を発表しました。デスクトップPCからエンタープライズサーバー、そしてデータセンターまで、あらゆるコンピューティング環境を革新する包括的なソリューションが明らかになりました。</p>
      
      <h2>次世代GPUアーキテクチャ「Blackwell Ultra」</h2>
      <p>今回のGTCで最も注目を集めたのは、次世代GPUアーキテクチャ「Blackwell Ultra」です。前世代のHopperと比較して、以下の革新的な特徴を備えています：</p>
      
      <ul>
        <li>演算性能が3倍向上し、AI推論タスクで最大5倍の高速化を実現</li>
        <li>電力効率が2倍に改善され、データセンターの運用コストを大幅に削減</li>
        <li>新しいテンソルコアアーキテクチャにより、複雑なAIモデルのトレーニング時間を60%短縮</li>
        <li>最大192GBのHBM3eメモリを搭載し、大規模言語モデルの処理能力を飛躍的に向上</li>
      </ul>
      
      <h2>デスクトップAIコンピューティングの革命「DGX Spark」</h2>
      <p>NVIDIAは一般消費者向けに「DGX Spark」と呼ばれる新しいデスクトップAIコンピュータを発表しました。これは従来のワークステーションの概念を覆す製品です：</p>
      
      <ul>
        <li>Blackwell Ultraアーキテクチャを採用したRTX 6090 GPUを搭載</li>
        <li>AIアクセラレーション専用のNVIDIA AIエンジンを内蔵</li>
        <li>最大64コアのCPUと512GBのRAMをサポート</li>
        <li>AIモデルの開発からコンテンツ制作まで、あらゆるクリエイティブワークフローを加速</li>
      </ul>
      
      <h2>エンタープライズAIインフラストラクチャの進化</h2>
      <p>企業向けには、AIインフラストラクチャを根本から変革する新しいソリューションが発表されました：</p>
      
      <ul>
        <li>新世代のDGXシステムは、最大8台のBlackwell Ultra GPUを搭載し、前世代と比較して4倍の処理能力を実現</li>
        <li>NVIDIAネットワークスイッチは、400Gbpsの超高速接続を提供し、分散AIトレーニングのボトルネックを解消</li>
        <li>NVIDIA AIエンタープライズソフトウェアスイートは、AIモデルの開発から展開、管理までをシームレスに統合</li>
      </ul>
      
      <h2>AIデモクラタイゼーション：すべての開発者へのアクセス提供</h2>
      <p>今回のGTCで明らかになったNVIDIAの戦略の中核は、AIテクノロジーの民主化です。CEOのジェンスン・フアン氏は基調講演で次のように述べています：</p>
      
      <blockquote>
        「AIの力をあらゆる開発者、研究者、学生の手に届けることが私たちのミッションです。テクノロジーの進歩は、それを活用できる人々の数に比例します。今日発表した製品とサービスは、AIイノベーションの障壁を取り除き、次世代のブレークスルーを加速するためのものです。」
      </blockquote>
      
      <h2>業界への影響と今後の展望</h2>
      <p>NVIDIAの今回の発表は、AIコンピューティング業界に大きな影響を与えることが予想されます：</p>
      
      <ul>
        <li>競合他社はNVIDIAの技術的優位性に対抗するために、研究開発投資を増加させる可能性が高い</li>
        <li>エンタープライズAI導入の加速により、クラウドプロバイダーはインフラストラクチャの大規模なアップグレードを迫られる</li>
        <li>消費者向けAIアプリケーションの爆発的な増加が予測され、新たなソフトウェアエコシステムが形成される</li>
      </ul>
      
      <p>NVIDIAのこの包括的なAIコンピューティング戦略は、テクノロジー業界全体のパラダイムシフトを引き起こす可能性があります。デスクトップからデータセンターまで、あらゆるコンピューティング環境でAIが中心的な役割を果たす新時代の幕開けを告げるものと言えるでしょう。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["AI", "NVIDIA", "Technology"],
    readingTime: 10,
    featured: true,
    category: "technology",
  },
  {
    slug: "nvidia-gtc-2025-themes",
    title: "GTC 2025春の主要テーマ",
    date: "2025-03-22",
    author: "テックアナリスト",
    excerpt: "NVIDIAのGTC 2025春開催で発表された「AIからヒト研究までの発展」とパーソナルスーパーコンピューティングの展望と概要",
    content: `
      <h2>目次</h2>
      <ul>
        <li>1. 概要</li>
        <li>2. 主要発表内容</li>
        <li>3. DGX Sparkとパーソナルスーパーコンピューティング</li>
        <li>4. Blackwellアーキテクチャと技術的GPU</li>
        <li>5. NVIDIA/AIエコシステム</li>
      </ul>
      
      <h2>1. 概要</h2>
      <p>本資料のポイント</p>
      <ul>
        <li>NVIDIAが提供するフルスタックソリューションの全体像</li>
        <li>Blackwell世代GPU性能向上と性能/電力効率の向上</li>
        <li>パーソナルスーパーコンピューティングの深化と普及</li>
      </ul>
      
      <h2>GTC 2025春の主要テーマ</h2>
      <p>NVIDIAのGTC 2025春開催講演では、「AIからヒト研究まで世界が進化、さらには歴史の『次へ』へと向かう」というビジョンが示されました。これまでのモデルのトレーニングや推論性能の向上に加え、今年の発表では「マイクリレーションと人間中心」のデモがクローズアップされました。</p>
      
      <h2>3. DGX Sparkとパーソナルスーパーコンピューティング</h2>
      <p>パーソナルスーパーコンピューティングの実現により、AI研究や開発が個人レベルでも高度に行えるようになりました。DGX Sparkシリーズは従来のワークステーションと比較して10倍の性能を持ちながら、コンパクトなフォームファクターと省電力設計を実現しています。</p>
      
      <h2>4. Blackwellアーキテクチャと技術的GPU</h2>
      <p>Blackwell世代GPUは以下の点で大幅な性能向上を実現しています：</p>
      <ul>
        <li>前世代比3倍の演算性能</li>
        <li>電力効率2倍向上でデータセンター運用コストを大幅削減</li>
        <li>新テンソルコアアーキテクチャによりAIモデルのトレーニング時間を60%短縮</li>
        <li>最大192GBのHBM3eメモリ搭載</li>
      </ul>
      
      <h2>5. NVIDIA/AIエコシステム</h2>
      <p>NVIDIAは単なるハードウェアプロバイダーを超え、ソフトウェア、フレームワーク、開発ツールを含む包括的なAIエコシステムを提供しています。このエコシステムにより、開発者はより短期間で高度なAIソリューションを構築できるようになっています。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["AI", "NVIDIA", "GTC", "テクノロジー", "Blackwell", "スーパーコンピューティング"],
    readingTime: 7,
    featured: true,
    category: "technology",
  },
  {
    slug: "vaccine-safety-explained",
    title: "ワクチンの安全性を解説：事実と誤解を区別する",
    date: "2023-05-22",
    author: "Dr. Michael Chen",
    excerpt:
      "ワクチンは公衆衛生における最大の成果の一つですが、それに関する誤情報は依然として存在します。この記事では、ワクチンの安全性に関する証拠を検証し、一般的な懸念に対応します。",
    content: `
      <h2>ワクチンの重要性</h2>
      <p>ワクチンは、何百万もの死亡を防ぎ、感染症の蔓延を抑制する上で重要な役割を果たしてきました。ワクチンは、病気自体を引き起こすことなく、特定の病原体を認識し、それと戦うように免疫系を訓練することで機能します。</p>
      
      <h2>ワクチンの安全性テスト方法</h2>
      <p>ワクチンが使用承認を受ける前に、複数段階の臨床試験を通じて厳格なテストが行われます：</p>
      
      <ul>
        <li><strong>第1相：</strong>少人数のグループに試験的ワクチンを投与し、安全性と用量をテストします。</li>
        <li><strong>第2相：</strong>新しいワクチンが対象とする人々と類似した特性を持つ人々にワクチンを投与します。</li>
        <li><strong>第3相：</strong>数千人の人々にワクチンを投与し、その有効性を確認し、副作用を監視します。</li>
      </ul>
      
      <p>承認後も、様々な監視システムを通じてワクチンの安全性は継続的にモニタリングされます。</p>
      
      <h2>一般的な懸念への対応</h2>
      
      <h3>懸念1：ワクチンは自閉症を引き起こす</h3>
      <p>この主張は、現在撤回された1998年の研究に由来しています。その後、何百万人もの子どもを対象とした多数の研究が、ワクチンと自閉症の間に関連性がないことを発見しています。</p>
      
      <h3>懸念2：ワクチンには危険な成分が含まれている</h3>
      <p>ワクチンの成分は慎重に選ばれ、人間にとって安全な微量で使用されています。多くの成分は、ワクチンの安全性と有効性を確保するのに役立ちます。</p>
      
      <h3>懸念3：自然免疫はワクチンによる免疫よりも優れている</h3>
      <p>感染後に自然免疫は確かに発生しますが、病気の合併症のリスクはワクチン接種のリスクをはるかに上回ります。ワクチンは、病気自体の危険性なしに免疫を提供します。</p>
      
      <h2>集団免疫の役割</h2>
      <p>人口の大部分がワクチン接種を受けると、乳児や免疫不全者など、ワクチン接種を受けられない人々に間接的な保護を提供します。この概念は集団免疫として知られています。</p>
      
      <p>ワクチンの安全性と予防接種の重要性に関する事実を理解することで、個人と公衆の健康の両方を保護する情報に基づいた決定を下すことができます。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Health", "Medicine", "Science"],
    readingTime: 7,
    category: "health",
  },
  {
    slug: "digital-privacy-guide",
    title: "2023年のデジタルプライバシー総合ガイド",
    date: "2023-06-10",
    author: "Alex Rivera",
    excerpt:
      "ますます接続性の高い世界では、デジタルプライバシーの保護がこれまで以上に重要になっています。このガイドでは、オンラインで個人情報を保護するための実践的な手順を提供します。",
    content: `
      <h2>デジタルプライバシーが重要な理由</h2>
      <p>デジタルプライバシーとは、デジタル領域での個人情報の保護を指します。データ侵害や監視がより一般的になる中、個人情報の管理を維持し、身元盗難を防ぐために、プライバシーを保護する措置を講じることが不可欠です。</p>
      
      <h2>脅威を理解する</h2>
      <p>あなたの個人データに関心を持つ可能性のあるいくつかの団体：</p>
      
      <ul>
        <li><strong>広告主やマーケター</strong>：パーソナライズされた広告であなたをターゲットにしたい</li>
        <li><strong>ハッカーやサイバー犯罪者</strong>：金銭的利益のためにあなたの情報を盗もうとする</li>
        <li><strong>政府機関</strong>：監視を行う</li>
        <li><strong>データブローカー</strong>：あなたの情報を収集して販売する</li>
      </ul>
      
      <h2>プライバシーを保護するための実践的な手順</h2>
      
      <h3>1. アカウントを保護する</h3>
      <ul>
        <li>各アカウントに強力でユニークなパスワードを使用する</li>
        <li>可能な限り二要素認証を有効にする</li>
        <li>認証情報を追跡するためにパスワードマネージャーを使用する</li>
      </ul>
      
      <h3>2. 安全にブラウジングする</h3>
      <ul>
        <li>プライバシー重視のブラウザまたはブラウザ拡張機能を使用する</li>
        <li>インターネット接続を暗号化するためにVPNの使用を検討する</li>
        <li>定期的にCookieとブラウジング履歴をクリアする</li>
      </ul>
      
      <h3>3. ソーシャルメディアに注意する</h3>
      <ul>
        <li>すべてのプラットフォームでプライバシー設定を確認し調整する</li>
        <li>共有する個人情報を制限する</li>
        <li>アカウントへのアクセスを要求するサードパーティアプリに注意する</li>
      </ul>
      
      <h3>4. デバイスを保護する</h3>
      <ul>
        <li>ソフトウェアとオペレーティングシステムを最新の状態に保つ</li>
        <li>機密データに暗号化を使用する</li>
        <li>信頼性の高いセキュリティソフトウェアをインストールする</li>
      </ul>
      
      <h2>利便性とプライバシーのバランスを取る</h2>
      <p>利便性とプライバシーの適切なバランスを見つけることは個人的な決断です。一部の人々は最大限のプライバシーを優先するかもしれませんが、他の人々はパーソナライズされたサービスと引き換えにある程度のデータ収集を受け入れるかもしれません。重要なのは、デジタルフットプリントについて情報に基づいた選択をすることです。</p>
      
      <p>これらの戦略を実施することで、デジタルプライバシーを大幅に強化し、デジタル時代に個人情報の管理を取り戻すことができます。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Technology", "Privacy", "Security"],
    readingTime: 6,
    category: "technology",
  },
  {
    slug: "sustainable-eating",
    title: "持続可能な食事：あなたの食の選択が地球に与える影響",
    date: "2023-07-05",
    author: "Sophia Martinez",
    excerpt:
      "私たちが食べる食品は環境に大きな影響を与えます。この記事では、持続可能な食の選択がどのようにエコロジカルフットプリントを減らすのに役立つかを探ります。",
    content: `
      <h2>食品の環境への影響</h2>
      <p>食品生産は世界の温室効果ガス排出量の約26%を占めています。また、森林破壊、水不足、生物多様性の喪失にも寄与しています。より持続可能な食の選択をすることで、これらの環境への影響を軽減するのに役立ちます。</p>
      
      <h2>食品のカーボンフットプリントを理解する</h2>
      <p>異なる食品は様々な環境への影響を持っています：</p>
      
      <ul>
        <li>動物性食品、特に牛肉と羊肉は、一般的に最も高いカーボンフットプリントを持っています</li>
        <li>植物性食品は通常、より低いカーボンフットプリントを持っています</li>
        <li>地元で栽培された季節の農産物は、通常、輸送と保管のためのエネルギーが少なくて済みます</li>
      </ul>
      
      <h2>持続可能な食事のための実践的な手順</h2>
      
      <h3>1. 食品廃棄物を減らす</h3>
      <p>世界で生産される食品の約3分の1が廃棄されています。食品廃棄物を減らすことは、環境への影響を減らす最も効果的な方法の一つです：</p>
      <ul>
        <li>食事を計画し、買い物リストを作成する</li>
        <li>食品を適切に保存して寿命を延ばす</li>
        <li>残り物を創造的に使用する</li>
        <li>可能な場合は食品スクラップをコンポスト化する</li>
      </ul>
      
      <h3>2. より多くの植物を食べる</h3>
      <p>食事における植物性食品の割合を増やすことで、環境フットプリントを大幅に削減できます：</p>
      <ul>
        <li>「ミートレスマンデー」や他の植物ベースの日を実施してみる</li>
        <li>新しい植物ベースのレシピや食材を探索する</li>
        <li>動物性食品を食べる場合は、環境への影響が少ないものを選ぶ</li>
      </ul>
      
      <h3>3. 持続可能なシーフードを選ぶ</h3>
      <p>シーフードを食べる場合は、持続可能に収穫されたオプションを探しましょう：</p>
      <ul>
        <li>シーフードガイドやアプリを使用して持続可能な選択肢を特定する</li>
        <li>MSC（海洋管理協議会）などの認証を探す</li>
        <li>責任ある運営からの養殖シーフードを検討する</li>
      </ul>
      
      <h3>4. 可能な限り地元産と季節のものを購入する</h3>
      <p>地元で栽培された季節の食品を購入することで、輸送による排出量を削減し、地域経済をサポートできます：</p>
      <ul>
        <li>ファーマーズマーケットで買い物をする</li>
        <li>地域支援型農業（CSA）プログラムに参加する</li>
        <li>可能であれば自分で食品の一部を栽培する</li>
      </ul>
      
      <h2>栄養と持続可能性のバランスを取る</h2>
      <p>持続可能な選択をしながら、食事が栄養的に適切であることを確保することが重要です。登録栄養士に相談することで、あなたの栄養ニーズを満たす持続可能な食事計画を開発するのに役立ちます。</p>
      
      <p>より持続可能な食の選択をすることで、おいしく栄養価の高い食事を楽しみながら、環境への影響を減らすことができます。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Food", "Environment", "Sustainability"],
    readingTime: 5,
    category: "environment",
  },
  {
    slug: "artificial-intelligence-explained",
    title: "人工知能の解説：誇大宣伝を超えて",
    date: "2023-08-12",
    author: "Dr. James Wilson",
    excerpt:
      "人工知能は私たちの世界を変革していますが、それが何をできて何をできないかについては多くの混乱があります。この記事では、AIとその実世界での応用について明確な説明を提供します。",
    content: `
      <h2>人工知能とは何か？</h2>
      <p>人工知能（AI）とは、通常は人間の知能を必要とするタスクを実行するように設計されたコンピュータシステムを指します。これらのタスクには、学習、推論、問題解決、知覚、言語理解などが含まれます。</p>
      
      <h2>AIの種類</h2>
      <p>AIはいくつかの方法で分類できます：</p>
      
      <h3>狭いAI vs 汎用AI</h3>
      <ul>
        <li><strong>狭いAI</strong>（または弱いAI）は、音声認識やチェスのプレイなど、特定のタスク用に設計されています。現在のAIシステムはすべて狭いAIです。</li>
        <li><strong>汎用AI</strong>（または強いAI）は、人間の知能と同様に、幅広いタスクにわたって理解し、学習し、知識を適用する能力を持つでしょう。これは理論的なままです。</li>
      </ul>
      
      <h3>機械学習とディープラーニング</h3>
      <p>機械学習（ML）はAIのサブセットで、システムが明示的にプログラムされることなく、データから学習し、経験から改善することを可能にします。ディープラーニングはMLの特殊な形式で、データのさまざまな要素を分析するために多くの層（したがって「ディープ」）を持つニューラルネットワークを使用します。</p>
      
      <h2>AIの実世界での応用</h2>
      
      <h3>ヘルスケア</h3>
      <ul>
        <li>医療画像からの疾患の診断</li>
        <li>患者の転帰の予測</li>
        <li>薬の発見と開発</li>
      </ul>
      
      <h3>交通</h3>
      <ul>
        <li>自動運転車</li>
        <li>交通予測と管理</li>
        <li>配送ルートの最適化</li>
      </ul>
      
      <h3>ビジネスと金融</h3>
      <ul>
        <li>カスタマーサービスチャットボット</li>
        <li>不正検出</li>
        <li>市場分析と予測</li>
      </ul>
      
      <h2>限界と課題</h2>
      <p>その能力にもかかわらず、AIには重要な限界があります：</p>
      
      <ul>
        <li><strong>データ依存性：</strong>AIシステムは効果的に機能するために大量の高品質なデータを必要とします。</li>
        <li><strong>常識の欠如：</strong>AIは本当に文脈を理解したり、常識的な推論を持ったりしません。</li>
        <li><strong>バイアスと公平性：</strong>AIシステムはトレーニングデータに存在するバイアスを永続させたり増幅したりする可能性があります。</li>
        <li><strong>説明可能性：</strong>多くの高度なAIシステムは「ブラックボックス」として機能し、どのように結論に達したかを理解するのが難しくなります。</li>
      </ul>
      
      <h2>AIの未来</h2>
      <p>AIが進化し続けるにつれて、以下のことが期待できます：</p>
      
      <ul>
        <li>より洗練された自然言語処理と生成</li>
        <li>コンピュータビジョンと知覚の進歩</li>
        <li>日常のデバイスやサービスへのAIのより大きな統合</li>
        <li>倫理的なAI開発と規制へのより大きな焦点</li>
      </ul>
      
      <p>AIが実際に何であるか—誇大宣伝やSF的な描写を超えて—を理解することで、その実際の能力、限界、社会への潜在的な影響をより良く理解することができます。</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    tags: ["Technology", "AI", "Science"],
    readingTime: 7,
    category: "technology",
  },
]

export function getAllPosts(): Post[] {
  // Sort posts by date in descending order
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(count = 3): Post[] {
  // Get featured posts or just the most recent ones if not enough featured
  const featured = posts.filter((post) => post.featured)
  const sorted = [...featured].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sorted.length >= count) {
    return sorted.slice(0, count)
  }

  // If not enough featured posts, add recent non-featured posts
  const nonFeatured = posts
    .filter((post) => !post.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return [...sorted, ...nonFeatured].slice(0, count)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getPostsByTag(tag: string): Post[] {
  return posts
    .filter((post) => post.tags?.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(post: Post, count = 3): Post[] {
  // Get posts with similar tags or category
  const relatedByTags = posts.filter(
    (p) => p.slug !== post.slug && p.tags && post.tags && p.tags.some((tag) => post.tags.includes(tag)),
  )

  const relatedByCategory = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category && !relatedByTags.includes(p),
  )

  // Combine and sort by date
  const related = [...relatedByTags, ...relatedByCategory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return related.slice(0, count)
}
