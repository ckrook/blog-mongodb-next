export const getPost = async (id: any) => {
  const result = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "GET",
  });
};
