import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    console.log("ID", id);
    const client = await clientPromise;
    const db = client.db("Blog");
    const doesUserExists = await db.collection("users").findOne({ email: id });

    res.json(doesUserExists);
  }
}
