import { FunctionComponent } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { HttpClient } from "../../lib/http/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const client = new HttpClient();
  const res = await client.get<{ contents: Post[] }>("posts");

  return {
    props: {
      posts: res.data.contents,
    },
    revalidate: 20,
  };
};

const Post: FunctionComponent<{ posts: Post[] }> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page">
      <h1>記事一覧(Static Generation)</h1>
      <p>
        このページは Next.js アプリケーションのビルド時に Static Generation
        されています。
        <br />
        getStaticProps の戻り値で revalidate: 20
        を指定しているので、キャッシュされてから20秒経過しているかつ、コンテンツに変更があれば、ページを再生成します。
      </p>
      <ul>
        {posts.map((p, i) => (
          <li key={i}>
            <Link href="/posts[id]" as={`/posts/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <a
        href="https://github.com/kjugk/nextjs-ssg-demo"
        target="_blank"
        rel="noopener"
      >
        source code
      </a>
    </div>
  );
};

export default Post;
