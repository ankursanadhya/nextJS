// this function will run when we hit /api/new-meetup
import { MongoClient } from "mongodb";


async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://tester123:tester123@youtube-tut.rxy944l.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db(); // to get hold of tht databse to which we are connecting
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;