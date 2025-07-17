// pages/boardgames/[slug].tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Boardgame } from '../../types/boardgame';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

interface BoardgamePageProps {
  boardgame: Boardgame;
}

const BoardgamePage: NextPage<BoardgamePageProps> = ({ boardgame }) => {
  const { frontmatter, html: contentHtml } = boardgame;

  return (
    <>
      <Head>
        <title>{frontmatter.title} | Boardgame Collection</title>
        <meta name="description" content={frontmatter.description} />
      </Head>

      <main className="min-h-screen bg-slate-900 text-white py-8 md:py-12">
        <article className="w-full max-w-4xl mx-auto px-4">
          
          {/* --- ゲーム画像 (あれば表示) --- */}
          {frontmatter.image && (
            <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-8 shadow-2xl shadow-black/30">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                layout="fill"
                objectFit="cover"
                priority // ページのメイン画像なので優先的に読み込む
              />
            </div>
          )}

          {/* --- タイトルとメタデータ --- */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-4">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400">
              {frontmatter.players && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                  <span>{frontmatter.players}</span>
                </div>
              )}
              {frontmatter.playtime && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  <span>{frontmatter.playtime}</span>
                </div>
              )}
            </div>
          </header>

          {/* --- Amazonリンクボタン --- */}
          {frontmatter.amazon_link && (
            <div className="mb-8">
              <a
                href={frontmatter.amazon_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                <span>Amazonで見る</span>
              </a>
            </div>
          )}
          
          <hr className="border-slate-700" />

          {/* --- 本文 (Markdown) --- */}
          <div
            className="markdown-body mt-8"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* --- 戻るリンク --- */}
          <div className="text-center mt-12">
            <Link href="/boardgames"
              className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              &laquo; ボードゲーム一覧に戻る
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default BoardgamePage;

// --- データ取得ロジック (変更なし) ---
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'boardgames'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BoardgamePageProps> = async (context) => {
  const slug = context.params?.slug as string;
  
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), 'boardgames', `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

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