
import  { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODBSTRING

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function dbConnection(req, res, next) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db(process.env.DBNAME);
    const collection = database.collection(process.env.COLLECTION);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    req.collection = collection
    next()
  } catch(err) {
    // Ensures that the client will close when you finish/error
    console.log(`Something went wrong ${err.message}`)
    await client.close();
  }
}

