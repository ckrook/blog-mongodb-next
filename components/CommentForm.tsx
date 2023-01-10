import { useSession } from "next-auth/react";
import React from "react";
import { createComment } from "../hooks/comments";

export default function CommentForm({ data }: any) {
  const [content, setContent] = React.useState("");
  const { data: session } = useSession();

  async function handleSubmit(e: any, data: any, session: any) {
    e.preventDefault();
    createComment(e, session, content, data);

    setContent("");
  }

  return (
    <div>
      <p>Write a comment</p>
      <form action="">
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="submit" value="Submit" onClick={(e) => handleSubmit(e, data, session)} />
      </form>
    </div>
  );
}
