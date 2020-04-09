import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionauthService {


  constructor() { }


setID(num){
    
    localStorage.setItem('ID', num);
}

deleteID(){
    
    localStorage.removeItem('ID');
}
readID(){
    
    return localStorage.getItem('ID');
    
}
clearStorage(){
    
    localStorage.clear();
}    

}
