const { argv } = require("yargs");
const Yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argVectors = Yargs(hideBin(process.argv)).argv;
const { client, connection } = require("./db/connection.js");
const { add, list, update, remove, drop } = require("./db/crud-ops.js");

// Adds arguments as undefined if not stated for semantic reasons:

if (!argVectors.song) {
  argVectors.song = undefined;
}

if (!argVectors.album) {
  argVectors.album = undefined;
}

if (!argVectors.artist) {
  argVectors.artist = undefined;
}

// Enforces requirement of at least one argument must be given (unless dropping a collection):

if (!argVectors.drop && !(argVectors.song || argVectors.album || argVectors.artist)) {
  throw new Error(
    "At least one songInfo argument (example: --song || --album || --artist) must be given in command: YOU ABSOLUTE MORONIC FOOL!!!"
  );
}

// Using an IFEE for invoke:

(async () => {
  const collection = await connection();

  try {
    if (argVectors.add) {
      const permittedArgs = ["song", "album", "artist"];
      const songInfo = {};
      // Adds required properties to songInfo object:
      for (let key in argVectors) {
        for (
          let permittedArg = 0;
          permittedArg < permittedArgs.length;
          permittedArg++
        ) {
          if (key == permittedArgs[permittedArg]) {
            songInfo[key] = argVectors[key];
          }
        }
      }
      await add(collection, songInfo);
    } else if (argVectors.list) {
      console.log(await list(collection));
    } else if (argVectors.update) {
      await update(collection);
    } else if (argVectors.remove) {
      await remove(collection);
    } else if (argVectors.drop) {
      await drop(collection);
    } else {
      console.log("Incorrect CRUD command");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
})();
