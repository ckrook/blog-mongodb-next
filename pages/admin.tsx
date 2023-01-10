import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { fetcher } from "../lib/helpers";
import useSWR from "swr";

export default function admin({ session }: { session: any }) {
  const { data: posts } = useSWR("/api/posts", fetcher, { refreshInterval: 1 });
  const [postsData, setPostsData] = useState(posts as any);
  const [filteredPosts, setFilteredPosts] = useState(posts as any);

  // console.log(posts);

  // console.log(posts.author.email, session.user.email);

  // useEffect(() => {
  //   setFilteredPosts(postsData?.filter((post: any) => post.author.email === session.user.email));
  // }, [posts]);

  // console.log("filtered ", filteredPosts);

  return (
    <Layout>
      <main className="container">
        <PostForm session={session} />
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
