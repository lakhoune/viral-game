import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import {GameService} from './game.service';
@Injectable({
  providedIn: 'root'
})
export class TimerService {

constructor(private game:GameService) { }
    
    timer$ = timer(1000,1000);
    
    
    startTimer(time){
        
        const takeFirst3$ = this.timer$.pipe(take(time+1)).subscribe(value => console.log(time-value));
        const send = timer((time*1000)+1000).subscribe(value => this.game.sendAction());
    }
    
}
