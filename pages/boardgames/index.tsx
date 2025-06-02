import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { BoardgameFrontmatter } from '../../types/boardgame';
import { GetStaticProps, NextPage } from 'next';

interface BoardgamesPageProps {
  boardgames: {
    frontmatter: BoardgameFrontmatter;
    slug: string;
  }[];
}

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
    <div>
      <h1>ボードゲーム一覧</h1>
      <ul>
        {boardgames.map((boardgame) => (
          <li key={boardgame.slug}>
            <Link href={`/boardgames/${boardgame.slug}`}>
              {boardgame.frontmatter.image && (
                <Image
                  src={boardgame.frontmatter.image}
                  alt={boardgame.frontmatter.title}
                  width={150}
                  height={100}
                />
              )}
              <h3>{boardgame.frontmatter.title}</h3>
              <p>{boardgame.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardgamesPage;