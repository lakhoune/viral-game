import {player} from "./player";

export abstract class role {
 
player:player;
    
constructor(player:player){
        this.player=player;
    }
}