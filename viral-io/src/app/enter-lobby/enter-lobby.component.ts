import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-lobby',
  templateUrl: './enter-lobby.component.html',
  styleUrls: ['./enter-lobby.component.css']
})
export class EnterLobbyComponent implements OnInit {

    title:string ="Title";
    pin:number =1213;
    size:number =8;
    
    
  constructor() { }

  ngOnInit() {
  }

}
 