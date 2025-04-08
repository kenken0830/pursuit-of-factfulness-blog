// title: 記事のタイトル
// category: ai-news
// date: 2025-04-07
// coverImage: /images/your-image.jpg
// description: 記事の説明文

export default function Article() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>記事のタイトル</h1>
      
      <p>
        ここに記事の内容を書きます。
      </p>
      
      {/* 画像の例 */}
      {/* <img src="/images/your-image.jpg" alt="画像の説明" /> */}
      
      {/* コードブロックの例 */}
      {/* ```python
      print("Hello, World!")
      ``` */}
    </article>
  );
} 