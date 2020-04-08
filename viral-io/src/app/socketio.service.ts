import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
socket;
admin;
    
static lobbyID;
playerNAME;
    
  constructor() {      }
    
    setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.admin = io(environment.SOCKET_ADMIN_ENDPOINT);
        
        
            this.admin.on("chat", (data) => {
    console.log(data);
  });
    this.admin.on("log", (data) => {
    console.log(data);
  });
        this.socket.on("log", (msg) => {    //output server side msgs
    console.log(msg); 
            
    if(/lobby id:(?=[0-9]*)/.test(msg)){
        SocketioService.lobbyID = msg.split(/Created lobby, lobby id: /)[1];
    console.log(SocketioService.lobbyID);
}
            
  });
        this.socket.on("err", (msg) => {  //output error msgs
    console.log(msg);
  });

  }
    
    
createLobby(num){
    
    let rand = Math.floor(Math.random() * 10000);
    this.socket.emit("createLobby", rand, num);
    console.log("test connection here, create adminchat");

}
    
joinLobby(num){
    this.socket.emit("joinLobby", num);
    
} 
    

    
}
 

//socket endpoint in environments