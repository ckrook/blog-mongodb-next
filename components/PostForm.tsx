import { useRouter } from "next/router";
import React, { useState } from "react";
import { createPost } from "../hooks/posts";

export default function PostForm({ session }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any, session: any) => {
    createPost(e, session, title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form action="/" onSubmit={(e) => handleSubmit(e, session)} className=" h-[calc(100vh-84px)] flex gap-3 flex-col justify-between">
      <div className="flex flex-col">
        <input className="border-none focus:ring-0 focus:ring-offset-0 bg-gray-50 text-5xl font-serif" placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <textarea className="resize-none h-5/6 focus:ring-0 focus:ring-offset-0 shadow-none border-none bg-gray-50 text-xl font-serif" placeholder="Tell your story..." value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="text" placeholder="Add tags" className="rounded-full border-none" />
      <input type="submit" value="Submit" className="mb-10 cursor-pointer bg-green-500 text-white font-medium py-4 rounded-full text-xl" />
    </form>
  );
}
