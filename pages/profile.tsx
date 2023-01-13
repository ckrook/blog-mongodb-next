import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import AuthCheck from "../components/AuthCheck";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import { getUsersPosts } from "../hooks/posts";

export default function profile({ session, posts }: any) {
  return (
    <Layout>
      <AuthCheck>
        <Head>
          <title>Blog platform - Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container py-20 grid grid-cols-3 gap-5">
          <main className=" col-span-2">
            <h2 className="text-3xl mb-4">My blogposts</h2>
            <PostList posts={posts} />
          </main>
          <aside>
            <div className="mt-14">
              <img src={session?.user?.image} className="rounded-full " alt="Avatar" />
              <p>{session?.user?.name}</p>
            </div>
          </aside>
        </div>
      </AuthCheck>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const posts = await getUsersPosts(session);

  return {
    props: { session, posts },
  };
}
