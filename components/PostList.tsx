import Link from "next/link";
import React, { useEffect, useState } from "react";
import { calculateReadTime, reduceText } from "../lib/helpers";

export default function PostList({ posts }: any) {
  const [postsState, setPostsState] = useState([]);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

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
                <div id="header" className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{post.title}</h1>
                  <span className="text-xs">{calculateReadTime(post.content)} min read</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm overflow-hidden break-normal">{post.views} Views</p>
                </div>
              </div>
              <p>{reduceText(post.content, 150)}</p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
