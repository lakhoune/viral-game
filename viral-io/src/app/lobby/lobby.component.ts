import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
    
    
    
    
    


  constructor() { document.body.style.height ="100%";}

  ngOnInit() {
      
          $(document).ready(function(){
    animateDiv('.a');
    animateDiv('.b');
   animateDiv('.c');
   animateDiv('.d');
    animateDiv('.e');
              animateDiv('.f');
              animateDiv('.g');
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height()-150;
    var w = $(window).width() - 100;
    
    var nh = Math.floor(Math.random() * h);
    if(nh<80){nh=100;}
    var nw = Math.floor(Math.random() * w);
    //console.log(nh);
    return [nh,nw];  
    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
$(myclass).animate({ top: newq[0], left: newq[1] }, 2000, "easeInQuad",  function(){
      animateDiv(myclass);        
    });
    
};
  }

}
