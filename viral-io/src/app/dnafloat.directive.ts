import { Directive } from '@angular/core';
import {ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Directive({
  selector: '[appDnafloat]'
})
export class DnafloatDirective {

  constructor(el: ElementRef) { 
      
    function newPosition(){
    
        var parentHeight = 100;
        var parentWidth = 100;
    
        var newY = Math.floor(Math.random() * parentHeight) +"px";
        var newX = Math.floor(Math.random() * parentWidth)+"px";
        var rot = Math.floor(Math.random() * 180);
    
        return [newY,newX,rot];    
    
    }

    function animatePos(){
    
        var newPos = newPosition();
    
/*el.nativeElement.animate({ top: newPos[0], left: newPos[1] }, 2000,   function(){
      animatePos();        
    });*/
    
    
        //animatePos();
    
    }
    animatePos();
  }
    
    

    


}
    

