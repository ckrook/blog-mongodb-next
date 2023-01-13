import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { deletePost, getPost } from "../../hooks/posts";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import CommentForm from "../../components/CommentForm";
import Layout from "../../components/Layout";
import { calculateReadTime, convertNewDateToString, SaveUrlToClipboard, timeSinceDate } from "../../lib/helpers";
import { BsLink45Deg } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import AuthCheck from "../../components/AuthCheck";

export async function getServerSideProps({ query }: any) {
  const id = query.id;

  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");

  const collection = db.collection("posts");
  const posts = await collection.find({ _id: new ObjectId(id) }).toArray();

  let commentsData = await db
    .collection("comments")
    .aggregate([
      {
        $match: {
          post_id: id,
        },
      },
    ])
    .toArray();

  let post = JSON.stringify(posts);
  let comments = JSON.stringify(commentsData);

  increaseViews(id);

  const data = {
    post,
    comments,
  };

  return {
    props: {
      data,
    },
  };
}

function checkTruthfulness(post: any, session: any) {
  if (post?.author?.email === session?.user?.email) {
    return true;
  }
  return false;
}

export default function post(data: any) {
  const { data: session } = useSession();
  const post = JSON.parse(data.data.post);
  const commentsData = JSON.parse(data.data.comments);

  const [comments, setComments] = React.useState(commentsData);

  return (
    <Layout>
      <main className="container grid grid-cols-3">
        <div className=" col-span-2">
          <div className="flex gap-4 my-10 justify-between items-center">
            <div className="flex gap-4">
              <img src={post[0].author.image} className="rounded-full w-14" alt="" />
              <div>
                <p>{post[0].author.name}</p>
                <div className="flex gap-2">
                  <span>{convertNewDateToString(post[0].published)}</span>·<span>{calculateReadTime(post[0].content)} min read</span>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => SaveUrlToClipboard()}>
                <BsLink45Deg className="w-6 h-6" />
                <Toaster />
              </button>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4">{post[0].title}</h1>
            <p>{post[0].content}</p>
          </div>

          <AuthCheck>
            {checkTruthfulness(post[0], session) ? (
              <button className="btn bg-red-500 rounded-full" onClick={() => deletePost(post[0]._id)}>
                Delete
              </button>
            ) : null}
          </AuthCheck>

          <div className="my-10">
            {comments.map((comment: any) => (
              <div key={comment._id} className=" border-b py-6 items-center">
                <div className="flex gap-4 mb-3">
                  <img src={comment.author.image} className="rounded-full w-12" alt="" />
                  <div className="flex flex-col ">
                    <p>{comment.author.name}</p>
                    <p>{timeSinceDate(comment.published)} ago</p>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
          <CommentForm data={post[0]._id} comments={comments} />
        </div>
      </main>
    </Layout>
  );
}

async function increaseViews(id: string) {
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");
  const collection = db.collection("posts");
  await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
}
