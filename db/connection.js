const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
  try {
    await client.connect();
    const database = client.db("music-db");
    return database.collection("songs");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { client, connection };
