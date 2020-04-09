import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionauthService {


  constructor() { }


static setID(num){
    
    localStorage.setItem('token', num);
}

static deleteID(){
    
    localStorage.removeItem('token');
}
static readID(){
    
    return localStorage.getItem('token');
    
}
static clearStorage(){
    
    localStorage.clear();
}    

}
