import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await clientPromise;
    const client = await clientPromise;
    const db = client.db("Blog");
    let result = await db.collection("posts").find().toArray();
    res.status(200).json(result);
  }
}
