const Yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argVectors = Yargs(hideBin(process.argv)).argv;
const { client, connection } = require("./db/connection.js");
const { add, list, update, remove } = require("./db/crud-ops.js");

// Adds arguments as undefined if not stated for semantic reasons:

if (!argVectors.song && !argVectors.list) {
  throw new Error("A song must be given as an option");
}

if (!argVectors.album) {
  argVectors.album = undefined;
}

if (!argVectors.artist) {
  argVectors.artist = undefined;
}

// Using an IFEE for invoke:

(async () => {
  const collection = await connection();

  try {
    if (argVectors.add) {
      // Removes uneeded properties from object (song info):
      for (let key in argVectors) {
        if (key != ("song" || "album" || "artist")) {
          delete argVectors.key;
        }
      }
      await add(collection, argVectors);
    } else if (argVectors.list) {
      console.log(await list(collection));
    } else if (argVectors.update) {
      await update(collection);
    } else if (argVectors.remove) {
      await remove(collection);
    } else {
      console.log("Incorrect command");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
})();
