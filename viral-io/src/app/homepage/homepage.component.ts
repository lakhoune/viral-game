import { Component, OnInit } from '@angular/core';
import {SocketioService} from '../socketio.service';
import { Directive } from '@angular/core';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener } from "@angular/core";
import { HostBinding } from '@angular/core';
import { ReactiveFormsModule ,NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      FormsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

  animations: [
    trigger('scrollRotate', [
      // ...
      state('base', style({
      })),
      state('next', style({
        backgroundColor: 'green'
      })),
      transition('base => next', [
        animate(50)
      ]),

    ]),
  ]
})
export class HomepageComponent implements OnInit {

    pinCODE;
    
playButton :boolean = false;
players :boolean = true;
  constructor(private socketService: SocketioService) { }

  ngOnInit() {
    // this.socketService.joinLobby(8848);
  }
   
newLobby(){
    
    this.playButton = true;
    this.players = false;
    console.log(this.playButton);
    
}
   
createLobby(size:number){
    this.socketService.createLobby(size);
    
}  
enterLobby(pin:number){
    this.socketService.joinLobby(pin);
}    


}
