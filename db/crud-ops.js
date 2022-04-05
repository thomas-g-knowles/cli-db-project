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
};

const list = async (collection, argVectors) => {
  const listCommand = {};
  const retrievedData = [];

  // Adds arguments as undefined if not stated for semantic reasons:

  if (argVectors.list == "all") listCommand.list = argVectors.list;
  if (argVectors.song) listCommand.song = argVectors.song;
  if (argVectors.album) listCommand.album = argVectors.album;
  if (argVectors.artist) listCommand.artist = argVectors.artist;
  if (argVectors.genre) listCommand.genre = argVectors.genre;

  for (let key in listCommand) {
    if (key == "list" && listCommand.list == "all") retrievedData.push({all: JSON.stringify(await collection.find({}).toArray())});
    else retrievedData.push({[key]: JSON.stringify(await collection.find({[key]: listCommand[key]}).toArray())});
  }

  return retrievedData
};

const update = async (collection, argVectors) => {
  updateCommand = {};

  return "update invoked";
};

const remove = async (collection, argVectors) => {
  removeCommand = {};

  return "remove invoked";
};

const drop = async (collection) => {
  await collection.drop();
};

module.exports = { add, list, update, remove, drop };
