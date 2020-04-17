import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../environments/environment';
import {SessionauthService} from './sessionauth.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { from } from 'rxjs';
import {GameService} from './game.service';
//https://angular.io/guide/observables-in-angular   /////transmitting data between components
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
//@Output() sendUser = new EventEmitter();
    socket;
    admin;
    static lobbySize;
    static participants:string[]= [null];
    static observable = from(SocketioService.participants);
    static subject = new Subject<string>();
    static lobbyID;
    playerNAME;
    
constructor(private auth: SessionauthService, private game: GameService) {      }
    
    setupSocketConnection() {
        
        //create sockets
        this.socket = io(environment.SOCKET_ENDPOINT);
        this.admin = io(environment.SOCKET_ADMIN_ENDPOINT);
        
        
        this.admin.on("chat", (data) => {
            console.log("admin chat: "+data);
        });
        this.admin.on("log", (data) => {
            console.log("admin log: "+data);
        });

        
        
        
        //log participants
        this.socket.on("names", (msg) => {  //output data
          //store this data as lobby size in a globally accessable variable //satic var of SocketioService
            SocketioService.participants = msg;
            SocketioService.participants = SocketioService.participants.filter(function(element, index, array){return (element != null);});
            //console.log("weeb");
            //console.log(msg);
            console.log(SocketioService.participants);
        });
        this.socket.on("newName", (msg) => {  //output data
          //store this data as lobby size in a globally accessable variable //satic var of SocketioService
            SocketioService.participants.push(msg);
            SocketioService.participants = SocketioService.participants.filter(function(element, index, array){return (element != null);});
            SocketioService.participants.forEach(function (value) {
                //console.log("diccjjcjjc");
            });
            var string:string=msg;
            SocketioService.subject.next(string);
            //this.sendUser.emit(msg);
            //console.log("weeb");
            //console.log(msg);
            console.log(SocketioService.participants);
        });
        
        
        
        
        //save session token in local storage
        this.socket.on("token", (token) => {  
                SessionauthService.setID(token);
                console.log(SessionauthService.readID());
        });
        this.socket.on("status", (s) => {  
            if(s==20){
                this.game.startGame();
            }
        });
        
        //save lobby ID
        this.socket.on("lobbyID", (id) => {  
                SocketioService.lobbyID = id;
                console.log(SocketioService.lobbyID);
        });
        //save lobby size
        this.socket.on("data", (size) => {  //output data
          //store this data as lobby size in a globally accessable variable //satic var of SocketioService
            SocketioService.lobbySize = size; 
            console.log(SocketioService.lobbySize);
        });
        
        
        //general log
        this.socket.on("log", (msg) => {    //output server side msgs
            console.log(msg); 
            
            /*if(/lobby id:(?=[0-9]*)/.test(msg)){
                SocketioService.lobbyID = msg.split(/lobby id: /)[1];
                console.log(SocketioService.lobbyID);
            }*/
            
        });
        this.socket.on("err", (msg) => {  //output error msgs
          console.log(msg);
        });

  }
    
    
    createLobby(num){
    
        let rand = Math.floor(Math.random() * 10000);
        this.socket.emit("createLobby", rand, num);
        console.log("test connection here, create adminchat");
        console.log("Joe");
        console.log(num);
        console.log("Exotic");
        this.getLobbySize();

    }
    
    joinLobby(num){
      
        if(SessionauthService.readID()){
            console.log(SessionauthService.readID());
            console.log(num);
            this.socket.emit("rejoinLobby", SessionauthService.readID(), num);
    
        } else {
    
            this.socket.emit("joinLobby", num);
            this.getLobbySize();
            this.getNames(num);
        }
    
    }
    
    
    setName(name){
        this.socket.emit("setName", name);
    }   
    
    getLobbySize(){
        this.socket.emit("getLobbySize");
        console.log("diarrea");
    }
    getNames(id){
        this.socket.emit("getNames", id);
    }
    disconnect(){
        this.socket.emit("disconnect", "transport close");
    }
    

    
}
 

//socket endpoint in environments