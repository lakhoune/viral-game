import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';

import {GameService} from '../game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor(private game:GameService) { 


  }

  ngOnInit() {
      
                     // var container = '<div class="col-6 col-md-3 card-container" style=" padding: .3em; "><div class="card-flip"><div class="card front"><div class="card-block "><table class="class-table"><tbody><tr><td class="align-middle" style="text-align: center;"><h4 style="margin-top: 10px;" class="begriff">Front Card</h4></td></tr></tbody></table></div></div><div class="card back"><div class="card-block"><table class="class-table"><tbody><tr><td class="align-middle" style="text-align: center;"><h4 style="margin-top: 10px;" class="begriff">Front Card</h4></td></tr></tbody></table></div></div></div></div>';
         
       // $( "#board" ).append(container);
      $("#f1").html('Apfelbaum');
      $("#b1").html('Apfelbaum');
    this.game.resolve(true,0);
      this.game.resolve(false,1);
      this.game.resolve(true,4);
   
      
      
  }

rotate(){
    
    $("#begriff").style.transform = "rotate(7deg)";
    
}
}
