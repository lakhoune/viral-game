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
        const send = timer((time*1000)+3000).subscribe(value => {$("#lobbyCell").remove();
        document.body.style.backgroundColor ="rgba(86, 176, 214,0.4)";  
        $("#gBoard").css("visibility","visible");$("#navigation").css("position","fixed");
        
        $("#navigationPseudo").css("width","100%");
        $("#navigationPseudo").css("height","80px");
        $('html, body').css({
    overflow: 'auto',
    height: 'auto'
});
        });
    }
    
}
