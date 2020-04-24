import { Component, OnInit, AfterViewChecked, AfterContentInit, AfterViewInit } from '@angular/core';
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

    title = "Title";
    pin;
    pinSub;
    size;
    name;

  constructor(  private route: ActivatedRoute,
                private router: Router, private socketService: SocketioService) {
   }

  ngOnInit() {

      const id = this.route.snapshot.paramMap.get('size');
      this.size = id;
      this.pinSub = this.socketService.getlobbyIDListener()
       .subscribe((ID) => {
      this.pin = ID;
    });
  }

getPin() {return SocketioService.lobbyID; }
getSize() {return SocketioService.lobbySize;
}

enterName() {
    this.socketService.setName(this.name);
}

}
