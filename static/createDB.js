const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('../sqlite-db/words.db');


  db.run(
      'CREATE TABLE "wordList" ("uuid"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "word" TEXT NOT NULL UNIQUE,"categorie"	TEXT)'
  );

db.close();