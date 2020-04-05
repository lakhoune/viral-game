
const sqlite3 = require('sqlite3').verbose();



    var jay;
    

    exports.getWords = function getWords(num,callback){ 

        console.log("lerooooyyy"); 
        
        
        var sql =`SELECT word FROM wordList WHERE uuid = 7`;

        let db = new sqlite3.Database('../sqlite-db/words.db');
        
        

    

        
        
        db.each(sql, [], (err, rows) => {
            if (err) {
                
                console.log(err);
            }
            

            

            if(rows){

                //console.log(rows);
                jay=rows.word;
               
                
                //console.log(jay);
                
                

            }


          

        },function(){db.close();callback(jay);});


        
  
        
    
    console.log("jenkins!");
        
      
}
