import { Component, OnInit } from '@angular/core';

import { Directive } from '@angular/core';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener } from "@angular/core";
import { HostBinding } from '@angular/core';
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
    BrowserAnimationsModule
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

  constructor() { }

  ngOnInit() {
     
  }
   
    
    


}
