import { ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";
import AuthCheck from "../../components/AuthCheck";
import Layout from "../../components/Layout";
import clientPromise from "../../lib/mongodb";

export async function getServerSideProps({ query }: any) {
  const id = query.id;

  // connect to mongodb
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");

  // get post
  const collection = db.collection("users");
  const usersData = await collection.find({ _id: new ObjectId(id) }).toArray();

  let users = JSON.stringify(usersData);

  const data = {
    users,
  };

  // return props to the page
  return {
    props: {
      data,
    },
  };
}

export default function user({ data }: any) {
  const users = JSON.parse(data.users);
  console.log(users);

  return (
    <Layout>
      <AuthCheck>
        <Head>
          <title>Blog platform - Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container py-10 sm:py-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          <main className=" col-span-2">
            <h2 className="text-3xl mb-4">My blogposts</h2>
          </main>
          <aside className="order-first md:order-last">
            <div className="mt-0 sm:mt-14 flex items-center gap-4"></div>
          </aside>
        </div>
      </AuthCheck>
    </Layout>
  );
}
