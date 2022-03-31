const add = async (collection, songInfo) => {
  await collection.insertOne(songInfo);
}

const list = async (collection, songInfo) => {
  return await collection.find({}).toArray();
}

const update = async (collection, songInfo) => {
  return "update invoked"
}

const remove = async (collection, songInfo) => {
  return "remove invoked"
}

module.exports = { add, list, update, remove };
