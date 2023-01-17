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
import { getUsersPosts } from "../hooks/posts";

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

  return (
    <Layout>
      <Head>
        <title>MERN blog app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container grid grid-cols-1 md:grid-cols-3 py-10 gap-10">
        <main className=" col-span-2">
          <div className="flex justify-between mb-10">
            <h2 className="text-3xl font-bold">All blogposts</h2>
          </div>
          <PostList posts={posts} />
        </main>
        <aside>
          <div className="p-4">
            <button className="bg-gray-900 text-white rounded-full py-4 w-full mb-8">Get unlimited acess</button>
            <h3 className="text-xl mb-5">Staff picks</h3>
            <div>
              <div className="flex gap-2 items-center">
                <img src="https://lh3.googleusercontent.com/a/AEdFTp5RhnShx4VRzrKCk11-NHrhkJDMvSYeL7rcVghgLw=s96-c" className="rounded-full w-8 " alt="" />
                <p className="text-lg">Charles Krook</p>
              </div>
              <p className="font-bold text-2xl ">Lorem ipsum dolor sit amet consectetur </p>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
