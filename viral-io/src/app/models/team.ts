import {player} from "./player/player";

export class team {
    
    participants:player[];//set type;

constructor(players:player[]){
        this.participants=players;
    }
}
