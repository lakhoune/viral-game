import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionauthService {


  constructor() { }


static setToken(token){
    
    localStorage.setItem('token', token);
}
static setID(id){
    
    localStorage.setItem('id', id);
}

static deleteID(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('id');
}
static readID(){
    
    return localStorage.getItem('id');
    
}
static readToken(){
    
    return localStorage.getItem('token');
    
}
static clearStorage(){
    
    localStorage.clear();
}    

}
