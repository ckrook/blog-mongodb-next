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
    body: JSON.stringify({ title, content, published: new Date(), author: data }),
  });
};

export const getUsersPosts = async (session: any) => {
  const email = session.user.email;
  const user = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: "GET",
  });
  const data = await user.json();
  console.log(data._id);

  const test = await fetch(`http://localhost:3000/api/posts/${data._id}`, {
    method: "GET",
  });

  const datas = await test.json();
  return datas;
};

export const deletePost = async (id: string) => {
  await fetch(`http://localhost:3000/api/posts/delete/${id}`, {
    method: "DELETE",
  });
};
