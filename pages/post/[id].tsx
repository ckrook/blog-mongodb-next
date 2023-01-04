import React from "react";
import { useRouter } from "next/router";
import { getPost } from "../../hooks/posts";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import CommentForm from "../../components/CommentForm";

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
  console.log("data ", { data });
  const post = JSON.parse(data.data.post);
  const comments = JSON.parse(data.data.comments);

  return (
    <div>
      <Link href="/">Go back</Link>
      <h1>{post[0].title}</h1>
      <p>{post[0].content}</p>
      <div>
        <h2>Comments</h2>
        {comments.map((comment: any) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <CommentForm data={post[0]._id} />
    </div>
  );
}
