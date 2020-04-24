import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
//import {GameService} from './game.service';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';
@Injectable({
  providedIn: 'root'
})
export class TimerService {

constructor() { }
    
    timer$ = timer(2000,1000);
    
    
    startTimer(time){
        
        const takeFirst3$ = this.timer$.pipe(take(time+1)).subscribe(value => $(".countdown").html(time-value));
       // const send = timer((time*1000)+1000).subscribe(value => this.game.sendAction());
    }
    
}
