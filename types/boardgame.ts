// types/boardgame.ts

export type BoardgameFrontmatter = {
    title: string;
    image?: string; // サムネイル画像
    description: string; // 一覧ページで表示する一言説明
    // ボドゲ特有の情報を追加できます
    players?: string; // 例: プレイ人数
    playtime?: string; // 例: プレイ時間
    amazon_link?: string; // Amazonなどの商品リンク
  };
  
  // 詳細ページで使う、本文(html)を含む型
  export type Boardgame = {
    frontmatter: BoardgameFrontmatter;
    html: string;
    slug: string;
  };