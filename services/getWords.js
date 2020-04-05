
const sqlite3 = require('sqlite3').verbose();



    var jay;
    

    exports.getWords = function getWords(num,callback){ 
        
        
       console.log(num);
        
        wrds =[];


        console.log("lerooooyyy"); 
        
        
        var sql =`SELECT word FROM wordList ORDER BY random() LIMIT `+num+``;

        let db = new sqlite3.Database('../sqlite-db/words.db');
        
        

    

        
        
        db.each(sql, [], (err, rows) => {
            if (err) {
                
                console.log(err);
            }
            

            

            if(rows){

                //console.log(rows);
                jay=rows;
                wrds.push(rows.word);
               
                
                //console.log(jay);
                
                

            }


          

        },function(){db.close();callback(wrds);});


        
  
        
    
    console.log("jenkins!");
        
      
}
