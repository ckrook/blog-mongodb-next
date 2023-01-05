import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("Blog");
    await db.collection("posts").deleteOne({ _id: ObjectId(id) });
    let result = await db.collection("posts").find({}).toArray();

    res.status(200).json({ result });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}
