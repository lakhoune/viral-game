const sqlite3 = require('sqlite3').verbose();

const getWords = require('../services/getWords.js');


getWords.getWords(5, function(data){
   console.log(data);
});





