import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("Blog");
    const newPost = JSON.parse(req.body);
    await db.collection("comments").insertOne(newPost);

    res.status(200).redirect("/");
  }
}
