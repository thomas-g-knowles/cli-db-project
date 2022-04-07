const add = async (collection, argVectors) => {
  const addCommand = {};

  // Adds arguments as undefined if not stated for semantic reasons:

  if (argVectors.song) addCommand.song = argVectors.song;
  else addCommand.song = undefined;

  if (argVectors.album) addCommand.album = argVectors.album;
  else addCommand.album = undefined;

  if (argVectors.artist) addCommand.artist = argVectors.artist;
  else addCommand.artist = undefined;

  if (argVectors.genre) addCommand.genre = argVectors.genre;
  else addCommand.genre = undefined;

  // Inserts song info into the database collection:

  await collection.insertOne(addCommand);
  console.log("Song data added to MongoDB successfully");
};

const list = async (collection, argVectors) => {
  const listCommand = {};
  const retrievedData = [];

  // Adds arguments that were given originally to new object (listCommand):

  if (argVectors.song) listCommand.song = argVectors.song;
  if (argVectors.album) listCommand.album = argVectors.album;
  if (argVectors.artist) listCommand.artist = argVectors.artist;
  if (argVectors.genre) listCommand.genre = argVectors.genre;

  if (argVectors.list == "all")
    retrievedData.push({
      all: JSON.stringify(await collection.find({}).toArray()),
    });
  if (
    listCommand.song ||
    listCommand.album ||
    listCommand.artist ||
    listCommand.genre
  )
    retrievedData.push({
      [JSON.stringify(listCommand)]: JSON.stringify(
        await collection.find({ ...listCommand }).toArray()
      ),
    });

  if (Object.values(retrievedData[0])[0] == "[]") console.log(`MongoDB search query yeilded 0 results`)
  else console.log("MongoDB was searched.");
  return retrievedData;
};

const update = async (collection, argVectors) => {
  const updateCommand = {};

  // Adds arguments that were given originally to new object (updateCommand):

  if (argVectors.song) updateCommand.song = argVectors.song;
  if (argVectors.album) updateCommand.album = argVectors.album;
  if (argVectors.artist) updateCommand.artist = argVectors.artist;
  if (argVectors.genre) updateCommand.genre = argVectors.genre;

  await collection.updateMany(
    { ...updateCommand },
    { $set: { [argVectors.update]: argVectors.with } }
  );
  console.log("Update query was executed.");
};

const remove = async (collection, argVectors) => {
  const removeCommand = {};

  // Adds arguments that were given originally to new object (removeCommand):

  if (argVectors.song) removeCommand.song = argVectors.song;
  if (argVectors.album) removeCommand.album = argVectors.album;
  if (argVectors.artist) removeCommand.artist = argVectors.artist;
  if (argVectors.genre) removeCommand.genre = argVectors.genre;

  await collection.deleteMany({ ...removeCommand });
  console.log("Delete query was executed.");
};

const drop = async (collection) => {
  await collection.drop();
  console.log("MongoDB collection dropped successfully.");
};

module.exports = { add, list, update, remove, drop };
