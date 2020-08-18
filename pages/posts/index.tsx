import { FunctionComponent } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { HttpClient } from "../../lib/http/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async (
  context
) => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page">
      <h1>記事一覧</h1>
      <ul>
        {posts.map((p, i) => (
          <li key={i}>
            <Link href="/posts[id]" as={`/post/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
