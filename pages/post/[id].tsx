import { FunctionComponent } from "react";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { HttpClient } from "../../lib/http/client";

interface Post {
  id: string;
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new HttpClient();
  const res = await client.get<{ contents: Post[] }>("posts");

  return {
    paths: res.data.contents.map((p) => ({ params: { id: p.id } })),
    fallback: false,
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
  };
};

const Post: FunctionComponent<{ post: Post }> = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default Post;
