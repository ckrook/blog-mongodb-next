import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("Blog");
    const newUser = JSON.parse(req.body);
    const doesUserExists = await db.collection("users").findOne({ email: newUser.email });
    console.log(doesUserExists);
    if (doesUserExists) return;

    await db.collection("users").insertOne(newUser);

    res.redirect("/");
  }
}
