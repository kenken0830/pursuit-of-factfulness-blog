try {
  console.log("any-ascii ライブラリのテスト（全出力）：");
  console.log("-----------------------");

  // モジュールをロード
  console.log("モジュールのロード中...");
  const anyAsciiModule = require('any-ascii');
  console.log("モジュールのロード完了");
  console.log("モジュールの型:", typeof anyAsciiModule);
  console.log("モジュールの内容:", JSON.stringify(anyAsciiModule, null, 2));

  // default エクスポートを取得
  console.log("\ndefault エクスポートを取得:");
  const anyAscii = anyAsciiModule.default;
  console.log("default の型:", typeof anyAscii);

  // テストフレーズ
  const testPhrases = [
    "最適化テスト記事",
    "AIニュース速報",
    "Minimal Test"
  ];

  // 直接実行テスト
  if (typeof anyAscii === 'function') {
    console.log("\nanyAscii 関数でテスト実行:");
    
    testPhrases.forEach(phrase => {
      try {
        const result = anyAscii(phrase);
        console.log(`"${phrase}" → "${result}"`);
      } catch (error) {
        console.error(`"${phrase}" の変換中にエラー: ${error.message}`);
        console.error(error);
      }
    });
  } else {
    console.log("\nanyAscii は関数ではありません");
  }

  // インポート形式を変えてテスト
  console.log("\n別のインポート形式でテスト:");
  try {
    const anyAscii2 = require('any-ascii').default;
    console.log("anyAscii2 の型:", typeof anyAscii2);
    
    if (typeof anyAscii2 === 'function') {
      const testResult = anyAscii2("テスト");
      console.log(`変換結果: "${testResult}"`);
    } else {
      console.log("anyAscii2 は関数ではありません");
    }
  } catch (error) {
    console.error("別インポート形式でエラー:", error.message);
  }

} catch (error) {
  console.error("テスト全体でエラーが発生しました:");
  console.error(error);
} 