import { getSession } from "next-auth/react";
import React from "react";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

export default function admin({ session }: { session: any }) {
  return (
    <Layout>
      <PostForm session={session} />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
