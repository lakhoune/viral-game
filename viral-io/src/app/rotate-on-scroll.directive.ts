import { Directive } from '@angular/core';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostListener, Component } from "@angular/core";
import {  HostBinding } from '@angular/core';

var angle = 0;

@Directive({
  selector: '[appRotateOnScroll]'
})

export class RotateOnScrollDirective {

  constructor(el: ElementRef) { 
  
      var element = el.nativeElement;
      
  }
 
    @HostListener("window:scroll", [])
onWindowScroll() {
  document.getElementById("rotate").style.transform = "rotate("+angle+"deg)";
    angle=angle + 0.4;
    console.log(angle);
}
    
}
 