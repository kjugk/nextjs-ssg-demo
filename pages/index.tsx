import React, { FunctionComponent } from "react";
import Link from "next/link";

const Home: FunctionComponent = () => {
  return (
    <div className="page">
      <h1>Next.js Static Generation Demo</h1>
      <p>
        このページは Next.js アプリケーションのビルド時に Static Generation
        されています。
        <br />
        依存する外部データを持たないので、次回のビルドまでこのページは再生成されません。
      </p>

      <ul>
        <li>
          <Link href="/posts">
            <a>記事一覧(Static Rendering)</a>
          </Link>
        </li>
        <li>
          <Link href="/ssr/posts">
            <a>記事一覧(Server-side Rendering)</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
