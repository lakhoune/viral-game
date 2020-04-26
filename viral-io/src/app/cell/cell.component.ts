import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor() { 


  }

  ngOnInit() {
      
                     // var container = '<div class="col-6 col-md-3 card-container" style=" padding: .3em; "><div class="card-flip"><div class="card front"><div class="card-block "><table class="class-table"><tbody><tr><td class="align-middle" style="text-align: center;"><h4 style="margin-top: 10px;" class="begriff">Front Card</h4></td></tr></tbody></table></div></div><div class="card back"><div class="card-block"><table class="class-table"><tbody><tr><td class="align-middle" style="text-align: center;"><h4 style="margin-top: 10px;" class="begriff">Front Card</h4></td></tr></tbody></table></div></div></div></div>';
         
       // $( "#board" ).append(container);
      $("#f1").html('Apfelbaum');
      $("#b1").html('Apfelbaum');
      $("#b1").parents(".back").css("background-color", "rgba(201, 255, 113,0.5)");
    setTimeout(function(){$(".card-flip").css("transform", "rotateY(180deg)");},3000);
      setTimeout(function(){$(".card-flip").css("transform", "rotateY(0deg)");},6000)
       setTimeout(function(){$(".card-flip").css("transform", "rotateY(180deg)");},9000);
      
      
  }

rotate(){
    
    $("#begriff").style.transform = "rotate(7deg)";
    
}
}
