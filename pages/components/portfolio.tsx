// components/portfolio.tsx
 
import { useState, useMemo } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- データ定義 ---

// スキルレベル (0-10)
const skillLevels = {
  Unity: 10,
  React: 4, // 1年以上なので4/10程度に設定
  Python: 8, // 7年以上なので8/10程度に設定
  DB: 6, // Django/FastAPI経験から中級レベルと想定
  AWS: 3, // 基礎レベルなので3/10程度に設定
};

// タブのコンテンツ
const tabContents = {
  Unity: {
    title: "Unity | Client & Game Development",
    content: "10年以上にわたるUnityでのゲーム開発経験を主軸に、C#を用いたクライアント開発全般に精通。特に、UniRxやUniTaskを活用したリアクティブプログラミングによる複雑な非同期処理の実装や、保守性と拡張性を見据えたアーキテクチャ設計を得意としています。Photonを用いたマルチプレイヤーゲームの開発経験もあり、リアルタイム通信における技術的課題解決やパフォーマンスチューニングにおいて、プロジェクトに大きく貢献できます。また、以下の謎解き公演においてゲーム内システムの実装を担当・納品いたしました。",
    images: [
      { src: "/images/unity/unity1.jpg", alt: "Unity作品1" },
      { src: "/images/unity/unity2.jpg", alt: "Unity作品2" },
    ]
  },
  Python: {
    title: "Python | Server-side & Machine Learning",
    content: "サーバーサイド開発では7年以上にわたり、Pythonを用いてDjangoやFastAPIといったフレームワークを駆使し、スケーラブルなWeb APIの設計・開発を行ってきました。さらに、Scikit-learnライブラリを用いた機械学習モデルの実装経験もあり、ゲームから得られる膨大なデータを分析し、ユーザー体験の向上やサービスの改善に繋げる提案が可能です。",
    images: []
  },
  React: {
    title: "React/Next.js | Frontend Development",
    content: "このポートフォリオサイト自体が、私のReactおよびNext.jsにおける制作物です。コンポーネントベースの設計、状態管理（useState）、ファイルベースルーティング、API連携といったNext.jsの主要な機能を活用して構築しました。ユーザー体験を意識したインタラクティブなUI/UXの実装に関心があります。",
    images: []
  },
  DB: {
    title: "Database | Schema Design & ORM",
    content: "DjangoのORM（Object-Relational Mapper）やFastAPIと連携したSQLAlchemyを通じ、PostgreSQLやMySQLといったリレーショナルデータベースの設計・運用経験があります。ゲームのユーザーデータ、アイテム、ランキングといった複雑な情報を管理するための正規化されたテーブル設計や、パフォーマンスを考慮したインデックスの最適化、クエリチューニングを行うことができます。",
    images: []
  },
  AWS: {
    title: "AWS/CI-CD | Cloud Infrastructure",
    content: "このWebサイトのインフラはAWS上に構築されており、私自身の知識と実践の証明です。具体的には、GitHub Actionsを用いてCI/CDパイプラインを構築。mainブランチへのマージをトリガーにNext.jsのアプリケーションをビルドし、生成された静的ファイルを自動でS3バケットにデプロイします。最終的に、そのS3コンテンツをCloudFront経由で高速かつセキュアに全世界へ配信しています。",
    images: []
  }
};

type Skill = keyof typeof skillLevels;


