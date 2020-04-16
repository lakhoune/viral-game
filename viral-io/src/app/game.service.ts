import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import * as io from 'socket.io-client';

//import {environment} from '../environments/environment';

import {SessionauthService} from './sessionauth.service';
import {SocketioService} from './socketio.service';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { from } from 'rxjs';

//https://angular.io/guide/observables-in-angular   /////transmitting data between components
@Injectable({
  providedIn: 'root'
})
export class GameService {

    static status = new Subject<any>(); 
    static statusCode = 0;
    //0 no lobby
    //10 lobby not full
    //11 lobby token saved, ready to rejoin   
    //20 lobby ready 
    
    //3000 game start initiated 
    //3x00 round x starting 
    //3xy0 round x lap y 
    //3xyz round x lap y move z (6 moves per lap)  

    //4 game over
    //5 leave/left lobby -> return to state 0    
    
    //-x error    
    
    
    constructor(private auth: SessionauthService) {      
        
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
        GameService.status.next(11);
        GameService.statusCode = 11;
    }   
    startGame(){
        GameService.status.next(3000);
        GameService.statusCode = 3000;
    }
    endGame(){
        GameService.status.next(4);
        GameService.statusCode = 4;
        this.leaveGame();
    }
    leaveGame(){
        GameService.status.next(5);
        GameService.statusCode = 5;
        GameService.status.next(0);
        GameService.statusCode = 0;
    }
    err(num:number){
        GameService.status.next(-num);
        GameService.statusCode = -num;
    }
}

