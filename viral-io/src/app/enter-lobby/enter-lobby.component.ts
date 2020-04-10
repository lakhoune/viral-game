import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {SocketioService} from '../socketio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enter-lobby',
  templateUrl: './enter-lobby.component.html',
  styleUrls: ['./enter-lobby.component.css']
})
export class EnterLobbyComponent implements OnInit {

    title:string ="Title";
    pin;
    size;
    name;
    
  constructor(  private route: ActivatedRoute,
  private router: Router, private socketService: SocketioService) { }

  ngOnInit() {
      
      let id = this.route.snapshot.paramMap.get('size');
   // console.log(id);
    this.size=id;
      
    
    this.pin=SocketioService.lobbyID;
      
    //console.log(this.size)
  }
    
    
getPin(){return SocketioService.lobbyID;}
    
    
enterName(){
    
    
    this.socketService.setName(this.name);
    
}    

}
 