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

  return (
    <ol>
      {postsState?.map((post: any) => (
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
