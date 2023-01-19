export const getUsers = async () => {
  const result = await fetch(`http://localhost:3000/api/users`, {
    method: "GET",
  });
};
