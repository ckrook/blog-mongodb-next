import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("Blog");
    const users = await db.collection("users").find({}).toArray();

    res.json(users);
  }
}
