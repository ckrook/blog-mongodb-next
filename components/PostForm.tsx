import { useRouter } from "next/router";
import React, { useState } from "react";

export default function PostForm({ session }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (e: any, session: any) => {
    e.preventDefault();
    console.log(session);

    const email = session.user.email;
    const user = await fetch(`http://localhost:3000/api/users/${email}`, {
      method: "GET",
    });
    const data = await user.json();

    await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      body: JSON.stringify({ title, content, views: 1, author: data }),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form action="/" onSubmit={(e) => createPost(e, session)} className="flex gap-3 flex-col ">
      <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="h-96" placeholder="Body" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="submit" value="Submit" className="bg-green-500 text-white font-medium py-4" />
    </form>
  );
}
