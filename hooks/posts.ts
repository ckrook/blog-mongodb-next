export const getPost = async (id: any) => {
  const result = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "GET",
  });
};

export const createPost = async (e: any, session: any, title: string, content: string) => {
  e.preventDefault();

  const email = session.user.email;
  const user = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: "GET",
  });
  const data = await user.json();

  await fetch("http://localhost:3000/api/posts/create", {
    method: "POST",
    body: JSON.stringify({ title, content, views: 1, author: data }),
  });
};

export const getUsersPosts = async (e: any, session: any) => {
  e.preventDefault();

  const email = session.user.email;
  const user = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: "GET",
  });
  const data = await user.json();

  await fetch("http://localhost:3000/api/posts/", {
    method: "GET",
    body: JSON.stringify({ author: data }),
  });
};

export const deletePost = async (id: string) => {
  await fetch(`http://localhost:3000/api/posts/delete/${id}`, {
    method: "DELETE",
  });
};
