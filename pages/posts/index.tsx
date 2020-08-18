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
    revalidate: 5,
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
        getStaticProps の戻り値で revalidate: 5
        を指定しているので、前回生成時から5秒経過しているかつ、コンテンツに変更があれば、ページを再描画します。
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
    </div>
  );
};

export default Post;
