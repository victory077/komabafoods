import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Boardgame } from '../../types/boardgame';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link'; // ★ Linkコンポーネントをインポート

interface BoardgamePageProps {
  boardgame: Boardgame;
}

// ページコンポーネントを修正
const BoardgamePage: NextPage<BoardgamePageProps> = ({ boardgame }) => {
  return (
    <article> {/* articleタグなどにすると、より意味的に適切になります */}
      <h1>{boardgame.frontmatter.title}</h1>
      <p>プレイ人数: {boardgame.frontmatter.players || '情報なし'}</p>
      <p>プレイ時間: {boardgame.frontmatter.playtime || '情報なし'}</p>

      {/* ★★★ Amazonリンクボタンを追加 ★★★ */}
      {/* frontmatterにamazon_linkが設定されている場合のみ表示されます */}
      {boardgame.frontmatter.amazon_link && (
        <p>
          <a
            href={boardgame.frontmatter.amazon_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 20px',
              backgroundColor: '#ff9900', // Amazon風のカラー
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Amazonで見る
          </a>
        </p>
      )}

      <hr />
      
      {/* Markdownから変換したHTML本文 */}
      <div dangerouslySetInnerHTML={{ __html: boardgame.html }} />

      <hr style={{ marginTop: '2rem', marginBottom: '1rem' }} />

      <Link
        href="/boardgames"
        style={{ textDecoration: 'underline', color: 'blue' }}
      >
        &laquo; ボードゲーム一覧に戻る
      </Link>
    </article>
  );
};

export default BoardgamePage;


// (1) getStaticPaths: どのslugのページをビルド時に生成するかを決定
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'boardgames'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false, // pathsに含まれないページは404にする
  };
};

// (2) getStaticProps: 各ページに必要なデータを取得
export const getStaticProps: GetStaticProps<BoardgamePageProps> = async (context) => {
  const slug = context.params?.slug as string;
  
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), 'boardgames', `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Markdownの本文(content)をHTMLに変換
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      boardgame: {
        slug,
        frontmatter: frontmatter as Boardgame['frontmatter'],
        html: contentHtml,
      },
    },
  };
};