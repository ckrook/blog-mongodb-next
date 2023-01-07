import Head from "next/head";
import clientPromise from "../lib/mongodb";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import useSWR from "swr";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import AccessDenied from "../components/AccessDenied";
import { useEffect } from "react";

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

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
  console.log(session);

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

      <main>
        <h1 className="text-6xl font-bold">Protected Page</h1>
        <PostForm session={session} />
        <h2 className="text-5xl font-bold">All blogposts</h2>
        <PostList posts={posts} />
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
