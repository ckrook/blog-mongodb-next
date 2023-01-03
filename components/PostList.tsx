import React from "react";

export default function PostList({ posts }: any) {
  const deletePost = async (id: any) => {
    fetch(`/api/posts/delete/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };
  return (
    <ol>
      {posts?.map((post: any) => (
        <li key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
          <button>Edit</button>
        </li>
      ))}
    </ol>
  );
}
