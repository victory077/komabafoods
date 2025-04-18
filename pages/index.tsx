import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { ProductFrontmatter } from '../types/product';
import { GetStaticProps, NextPage } from 'next';

interface HomePageProps {
  products: {
    frontmatter: ProductFrontmatter;
    slug: string;
  }[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'products'));
  const products = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), 'products', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      frontmatter: frontmatter as ProductFrontmatter,
      slug: filename.replace('.md', ''),
    };
  });

  return {
    props: {
      products,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <div>
      <h1>商品一覧</h1>
      <ul>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`}>
              {product.frontmatter.image && (
                <Image
                  src={product.frontmatter.image}
                  alt={product.frontmatter.title}
                  width={150}
                  height={100}
                />
              )}
              <h3>{product.frontmatter.title}</h3>
              <p>{product.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;