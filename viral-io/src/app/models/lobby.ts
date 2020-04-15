import {game} from "./game";
import {player} from "./player/player";

export class lobby {
    id: number;
    capacity: number;
    status: any;

    participants:player[];//set type
    game:game;

constructor(id:number,capacity:number){
        this.id=id;
        this.capacity=capacity;
    }
}
