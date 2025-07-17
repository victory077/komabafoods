// pages/boardgames/index.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head'; // Headをインポート
import { BoardgameFrontmatter } from '../../types/boardgame';
import { GetStaticProps, NextPage } from 'next';

interface BoardgamesPageProps {
  boardgames: {
    frontmatter: BoardgameFrontmatter;
    slug: string;
  }[];
}

// getStaticPropsは変更なし
export const getStaticProps: GetStaticProps<BoardgamesPageProps> = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'boardgames'));

  const boardgames = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), 'boardgames', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      frontmatter: frontmatter as BoardgameFrontmatter,
      slug: filename.replace('.md', ''),
    };
  });

  return {
    props: {
      boardgames,
    },
  };
};

const BoardgamesPage: NextPage<BoardgamesPageProps> = ({ boardgames }) => {
  return (
    <>
      <Head>
        <title>Boardgame Collection | Victoire's Portfolio</title>
        <meta name="description" content="Victoireのボードゲームコレクション一覧です。" />
      </Head>

      <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* --- ヘッダー --- */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-4">
              Boardgame Collection
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              個人的に好きなボードゲームのコレクションです。各カードをクリックすると詳細が見られます。
            </p>
          </header>

          {/* --- ボードゲームグリッド --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardgames.map((boardgame) => (
              <Link
                href={`/boardgames/${boardgame.slug}`}
                key={boardgame.slug}
                className="group block bg-slate-800/50 rounded-lg overflow-hidden border-2 border-slate-700
                           transition-all duration-300 ease-in-out
                           hover:border-purple-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* --- 画像エリア --- */}
                <div className="relative w-full aspect-video">
                  {boardgame.frontmatter.image ? (
                    <Image
                      src={boardgame.frontmatter.image}
                      alt={boardgame.frontmatter.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                      <p className="text-slate-500">No Image</p>
                    </div>
                  )}
                </div>

                {/* --- テキストエリア --- */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-purple-300 mb-2 truncate">
                    {boardgame.frontmatter.title}
                  </h3>
                  <p className="text-slate-400 text-sm h-10 overflow-hidden">
                    {boardgame.frontmatter.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

           {/* --- 戻るボタン --- */}
           <div className="text-center mt-12">
              <Link href="/"
                className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-6 rounded-md transition duration-300"
              >
                ポートフォリオに戻る
              </Link>
           </div>
        </div>
      </main>
    </>
  );
};

export default BoardgamesPage;