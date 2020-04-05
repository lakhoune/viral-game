const sqlite3 = require('sqlite3').verbose();

const getWords = require('../services/getWords.js');


getWords.getWords(26, function(data){
   console.log(data);
});





