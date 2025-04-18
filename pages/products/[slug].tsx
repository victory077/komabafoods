import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductFrontmatter } from '../../types/product';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// getStaticPathsの型定義
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'products'));
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

// getStaticPropsの型定義
export const getStaticProps: GetStaticProps<{
  frontmatter: ProductFrontmatter;
  html: string;
  slug: string;
}, { slug: string }> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), 'products', `${params.slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const html = await marked(content);

  // frontmatterの型をProductFrontmatterとしてアサート
  return {
    props: {
      frontmatter: frontmatter as ProductFrontmatter,
      html,
      slug: params.slug,
    },
  };
};

// ProductPageコンポーネントの型定義
interface ProductPageProps {
  frontmatter: ProductFrontmatter;
  html: string;
  slug: string;
}

const ProductPage: NextPage<ProductPageProps> = ({ frontmatter, html, slug }) => {
  return (
    <div>
      <Link href="/">
        トップページに戻る
      </Link>
      <h1>{frontmatter.title}</h1>
      {frontmatter.image && (
        <Image src={frontmatter.image} alt={frontmatter.title} width={500} height={300} />
      )}
      <p>{frontmatter.description}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <a
        href={frontmatter.amazon_link}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Amazonで見る
      </a>
    </div>
  );
};

export default ProductPage;