import { FunctionComponent } from "react";
import { InferGetStaticPropsType, GetServerSideProps } from "next";
import { HttpClient } from "../../../lib/http/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export const getServerSideProps: GetServerSideProps<{ post: Post }> = async (
  context
) => {
  const client = new HttpClient();
  const id = context.params.id as string;
  const res = await client.get<Post>(`posts/${id}`);

  return {
    props: {
      post: res.data,
    },
  };
};

const Post: FunctionComponent<{ post: Post }> = ({
  post,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <div className="page">
      <h1>{post.title}</h1>
      <p>
        このページは Next.js で Server-side Rendering
        されています。リクエストの度に、API からデータを取得しています。
      </p>

      <Link href="/ssr/posts">
        <a>記事一覧</a>
      </Link>
    </div>
  );
};

export default Post;
