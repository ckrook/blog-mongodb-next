import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getPost } from "../../hooks/posts";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import CommentForm from "../../components/CommentForm";
import Layout from "../../components/Layout";

async function increaseViews(id: string) {
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");
  const collection = db.collection("posts");
  await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
}

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

export default function post(data: any) {
  const post = JSON.parse(data.data.post);
  const commentsData = JSON.parse(data.data.comments);
  const [comments, setComments] = React.useState(commentsData);

  return (
    <Layout>
      <Link href="/">Go back</Link>
      <li key={post[0]._id} className="mb-3 border p-5 rounded-md bg-white flex cursor-pointer">
        <img src={post[0].author.image} alt={post[0].author.name} className="rounded-full w-10 h-10 mr-4" />
        <Link href={`/post/${post[0]._id}`}>
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">{post[0].title}</h1>
            <p>{post[0].views} Views</p>
          </div>
          <p>{post[0].content}</p>
        </Link>
      </li>
      <div>
        <h2>Comments</h2>
        {comments.map((comment: any) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <CommentForm data={post[0]._id} comments={comments} />
    </Layout>
  );
}
