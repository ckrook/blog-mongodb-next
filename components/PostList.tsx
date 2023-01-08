import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PostList({ posts }: any) {
  const [postsState, setPostsState] = useState([]);

  const deletePost = async (e: any, id: any) => {
    e.preventDefault();
    setPostsState(postsState.filter((post: any) => post._id !== id));
    fetch(`/api/posts/delete/${id}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  const getAuthor = async (id: any) => {
    const author = await fetch(`/api/users/${id}`, {
      method: "GET",
    });
    const data = await author.json();
    return data;
  };

  return (
    <ol>
      {postsState?.map((post: any) => {
        return (
          <li key={post._id} className="mb-3 border p-5 rounded-md bg-white flex  cursor-pointer">
            <Link href={`user/${post.author._id}`}>
              <img src={post.author.image} alt={post.author.name} className="rounded-full w-10 h-10 mr-4" />
            </Link>
            <Link href={`/post/${post._id}`} className="w-full">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-medium">{post.title}</h1>
                </div>
                <div>
                  <p>{post.views} Views</p>
                </div>
              </div>
              <p>{post.content}</p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
