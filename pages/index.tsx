import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import useSWR from "swr";

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default function Home() {
  const { data: posts } = useSWR("/api/posts", fetcher, { refreshInterval: 1 });

  console.log({ posts });

  return (
    <div className="container">
      <Head>
        <title>MERN blog app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-[55%] m-auto">
          <PostForm />
          <h2 className="text-5xl font-bold">All blogposts</h2>
          <PostList posts={posts} />
        </div>
      </main>

      <footer>footer</footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
