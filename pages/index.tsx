import type { NextPage } from 'next';
import Link from 'next/link';

const PersonalHomePage: NextPage = () => {
  return (
    <div>
      <h1>Victoireの個人サイトです。</h1>
      <p>
        こんにちは。Victoireです。普段はインフラエンジニアをしています。
        ここでは、自分が作ったものや好きなものを紹介しながら技術力を練習していきたいと思います。
      </p>

      <section>
        <h2>作ったもの・好きなもの</h2>
        <ul>
          {/* <li>
            <Link href="/products">商品紹介</Link>
          </li> */}
          <li>
            <Link href="/boardgames">おすすめボードゲーム紹介</Link>
          </li>
          {/* <li>
            <Link href="/games">おすすめゲーム紹介</Link>
          </li>
          <li>
            <Link href="/komaba">駒場のご飯紹介</Link>
          </li>
          <li>
            <Link href="/about">自己紹介</Link>
          </li> */}
        </ul>
      </section>
    </div>
  );
};

export default PersonalHomePage;