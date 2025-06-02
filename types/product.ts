// types/product.ts
export type ProductFrontmatter = {
    title: string;
    slug: string;
    image?: string; // 画像は必須ではない場合もあるので ? をつける
    description: string;
    amazon_link: string;
  };
  
  export type Product = {
    frontmatter: ProductFrontmatter;
    html: string;
    slug: string;
  };