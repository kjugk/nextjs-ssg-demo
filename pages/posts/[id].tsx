import { FunctionComponent } from "react";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { HttpClient } from "../../lib/http/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new HttpClient();
  const res = await client.get<{ contents: Post[] }>("posts");

  return {
    paths: res.data.contents.map((p) => ({ params: { id: p.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const client = new HttpClient();
  const id = context.params.id as string;
  const res = await client.get<Post>(`posts/${id}`);

  return {
    props: {
      post: res.data,
    },
    revalidate: 20,
  };
};

const Post: FunctionComponent<{ post: Post }> = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (post === undefined) {
    return (
      <div className="page">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{post.title}</h1>
      <p>
        このページは Next.js アプリケーションのビルド時に Static Generation
        されています。
        <br />
        getStaticPaths で fallback: true
        を指定しているので、ビルド後に生成された記事でも、初回リクエスト時のみHTMLを生成します。
      </p>

      <Link href="/posts">
        <a>記事一覧</a>
      </Link>
    </div>
  );
};

export default Post;
