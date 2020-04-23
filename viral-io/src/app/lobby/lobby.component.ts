import { Component, OnInit , Input, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';
import {SocketioService} from '../socketio.service';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener} from "@angular/core";
import {  HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {GameService} from '../game.service';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
    
    
    toggle = false;
    
    


constructor(private timer:TimerService, private game:GameService) { 
    
    document.body.style.height ="100%";
    document.body.style.backgroundColor ="rgba(226,176,255,0.4)"; 

}

  ngOnInit() {
        
      
        
        
        $(document).ready(function(){
              
            //add cells to the DOM 
            console.log("#neverForgetHarambe");
            console.log(SocketioService.participants);
            console.log("Epstein didn't kill himself");
            //add those that are already in a lobby
            var i=0
            SocketioService.participants.forEach(function(element){
                
                if(element!=null){
                    var string = '<div class="a'+i+' virusCell" style=" opacity: 0.85;background-image: url(../../assets/virus_'+i+'.svg);background-repeat: no-repeat;width: 6em;height: 6em;position: absolute;background-color:;text-align: center;"><a class="virusLabel" style="text-align: center;line-height: 5em; word-break: break-all;">'+element+'</a></div>';
                    i++;
                    $( "#lobbyCell" ).append(string);
                }
                
                
                
            });
            const subscription = SocketioService.subject.subscribe(function(element){
                
                
                    var string = '<div class="a'+i+' virusCell" style=" opacity: 0.85;background-image: url(../../assets/virus_'+i+'.svg);background-repeat: no-repeat;width: 6em;height: 6em;position: absolute;background-color:;text-align: center;"><a class="virusLabel" style="text-align: center;line-height: 5em; word-break: break-all;">'+element+'</a></div>';
                    
                    $( "#lobbyCell" ).append(string);
                
               // console.log("observable");
                animateDiv('.a'+i+'');
                i++;
                
            });
            
              
            //animate Cells  
            animateDiv('.a0');
            setTimeout(function(){animateDiv('.a1');}, Math.floor(Math.random() * 4000));
            setTimeout(function(){animateDiv('.a2');}, Math.floor(Math.random() * 13200));
            setTimeout(function(){animateDiv('.a3');}, Math.floor(Math.random() * 5340));
            setTimeout(function(){animateDiv('.a4');}, Math.floor(Math.random() * 2900));
            setTimeout(function(){animateDiv('.a5');}, Math.floor(Math.random() * 2503));
            setTimeout(function(){animateDiv('.a6');}, Math.floor(Math.random() * 3954));
            setTimeout(function(){animateDiv('.a7');}, Math.floor(Math.random() * 1034));
  
            const gameStatus = GameService.status.subscribe(function(status){
                console.log("2020");
                console.log(status);
                if(status==3000){this.toggle=true;}
                
            });
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
