import { useRouter } from "next/router";
import React, { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      body: JSON.stringify({ title, content, views: 1 }),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form action="/" onSubmit={(e) => createPost(e)} className="flex gap-3 flex-col ">
      <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Body" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
}
