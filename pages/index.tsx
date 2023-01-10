import Head from "next/head";
import clientPromise from "../lib/mongodb";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import useSWR from "swr";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import AccessDenied from "../components/AccessDenied";
import { useEffect } from "react";
import { fetcher } from "../lib/helpers";

function createUserInDatabaseIfNotExists(session: any) {
  if (session) {
    fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      }),
    });
  }
}

export default function Home({ session }: any) {
  const { data: posts } = useSWR("/api/posts", fetcher, { refreshInterval: 1 });

  useEffect(() => {
    createUserInDatabaseIfNotExists(session);
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>MERN blog app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="my-10">
          <div className="flex justify-between mb-10">
            <h2 className="text-3xl font-bold">All blogposts</h2>
          </div>
          <PostList posts={posts} />
        </div>
      </main>
      <footer>footer</footer>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
