import { FunctionComponent } from "react";
import { InferGetStaticPropsType, GetServerSideProps } from "next";
import { HttpClient } from "../../../lib/http/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export const getServerSideProps: GetServerSideProps<{
  posts: Post[];
}> = async () => {
  const client = new HttpClient();
  const res = await client.get<{ contents: Post[] }>("posts");

  return {
    props: {
      posts: res.data.contents,
    },
  };
};

const Post: FunctionComponent<{ posts: Post[] }> = ({
  posts,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <div className="page">
      <h1>記事一覧(SSR)</h1>
      <p>
        このページは Next.js で Server-side Rendering
        されています。リクエストの度に、API からデータを取得しています。
      </p>
      <ul>
        {posts.map((p, i) => (
          <li key={i}>
            <Link href="/ssr/posts[id]" as={`/ssr/posts/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
