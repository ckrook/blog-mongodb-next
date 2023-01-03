import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("Blog");
    await db.collection("posts").deleteOne({ _id: ObjectId(id) });
    res.redirect("/");
  }
}
