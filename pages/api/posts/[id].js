import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("Blog");
    const result = await db
      .collection("posts")
      .find({ _id: ObjectId(id) })
      .toArray();
    res.status(200).json(result);
  }
}
