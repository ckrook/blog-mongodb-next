import React from "react";

export default function CommentForm(data: any) {
  const [content, setContent] = React.useState("");

  async function createComment(post_id: any) {
    await fetch("/api/comments/create", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
    });
    window.location.reload();
  }
  console.log(data.data);

  return (
    <div>
      <p>Write a comment</p>
      <form action="">
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="submit" value="Submit" onClick={() => createComment(data.data)} />
      </form>
    </div>
  );
}
