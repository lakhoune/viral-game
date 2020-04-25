import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

rotate(){
    
    $("#begriff").style.transform = "rotate(7deg)";
    
}
}
