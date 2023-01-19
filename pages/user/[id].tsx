import { ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";
import AuthCheck from "../../components/AuthCheck";
import CardAvatar from "../../components/CardAvatar";
import Layout from "../../components/Layout";
import PostList from "../../components/PostList";
import clientPromise from "../../lib/mongodb";

export async function getServerSideProps({ query }: any) {
  const id = query.id;

  // connect to mongodb
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");

  // get user
  const Usercollection = db.collection("users");
  const usersData = await Usercollection.find({ _id: new ObjectId(id) }).toArray();

  // get posts
  const PostCollection = db.collection("posts");
  const postsData = await PostCollection.find({ "author._id": id }).toArray();

  let user = JSON.stringify(usersData);
  let posts = JSON.stringify(postsData);

  const data = {
    user,
    posts,
  };

  // return props to the page
  return {
    props: {
      data,
    },
  };
}

export default function user({ data }: any) {
  const user = JSON.parse(data.user);
  const posts = JSON.parse(data.posts);
  console.log(user);
  console.log("posts: ", posts);
  return (
    <Layout>
      <AuthCheck>
        <Head>
          <title>Blog platform - Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container py-10 sm:py-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          <main className=" col-span-2">
            <h2 className="text-3xl mb-4">{user[0].name}s blogposts</h2>
            <PostList posts={posts} />
          </main>
          <aside className="col-span-1 order-first md:order-last">
            <h2 className="text-3xl mb-4">Profile</h2>
            <CardAvatar user={user[0]} posts={posts} />
          </aside>
        </div>
      </AuthCheck>
    </Layout>
  );
}
