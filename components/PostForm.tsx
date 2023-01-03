import React, { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    window.location.reload();
  };

  return (
    <form action="" onSubmit={createPost}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
}
