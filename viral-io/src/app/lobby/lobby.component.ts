import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';
import {SocketioService} from '../socketio.service';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener} from "@angular/core";
import {  HostBinding } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
    
    
    
    
    


constructor() { 
    document.body.style.height ="100%";
    document.body.style.backgroundColor ="rgba(226,176,255,0.4)"; 

}

  ngOnInit() {
      
        $(document).ready(function(){
              
            //add cells to the DOM 
            var classes=["a","b","c","d","e","f","g","h"];
              $( "#lobbyCell" ).append('<div class="a virusCell" style="    opacity: 0.85;background-image: url(../../assets/virus_red.svg);background-repeat: no-repeat;width: 6em;height: 6em;position: absolute;background-color:;text-align: center;"><a class="virusLabel" style="text-align: center;line-height: 6em; word-break: break-all;">Player</a></div>');
            //animate Cells  
            animateDiv('.a');
            setTimeout(function(){animateDiv('.b');}, Math.floor(Math.random() * 4000));
            setTimeout(function(){animateDiv('.c');}, Math.floor(Math.random() * 13200));
            setTimeout(function(){animateDiv('.d');}, Math.floor(Math.random() * 5340));
            setTimeout(function(){animateDiv('.e');}, Math.floor(Math.random() * 2900));
            setTimeout(function(){animateDiv('.f');}, Math.floor(Math.random() * 2503));
            setTimeout(function(){animateDiv('.g');}, Math.floor(Math.random() * 3954));
            setTimeout(function(){animateDiv('.h');}, Math.floor(Math.random() * 1034));
  
        });

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height()-100;
    var w = $(window).width() - 100;
    
    var nh = Math.floor(Math.random() * h);
    if(nh<80){nh=100;}
    var nw = Math.floor(Math.random() * w);
    //console.log(nh);
    return [nh,nw];  
    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
   //document.getElementsByClassName('.a').style.transform = "rotate(90deg)";

$(myclass).animate({ top: newq[0], left: newq[1]}, 5500, "easeInOutBounce",  function(){
        
    setTimeout(function(){animateDiv(myclass);},Math.floor(Math.random() * 1000) );        
    });
    
};
    
  }
    
      
  
    


}
