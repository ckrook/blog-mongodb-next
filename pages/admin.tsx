import { getSession } from "next-auth/react";
import AuthCheck from "../components/AuthCheck";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

export default function admin({ session }: { session: any }) {
  return (
    <Layout>
      <AuthCheck>
        <main className="container">
          <PostForm session={session} />
        </main>
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
  return {
    props: { session },
  };
}
