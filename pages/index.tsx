import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

export async function getServerSideProps(context: any) {
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");
  const collection = db.collection("posts");
  const posts = await collection.find({}).toArray();
  console.log(posts);
  let data = JSON.stringify(posts);
  return {
    props: { data },
  };
}

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let posts = JSON.parse(data);

  return (
    <div className="container">
      <Head>
        <title>MERN blog app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PostForm />
        <PostList posts={posts} />
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
