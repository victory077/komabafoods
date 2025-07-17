import type { NextPage } from 'next';
import Head from 'next/head';
import Portfolio from './components/portfolio';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Victoire's Portfolio</title>
        <meta name="description" content="Victoireのポートフォリオサイトです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Portfolio />
      </main>
    </>
  );
};

export default HomePage;