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
    //0 no lobby
    //1 lobby not full
    //10 lobby token saved, ready to rejoin   
    //2 lobby ready 
    
    //3 game start initiated 
    //3x round x starting 
    //3xy round x lap y 
    //3xyz round x lap y move z (6 moves per lap)  

    //4 game over
    //5 leave/left lobby -> return to state 0    
    
    //-x error    
    
    
    constructor(private auth: SessionauthService) {      }
    
    startGame(){
        GameService.status.next(3);
    }
}