// --- SVGペンタゴンコンポーネント ---
const SkillPentagon: FC = () => {
  const points = useMemo(() => {
    const center = 100;
    const radius = 80;
    const labels: { name: Skill; x: number; y: number }[] = [];
    const skillPath: string[] = [];

    const skillKeys = Object.keys(skillLevels) as Skill[];

    skillKeys.forEach((skill, i) => {
      const angle = (Math.PI / 180) * (i * 72 - 90); // 72度ずつ回転 (-90度で上から開始)
      const level = skillLevels[(skill as Skill)];
      const currentRadius = radius * (level / 10);

      const x = center + currentRadius * Math.cos(angle);
      const y = center + currentRadius * Math.sin(angle);
      skillPath.push(`${x},${y}`);

      // ラベルの位置
      const labelRadius = radius + 20;
      const labelX = center + labelRadius * Math.cos(angle);
      const labelY = center + labelRadius * Math.sin(angle);
      labels.push({ name: skill, x: labelX, y: labelY });
    });

    return { skillPath: skillPath.join(' '), labels };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto"> {/* ペンタゴンが見切れないように親要素の幅を調整 */}
      <svg viewBox="-20 -20 240 240">
        {/* 背景のグリッド線 */}
        <polygon points="100,20 172.5,65 142.5,155 57.5,155 27.5,65" fill="none" stroke="#374151" strokeWidth="1" />
        <line x1="100" y1="100" x2="100" y2="20" stroke="#374151" strokeWidth="1" />
        <line x1="100" y1="100" x2="172.5" y2="65" stroke="#374151" strokeWidth="1" />
        <line x1="100" y1="100" x2="142.5" y2="155" stroke="#374151" strokeWidth="1" />
        <line x1="100" y1="100" x2="57.5" y2="155" stroke="#374151" strokeWidth="1" />
        <line x1="100" y1="100" x2="27.5" y2="65" stroke="#374151" strokeWidth="1" />

        {/* スキルレベルのポリゴン */}
        <polygon points={points.skillPath} fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2" />

        {/* ラベル */}
        {points.labels.map(({ name, x, y }) => (
          <text key={name} x={x} y={y} fill="#d1d5db" fontSize="12" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
            {name}
          </text>
        ))}
      </svg>
    </div>
  );
};


// --- メインのポートフォリオコンポーネント ---
const Portfolio: FC = () => {
  const [activeTab, setActiveTab] = useState<Skill>('Unity');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* --- 上段: 自己紹介 & スキルグラフ --- */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
            Full-stack Game Engineer
          </h1>
          <p className="text-slate-300 leading-relaxed">
            10年以上のUnity開発経験と7年以上のPython/サーバーサイド経験を掛け合わせ、クライアントからインフラまで一気通貫で価値を提供できるエンジニアを目指しています。
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            <a
              href="https://github.com/victory077"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center"> {/* Flexで中央寄せ */}
          <SkillPentagon />
        </div>
      </div>

      {/* --- 下段: タブUI --- */}
      <div>
        {/* タブボタン */}
        <div className="flex border-b border-slate-700 mb-4 flex-wrap">
          {(Object.keys(tabContents) as Skill[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-semibold border-b-2 transition-colors duration-300 ease-in-out
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
                }`
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* タブコンテンツ */}
        <div className="p-4 bg-slate-800/50 rounded-lg min-h-[20rem] animate-fade-in">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">{tabContents[(activeTab as Skill)].title}</h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {tabContents[(activeTab as Skill)].content}
            </p>

            {/* Unityの画像表示エリア */}
            {activeTab === 'Unity' && tabContents.Unity.images.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">制作に関わった物</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tabContents.Unity.images.map(image => (
                    <div key={image.src} className="rounded-lg overflow-hidden border-2 border-slate-700">
                      <Image src={image.src} alt={image.alt} width={400} height={225} layout="responsive" />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="mt-12 p-4 bg-slate-800/50 rounded-lg">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">好きなもの</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            ゲーム開発以外にも熱中しているものがあります。それはボードゲームです！
            複雑なルールを理解し、戦略を練り、時には運も味方につけながら勝利を目指すのがたまらなく好きです。
            コレクションも少しずつ増えてきました。
          </p>
          <Link href="/boardgames" className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2z" clipRule="evenodd" />
            </svg>
            ボードゲーム紹介ページへ
          </Link>
        </div>
    </div>
  );
};

export default Portfolio;