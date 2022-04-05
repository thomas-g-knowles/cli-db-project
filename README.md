<=---------------- About command line interface database project ----------------=>

This application takes argument vectors upon script exectution: it requires a CRUD operation argument and additional song information arguments (excluding drop operation). For more information and use cases, see below:

Whilst the application trys to guide the user when incorrect/invalid commands are entered, it is not feasible to cover for every possibility (basically I am too lazy and strongly dislike selection), therefore this README should be referred to for further guidance.

Note: when arguments are optional, they will be automatically added if not given and appear in the database collection, as type "null".
Note: CAPS in descriptions defines arguments

<=--------------------------------- CLI APP USE ---------------------------------=>

CRUD Arguments:

• --add: places song info into the database collection (if not duplicate) - takes SONG, ALBUM, ARTIST and GENRE as arguments.

EXAMPLE: --add --song "My Song" --artist "Me"

===>>>> note: as --album and --genre have not been given, it is added anyway for consistency and semantics sake as undefined, which later becomes type "null" - see about.

• --list: returns the requested/filtered data from the database collection - takes SONG, ALBUM and ARTIST as arguments.

EXAMPLE: --list

• --update: updates specified song data within the database collection (if it can be found) - takes SONG, ALBUM and ARTIST as arguments.

EXAMPLE: --update

• --remove: removes specified song data within the database collection (if it can be found) - takes SONG, ALBUM and ARTIST as arguments.

EXAMPLE: --remove

• --drop: (!-WARNING-!) deletes the database collection - takes no additional arguments/song info.

EXAMPLE: --drop