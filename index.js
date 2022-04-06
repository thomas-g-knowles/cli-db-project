const { argv } = require("yargs");
const Yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arguments = Yargs(hideBin(process.argv)).argv;
const { client, connection } = require("./db/connection.js");
const { add, list, update, remove, drop } = require("./db/crud-ops.js");

// Converts all args to lowercase for smooth user experience:

const argVectors = Object.fromEntries(
  Object.entries(arguments).map(([k, v]) => [k.toLowerCase(), v])
);

// Enforces requirements of certain argument(s) depending on CRUD command (unless dropping a collection):

if ((argVectors.add || argVectors.remove) && !(argVectors.song || argVectors.album || argVectors.artist || argVectors.genre)) {
  throw new Error(
    "At least one argument (example: --song || --album || --artist || --genre) must be given for --add or --remove command"
  );
} else if (argVectors.list && !(argVectors.list == "all" || argVectors.song || argVectors.album || argVectors.artist || argVectors.genre)) {
  throw new Error(
    "At least one argument (example: --song || --album || --artist || --genre) must be given for --list command"
  );
} else if (argVectors.update && !(argVectors.song || argVectors.album || argVectors.artist || argVectors.genre) || !argVectors.with) {
  throw new Error(
    "At least one argument (example: --song || --album || --artist || --genre) and --with must be given in conjunction with a value for --update"
  );
}

// Using an IFEE for invoke:

(async () => {
  const collection = await connection();

  try {
    if (argVectors.add) {
      await add(collection, argVectors);
    } else if (argVectors.list) {
      console.log(await list(collection, argVectors));
    } else if (argVectors.update) {
      await update(collection, argVectors);
    } else if (argVectors.remove) {
      await remove(collection, argVectors);
    } else if (argVectors.drop) {
      await drop(collection);
    } else {
      throw new Error("Incorrect CRUD command");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
})();
