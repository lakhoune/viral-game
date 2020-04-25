import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import * as io from 'socket.io-client';

//import {environment} from '../environments/environment';

import {SessionauthService} from './sessionauth.service';
import {SocketioService} from './socketio.service';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { from } from 'rxjs';

import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';


import {game} from "./models/game";
import {lobby} from "./models/lobby";
import {team} from "./models/team";

import {player} from "./models/player/player";
import {role} from "./models/player/role";
import {researcher} from "./models/player/researcher";
import {virus} from "./models/player/virus";

import {round} from "./models/round/round";
import {board} from "./models/round/board";
import {score} from "./models/round/score";


import {target} from "./models/targetData/target";
import {metaTarget} from "./models/targetData/metaTarget";
import {researchTarget} from "./models/targetData/researchTarget";
import {virusTarget} from "./models/targetData/virusTarget";

import {TimerService} from './timer.service';
//https://angular.io/guide/observables-in-angular   /////transmitting data between components
@Injectable({
  providedIn: 'root'
})
export class GameService {

    static status = new Subject<any>(); 
    static statusCode = 0;
    //0 no lobby
    //10 lobby not full
    
    //20 lobby ready (full) 
    
    //3000 game start initiated 
    //3x00 round x starting 
    //3xy0 round x lap y 
    //3xyz round x lap y move z (6 moves per lap)  

    //40 game over
    //50 leave/left lobby -> return to state 0    
    
    //-x error    
    /*
                            socket.broadcast.to(`${socket.currLobby}.DNA`).emit("log", "Your team: " + names1);
                            setTimeout(function(){socket.broadcast.to(`${socket.currLobby}.DNA`).emit("status", '{"code":20,"team":'+JSON.stringify(names1)+',"timer":20}')},3000);
                            socket.broadcast.to(`${socket.currLobby}.RNA`).emit("log", "Your team: " + names2);
                            setTimeout(function(){socket.broadcast.to(`${socket.currLobby}.RNA`).emit("status", '{"code":20,"team":'+JSON.stringify(names2)+',"timer":20}')},3000);
*/
    static lobby;
    static game;
    static team;
    static player;
    
    
    
    
constructor(private auth: SessionauthService, private timer:TimerService) {      
        
    }
    
    parse(status){
        //console.log(status);
        console.log(status.code);
        if(status.code==20){
            this.startGame();
        }
        this.startGame();
    }
    static createLobby(id){
        GameService.lobby = new lobby(id);
    }
    
    static createPlayer(name){
        GameService.player = new player(name);
    }
    
    
    nextRound(){
        GameService.status.next(GameService.statusCode+100);
        GameService.statusCode = GameService.statusCode+100;
    }
    nextLap(){
        GameService.status.next(GameService.statusCode+10);
        GameService.statusCode = GameService.statusCode+10;
    }
    nextMove(){
        GameService.status.next(GameService.statusCode+1);
        GameService.statusCode = GameService.statusCode+1;        
    }
    
    waitingForPlayers(){
        GameService.status.next(10);
        GameService.statusCode = 10;
    }
    lobbyFull(){
        GameService.status.next(20);
        GameService.statusCode = 20;
    }   
    startGame(){
        GameService.status.next(3000);
        GameService.statusCode = 3000;
        $("#countdown").html('<small style="font-size:.3em;">Spiel startet in:</small>');
        this.timer.startTimer(20);
        
    }
    endGame(){
        GameService.status.next(40);
        GameService.statusCode = 40;
        this.leaveGame();
    }
    leaveGame(){
        GameService.status.next(50);
        GameService.statusCode = 50;
        GameService.status.next(0);
        GameService.statusCode = 0;
    }
    err(num:number){
        GameService.status.next(-num);
        GameService.statusCode = -num;
    }
    
    
    sendAction(){console.log("Pluto is a Planet");}
}

