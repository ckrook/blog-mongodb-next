export const createComment = async (e: any, session: any, content: string, id: any) => {
  e.preventDefault();

  const email = session.user.email;
  const user = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: "GET",
  });
  const data = await user.json();

  await fetch("http://localhost:3000/api/comments/create", {
    method: "POST",
    body: JSON.stringify({ post_id: id, content, published: new Date(), author: data }),
  });
};
