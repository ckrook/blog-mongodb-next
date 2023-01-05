import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import React, { useEffect, useState } from "react";

export default function PostList({ posts }: any) {
  const deletePost = async (e: any, id: any) => {
    e.preventDefault();
    fetch(`/api/posts/delete/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <ol>
      {posts?.map((post: any) => (
        <li key={post._id} className="mb-6">
          <Link href={`/post/${post._id}`}>
            <div className="flex justify-between">
              <h1 className="text-xl font-medium">{post.title}</h1>
              <p>{post.views} Views</p>
            </div>
            <p>{post.content}</p>
            <form action="/">
              <button className="delete" onClick={(e) => deletePost(e, post._id)}>
                Delete
              </button>
            </form>
          </Link>
        </li>
      ))}
    </ol>
  );
}
