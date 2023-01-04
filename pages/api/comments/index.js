if (req.method === "GET") {
  await clientPromise;
  const client = await clientPromise;
  const db = client.db("Blog");
  let result = await db.collection("comments").find().toArray();
  res.status(200).json(result);
}
